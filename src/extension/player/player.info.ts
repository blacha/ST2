import  * as PlayerAPI from '../../api/player.info';
import {CityData} from './../city/city.data';
import {PlayerDataVersion} from "../../api/player.info";

export class PlayerInfo {
    static instance;
    static versions;

    static scan():{ data: PlayerAPI.PlayerData, changes: boolean} {
        var lastVersion = PlayerInfo.versions || {};
        PlayerInfo.versions = {};
        PlayerInfo.instance = ClientLib.Data.MainData.GetInstance();

        var playerData = {
            version: PlayerDataVersion,
            world: PlayerInfo.getWorld(),
            player: PlayerInfo.getPlayerInfo(),
            alliance: PlayerInfo.getAllianceInfo()
        };

        var hasChanges = false;
        Object.keys(PlayerInfo.versions).forEach(function (id) {
            if (PlayerInfo.versions[id] !== lastVersion[id]) {
                hasChanges = true;
            }
        });

        return {data: playerData, changes: hasChanges};
    }


    static getPlayerInfo():PlayerAPI.PlayerInfoData {
        var player = PlayerInfo.instance.get_Player();

        var sub = PlayerInfo.instance.get_PlayerSubstitution().getOutgoing();
        var subName = '';
        if (sub) {
            subName = sub.n;
        }

        return {
            player: player.get_Id(),
            faction: player.get_Faction(),
            name: player.get_Name(),
            score: player.get_ScorePoints(),
            rank: player.get_OverallRank(),
            sub: subName,
            rp: player.get_ResearchPoints(),
            mcv: PlayerInfo.getMCVInfo(),
            credit: player.get_Credits().Base,
            command: PlayerInfo.getCommandInfo(),
            research: PlayerInfo.getResearchInfo(),
            cities: PlayerInfo.getCities()
        }
    }

    static getMCVInfo():PlayerAPI.MCVInfoData {
        var player = PlayerInfo.instance.get_Player();

        var TechId = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(
            ClientLib.Base.ETechName.Research_BaseFound, player.get_Faction());
        var PlayerResearch = player.get_PlayerResearch();
        var ResearchItem = PlayerResearch.GetResearchItemFomMdbId(TechId);

        if (ResearchItem === null) {
            return;
        }
        var NextLevelInfo = ResearchItem.get_NextLevelInfo_Obj();

        var resourcesNeeded = [];
        for (var i in NextLevelInfo.rr) {
            if (NextLevelInfo.rr[i].t > 0) {
                resourcesNeeded[NextLevelInfo.rr[i].t] = NextLevelInfo.rr[i].c;
            }
        }
        var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
        var creditsResourceData = player.get_Credits();
        var creditsGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) *
            ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
        var creditsTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditsGrowthPerHour;

        var mcvTime = creditsTimeLeftInHours * 60 * 60;
        if (mcvTime === Infinity || isNaN(mcvTime)) {
            mcvTime = 0;
        }

        return {
            time: mcvTime,
            level: ResearchItem.get_CurrentLevel() + 1
        }
    }

    static getCommandInfo():PlayerAPI.CommandInfoData {
        var player = PlayerInfo.instance.get_Player();

        return {
            max: player.GetCommandPointMaxStorage(),
            current: player.GetCommandPointCount()
        }
    }

    static getAllianceInfo():PlayerAPI.AllianceInfoData {
        var alliance = PlayerInfo.instance.get_Alliance();

        return {
            alliance: alliance.get_Id() || -1,
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
            players: alliance.get_MemberDataAsArray().map(function (member) {
                return {
                    name: member.Name,
                    rank: member.Rank,
                    score: member.Points,
                    role: member.Role
                }
            })
        };
    }

    static getResearchInfo():PlayerAPI.ResearchInfoData {
        var player = ClientLib.Data.MainData.GetInstance().get_Player();
        var research = player.get_PlayerResearch();

        var output:PlayerAPI.ResearchInfoData = {};
        [1, 2, 5].forEach(function (type) {
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

                output[tech.c] = rt.get_CurrentLevel();
            });
        });

        return output;
    }

    static getCities() {
        var output = [];
        var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
        Object.keys(allCities).forEach(function (cityID) {
            var selectedBase = allCities[cityID];
            output.push(PlayerInfo.getCity(selectedBase));
        });

        return output;
    }

    static getCity(c):PlayerAPI.CityInfoData {
        var city = {
            defense: c.get_LvlDefense(),
            offense: c.get_LvlOffense(),
            level: c.get_LvlBase(),

            id: c.get_Id(),

            x: c.get_PosX(),
            y: c.get_PosY(),
            v: c.get_Version(),
            name: c.get_Name(),
            tiles: CityData.getLayout(c),

            production: {
                power: c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) +
                c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power),

                tiberium: c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) +
                c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium),

                crystal: c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) +
                c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal),

                credits: ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) +
                ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false),
            },
            health: c.GetBuildingsConditionInPercent(),

            current: {
                power: c.GetResourceCount(ClientLib.Base.EResourceType.Power),
                tiberium: c.GetResourceCount(ClientLib.Base.EResourceType.Tiberium),
                crystal: c.GetResourceCount(ClientLib.Base.EResourceType.Crystal),
                credits: 0
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


    static getWorld():PlayerAPI.WorldInfoData {
        return {
            world: PlayerInfo.instance.get_Server().get_WorldId(),
            name: PlayerInfo.instance.get_Server().get_Name().trim()
        }
    }

}
