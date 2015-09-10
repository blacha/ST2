import {Tile} from '../base/tile';
import {Constants} from '../constants';
import {GameDataObject} from '../data/gamedataobject';
import {Faction} from '../data/faction';
import * as Util from '../util';


export class BuildingType extends GameDataObject {

    static ID_MAP:{[key:number]: BuildingType} = [];
    static GDI = {
        Silo: new BuildingType(120), //, 'GDI_Silo', 'Silo', 's'),
        CrystalHarvester: new BuildingType(175, [Tile.Crystal]), //, 'GDI_Harvester_Crystal', 'Crystal Harvester', 'n', [Tile.Crystal], ['s']),
        TiberiumHarvester: new BuildingType(115, [Tile.Tiberium]), //, 'GDI_Harvester', 'Tiberium Harvester', 'h', [Tile.Tiberium], ['s']),
        Accumulator: new BuildingType(107), //, 'GDI_Accumulator', 'Accumulator', 'a'),
        PowerPlant: new BuildingType(117), //, 'GDI_Power_Plant', 'PowerPlant', 'p', [Tile.Empty], ['a']),
        Refinery: new BuildingType(119), //, 'GDI_Refinery', 'Refinery', 'r', [Tile.Empty], ['p']),
        ConstructionYard: new BuildingType(112), //, 'GDI_Construction_Yard', 'Construction Yard', 'y'),
        Airport: new BuildingType(108), //, 'GDI_Airport', 'Airport', 'd'),
        Barracks: new BuildingType(110), //, 'GDI_Barracks', 'Barracks', 'b'),
        Factory: new BuildingType(114), //, 'GDI_Factory', 'Factory', 'f'),
        DefenseHQ: new BuildingType(130), //, 'GDI_Defense_HQ', 'Defense HQ', 'q'),
        DefenseFacility: new BuildingType(131), //, 'GDI_Defense_Facility', 'Defense Facility', 'w'),
        CommandCenter: new BuildingType(111), //, 'GDI_Command_Center', 'Command Center', 'e'),
        SkystrikeSupport: new BuildingType(202), //, 'GDI_Support_Art', 'Skystrike Support', 'z'),
        FalconSupport: new BuildingType(200), //, 'GDI_Support_Air', 'Falcon Support', 'x'),
        IonCannonSupport: new BuildingType(201), //, 'GDI_Support_Ion', 'Ion Cannon', 'i')
    };

    static NOD = {
        Silo: new BuildingType(154), //, 'NOD_Silo', 'Silo', 's'),
        CrystalHarvester: new BuildingType(176, [Tile.Crystal]), //, 'NOD_Harvester_Crystal', 'Crystal Harvester', 'n', [Tile.Crystal], ['s']),
        TiberiumHarvester: new BuildingType(155, [Tile.Tiberium]), //, 'NOD_Harvester', 'Tiberium Harvester', 'h', [Tile.Tiberium], ['s']),
        Accumulator: new BuildingType(147), //, 'NOD_Accumulator', 'Accumulator', 'a'),
        PowerPlant: new BuildingType(152), //, 'NOD_Power_Plant', 'Power Plant', 'p', [Tile.Empty], ['a']),
        Refinery: new BuildingType(153), //, 'NOD_Refinery', 'Refinery', 'r', [Tile.Empty], ['p']),
        ConstructionYard: new BuildingType(151), //, 'NOD_Construction_Yard', 'Construction Yard', 'y'),
        Airport: new BuildingType(148), //, 'NOD_Airport', 'Airport', 'd'),
        Barracks: new BuildingType(149), //, 'NOD_Barracks', 'Barracks', 'b'),
        Factory: new BuildingType(156), //, 'NOD_Factory', 'Factory', 'f'),
        DefenseHQ: new BuildingType(157), //, 'NOD_Defense_HQ', 'DefenseHQ', 'q'),
        DefenseFacility: new BuildingType(158), //, 'NOD_Defense_Facility', 'Defense Facility', 'w'),
        CommandCenter: new BuildingType(159), //, 'NOD_Command_Post', 'Command Center', 'e'),
        BladeOfKane: new BuildingType(205), //, 'NOD_Support_Art', 'Support Art', 'z'),
        EyeOfKane: new BuildingType(203), //, 'NOD_Support_Air', 'Support Air', 'x'),
        FistOfKane: new BuildingType(204), //, 'NOD_Support_Ion', 'Support Ion', 'i')
    };

    static Forgotten = {
        ConstructionYard: new BuildingType(177), //, 'FOR_Construction_Yard', 'Construction Yard', 'y'),
        Refinery: new BuildingType(193), //, 'FOR_Refinery', 'Refinery', 'r'),
        Silo: new BuildingType(194), //, 'FOR_Silo', 'Silo', 's'),
        DefenseFacility: new BuildingType(195), //, 'FOR_Defense_Facility', 'Defense Facility', 'w'),
        DefenseHQ: new BuildingType(196), //, 'FOR_Defense_HQ', 'Defense HQ', 'q'),
        TradeCenter: new BuildingType(197), //, 'FOR_Trade_Center', 'Trade Center', 'u'),
        TiberiumHarvester: new BuildingType(198), //, 'FOR_Harvester_Tiberium', 'Tiberium Harvester', 'h'),
        CrystalHarvester: new BuildingType(199), //, 'FOR_Harvester_Crystal', 'Crystal Harvester', 'n'),
        TiberiumSilo: new BuildingType(206), //, 'FOR_Tiberium_Booster', 'Tiberium Silo', 'b'),
        CrystalSilo: new BuildingType(207), //, 'FOR_Crystal_Booster', 'Crystal Silo', 'v')
    };

    static Fortress = {
        CamouflagedFlak: new BuildingType(223),
        OverchargedMGNest: new BuildingType(224),
        Buster: new BuildingType(225),
        AdvancedSAM: new BuildingType(226),
        AdvancedReaper: new BuildingType(227),
        AdvancedDemolisher: new BuildingType(228),
        ParticleCannon: new BuildingType(229),
        Wall: new BuildingType(230),
        Barbwire: new BuildingType(231),
        AntitankBarrier: new BuildingType(232),
        TacitusEnclosure: new BuildingType(233),
        HeavyMGNest: new BuildingType(235),
    };


    static MAP:{[key:string] : { [key:string]: BuildingType} } = {};

    constructor(id:number,
                private tiles:Tile[] = [Tile.Empty],
                private supports:string[] = []) {
        super(id);
    }

    canBuildOn(x:number, y:number, tile:Tile):boolean {
        if (x > Constants.MAX_BASE_X) {
            return false;
        }

        if (y > Constants.MAX_BASE_Y) {
            return false;
        }

        return this.tiles.indexOf(tile) != -1;
    }

    getName() {
        return this.data.display;
    }

    toString() {
        return '<Building:' + this.getName() + '>';
    }

    static make(faction:Faction, char:string):BuildingType {
        char = (char || '').toLowerCase();
        var b = BuildingType.MAP[faction.code][char];

        if (b) {
            return b;
        }
        return null;
    }

    static fromID(id:number) {
        return BuildingType.ID_MAP[id];
    }

    getType() {
        return Constants.BASE;
    }
}