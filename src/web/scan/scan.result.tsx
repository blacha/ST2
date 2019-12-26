import React = require('react');
import { RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { DbLayout } from '../../backend/db/db.base';
import { Base } from '../../lib/base/base';
import { BasePacker } from '../../lib/base/base.packer';
import { ComponentLoading } from '../base/base';
import { ViewBaseMain } from '../base/tiles/base.main';
import { FireStoreLayouts } from '../firebase';
import { SiloTags } from '../silo/silo.tag';
import Divider from 'antd/es/divider';
import { timeSince } from '../time.util';

const ScanListCss = style({
    display: 'flex',
    flexWrap: 'wrap',
});
const BaseCardCss = style({
    padding: '4px',
});

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
            const { layout, updatedAt } = layoutData.layouts[key];
            base.tiles = BasePacker.layout.unpack(layout);
            base.updatedAt = updatedAt;
            bases.push(base);
        }
        console.log('Loaded', bases.length);

        bases.sort((a: Base, b: Base) => {
            const statsA = a.info.stats;
            const statsB = b.info.stats;
            if (statsA.tiberium.score == statsB.tiberium.score) {
                return b.info.score - a.info.score;
            }
            return statsB.tiberium.score - statsA.tiberium.score;
        });
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
            <div className={ScanListCss}>
                {this.state?.bases.slice(0, 100).map(base => {
                    return (
                        <div className={BaseCardCss} key={base.id}>
                            <Divider>
                                {base.x}:{base.y}
                            </Divider>
                            <div style={{ width: 24 * Base.MaxX + 'px' }}>
                                <ViewBaseMain base={base} key={base.id} size={24} />
                            </div>
                            <div className={BaseCardCss}>
                                <SiloTags minSize={4} resource={'tiberium'} base={base} />
                                <SiloTags minSize={4} resource={'crystal'} base={base} />
                                <SiloTags minSize={4} resource={'mixed'} base={base} />
                            </div>
                            {timeSince(base.updatedAt)}
                        </div>
                    );
                })}
            </div>
        );
    }
}
