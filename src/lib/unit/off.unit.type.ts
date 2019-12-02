import { Tile } from '../base/tile';
import { Constants } from '../constants';
import { Faction } from '../data/faction';
import { UnitType } from './unit.type';

export class OffUnitType extends UnitType {
    canBuildOn(x: number, y: number, tile: Tile): boolean {
        if (y >= Constants.MAX_OFF_Y) {
            return false;
        }
        return super.canBuildOn(x, y, tile);
    }

    toString() {
        return '<OUnit:' + super.getName() + '>';
    }

    static GDI = {
        // Inf
        Commando: new OffUnitType(85), //, Faction.GDI, 'Commando', 'c', 'GDI_Commando'),
        MissileSquad: new OffUnitType(82), //, Faction.GDI, 'MissileSquad', 'q', 'GDI_Missile_Squad'),
        Riflemen: new OffUnitType(81), //, Faction.GDI, 'Riflemen', 'r', 'GDI_Riflemen'),
        SniperTeam: new OffUnitType(83), //, Faction.GDI, 'SniperTeam', 's', 'GDI_Sniper_Team'),
        ZoneTrooper: new OffUnitType(84), //, Faction.GDI, 'ZoneTrooper', 'z', 'GDI_Zone_Trooper'),

        // Tank
        APCGuardian: new OffUnitType(88), //, Faction.GDI, 'Guardian', 'g', 'GDI_APC_Guardian'),
        Juggernaut: new OffUnitType(90), //, Faction.GDI, 'Juggernaut', 'j', 'GDI_Juggernaut'),
        Mammoth: new OffUnitType(89), //, Faction.GDI, 'Mammoth', 'm', 'GDI_Mammoth'),
        Pitbull: new OffUnitType(86), //, Faction.GDI, 'Pitbull', 'p', 'GDI_Pitbull'),
        Predator: new OffUnitType(87), //, Faction.GDI, 'Predator', 'd', 'GDI_Predator'),

        // Air
        Firehawk: new OffUnitType(94), //, Faction.GDI, 'Firehawk', 'f', 'GDI_Firehawk'),
        Kodiak: new OffUnitType(93), //, Faction.GDI, 'Kodiak', 'k', 'GDI_Kodiak'),
        Orca: new OffUnitType(91), //, Faction.GDI, 'Orca', 'o', 'GDI_Orca'),
        Paladin: new OffUnitType(92), //, Faction.GDI, 'Paladin', 'a', 'GDI_Paladin')
    };

    static NOD = {
        // Inf
        Militants: new OffUnitType(133), //, Faction.NOD, 'Militants', 'm', 'NOD_Militants'),
        MilitantRocketSoldiers: new OffUnitType(134), //, Faction.NOD, 'Militant Rocket Squad', 'q', 'NOD_Militant_Rocket_Soldiers'),
        Confessor: new OffUnitType(135), //, Faction.NOD, 'Confessor', 's', 'NOD_Confessor'),
        BlackHand: new OffUnitType(136), //, Faction.NOD, 'Black Hand', 'z', 'NOD_Black_Hand'),
        Commando: new OffUnitType(137), //, Faction.NOD, 'Commando', 'c', 'NOD_Commando'),

        // Tank
        AttackBike: new OffUnitType(138), //, Faction.NOD, 'Attack Bike', 'b', 'NOD_Attack_Bike'),
        ScorpionTank: new OffUnitType(139), //, Faction.NOD, 'Scorpion', 'o', 'NOD_Scorpion_Tank'),
        Reckoner: new OffUnitType(140), //, Faction.NOD, 'Reckoner', 'k', 'NOD_Reckoner'),
        Avatar: new OffUnitType(141), //, Faction.NOD, 'Avatar', 'a', 'NOD_Avatar'),
        SpecterArtilery: new OffUnitType(142), //, Faction.NOD, 'Specter', 'p', 'NOD_Specter_Artilery'),

        // Air
        Venom: new OffUnitType(143), //, Faction.NOD, 'Venom', 'v', 'NOD_Venom'),
        Cobra: new OffUnitType(144), //, Faction.NOD, 'Cobra', 'r', 'NOD_Cobra'),
        Salamander: new OffUnitType(145), //, Faction.NOD, 'Salamander', 'l', 'NOD_Salamander'),
        Vertigo: new OffUnitType(146), //, Faction.NOD, 'Vertigo', 't', 'NOD_Vertigo')
    };

    static Forgotten = {
        RocketFist: new OffUnitType(236), //, Faction.Forgotten, 'Rocket Fist', 'r', 'FOR_OFF_Inf_VS_Veh'),
        Forgotten: new OffUnitType(237), //, Faction.Forgotten, 'Forgotten', 'f', 'FOR_OFF_Inf_VS_Inf'),
        MissileSquad: new OffUnitType(238), //, Faction.Forgotten, 'Missile Squad', 'q', 'FOR_OFF_Inf_VS_Air'),
        SniperTeam: new OffUnitType(239), //, Faction.Forgotten, 'Sniper Team', 's', 'FOR_OFF_Sniper'),
        Commando: new OffUnitType(249), //, Faction.Forgotten, 'Commando', 'c', 'FOR_OFF_Commando'),

        Scooper: new OffUnitType(240), //, Faction.Forgotten, 'Scooper', 'p', 'FOR_OFF_Veh_VS_Veh'),
        Bowler: new OffUnitType(241), //, Faction.Forgotten, 'Bowler', 'b', 'FOR_OFF_Veh_VS_Inf'),
        ScrapBus: new OffUnitType(242), //, Faction.Forgotten, 'Scrap Bus', 'a', 'FOR_OFF_Veh_VS_Air'),
        Mammoth: new OffUnitType(243), //, Faction.Forgotten, 'Mammoth', 'm', 'FOR_OFF_Mammoth'),
        Thumper: new OffUnitType(248), //, Faction.Forgotten, 'Thumper', 't', 'FOR_OFF_Juggernaut'),

        Wasp: new OffUnitType(244), //, Faction.Forgotten, 'Wasp', 'w', 'FOR_OFF_Orca'),
        Locust: new OffUnitType(245), //, Faction.Forgotten, 'Locust', 'l', 'FOR_OFF_Paladin'),
        Smoker: new OffUnitType(246), //, Faction.Forgotten, 'Smoker', 'k', 'FOR_OFF_Firehawk'),
        Dreadnought: new OffUnitType(250), //, Faction.Forgotten, 'Dreadnought', 'd', 'FOR_OFF_Kodiak')
    };

    static MAP: { [key: string]: { [key: string]: OffUnitType } } = {};
    static ID_MAP: { [key: number]: OffUnitType } = {};

    static make(faction: Faction, char: string) {
        const factionMap = OffUnitType.MAP[faction.code];
        if (factionMap == null) {
            return null;
        }
        const unitChar = char.toLowerCase();
        const unit = factionMap[unitChar];
        if (unit == null) {
            return null;
        }

        return unit;
    }
}
