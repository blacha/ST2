import {Faction} from '../data/faction';
import {GameDataObject} from '../data/gamedataobject';
import {Tile} from '../base/tile';
import {Constants} from '../constants';
import {UnitType} from './unittype';
import * as Util from '../util';

export class OUnitType extends UnitType {

    canBuildOn(x:Number, y:Number, tile:Tile):boolean {
        if (y >= Constants.MAX_OFF_Y) {
            return false;
        }
        return super.canBuildOn(x, y, tile);
    }

    toString() {
        return '<OUnit:' + super.getName() + '>'
    }

    static GDI = {
        // Inf
        Commando: new OUnitType(85), //, Faction.GDI, 'Commando', 'c', 'GDI_Commando'),
        MissileSquad: new OUnitType(82), //, Faction.GDI, 'MissileSquad', 'q', 'GDI_Missile_Squad'),
        Riflemen: new OUnitType(81), //, Faction.GDI, 'Riflemen', 'r', 'GDI_Riflemen'),
        SniperTeam: new OUnitType(83), //, Faction.GDI, 'SniperTeam', 's', 'GDI_Sniper_Team'),
        ZoneTrooper: new OUnitType(84), //, Faction.GDI, 'ZoneTrooper', 'z', 'GDI_Zone_Trooper'),

        // Tank
        APCGuardian: new OUnitType(88), //, Faction.GDI, 'Guardian', 'g', 'GDI_APC_Guardian'),
        Juggernaut: new OUnitType(90), //, Faction.GDI, 'Juggernaut', 'j', 'GDI_Juggernaut'),
        Mammoth: new OUnitType(89), //, Faction.GDI, 'Mammoth', 'm', 'GDI_Mammoth'),
        Pitbull: new OUnitType(86), //, Faction.GDI, 'Pitbull', 'p', 'GDI_Pitbull'),
        Predator: new OUnitType(87), //, Faction.GDI, 'Predator', 'd', 'GDI_Predator'),

        // Air
        Firehawk: new OUnitType(94), //, Faction.GDI, 'Firehawk', 'f', 'GDI_Firehawk'),
        Kodiak: new OUnitType(93), //, Faction.GDI, 'Kodiak', 'k', 'GDI_Kodiak'),
        Orca: new OUnitType(91), //, Faction.GDI, 'Orca', 'o', 'GDI_Orca'),
        Paladin: new OUnitType(92), //, Faction.GDI, 'Paladin', 'a', 'GDI_Paladin')
    };

    static NOD = {
        // Inf
        Militants: new OUnitType(133), //, Faction.NOD, 'Militants', 'm', 'NOD_Militants'),
        MilitantRocketSoldiers: new OUnitType(134), //, Faction.NOD, 'Militant Rocket Squad', 'q', 'NOD_Militant_Rocket_Soldiers'),
        Confessor: new OUnitType(135), //, Faction.NOD, 'Confessor', 's', 'NOD_Confessor'),
        BlackHand: new OUnitType(136), //, Faction.NOD, 'Black Hand', 'z', 'NOD_Black_Hand'),
        Commando: new OUnitType(137), //, Faction.NOD, 'Commando', 'c', 'NOD_Commando'),

        // Tank
        AttackBike: new OUnitType(138), //, Faction.NOD, 'Attack Bike', 'b', 'NOD_Attack_Bike'),
        ScorpionTank: new OUnitType(139), //, Faction.NOD, 'Scorpion', 'o', 'NOD_Scorpion_Tank'),
        Reckoner: new OUnitType(140), //, Faction.NOD, 'Reckoner', 'k', 'NOD_Reckoner'),
        Avatar: new OUnitType(141), //, Faction.NOD, 'Avatar', 'a', 'NOD_Avatar'),
        SpecterArtilery: new OUnitType(142), //, Faction.NOD, 'Specter', 'p', 'NOD_Specter_Artilery'),

        // Air
        Venom: new OUnitType(143), //, Faction.NOD, 'Venom', 'v', 'NOD_Venom'),
        Cobra: new OUnitType(144), //, Faction.NOD, 'Cobra', 'r', 'NOD_Cobra'),
        Salamander: new OUnitType(145), //, Faction.NOD, 'Salamander', 'l', 'NOD_Salamander'),
        Vertigo: new OUnitType(146), //, Faction.NOD, 'Vertigo', 't', 'NOD_Vertigo')
    };

    static Forgotten = {
        RocketFist: new OUnitType(236), //, Faction.Forgotten, 'Rocket Fist', 'r', 'FOR_OFF_Inf_VS_Veh'),
        Forgotten: new OUnitType(237), //, Faction.Forgotten, 'Forgotten', 'f', 'FOR_OFF_Inf_VS_Inf'),
        MissileSquad: new OUnitType(238), //, Faction.Forgotten, 'Missile Squad', 'q', 'FOR_OFF_Inf_VS_Air'),
        SniperTeam: new OUnitType(239), //, Faction.Forgotten, 'Sniper Team', 's', 'FOR_OFF_Sniper'),
        Commando: new OUnitType(249), //, Faction.Forgotten, 'Commando', 'c', 'FOR_OFF_Commando'),

        Scooper: new OUnitType(240), //, Faction.Forgotten, 'Scooper', 'p', 'FOR_OFF_Veh_VS_Veh'),
        Bowler: new OUnitType(241), //, Faction.Forgotten, 'Bowler', 'b', 'FOR_OFF_Veh_VS_Inf'),
        ScrapBus: new OUnitType(242), //, Faction.Forgotten, 'Scrap Bus', 'a', 'FOR_OFF_Veh_VS_Air'),
        Mammoth: new OUnitType(243), //, Faction.Forgotten, 'Mammoth', 'm', 'FOR_OFF_Mammoth'),
        Thumper: new OUnitType(248), //, Faction.Forgotten, 'Thumper', 't', 'FOR_OFF_Juggernaut'),

        Wasp: new OUnitType(244), //, Faction.Forgotten, 'Wasp', 'w', 'FOR_OFF_Orca'),
        Locust: new OUnitType(245), //, Faction.Forgotten, 'Locust', 'l', 'FOR_OFF_Paladin'),
        Smoker: new OUnitType(246), //, Faction.Forgotten, 'Smoker', 'k', 'FOR_OFF_Firehawk'),
        Dreadnought: new OUnitType(250), //, Faction.Forgotten, 'Dreadnought', 'd', 'FOR_OFF_Kodiak')
    };


    static MAP:{[key:string] : { [key:number]: OUnitType} } = {};
    static ID_MAP:{[key:number] : OUnitType} = {};

    static make(faction:Faction, char:string) {
        char = (char || '').toLowerCase();
        var u = OUnitType.MAP[faction.code][char];
        if (u) {
            return u;
        }

        return null;
    }
}

