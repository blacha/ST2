import { PlayerAreaViewMode } from '../clientlib';

export interface QxWidget {
    name: string;
    setView: Function;
}

export interface QxPlayArea extends QxWidget {
    setView: (viewMode: PlayerAreaViewMode, cityId: number, a: unknown, b: unknown) => void;
}
export interface QxApplication {
    getMenuBar(): QxWidget | null;
    getPlayArea(): QxPlayArea | null;
}
export interface QxButton extends QxAtom {
    addListener(evt: 'execute', cb: Function): void;
    setEnabled(enabled: boolean): void;
    getChildControl(atom: string): QxAtom;
}
export interface QxComposite extends QxAtom {
    basename: 'Composite';
    add(obj: QxButton): void;
}

interface QxAtom {
    hide(): void;
    show(): void;
    exclude(): void;
    destroy(): void;
    set(obj: any): void;
}
export interface QxStatic {
    ui: {
        form: {
            Button: {
                new (name: string, icon?: string): QxButton;
            };
        };
    };
    core: {
        Init: {
            getApplication(): QxApplication | null;
        };
    };
}
