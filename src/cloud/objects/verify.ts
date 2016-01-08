import {ParseObject} from './parse.object';

export class VerifyObject extends ParseObject {
    schema = {
        WORLD: 'world',
        PLAYER: 'player',
        UUID: 'uuid',
        SENT: 'sent'
    };

    constructor() {
        super('Verify');
    }

    getSchema() {
        return this.schema;
    }
}

export var Verify = new VerifyObject();