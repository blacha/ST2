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
    output.research = CityData.getResearch(city);

    return output;
};

CityData.getResearch = function(city) {
    if (city.IsOwnBase()) {
        var player = ClientLib.Data.MainData.GetInstance().get_Player();
        var research = player.get_PlayerResearch();

        var output = [];
        [1, 2, 5].forEach(function(type) {
            var list = research.GetResearchItemListByType(type);

            list.l.forEach(function(rt) {
                if (rt.get_CurrentLevel() > 0) {
                    output.push({
                        tech: rt.get_MdbId(),
                        level: rt.get_CurrentLevel()
                    });
                }
            });
        });

        return output;
    }

    return city.get_ActiveModules();
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
            level: unit.get_CurrentLevel(),
            hp: unit.get_Health()
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
            level: building.get_CurrentLevel(),
            hp: building.get_Health(),
            type: building.get_Type()
        }
    });
};

CityData.getCurrentCity();
//
//var bS = ClientLib.Data.MainData.GetInstance().get_CurrentCity();
//if (bS.IsOwnBase()) {
//    var cb = ClientLib.Base.Unit.GetUpgrade(bR.get_MdbUnitId());
//    bW = cb != null && cb.get_CurrentLevel() > 1;
//    if (bW) {
//        ca = cb.get_GameDataTech_Obj();
//    }
//}
//else {
//    var bT = ClientLib.Base.Unit.GetTechIdFromUpgrade(bR.get_MdbUnitId(), bS.get_ActiveModules());
//    bW = bT > -1;
//    if (bW) {
//        ca = ClientLib.Res.ResMain.GetInstance().GetTech_Obj(bT);
//    }
//}
//
//var b = [69, 70, 71, 72, 73, 74, 75, 76, 77, 89, 90, 99, 469, 489, 502, 507];
//function GetTechIdFromUpgrade(a, ActiveModules) {
//    var $createHelper;
//    if (b == null) {
//        return -1;
//    }
//    //var c = $I.NINWDO.PAXPTM().IKKDTI(a);
//    var c = GAMEDATA.units[81];
//    var e = c.m; // modifiers?
//    var d;
//    for (var f = 0; f < e.length; f++) {
//        d = e[f];
//        if (d.t != 1) {
//            for (var i = 0; i < ActiveModules.length; i++) {
//                var g = ActiveModules[i];
//                if ((g == d.i) && (d.r.length > 0)) {
//                    return d.r[0].i;
//                }
//            }
//        }
//
//    }
//
//    return -1;
//}

