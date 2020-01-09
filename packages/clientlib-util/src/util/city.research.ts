import {
    ClientLibCity,
    GameDataResearchLevel,
    GameDataStatic,
    GameDataUnitId,
    ClientLibStatic,
} from '@cncta/clientlib';

declare const GAMEDATA: GameDataStatic;
declare const ClientLib: ClientLibStatic;

export class ClientLibResearchUtil {
    static _unitModules: Map<GameDataUnitId, { id: GameDataUnitId; level: number }> = new Map();
    static get unitModules() {
        if (this._unitModules.size > 0) {
            return this._unitModules;
        }
        for (const unit of Object.values(GAMEDATA.units)) {
            for (const mod of unit.m) {
                if (mod.r.length == 0) {
                    this._unitModules.set(mod.i, { id: unit.i, level: 1 });
                } else {
                    this._unitModules.set(mod.i, { id: unit.i, level: 2 });
                }
            }
        }
        return this._unitModules;
    }

    static getPlayerResearch(): Partial<Record<GameDataUnitId, number>> {
        const research = ClientLib.Data.MainData.GetInstance()
            .get_Player()
            .get_PlayerResearch();

        const output: Partial<Record<GameDataUnitId, number>> = {};
        for (const researchType of [ClientLib.Base.ETechType.TechOffense, ClientLib.Base.ETechType.TechDefense]) {
            for (const re of research.GetResearchItemListByType(researchType).l) {
                if (re.get_CurrentLevel() == GameDataResearchLevel.NotResearched) {
                    continue;
                }
                output[re.get_GameDataUnit_Obj().i] = re.get_CurrentLevel();
            }
        }
        return output;
    }

    static getUpgrades(city: ClientLibCity): Partial<Record<GameDataUnitId, number>> {
        if (city.IsOwnBase()) {
            return ClientLibResearchUtil.getPlayerResearch();
        }

        const modules = city.get_ActiveModules();
        if (modules == null) {
            return {};
        }
        const upgrades: Partial<Record<GameDataUnitId, number>> = {};
        for (const mod of modules) {
            const unitMod = this.unitModules.get(mod);
            if (unitMod == null) {
                continue;
            }
            const { id, level } = unitMod;

            const upgrade = upgrades[id];
            if (upgrade == null || upgrade < level) {
                upgrades[id] = level;
            }
        }

        return upgrades;
    }
}
