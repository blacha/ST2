var CityData = {};

CityData.BASE_OFFSET_Y = 0;
CityData.DEF_OFFSET_Y = 8;
CityData.OFF_OFFSET_Y = CityData.DEF_OFFSET_Y + 8;
CityData.MAX_BASE_X = 9;

CityData.$index = function(x, y) {
    return x + y * CityData.MAX_BASE_X;
};

CityData.scan = function() {
    var base = CityData.getCurrentCity();
    return CityData.saveToParse(base);
};

CityData.getCurrentCity = function() {
    var MD = ClientLib.Data.MainData.GetInstance();
    var cities = MD.get_Cities();

    var currentCity = cities.get_CurrentCity();
    return CityData.getCityData(currentCity);
};

CityData.getCityData = function(city) {
    var output = {};
    if (city == null) {
        return {};
    }
    var MD = ClientLib.Data.MainData.GetInstance();
    var player = MD.get_Player();
    var server = MD.get_Server();

    output.level = city.get_LvlBase();
    output.name = city.get_Name();
    output.x = city.get_PosX();
    output.y = city.get_PosY();
    output.faction = city.get_CityFaction();
    output.owner = city.get_OwnerName() || player.get_Name();
    output.version = city.get_Version();
    output.player = player.get_Name();
    output.world = server.get_WorldId();

    output.tiles = CityData.getLayout(city);
    output.upgrades = CityData.getUpgrades(city);

    return output;
};

CityData.getLayout = function(city) {
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
};

CityData.getResources = function(city) {
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
};

function GameToJSON(offset, obj, key) {
    var unit = obj[key];
    return {
        x: unit.get_CoordX(),
        y: unit.get_CoordY() + offset,
        id: unit.get_MdbUnitId(),
        l: unit.get_CurrentLevel()
    };
};

CityData.getUpgrades = function(city) {
    if (city.IsOwnBase()) {
        var player = ClientLib.Data.MainData.GetInstance().get_Player();
        var research = player.get_PlayerResearch();

        var output = [];
        [1, 2, 5].forEach(function(type) {
            var list = research.GetResearchItemListByType(type);

            list.l.forEach(function(rt) {
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
    activeModules.forEach(function(id) {
        var unitID = MODULES[id];
        if (unitID == null) {
            return;
        }
        upgradeMap[unitID] = true;
    });

    return Object.keys(upgradeMap).map(function(i) {
        return parseInt(i, 10);
    });
};

CityData.getUnits = function(city) {
    var units = city.get_CityUnitsData();

    var defUnits = units.get_DefenseUnits();
    var offUnits = units.get_OffenseUnits();

    return {
        d: Object.keys(defUnits.d).map(GameToJSON.bind(null, CityData.DEF_OFFSET_Y, defUnits.d)),
        o: Object.keys(offUnits.d).map(GameToJSON.bind(null, CityData.OFF_OFFSET_Y, offUnits.d))
    }
};

CityData.getBuildings = function(city) {
    var buildings = city.get_Buildings();
    if (buildings.c == 0) {
        return [];
    }
    var buildingD = buildings.d;

    return Object.keys(buildingD).map(GameToJSON.bind(null, CityData.BASE_OFFSET_Y, buildingD));
};

CityData.getModuleMap = function() {
    if (CityData.$MM != null) {
        return CityData.$MM;
    }
    var units = GAMEDATA.units;
    var MODULES = [];
    Object.keys(units).forEach(function(id) {
        var unit = units[id];
        var i = parseInt(id, 10);
        unit.m.forEach(function(module) {
            if (module.t == 1) {
                return;
            }
            MODULES[module.i] = i;
        });
    });
    CityData.$MM = MODULES;
    return MODULES;
};

CityData.saveToParse = function(data) {
    var http = new XMLHttpRequest();

    var url = 'https://api.parse.com/1/classes/Layout';

    http.open('POST', url, true);
    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 201) {
            var response = JSON.parse(http.responseText);
            var id = response.objectId;
        }
    };

    http.send(JSON.stringify(data));
};

//CityData.saveToParse(CityData.getCurrentCity());
//console.log(JSON.stringify(
CityData.scan();
//));
