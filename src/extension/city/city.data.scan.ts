//var CityScanner = {};
//
//var CityData = {};
//
//CityData.BASE_OFFSET_Y = 0;
//CityData.DEF_OFFSET_Y = 8;
//CityData.OFF_OFFSET_Y = CityData.DEF_OFFSET_Y + 8;
//CityData.MAX_BASE_X = 9;
//
//CityData.FACTION_GDI = 1;
//CityData.FACTION_NOD = 2;
//
//CityData.$index = function(x, y) {
//    return x + y * CityData.MAX_BASE_X;
//};
//
//CityData.scan = function() {
//    var base = CityData.getCurrentCity();
//    return CityData.saveToParse(base);
//};
//
//CityData.getCurrentCity = function() {
//    var MD = ClientLib.Data.MainData.GetInstance();
//    var cities = MD.get_Cities();
//
//    var currentCity = cities.get_CurrentCity();
//    return CityData.getCityData(currentCity);
//};
//
//CityData.getCityData = function(city) {
//    var output = {};
//    if (city == null) {
//        return {};
//    }
//    var MD = ClientLib.Data.MainData.GetInstance();
//    var player = MD.get_Player();
//    var server = MD.get_Server();
//
//    output.level = city.get_LvlBase();
//    output.name = city.get_Name();
//    output.x = city.get_PosX();
//    output.y = city.get_PosY();
//    output.faction = city.get_CityFaction();
//    output.owner = city.get_OwnerName() || player.get_Name();
//    output.version = city.get_Version();
//    output.player = player.get_Name();
//    output.world = server.get_WorldId();
//    output.id = city.get_Id();
//
//    output.tiles = CityData.getLayout(city);
//    output.upgrades = CityData.getUpgrades(city);
//
//    return output;
//};
//
//CityData.getLayout = function(city) {
//    var xYMap = [];
//
//    function mapUnit(unit) {
//        var index = CityData.$index(unit.x, unit.y);
//        delete unit.x;
//        delete unit.y;
//
//        // Units can be inside other units
//        if (xYMap[index]) {
//            xYMap[index].u = unit;
//            return;
//        }
//        xYMap[index] = unit;
//    }
//
//    CityData.getBuildings(city).forEach(mapUnit);
//
//    var units = CityData.getUnits(city);
//    units.d.forEach(mapUnit);
//    units.o.forEach(mapUnit);
//
//    for (var y = 0; y <= CityData.OFF_OFFSET_Y; y++) {
//        for (var x = 0; x < 9; x++) {
//            var type = city.GetResourceType(x, y);
//            if (type == 0) {
//                continue;
//            }
//            var index = CityData.$index(x, y);
//
//            var tileObj = xYMap[index];
//            if (tileObj == null) {
//                xYMap[index] = type;
//                continue;
//            }
//
//            tileObj.t = type;
//        }
//    }
//
//    return xYMap;
//};
//
//CityData.getResources = function(city) {
//    var data = [];
//
//    for (var y = 0; y <= CityData.OFF_OFFSET_Y; y++) {
//        for (var x = 0; x < 9; x++) {
//            var type = city.GetResourceType(x, y);
//            if (type == 0) {
//                continue;
//            }
//            data.push({
//                x: x,
//                y: y,
//                type: type
//            });
//        }
//    }
//    return data;
//};
//
//function GameToJSON(offset, obj, key) {
//    var unit = obj[key];
//    return {
//        x: unit.get_CoordX(),
//        y: unit.get_CoordY() + offset,
//        id: unit.get_MdbUnitId(),
//        l: unit.get_CurrentLevel()
//    };
//};
//
//CityData.getUpgrades = function(city) {
//    if (city.IsOwnBase()) {
//        var player = ClientLib.Data.MainData.GetInstance().get_Player();
//        var research = player.get_PlayerResearch();
//
//        var output = [];
//        [1, 2, 5].forEach(function(type) {
//            var list = research.GetResearchItemListByType(type);
//
//            list.l.forEach(function(rt) {
//                if (rt.get_CurrentLevel() < 2) {
//                    return;
//                }
//                var unit = rt.get_GameDataUnit_Obj();
//                if (unit == null) {
//                    return;
//                }
//                var tech = rt.get_GameDataTech_Obj();
//
//                output.push(tech.c);
//            });
//        });
//
//        return output;
//    }
//
//    var activeModules = city.get_ActiveModules();
//    var MODULES = CityData.getModuleMap();
//
//    var upgradeMap = {};
//    activeModules.forEach(function(id) {
//        var unitID = MODULES[id];
//        if (unitID == null) {
//            return;
//        }
//        upgradeMap[unitID] = true;
//    });
//
//    return Object.keys(upgradeMap).map(function(i) {
//        return parseInt(i, 10);
//    });
//};
//
//CityData.getUnits = function(city) {
//    var units = city.get_CityUnitsData();
//
//    var defUnits = units.get_DefenseUnits();
//    var offUnits = units.get_OffenseUnits();
//
//    var faction = city.get_CityFaction();
//    if (faction === CityData.FACTION_NOD || faction === CityData.FACTION_GDI) {
//        return {
//            d: Object.keys(defUnits.d).map(GameToJSON.bind(null, CityData.DEF_OFFSET_Y, defUnits.d)),
//            o: Object.keys(offUnits.d).map(GameToJSON.bind(null, CityData.OFF_OFFSET_Y, offUnits.d))
//        }
//    }
//
//    return {
//        d: Object.keys(defUnits.d).map(GameToJSON.bind(null, CityData.DEF_OFFSET_Y, defUnits.d)),
//        o: []
//    };
//}
//
//CityData.getBuildings = function(city) {
//    var buildings = city.get_Buildings();
//    if (buildings.c == 0) {
//        return [];
//    }
//    var buildingD = buildings.d;
//
//    return Object.keys(buildingD).map(GameToJSON.bind(null, CityData.BASE_OFFSET_Y, buildingD));
//};
//
//CityData.getModuleMap = function() {
//    if (CityData.$MM != null) {
//        return CityData.$MM;
//    }
//    var units = GAMEDATA.units;
//    var MODULES = [];
//    Object.keys(units).forEach(function(id) {
//        var unit = units[id];
//        var i = parseInt(id, 10);
//        unit.m.forEach(function(module) {
//            if (module.t == 1) {
//                return;
//            }
//            MODULES[module.i] = i;
//        });
//    });
//    CityData.$MM = MODULES;
//    return MODULES;
//};
//
//CityData.saveToParse = function(data) {
//    var http = new XMLHttpRequest();
//
//    var url = 'https://api.parse.com/1/classes/Layout';
//
//    http.open('POST', url, true);
//    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
//    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
//    http.setRequestHeader('Content-Type', 'application/json');
//
//    http.onreadystatechange = function() {
//        if (http.readyState == 4 && http.status == 201) {
//            var response = JSON.parse(http.responseText);
//            var id = response.objectId;
//            console.log(id);
//        }
//    };
//
//    http.send(JSON.stringify(data));
//};
//
//////CityData.saveToParse(CityData.getCurrentCity());
////console.log(JSON.stringify(
////    CityData.getCurrentCity()
//////CityData.scan();
////));
//
//CityScanner.$abort = false;
//CityScanner.getCurrentCity = function() {
//    var MD = ClientLib.Data.MainData.GetInstance();
//    var cities = MD.get_Cities();
//
//    return cities.get_CurrentOwnCity();
//};
//
//CityScanner.scan = function() {
//    var currentCity = CityScanner.getCurrentCity();
//    var x = currentCity.get_PosX();
//    var y = currentCity.get_PosY();
//
//    var maxAttack = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
//    var world = ClientLib.Data.MainData.GetInstance().get_World();
//
//    var TO_SCAN = [];
//    for (var scanY = y - 11; scanY <= y + 11; scanY++) {
//        for (var scanX = x - 11; scanX <= x + 11; scanX++) {
//            var distX = Math.abs(x - scanX);
//            var distY = Math.abs(y - scanY);
//            var distance = Math.sqrt((distX * distX) + (distY * distY));
//            // too far away to scan
//            if (distance > maxAttack) {
//                continue;
//            }
//            var object = world.GetObjectFromPosition(scanX, scanY);
//            if (object == null) {
//                continue;
//            }
//            if (object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCBase &&
//                object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCCamp) {
//                continue;
//            }
//
//            if (typeof object.getCampType === 'function' &&
//                object.getCampType() === ClientLib.Data.Reports.ENPCCampType.Destroyed) {
//                continue;
//            }
//            var id = object.getID();
//
//            TO_SCAN.push({
//                x: scanX,
//                y: scanY,
//                id: id,
//                data: CityScanner.checkCache(scanX, scanY, id)
//            });
//
//        }
//    }
//    CityScanner.promiseSeries(TO_SCAN, CityScanner.scanBase)
//        .then(function(results) {
//            CityScanner.$last = results;
//            return results.filter(function(result) {
//                return result != null;
//            });
//        }).then(function(results) {
//            return results;
//        });
//};
//
//CityScanner.scanBase = function(scanObj) {
//    var failCount = 0;
//
//    function getBaseInfo(resolve, reject) {
//        if (scanObj.data) {
//            return resolve(scanObj.data);
//        }
//
//        var world = ClientLib.Data.MainData.GetInstance().get_World();
//        var object = world.GetObjectFromPosition(scanObj.x, scanObj.y);
//        if (object == null) {
//            resolve(null);
//        }
//        ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(scanObj.id);
//        var scanBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(scanObj.id);
//        console.log('get-base-info', scanObj, object.getID(), scanBase);
//
//        if (scanBase == null) {
//            resolve(null);
//        }
//
//        var comm = ClientLib.Net.CommunicationManager.GetInstance();
//        comm.UserAction();
//        if (scanBase.get_IsGhostMode()) {
//            return resolve(null);
//        }
//
//        if (CityScanner.$abort) {
//            return;
//        }
//
//        if (scanBase.GetBuildingsConditionInPercent() === 0) {
//            failCount++;
//            if (failCount > 20) {
//                return resolve(null);
//            }
//
//            setTimeout(function() {
//                getBaseInfo(resolve, reject, scanBase);
//            }, 100);
//            return;
//        }
//
//        var data = CityData.getCityData(scanBase);
//        CityScanner.cache(data.x, data.y, data);
//        return resolve(data);
//    }
//
//    return new Promise(getBaseInfo);
//};
//
//CityScanner.checkCache = function(x, y, id) {
//    var localKey = ['ST', x, y].join(':');
//
//    var data = localStorage.getItem(localKey);
//    if (data == null) {
//        return null;
//    }
//    var oldObj = JSON.parse(data);
//
//    if (oldObj.id == id) {
//        return oldObj;
//    }
//
//    localStorage.removeItem(localKey)
//};
//
//CityScanner.cache = function(x, y, obj) {
//    var localKey = ['ST', x, y].join(':');
//    localStorage.setItem(localKey, JSON.stringify(obj));
//};
//
//CityScanner.promiseSeries = function(array, iterator) {
//    var output = [];
//    var current = Promise.resolve();
//
//    for (var i = 0; i < array.length; i++) {
//        console.log(array[i]);
//        current = output[i] = current.then(function(i) {
//            return iterator(array[i]);
//        }.bind(null, i))
//    }
//
//    return Promise.all(output);
//};
//
//if (typeof ClientLib !== 'undefined') {
//    CityScanner.scan();
//}
