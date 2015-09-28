var CityScanner = {};


CityScanner.getCurrentCity = function() {
    var MD = ClientLib.Data.MainData.GetInstance();
    var cities = MD.get_Cities();

    return cities.get_CurrentOwnCity();
};


CityScanner.scan = function() {
    var currentCity = CityScanner.getCurrentCity();
    var x = base.get_PosX();
    var y = base.get_PosY();

    var maxAttack = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
    var world = ClientLib.Data.MainData.GetInstance().get_World();

    var TO_SCAN = [];
    for (var scanY = y - 11; scanY <= y + 11; scanY++) {
        for (var scanX = x - 11; scanX <= x + 11; scanX++) {
            var distX = Math.abs(x - scanX);
            var distY = Math.abs(y - scanY);
            var distance = Math.sqrt((distX * distX) + (distY * distY));
            // too far away to scan
            if (distance > maxAttack) {
                continue;
            }
            var object = world.GetObjectFromPosition(scanX, scanY);
            if (object == null) {
                continue;
            }
            if (object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCBase &&
                object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCCamp) {
                continue;
            }

            if (typeof object.getCampType === 'function' &&
                object.getCampType() === ClientLib.Data.Reports.ENPCCampType.Destroyed) {
                continue;
            }

            TO_SCAN.push({
                x: x,
                y: y,
                id: object.getID()
            })
        }
    }
};

CityScanner.scanBase = function(scanX, scanY) {
    return new Promise(function(resolve, reject) {
        var failCount = 0;
        var world = ClientLib.Data.MainData.GetInstance().get_World();
        var object = world.GetObjectFromPosition(scanX, scanY);


        var scanBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(object.id);

        var comm = ClientLib.Net.CommunicationManager.GetInstance();
        comm.UserAction();
        if (scanBase.get_IsGhostMode()) {
            return resolve(null);
        }

        scanBase.GetBuildingsConditionInPercent()
    });
}