import React = require('react');
import { RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { ViewBaseMain } from '../base/base.main';
import { FireStoreBases, FireStoreLayouts } from '../firebase';
import { BasePacker } from '../../lib/base.packer';
import { DbLayout } from '../../backend/db/db.base';
import { ComponentLoading } from '../base/base';

const ScanCss = {
    ScanList: style({
        display: 'flex',
        flexWrap: 'wrap',
    }),
    BaseCard: style({
        padding: '4px',
    }),
};

interface ScanState {
    bases: Base[];
    state: ComponentLoading;
}
type ViewScanProps = RouteComponentProps<{ worldId: string; scanId: string }>;

export class ViewScan extends React.Component<ViewScanProps, ScanState> {
    componentDidMount() {
        const params = this.props.match.params;
        const worldId = Number(params.worldId);
        this.loadScan(worldId, params.scanId);
    }

    async loadScan(worldId: number, scanId: string) {
        const scanDocId = BasePacker.scan.pack(worldId, scanId);
        console.log('LoadLayouts', worldId, scanId, scanDocId);

        const result = await FireStoreLayouts.doc(scanDocId).get();
        if (!result.exists) {
            this.setState({ bases: [], state: ComponentLoading.Failed });
        }
        const layoutData = result.data() as DbLayout;

        console.log(layoutData);
        const bases: Base[] = [];
        const layouts = Object.keys(layoutData.layouts ?? {});
        for (const key of layouts) {
            const xy = BasePacker.xy.unpack(BasePacker.number.unpack(key));
            const base = new Base();
            base.x = xy.x;
            base.y = xy.y;
            const layout = layoutData.layouts[key].layout;
            base.tiles = BasePacker.layout.unpack(layout);
            bases.push(base);
        }
        console.log('Loaded', bases.length);

        bases.sort((a: Base, b: Base) => b.stats.tiberium.score - a.stats.tiberium.score);
        this.setState({ bases });
    }

    render() {
        if (this.state?.state == ComponentLoading.Loading) {
            return <div>Loading...</div>;
        }
        if (this.state?.state == ComponentLoading.Failed) {
            return <div>Could not find scan</div>;
        }
        return (
            <div className={ScanCss.ScanList}>
                {this.state?.bases.slice(0, 50).map(base => {
                    return (
                        <div className={ScanCss.BaseCard} key={base.id}>
                            <div>
                                {base.x}:{base.y}
                            </div>
                            <div style={{ width: 24 * Base.MaxX + 'px' }}>
                                <ViewBaseMain base={base} key={base.id} size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
