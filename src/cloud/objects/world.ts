import {ParseObject} from './parse.object';

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