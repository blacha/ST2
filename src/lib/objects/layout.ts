
import {ParseJSONBaseObject} from "./base.object";
import {CityLayout} from "../../api/city.layout";
import {Base} from "../base";

export interface ParseJSONLayoutObject extends ParseJSONBaseObject, CityLayout {

    $base?:Base;
}