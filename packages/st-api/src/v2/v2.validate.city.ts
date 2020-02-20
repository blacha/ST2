import * as t from 'io-ts';
import { StCity } from '@cncta/util/build/city';

function isCityScan(input: unknown): input is StCity {
    return input != null && typeof input == 'object';
}
function parseInput(input: unknown, context: t.Context): t.Validation<StCity> {
    return isCityScan(input) ? t.success(input) : t.failure(input, context);
}
export const StCityValidate = new t.Type<StCity, unknown, unknown>('StCity', isCityScan, parseInput, t.identity);
