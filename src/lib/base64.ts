// declare module 'base-decoder';

// import * as BaseDecoder from 'base-decoder';

// const encoder = new BaseDecoder();
// export class Base64 {
//     static encode(buf: ArrayBuffer): string {
//         // base58.
//         return base58buf
//             .toString('base64')
//             .replace(/\+/g, '-') // Convert '+' to '-'
//             .replace(/\//g, '_') // Convert '/' to '_'
//             .replace(/=+$/, ''); // Remove ending '='
//     }
//     static decode(base64: string): ArrayBuffer {
//         // Add removed at end '='
//         base64 += Array(5 - (base64.length % 4)).join('=');

//         base64 = base64
//             .replace(/\-/g, '+') // Convert '-' to '+'
//             .replace(/\_/g, '/'); // Convert '_' to '/'

//         return Buffer.from(base64, 'base64');
//     }
// }
