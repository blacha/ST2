import { PlayerAreaViewMode } from '../clientlib';

export interface QxLayoutItem {
    getWidth(): number;
    getHeight(): number;
    setWidth(value: number): void;
    setHeight(value: number): void;
}

export interface QxWidget extends QxLayoutItem {
    name: string;
    decorator?: QxDecorator;
    set(obj: any): QxWidget;
    hide(): void;
    show(): void;
    exclude(): void;
    destroy(): void;

    setDecorator(decorator: QxDecorator): void;

    setDomLeft(value: number): void;
    setDomTop(value: number): void;
    setDomPosition(left: number, top: number): void;

    /** Capture pointer events even outside of the widget */
    capture(capture: boolean): void;
    /** Is capturing pointer events */
    isCapturing(): boolean;

    getContentElement(): QxElement;
}

export interface QxElement {
    getDomElement(): Element;
}

export interface QxLabel extends QxWidget {}

export interface QxPlayArea extends QxWidget {
    setView: (viewMode: PlayerAreaViewMode, cityId: number, a: unknown, b: unknown) => void;
}
export interface QxApplication {
    getMenuBar(): QxWidget;
    getPlayArea(): QxPlayArea;
    getBackgroundArea(): QxWidget;
    getDesktop(): QxComposite;
}

export interface QxFormButton extends QxWidget {
    addListener(evt: 'execute', cb: Function): void;
    setEnabled(enabled: boolean): void;
    getChildControl(id: string): QxWidget;
}

export interface QxMLayoutHandling {
    setLayout(layout: QxLayout): void;
    getLayout(): QxLayout;
}

export interface QxMChildrenHandling {
    remove(widget: QxLayoutItem): void;
    removeAll(): QxLayoutItem[];
    indexOf(widget: QxLayoutItem): number;
    add(widget: QxLayoutItem): void;
    addAt(widget: QxLayoutItem, index: number, opts?: any): void;
    addBefore(widget: QxLayoutItem, before: QxLayoutItem, opts?: any): void;
    addAfter(widget: QxLayoutItem, after: QxLayoutItem, opts?: any): void;
}

export interface QxComposite extends QxWidget, QxMChildrenHandling, QxMLayoutHandling {
    basename: 'Composite';
}

export interface QxDecoratorStyle {
    backgroundColor: string;
}
export interface QxMSingleBorder {
    setColor(color: string): void;
    setWidth(width: number): void;
}
export interface QxDecorator extends QxMSingleBorder {
    set(obj: Partial<QxDecoratorStyle>): void;
}

export interface QxLayout {}
export interface QxLayoutHBox extends QxLayout {
    getSpacing(): number;
}

export interface QxStatic {
    ui: {
        basic: {
            Label: {
                new (text: string): QxLabel;
            };
        };
        container: {
            Composite: {
                new (layout?: QxLayout): QxComposite;
            };
        };
        decoration: {
            Decorator: {
                new (): QxDecorator;
            };
        };
        layout: {
            HBox: {
                new (spacing?: number, alignX?: string): QxLayoutHBox;
            };
        };
        form: {
            Button: {
                new (name: string, icon?: string): QxFormButton;
            };
        };
    };
    core: {
        Init: {
            getApplication(): QxApplication;
        };
    };
}
