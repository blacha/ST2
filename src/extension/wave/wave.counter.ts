export interface WaveCount {
    total: number;
    levels: number[];
    formatted: string;
    waves: number;
}

export var WaveCounter = {

    count(x:number, y:number): WaveCount {
        var levelCount = [];
        var count = 0;
        var maxAttack = 10;
        var world = ClientLib.Data.MainData.GetInstance().get_World();
        for (var scanY = y - 10; scanY <= y + 10; scanY++) {
            for (var scanX = x - 10; scanX <= x + 10; scanX++) {
                var distX = Math.abs(x - scanX);
                var distY = Math.abs(y - scanY);
                var distance = Math.sqrt((distX * distX) + (distY * distY));
                // too far away to scan
                if (distance > maxAttack) {
                    continue;
                }

                var object = world.GetObjectFromPosition(scanX, scanY);
                // Nothing to scan
                if (object === null) {
                    continue;
                }

                // Object isnt a NPC Base/Camp/Outpost
                if (object.Type !== ClientLib.Data.WorldSector.ObjectType.NPCBase) {
                    continue;
                }

                if (typeof object.getCampType === 'function' && object.getCampType() === ClientLib.Data.Reports.ENPCCampType.Destroyed) {
                    continue;
                }

                var level = object.$get_Level();
                levelCount[level] = (levelCount[level] || 0) + 1;

                count++;
            }
        }

        var waves = Math.max(1, Math.min(5, Math.floor(count / 10)));

        var output = [];
        for (var i = 0; i < levelCount.length; i++) {
            var lvl = levelCount[i];
            if (lvl !== undefined) {
                output.push(lvl + ' x ' + i);
            }
        }

        return {
            total: count,
            levels: levelCount,
            formatted: output.join(', '),
            waves: waves
        };
    },

    paste(x: number, y:number) {
        var waves = this.count(x, y);
        var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable();
        var dom = input.getContentElement().getDomElement();

        var output = [];
        output.push(dom.value.substring(0, dom.selectionStart));
        output.push('[[coords]' + x + ':' + y + '[/coords]] Found ' + waves.waves + ' Bases - ' + waves.formatted);
        output.push(dom.value.substring(dom.selectionEnd, dom.value.length));

        input.setValue(output.join(' '));
    }
};