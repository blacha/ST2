declare var ClientLib:any;

interface PlayerData {
    world: WorldInfoData;
    player: PlayerInfoData;
    alliance: AllianceInfoData;
}

interface WorldInfoData {
    world: number;
    name: string;
}

interface PlayerInfoData {
    id: number;
    faction: number;
    player: string;
    score:number;
    rank: number;
    sub: string;
    rp: number;
    credit: number;
    command: CommandInfoData;
    research: ResearchInfoData[];
}

interface AllianceInfoData {
    name: string;
    id: number;
    players: string[];
    bonus: {
        power: number;
        crystal: number;
        tiberium: number;
        air: number;
        def: number;
        vec: number;
        inf: number;
    }
}
interface ResearchInfoData {
    tech: number;
    level: number;
}
interface PlayerRepairInfo {
    veh: number;
    air: number;
    inf: number;
    time: number;
}
interface CommandInfoData {
    current: number;
    max: number;
}
export class PlayerInfo {
    static instance;
    static versions;

    static get(): PlayerData {
        PlayerInfo.versions = PlayerInfo.versions || {};
        PlayerInfo.instance = ClientLib.Data.MainData.GetInstance();

        return {
            world: PlayerInfo.getWorld(),
            player: PlayerInfo.getPlayerInfo(),
            alliance: PlayerInfo.getAllianceInfo()
        }
    }


    static getPlayerInfo():PlayerInfoData {
        var player = PlayerInfo.instance.get_Player();

        var sub = PlayerInfo.instance.get_PlayerSubstitution().getOutgoing();
        var subName = '';
        if (sub) {
            subName = sub.n;
        }

        return {
            id: player.get_Id(),
            faction: player.get_Faction(),
            player: player.get_Name(),
            score: player.get_ScorePoints(),
            rank: player.get_OverallRank(),
            sub: subName,
            rp: player.get_ResearchPoints(),
            credit: player.get_Credits().Base,
            command: PlayerInfo.getCommandInfo(),
            research: PlayerInfo.getResearchInfo()
        }
    }

    static getCommandInfo():CommandInfoData {
        var player = PlayerInfo.instance.get_Player();

        return {
            max: player.GetCommandPointMaxStorage(),
            current: player.GetCommandPointCount()
        }
    }

    static getAllianceInfo():AllianceInfoData {
        var alliance = PlayerInfo.instance.get_Alliance();
        if (alliance == null) {
            return null;
        }

        return {
            id: alliance.get_Id(),
            name: alliance.get_Name(),
            bonus: {
                power: alliance.get_POIPowerBonus(),
                crystal: alliance.get_POICrystalBonus(),
                tiberium: alliance.get_POITiberiumBonus(),
                air: alliance.get_POIAirBonus(),
                def: alliance.get_POIDefenseBonus(),
                vec: alliance.get_POIVehicleBonus(),
                inf: alliance.get_POIInfantryBonus()
            },
            players: alliance.get_MemberDataAsArray().map(function(member) {
                return member.Name;
            })
        };
    }

    static getResearchInfo():ResearchInfoData[] {
        var player = ClientLib.Data.MainData.GetInstance().get_Player();
        var research = player.get_PlayerResearch();

        var output = [];
        [1, 2, 5].forEach(function(type) {
            var list = research.GetResearchItemListByType(type);

            list.l.forEach(function (rt) {
                if (rt.get_CurrentLevel() < 1) {
                    return;
                }
                var unit = rt.get_GameDataUnit_Obj();
                if (unit == null) {
                    return;
                }
                var tech = rt.get_GameDataTech_Obj();

                output.push({ tech: tech.c, level: rt.get_CurrentLevel() });
            });
        });

        return output;
    }

    static getCities() {


    }

    static getCity(c) {
        var city = {
            defense : c.get_LvlDefense(),
            offense : c.get_LvlOffense(),
            level : c.get_LvlBase(),

            id : c.get_Id(),

            x : c.get_PosX(),
            y : c.get_PosY(),
            v : c.get_Version(),
            name: c.get_Name(),
            tiles: null,

            power : c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) +
            c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power),

            tiberium : c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) +
            c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium),

            crystal : c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) +
            c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal),

            credits : ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) +
            ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false),

            health : c.GetBuildingsConditionInPercent(),

            current : {
                power : c.GetResourceCount(ClientLib.Base.EResourceType.Power),
                tiberium : c.GetResourceCount(ClientLib.Base.EResourceType.Tiberium),
                crystal : c.GetResourceCount(ClientLib.Base.EResourceType.Crystal)
            },

            repair: {
                inf: c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false),
                    veh: c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false),
                    air: c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false),
                    time: c.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf)
            }
        };

        PlayerInfo.versions[city.id] = city.v;

        return city;
    }


    static getWorld():WorldInfoData {
        return {
            world:PlayerInfo.instance.get_Server().get_WorldId(),
            name: PlayerInfo.instance.get_Server().get_Name()
        }
    }


}
