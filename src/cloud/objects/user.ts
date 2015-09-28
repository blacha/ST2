import {ParseObject, ParseErrorCode} from './parse.object';

class UserObject extends ParseObject {
    schema = {
        PLAYER: 'player'
    };

    constructor() {
        super('User');
    }

    getSchema() {
        return this.schema;
    }
}

export var User = new UserObject();