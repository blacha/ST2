import {ParseObject} from './parse.object';
import {ParseBaseObject} from "./parse.object";
import {ParseJSONWorldObject} from "../../lib/objects/world";

export interface ParseWorldObject extends ParseBaseObject {
    attrs: ParseJSONWorldObject;
}

export class WorldObject extends ParseObject {
    schema = {
        WORLD: 'world',
        NAME: 'name'
    };

    constructor() {
        super('World');
    }

    update() {

    }

    getSchema() {
        return this.schema;
    }
}

export var World = new WorldObject();