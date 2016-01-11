export var PATCH_DATA = {
    'ClientLib.Data.CityUnits.$get_DefenseUnits': {
        data: 'ClientLib.Data.CityUnits.prototype.HasUnitMdbId',
        re: /for \(var c in \{d:this\.(.{6})/
    },
    'ClientLib.Data.CityUnits.$get_OffenseUnits': {
        data: 'ClientLib.Data.CityUnits.prototype.HasUnitMdbId',
        re: /for \(var b in \{d:this\.(.{6})/
    },
    'webfrontend.gui.region.RegionCityInfo.$get_Object': {
        data: 'webfrontend.gui.region.RegionCityInfo.prototype.setObject',
        re: /^function \([A-Za-z]+\)\{.+this\.([A-Za-z_]+)=/
    },
    'ClientLib.Data.WorldSector.WorldObjectNPCCamp.$get_CampType': {
        data: 'ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype.$ctor',
        re: /this\.(.{6})=\(*g\>\>(22|0x16)\)/
    },
    'ClientLib.Data.WorldSector.WorldObjectNPCCamp.$get_Id': {
        data: 'ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype.$ctor',
        re:  /\&.*=-1;\}this\.(.{6})=\(/
    },
    'ClientLib.Data.WorldSector.WorldObjectNPCBase.$get_Id': {
        data: 'ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype.$ctor',
        re: /.*d\+=f;this\.(.{6})=\(/
    },
    'ClientLib.Data.WorldSector.WorldObjectNPCBase.$get_Level': {
        data: 'ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype.$ctor',
        re: /100\){0,1};this\.(.{6})=Math.floor/
    },
    'ClientLib.Data.WorldSector.WorldObjectCity.$get_Id': {
        data: 'ClientLib.Data.WorldSector.WorldObjectCity.prototype.$ctor',
        re: /.*d\+=f;this\.(.{6})=\(/
    }
};