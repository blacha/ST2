declare var ClientLib:any;

import {CityLayout} from '../../api/city.layout';
import {ParseUtil} from '../util/parse';

function GameToJSON(offset, obj, key) {
    var unit = obj[key];
    return {
        x: unit.get_CoordX(),
        y: unit.get_CoordY() + offset,
        id: unit.get_MdbUnitId(),
        l: unit.get_CurrentLevel()
    };
};

export class CityData {
    static BASE_OFFSET_Y = 0;
    static DEF_OFFSET_Y = 8;
    static OFF_OFFSET_Y = CityData.DEF_OFFSET_Y + 8;
    static MAX_BASE_X = 9;

    static FACTION_GDI = 1;
    static FACTION_NOD = 2;

    static $MM;

    static $index(x:number, y:number) {
        return x + y * CityData.MAX_BASE_X;
    }

    static getCurrentCity():CityLayout {
        var MD = ClientLib.Data.MainData.GetInstance();
        var cities = MD.get_Cities();

        var currentCity = cities.get_CurrentCity();
        return CityData.getCityData(currentCity);
    }

    static getCityData(city):CityLayout {
        if (city == null) {
            return null;
        }

        var MD = ClientLib.Data.MainData.GetInstance();
        var player = MD.get_Player();
        var server = MD.get_Server();
        return {
            id: city.get_Id(),
            level: city.get_LvlBase(),
            name: city.get_Name(),
            x: city.get_PosX(),
            y: city.get_PosY(),
            faction: city.get_CityFaction(),
            owner: city.get_OwnerName() || player.get_Name(),
            v: city.get_Version(),
            player: player.get_Name(),
            world: server.get_WorldId(),

            tiles: CityData.getLayout(city),
            upgrades: CityData.getUpgrades(city),
        };
    }

    static getLayout(city) {
        var xYMap = [];

        function mapUnit(unit) {
            var index = CityData.$index(unit.x, unit.y);
            delete unit.x;
            delete unit.y;

            // Units can be inside other units
            if (xYMap[index]) {
                xYMap[index].u = unit;
                return;
            }
            xYMap[index] = unit;
        }

        CityData.getBuildings(city).forEach(mapUnit);

        var units = CityData.getUnits(city);
        units.d.forEach(mapUnit);
        units.o.forEach(mapUnit);

        for (var y = 0; y <= CityData.OFF_OFFSET_Y; y++) {
            for (var x = 0; x < 9; x++) {
                var type = city.GetResourceType(x, y);
                if (type == 0) {
                    continue;
                }
                var index = CityData.$index(x, y);

                var tileObj = xYMap[index];
                if (tileObj == null) {
                    xYMap[index] = type;
                    continue;
                }

                tileObj.t = type;
            }
        }

        return xYMap;
    }

    static getResources(city) {
        var data = [];

        for (var y = 0; y <= CityData.OFF_OFFSET_Y; y++) {
            for (var x = 0; x < 9; x++) {
                var type = city.GetResourceType(x, y);
                if (type == 0) {
                    continue;
                }
                data.push({
                    x: x,
                    y: y,
                    type: type
                });
            }
        }
        return data;
    }


    static getUpgrades(city):number[] {
        if (city.IsOwnBase()) {
            var player = ClientLib.Data.MainData.GetInstance().get_Player();
            var research = player.get_PlayerResearch();

            var output = [];
            [1, 2, 5].forEach(function (type) {
                var list = research.GetResearchItemListByType(type);

                list.l.forEach(function (rt) {
                    if (rt.get_CurrentLevel() < 2) {
                        return;
                    }
                    var unit = rt.get_GameDataUnit_Obj();
                    if (unit == null) {
                        return;
                    }
                    var tech = rt.get_GameDataTech_Obj();

                    output.push(tech.c);
                });
            });

            return output;
        }

        var activeModules = city.get_ActiveModules();
        var MODULES = CityData.getModuleMap();

        var upgradeMap = {};
        activeModules.forEach(function (id) {
            var unitID = MODULES[id];
            if (unitID == null) {
                return;
            }
            upgradeMap[unitID] = true;
        });

        return Object.keys(upgradeMap).map(function (i) {
            return parseInt(i, 10);
        });
    }

    static getUnits(city) {
        var units = city.get_CityUnitsData();
        var defUnits = units.$get_DefenseUnits();
        var offUnits = units.$get_OffenseUnits();

        var faction = city.get_CityFaction();
        if (faction === CityData.FACTION_NOD || faction === CityData.FACTION_GDI) {
            return {
                d: Object.keys(defUnits.d).map(GameToJSON.bind(null, CityData.DEF_OFFSET_Y, defUnits.d)),
                o: Object.keys(offUnits.d).map(GameToJSON.bind(null, CityData.OFF_OFFSET_Y, offUnits.d))
            }
        }

        return {
            d: Object.keys(defUnits.d).map(GameToJSON.bind(null, CityData.DEF_OFFSET_Y, defUnits.d)),
            o: []
        };
    }

    static getBuildings = function (city) {
        var buildings = city.get_Buildings();
        if (buildings.c == 0) {
            return [];
        }
        var buildingD = buildings.d;

        return Object.keys(buildingD).map(GameToJSON.bind(null, CityData.BASE_OFFSET_Y, buildingD));
    };

    static getModuleMap() {
        if (CityData.$MM != null) {
            return CityData.$MM;
        }
        var units = GAMEDATA.units;
        var MODULES = [];
        Object.keys(units).forEach(function (id) {
            var unit = units[id];
            var i = parseInt(id, 10);
            unit.m.forEach(function (module) {
                if (module.t == 1) {
                    return;
                }
                MODULES[module.i] = i;
            });
        });
        CityData.$MM = MODULES;
        return MODULES;
    }
}

