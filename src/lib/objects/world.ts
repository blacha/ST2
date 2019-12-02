import { JsonBaseObject } from './base.object';
export interface ParseJSONWorldObject extends JsonBaseObject {
    world: number;
    name: string;
    hasBot: boolean;
}
