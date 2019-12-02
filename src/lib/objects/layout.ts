import { CityLayout } from '../../api/city.layout';
import { Base } from '../base';
import { JsonBaseObject } from './base.object';

export interface JsonLayoutObject extends JsonBaseObject, CityLayout {
    $base?: Base;
}
