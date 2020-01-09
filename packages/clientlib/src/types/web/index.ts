import { ClientLibClass } from '../clientlib/util';

export interface WebFrontEndRegionMenu {
    showMenu: Function;
}

export interface WebFrontEndStatic {
    gui: {
        region: {
            RegionCityMenu: ClientLibClass<WebFrontEndRegionMenu>;
        };
    };
}
