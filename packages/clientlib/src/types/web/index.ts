export interface WebFrontEndRegionMenu {
    showMenu: Function;
}

export interface WebFrontEndStatic {
    gui: {
        region: {
            RegionCityMenu: { prototype: WebFrontEndRegionMenu };
        };
    };
}
