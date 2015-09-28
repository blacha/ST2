import {ParseObject} from './parse.object';

export class WorldObject extends ParseObject {
    schema = {
        WORLD: 'world'
    };

    constructor() {
        super('World');
    }

    getSchema() {
        return this.schema;
    }
}

export var World = new WorldObject();