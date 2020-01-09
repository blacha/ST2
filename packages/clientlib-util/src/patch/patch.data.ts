import { NpcCampType, ClientLibCityUnit, ClientLibMap, ClientLibStatic } from '@cncta/clientlib';
import { ClientLibPatch } from './client.patcher';

declare const ClientLib: ClientLibStatic;

export interface PatchedIdLevel {
    $Id: number;
    $Level: number;
}
export interface PatchedWorldObjectNPCCamp extends PatchedIdLevel {
    $CampType: NpcCampType;
}
export interface PatchedCityUnits {
    $DefenseUnits: ClientLibMap<ClientLibCityUnit>;
    $OffenseUnits: ClientLibMap<ClientLibCityUnit>;
}
export interface PatchedWorldObjectCity {
    $PlayerId: number;
    $AllianceId: number;
    $Id: number;
}

export const PatchCityUnits = new ClientLibPatch<PatchedCityUnits>(() => ClientLib.Data.CityUnits);
PatchCityUnits.addGetter('$OffenseUnits', 'HasUnitMdbId', /for \(var b in \{d:this\.([A-Z]{6})/);
PatchCityUnits.addGetter('$DefenseUnits', 'HasUnitMdbId', /for \(var c in \{d:this\.([A-Z]{6})/);

export const PatchWorldObjectNPCCamp = new ClientLibPatch<PatchedWorldObjectNPCCamp>(
    () => ClientLib.Data.WorldSector.WorldObjectNPCCamp,
);
PatchWorldObjectNPCCamp.addGetter('$CampType', '$ctor', /this\.([A-Z]{6})=\(*g\>\>(22|0x16)\)/);
PatchWorldObjectNPCCamp.addGetter('$Id', '$ctor', /\&.*=-1;\}this\.([A-Z]{6})=\(/);
PatchWorldObjectNPCCamp.addGetter('$Level', '$ctor', /\.*this\.([A-Z]{6})=\(\(\(g>>4/);

export const PatchWorldObjectNPCBase = new ClientLibPatch<PatchedIdLevel>(
    () => ClientLib.Data.WorldSector.WorldObjectNPCBase,
);
PatchWorldObjectNPCBase.addGetter('$Id', '$ctor', /\&.*=-1;\}this\.([A-Z]{6})=\(/);
PatchWorldObjectNPCBase.addGetter('$Level', '$ctor', /\.*this\.([A-Z]{6})=\(\(\(g>>4/);

export const PatchWorldObjectCity = new ClientLibPatch<PatchedWorldObjectCity>(
    () => ClientLib.Data.WorldSector.WorldObjectCity,
);
PatchWorldObjectCity.addGetter('$PlayerId', '$ctor', /&0x3ff\);this.([A-Z]{6})/);
PatchWorldObjectCity.addGetter('$AllianceId', '$ctor', /.*d\+=f;this\.([A-Z]{6})=\(/);
PatchWorldObjectCity.addGetter('$Id', '$ctor', /.*d\+=f;this\.([A-Z]{6})=\(.*d\+=f.*d\+=/);

export const Patches: ClientLibPatch<any, any>[] = [
    PatchCityUnits,
    PatchWorldObjectCity,
    PatchWorldObjectNPCBase,
    PatchWorldObjectNPCCamp,
];
