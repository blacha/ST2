import * as o from 'ospec';
import { Base91 } from '../base.91';

o.spec('Base91', () => {
    o('should encode base91', () => {
        o(Base91.encode(8995)).equals('=HB');
    });

    o('should round trip', () => {
        let count = 0;
        for (let i = 1e5; i < 1e6; i += Math.floor(Math.random() * 255)) {
            const encode = Base91.encode(i);
            const decode = Base91.decode(encode);
            o(i).equals(decode.value);
            count++;
        }
        console.log('Tested:Base91', count);
    });
});
