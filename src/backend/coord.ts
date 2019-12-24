export interface Point {
    x: number;
    y: number;
}
export const Coord = {
    toId(x: number, y: number): number {
        return (y << 0x10) | x;
    },
    fromId(num: number): Point {
        return { y: num >> 0x10, x: num & 0xffff };
    },
};
