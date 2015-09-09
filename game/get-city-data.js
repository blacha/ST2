var CityData = {};

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

    output.level = city.get_LvlBase();
    output.name = city.get_Name();
    output.x = city.get_PosX();
    output.y = city.get_PosY();
    output.faction = city.get_CityFaction();
    output.owner = city.get_OwnerName();
    output.version = city.get_Version();

    output.buildings = CityData.getBuildings(city);
    output.units = CityData.getUnits(city);
    output.upgrades = CityData.getUpgrades(city);

    output.resources = CityData.getResources(city);

    return output;
};

CityData.getResources = function(city) {
    var data = [];

    for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 17; y++) {
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

                output.push( tech.c );
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

    function getUnit(obj, key) {
        var unit = obj[key];
        return {
            x: unit.get_CoordX(),
            y: unit.get_CoordY(),
            id: unit.get_MdbUnitId(),
            level: unit.get_CurrentLevel()
            //hp: unit.get_Health()
        }
    }

    var dUnitOutput = Object.keys(defUnits.d).map(getUnit.bind(null, defUnits.d));
    var oUnitOutput = Object.keys(offUnits.d).map(getUnit.bind(null, offUnits.d));

    return {
        d: dUnitOutput,
        o: oUnitOutput
    }
};

CityData.getBuildings = function(city) {
    var buildings = city.get_Buildings();
    if (buildings.c == 0) {
        return;
    }
    var buildingD = buildings.d;

    var output = [];
    return Object.keys(buildingD).map(function(key) {
        var building = buildingD[key];
        return {
            x: building.get_CoordX(),
            y: building.get_CoordY(),
            id: building.get_MdbBuildingId(),
            level: building.get_CurrentLevel()
        }
    });
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
        console.log(http.readyState, http.status);
        if(http.readyState == 4 && http.status == 201) {
            console.log(http.responseText);
        }
    };

    http.send(JSON.stringify(data));
};


CityData.saveToParse(CityData.getCurrentCity());
//console.log(JSON.stringify(
//    CityData.getCurrentCity()
//));
