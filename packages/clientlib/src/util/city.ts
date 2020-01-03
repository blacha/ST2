import { ClientLibPatch, PatchedId, PatchedWorldObjectCity, Patches } from '../patch';
import { ClientLibStatic } from '../types/clientlib';
import { ClientLibCity } from '../types/clientlib/main.data/cities';
import { ClientLibWorldObject } from '../types/clientlib/main.data/world';
import { ClientLibIter } from './iter';
import { LocationIter } from './location';
import { BaseLocationPacker } from './pack';

declare const ClientLib: ClientLibStatic;

export interface NearByObject {
    id: number;

    object: ClientLibWorldObject & PatchedId;

    // Encoded x/y
    location: number;

    /** The city that is closest to it */
    ownCityId: number;

    /** Distance to the scanning city */
    distance: number;
}

/**
 * Useful utility functions when working with cities
 */
export class CityUtil {
    /**
     * Select a object on the client side from a X/Y Position
     */
    static select(x: number, y: number): void {
        ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(x, y);

        const md = ClientLib.Data.MainData.GetInstance();

        const world = md.get_World();
        const obj = world.GetObjectFromPosition(x, y);
        if (obj == null) {
            return;
        }

        if (ClientLibPatch.hasPatchedId(obj)) {
            md.get_Cities().set_CurrentCityId(obj.$Id);
        }
    }

    /**
     * Get the biggest offense city
     */
    static getMainCity(): ClientLibCity {
        let mainCity: ClientLibCity | null = null;
        const allCities = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .get_AllCities();
        for (const selectedBase of Object.values(allCities.d)) {
            if (mainCity == null || mainCity.get_LvlOffense() < selectedBase.get_LvlOffense()) {
                mainCity = selectedBase;
            }
        }

        return mainCity as ClientLibCity;
    }
    /**
     * Get a list of all known allied cities
     *
     * @remarks
     * This may not be all allied cities, especially if the alliance is spread out
     */
    static getAlliedCities(): PatchedWorldObjectCity[] {
        const md = ClientLib.Data.MainData.GetInstance();
        const allianceId = md.get_Alliance().get_Id();

        const cities: PatchedWorldObjectCity[] = [];
        for (const city of ClientLibIter.values(md.get_World().GetCities())) {
            if (!Patches.WorldObjectCity.isPatched(city)) {
                continue;
            }
            if (city.$AllianceId == allianceId) {
                cities.push(city);
            }
        }
        // Make similar playerIds near each other
        cities.sort((a, b) => a.$PlayerId - b.$PlayerId);

        const allianceData = md.get_Alliance().get_MemberData();
        let baseCount = 0;
        for (const allianceMember of ClientLibIter.values(allianceData)) {
            baseCount += allianceMember.Bases;
        }

        if (baseCount > cities.length) {
            // TODO warn that cities are missing
        }
        return cities;
    }

    /** Iterate through all objects near by any of the player's city */
    static getNearByObjects(): NearByObject[] {
        const allCities = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .get_AllCities();

        const output = new Map<number, NearByObject>();

        for (const selectedBase of Object.values(allCities.d)) {
            const objects = CityUtil.getObjectsNearCity(selectedBase);
            for (const object of objects.values()) {
                output.set(object.location, object);
            }
        }
        return Array.from(output.values());
    }

    /**
     * Get near by objects from a city
     *
     * @param city to start scanning from
     */
    static getObjectsNearCity(city: ClientLibCity): Map<number, NearByObject> {
        const cityX = city.get_PosX();
        const cityY = city.get_PosY();

        const maxAttack =
            ClientLib.Data.MainData.GetInstance()
                .get_Server()
                .get_MaxAttackDistance() - 0.5;
        const world = ClientLib.Data.MainData.GetInstance().get_World();
        const output = new Map<number, NearByObject>();

        for (const point of LocationIter.xyDistance(cityX, cityY, maxAttack)) {
            const object = world.GetObjectFromPosition(point.x, point.y);
            if (object == null) {
                continue;
            }

            if (!ClientLibPatch.hasPatchedId(object)) {
                continue;
            }

            const location = BaseLocationPacker.pack(point);
            output.set(location, {
                id: object.$Id,
                object,
                location,
                ownCityId: city.get_Id(),
                distance: point.distance,
            });
        }

        return output;
    }

    /** Wait for a city to load */
    static async waitForCity(cityId: number, maxFailCount = 10): Promise<ClientLibCity | null> {
        for (let i = 0; i < maxFailCount; i++) {
            const city = CityUtil.isReady(cityId);
            if (city == null) {
                await new Promise(resolve => setTimeout(resolve, 100 * i));
                continue;
            }
            return city;
        }
        return null;
    }

    /** has the city data for this city been loaded */
    static isReady(cityId: number): ClientLibCity | null {
        const city = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .GetCity(cityId);

        if (city == null) {
            return null;
        }

        // Dead ignore
        if (city.get_IsGhostMode()) {
            return null;
        }

        // Base has not loaded yet
        if (city.GetBuildingsConditionInPercent() === 0) {
            return null;
        }

        return city;
    }
}
