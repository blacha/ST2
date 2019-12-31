export interface ClientLibMathUtil {
    /**
     * Encodes a x,y into a single number
     *
     * `y << 0x10 + x`
     */
    EncodeCoordId(x: number, y: number): number;
}
