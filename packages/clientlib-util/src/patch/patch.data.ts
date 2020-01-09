import { NpcCampType, ClientLibCityUnit, ClientLibMap } from '@cncta/clientlib';
import { ClientLibPatch } from './client.patcher';

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

const CityUnits = new ClientLibPatch<PatchedCityUnits>('ClientLib.Data.CityUnits');
CityUnits.addGetter('$OffenseUnits', 'HasUnitMdbId', /for \(var b in \{d:this\.([A-Z]{6})/);
CityUnits.addGetter('$DefenseUnits', 'HasUnitMdbId', /for \(var c in \{d:this\.([A-Z]{6})/);

const WorldObjectNPCCamp = new ClientLibPatch<PatchedWorldObjectNPCCamp>(
    'ClientLib.Data.WorldSector.WorldObjectNPCCamp',
);
WorldObjectNPCCamp.addGetter('$CampType', '$ctor', /this\.([A-Z]{6})=\(*g\>\>(22|0x16)\)/);
WorldObjectNPCCamp.addGetter('$Id', '$ctor', /\&.*=-1;\}this\.([A-Z]{6})=\(/);
WorldObjectNPCCamp.addGetter('$Level', '$ctor', /\.*this\.([A-Z]{6})=\(\(\(g>>4/);

const WorldObjectNPCBase = new ClientLibPatch<PatchedIdLevel>('ClientLib.Data.WorldSector.WorldObjectNPCBase');
WorldObjectNPCBase.addGetter('$Id', '$ctor', /\&.*=-1;\}this\.([A-Z]{6})=\(/);
WorldObjectNPCBase.addGetter('$Level', '$ctor', /\.*this\.([A-Z]{6})=\(\(\(g>>4/);

const WorldObjectCity = new ClientLibPatch<PatchedWorldObjectCity>('ClientLib.Data.WorldSector.WorldObjectCity');
WorldObjectCity.addGetter('$PlayerId', '$ctor', /&0x3ff\);this.([A-Z]{6})/);
WorldObjectCity.addGetter('$AllianceId', '$ctor', /.*d\+=f;this\.([A-Z]{6})=\(/);
WorldObjectCity.addGetter('$Id', '$ctor', /.*d\+=f;this\.([A-Z]{6})=\(.*d\+=f.*d\+=/);

export const Patches = {
    CityUnits,
    WorldObjectNPCCamp,
    WorldObjectNPCBase,
    WorldObjectCity,
};
