import {StorageUtil} from "../util/storage";
import {Log} from "../../lib/log/log";
import {Faction} from "../../lib/data/faction";
import {CityData} from "../city/city.data";
import {CityLayout} from "../../api/city.layout";

const MAX_FAILS = 6;

export interface ClientLibCity {
    get_PosX:() => number;
    get_PosY:() => number;
    get_Id:() => number;
}
export interface CityLayoutCache {
    [key:string]: CityLayout
}


export class LayoutScanner {
    static $abort = false;
    static lastCity = 0;
    static stats;

    static getLayouts($log:Log) {
        var toScanMap = {};
        LayoutScanner.getAllCities().forEach((city) => {
            LayoutScanner.getNearByLayouts(city, toScanMap);
        });

        $log.info('Scanning ' + Object.keys(toScanMap).length + ' bases');
        var stats = {
            failCount: 1,
            toScan: Object.keys(toScanMap).length,
            scanned: 0,
            layouts: []
        };
        LayoutScanner.stats = stats;

        return Object.keys(toScanMap).reduce((prev, key) => {
            var current = toScanMap[key];
            return prev.then((data) => {
                if (data == null) {
                    stats.failCount ++;
                } else {
                    stats.scanned ++;
                    stats.layouts.push(data);
                }

                var log = $log.child(current);
                log.trace('Scanning');
                return LayoutScanner.scanLayout(current.x, current.y, current.city, log);
            }).then(() => {
                return LayoutScanner.stats;
            });
        }, Promise.resolve());
    }

    static scanLayout(x:number, y:number, fromCity:number, $log:Log, failCount = 0) {
        if (LayoutScanner.$abort) {
            return Promise.reject('Aborted');
        }

        if (fromCity != null) {
            LayoutScanner.setCurrentCity(fromCity);
        }

        var world = ClientLib.Data.MainData.GetInstance().get_World();
        var object = world.GetObjectFromPosition(x, y);
        if (object == null) {
            return Promise.resolve(null);
        }

        ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(object.$get_Id());
        var toScan = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(object.$get_Id());
        if (toScan == null) {
            return Promise.resolve(null);
        }
        var coord = ClientLib.Base.MathUtil.EncodeCoordId(x, y);

        var cachedBase = LayoutScanner.getCachedBase(coord);
        if (cachedBase != null) {
            if (cachedBase.cityid == toScan.get_Id()) {
                return Promise.resolve(cachedBase);
            }

            LayoutScanner.setCachedBase(coord, null);
        }


        if (toScan.get_IsGhostMode()) {
            return Promise.resolve(null);
        }

        if (toScan.GetBuildingsConditionInPercent() === 0) {
            failCount ++;
            //$log.debug({count: failCount}, 'failure');
            if (failCount >= MAX_FAILS) {
                $log.error('max failure count')
                return Promise.resolve(null);
            }
            var defer = Promise.defer();

            setTimeout(() => {
                LayoutScanner.scanLayout(x, y, fromCity, $log, failCount).then(defer.resolve, defer.reject);
            }, 500);

            return defer.promise;
        }

        var faction = Faction.fromID(toScan.get_CityFaction());
        if (faction === Faction.GDI || faction === Faction.NOD) {
            return Promise.resolve(null);
        }

        var cityData = CityData.getCityData(toScan);
        LayoutScanner.setCachedBase(coord, cityData);

        $log.info('Scan done!');
        return Promise.resolve(cityData);
    }

    static setCurrentCity(cityId) {
        if (LayoutScanner.lastCity == cityId) {
            return;
        }
        console.log('set-current-city', cityId, LayoutScanner.lastCity);

        var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
        var selectedBase = allCities[cityId];

        ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(selectedBase.get_PosX(), selectedBase.get_PosY());
        ClientLib.Vis.VisMain.GetInstance().Update();
        ClientLib.Vis.VisMain.GetInstance().ViewUpdate();
        LayoutScanner.lastCity = cityId;
    }

    static getAllCities():ClientLibCity[] {
        var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
        return Object.keys(allCities).map((key) => {
            return allCities[key];
        });
    }

    static getNearByLayouts(city:ClientLibCity, toScanMap) {
        var x = city.get_PosX();
        var y = city.get_PosY();

        var maxAttack = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance() - 0.5;
        var world = ClientLib.Data.MainData.GetInstance().get_World();

        for (var scanY = y - 11; scanY <= y + 11; scanY++) {
            for (var scanX = x - 11; scanX <= x + 11; scanX++) {
                var distX = Math.abs(x - scanX);
                var distY = Math.abs(y - scanY);
                var distance = Math.sqrt((distX * distX) + (distY * distY));
                if (distance >= maxAttack) {
                    continue;
                }

                var coord = ClientLib.Base.MathUtil.EncodeCoordId(scanX, scanY);
                if (toScanMap[coord]) {
                    continue;
                }

                var object = world.GetObjectFromPosition(scanX, scanY);
                if (object == null) {
                    continue;
                }

                if (object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCBase && object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCCamp) {
                    continue;
                }

                if (typeof object.$get_CampType === 'function' && object.$get_CampType() === ClientLib.Data.Reports.ENPCCampType.Destroyed) {
                    continue;
                }

                toScanMap[coord] = {
                    x: scanX,
                    y: scanY,
                    id: object.$get_Id(),
                    city: city.get_Id()
                }
            }
        }
    }

    static getCachedBase(coord:number):CityLayout {
        return StorageUtil.getItem(coord + '-layout');
    }

    static setCachedBase(coord:number, cityLayout:CityLayout) {
        StorageUtil.setItem(coord + '-layout', cityLayout);
    }
}