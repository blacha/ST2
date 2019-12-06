import { Base } from '../base';
import { Tile } from '../base/tile';
import { Faction } from '../data/faction';
import { GameDataObject, GameDataObjectType } from '../data/game.data.object';

export class BuildingType extends GameDataObject {
    static GDI = {
        Silo: new BuildingType(120, Faction.Gdi, 's'), //, 'GDI_Silo', 'Silo', 's'),
        CrystalHarvester: new BuildingType(175, Faction.Gdi, 'n', Tile.Crystal), //, 'GDI_Harvester_Crystal', 'Crystal Harvester', 'n'),
        TiberiumHarvester: new BuildingType(115, Faction.Gdi, 'h', Tile.Tiberium), //, 'GDI_Harvester', 'Tiberium Harvester', 'h'),
        Accumulator: new BuildingType(107, Faction.Gdi, 'a'), //, 'GDI_Accumulator', 'Accumulator', 'a'),
        PowerPlant: new BuildingType(117, Faction.Gdi, 'p'), //, 'GDI_Power_Plant', 'PowerPlant', 'p'),
        Refinery: new BuildingType(119, Faction.Gdi, 'r'), //, 'GDI_Refinery', 'Refinery', 'r'),
        ConstructionYard: new BuildingType(112, Faction.Gdi, 'y'), //, 'GDI_Construction_Yard', 'Construction Yard', 'y'),
        Airport: new BuildingType(108, Faction.Gdi, 'd'), //, 'GDI_Airport', 'Airport', 'd'),
        Barracks: new BuildingType(110, Faction.Gdi, 'b'), //, 'GDI_Barracks', 'Barracks', 'b'),
        Factory: new BuildingType(114, Faction.Gdi, 'f'), //, 'GDI_Factory', 'Factory', 'f'),
        DefenseHQ: new BuildingType(130, Faction.Gdi, 'q'), //, 'GDI_Defense_HQ', 'Defense HQ', 'q'),
        DefenseFacility: new BuildingType(131, Faction.Gdi, 'w'), //, 'GDI_Defense_Facility', 'Defense Facility', 'w'),
        CommandCenter: new BuildingType(111, Faction.Gdi, 'e'), //, 'GDI_Command_Center', 'Command Center', 'e'),
        SkyStrikeSupport: new BuildingType(202, Faction.Gdi, 'z'), //, 'GDI_Support_Art', 'Skystrike Support', 'z'),
        FalconSupport: new BuildingType(200, Faction.Gdi, 'x'), //, 'GDI_Support_Air', 'Falcon Support', 'x'),
        IonCannonSupport: new BuildingType(201, Faction.Gdi, 'i'), //, 'GDI_Support_Ion', 'Ion Cannon', 'i')
    };

    static NOD = {
        Silo: new BuildingType(154, Faction.Nod, 's'), //, 'NOD_Silo', 'Silo', 's'),
        CrystalHarvester: new BuildingType(176, Faction.Nod, 'n', Tile.Crystal), //, 'NOD_Harvester_Crystal', 'Crystal Harvester', 'n'),
        TiberiumHarvester: new BuildingType(155, Faction.Nod, 'h', Tile.Tiberium), //, 'NOD_Harvester', 'Tiberium Harvester', 'h'),
        Accumulator: new BuildingType(147, Faction.Nod, 'a'), //, 'NOD_Accumulator', 'Accumulator', 'a'),
        PowerPlant: new BuildingType(152, Faction.Nod, 'p'), //, 'NOD_Power_Plant', 'Power Plant', 'p'),
        Refinery: new BuildingType(153, Faction.Nod, 'r'), //, 'NOD_Refinery', 'Refinery', 'r'),
        ConstructionYard: new BuildingType(151, Faction.Nod, 'y'), //, 'NOD_Construction_Yard', 'Construction Yard', 'y'),
        Airport: new BuildingType(148, Faction.Nod, 'd'), //, 'NOD_Airport', 'Airport', 'd'),
        Barracks: new BuildingType(149, Faction.Nod, 'b'), //, 'NOD_Barracks', 'Barracks', 'b'),
        Factory: new BuildingType(156, Faction.Nod, 'f'), //, 'NOD_Factory', 'Factory', 'f'),
        DefenseHQ: new BuildingType(157, Faction.Nod, 'q'), //, 'NOD_Defense_HQ', 'DefenseHQ', 'q'),
        DefenseFacility: new BuildingType(158, Faction.Nod, 'w'), //, 'NOD_Defense_Facility', 'Defense Facility', 'w'),
        CommandCenter: new BuildingType(159, Faction.Nod, 'e'), //, 'NOD_Command_Post', 'Command Center', 'e'),
        BladeOfKane: new BuildingType(205, Faction.Nod, 'z'), //, 'NOD_Support_Art', 'Support Art', 'z'),
        EyeOfKane: new BuildingType(203, Faction.Nod, 'x'), //, 'NOD_Support_Air', 'Support Air', 'x'),
        FistOfKane: new BuildingType(204, Faction.Nod, 'i'), //, 'NOD_Support_Ion', 'Support Ion', 'i')
    };

    static Forgotten = {
        ConstructionYard: new BuildingType(177, Faction.Forgotten, 'y'), //, 'FOR_Construction_Yard', 'Construction Yard', 'y'),
        Refinery: new BuildingType(193, Faction.Forgotten, 'r'), //, 'FOR_Refinery', 'Refinery', 'r'),
        Silo: new BuildingType(194, Faction.Forgotten, 's'), //, 'FOR_Silo', 'Silo', 's'),
        DefenseFacility: new BuildingType(195, Faction.Forgotten, 'w'), //, 'FOR_Defense_Facility', 'Defense Facility', 'w'),
        DefenseHQ: new BuildingType(196, Faction.Forgotten, 'q'), //, 'FOR_Defense_HQ', 'Defense HQ', 'q'),
        TradeCenter: new BuildingType(197, Faction.Forgotten, 'u'), //, 'FOR_Trade_Center', 'Trade Center', 'u'),
        TiberiumHarvester: new BuildingType(198, Faction.Forgotten, 'h', Tile.Tiberium), //, 'FOR_Harvester_Tiberium', 'Tiberium Harvester', 'h'),
        CrystalHarvester: new BuildingType(199, Faction.Forgotten, 'n', Tile.Crystal), //, 'FOR_Harvester_Crystal', 'Crystal Harvester', 'n'),
        TiberiumSilo: new BuildingType(206, Faction.Forgotten, 'b'), //, 'FOR_Tiberium_Booster', 'Tiberium Silo', 'b'),
        CrystalSilo: new BuildingType(207, Faction.Forgotten, 'v'), //, 'FOR_Crystal_Booster', 'Crystal Silo', 'v')
    };

    static Fortress = {
        CamouflagedFlak: new BuildingType(223, Faction.Forgotten, '?'),
        OverchargedMGNest: new BuildingType(224, Faction.Forgotten, '?'),
        Buster: new BuildingType(225, Faction.Forgotten, '?'),
        AdvancedSAM: new BuildingType(226, Faction.Forgotten, '?'),
        AdvancedReaper: new BuildingType(227, Faction.Forgotten, '?'),
        AdvancedDemolisher: new BuildingType(228, Faction.Forgotten, '?'),
        ParticleCannon: new BuildingType(229, Faction.Forgotten, '?'),
        Wall: new BuildingType(230, Faction.Forgotten, '?'),
        Barbwire: new BuildingType(231, Faction.Forgotten, '?'),
        AntitankBarrier: new BuildingType(232, Faction.Forgotten, '?'),
        TacitusEnclosure: new BuildingType(233, Faction.Forgotten, '?'),
        HeavyMGNest: new BuildingType(235, Faction.Forgotten, '?'),
    };

    tile: Tile;
    supports: string[];

    constructor(id: number, faction: Faction, code: string, tiles: Tile = Tile.Empty, supports: string[] = []) {
        super(GameDataObjectType.Building, id, faction, code);
        this.tile = tiles;
        this.supports = supports;
    }

    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (x > Base.MaxX) {
            return false;
        }

        if (y > Base.MaxBaseY) {
            return false;
        }

        return this.tile === tile;
    }

    getName() {
        return this.data.display;
    }

    toString() {
        return '<Building:' + this.getName() + '>';
    }
}
