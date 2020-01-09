import React = require('react');
import Divider from 'antd/es/divider';
import { Link, RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { ComponentLoading } from '../base/base';
import { ViewBaseMain } from '../base/tiles/base.main';
import { FireStoreLayouts } from '../firebase';
import { SiloTags } from '../silo/silo.tag';
import { timeSince } from '../time.util';
import { Base, SiloCounts, BaseExporter, DbLayout, NumberPacker, BaseLayoutPacker } from '@st/shared';
import { BaseX } from '@cncta/clientlib';
import { BaseLocationPacker } from '@cncta/plugin';
const ScanListCss = style({ display: 'flex', flexWrap: 'wrap' });
const BaseCardCss = style({
    padding: '4px',
    margin: '8px',
    borderRadius: '8px',
});
const BaseCardInfoCss = style({ marginTop: '4px', padding: '0 4px' });

interface ScanState {
    bases: Base[];
    state: ComponentLoading;
    silos: SiloCounts;
}
type ViewScanProps = RouteComponentProps<{ worldId: string; scanId: string }>;

function addStats(from: SiloCounts, to: SiloCounts) {
    if (from.tiberium[3] > 0) to.tiberium[3]++;
    if (from.tiberium[4] > 0) to.tiberium[4]++;
    if (from.tiberium[5] > 0) to.tiberium[5]++;
    if (from.tiberium[6] > 0) to.tiberium[6]++;

    if (from.crystal[3] > 0) to.crystal[3]++;
    if (from.crystal[4] > 0) to.crystal[4]++;
    if (from.crystal[5] > 0) to.crystal[5]++;
    if (from.crystal[6] > 0) to.crystal[6]++;

    if (from.mixed[3] > 0) to.mixed[3]++;
    if (from.mixed[4] > 0) to.mixed[4]++;
    if (from.mixed[5] > 0) to.mixed[5]++;
    if (from.mixed[6] > 0) to.mixed[6]++;
}

export class ViewScan extends React.Component<ViewScanProps, ScanState> {
    componentDidMount() {
        this.setState({ state: ComponentLoading.Loading });
        const params = this.props.match.params;
        const worldId = Number(params.worldId);
        this.loadScan(worldId, params.scanId);
    }

    async loadScan(worldId: number, scanId: string) {
        const scanDocId = NumberPacker.pack(worldId) + '.' + scanId;

        const result = await FireStoreLayouts.doc(scanDocId).get();
        if (!result.exists) {
            this.setState({ bases: [], state: ComponentLoading.Failed });
        }
        const layoutData = result.data() as DbLayout;

        const silos = {
            tiberium: { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 },
            crystal: { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 },
            mixed: { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 },
        };

        const bases: Base[] = [];
        const layouts = Object.keys(layoutData.layouts ?? {});
        for (const key of layouts) {
            const xy = BaseLocationPacker.unpack(NumberPacker.unpack(key)[0]);
            const base = new Base();
            base.x = xy.x;
            base.y = xy.y;
            const { layout, updatedAt } = layoutData.layouts[key];
            base.tiles = BaseLayoutPacker.unpack(layout);
            base.updatedAt = updatedAt;
            bases.push(base);
            addStats(base.info.stats, silos);
        }

        bases.sort((a: Base, b: Base) => {
            const statsA = a.info.stats;
            const statsB = b.info.stats;
            if (
                statsA.tiberium.score == statsB.tiberium.score ||
                (statsA.tiberium.score < 10 && statsB.tiberium.score < 10)
            ) {
                return b.info.score - a.info.score;
            }
            return statsB.tiberium.score - statsA.tiberium.score;
        });
        this.setState({ bases, silos, state: ComponentLoading.Done });
    }

    render() {
        if (this.state == null || this.state.state == ComponentLoading.Loading) {
            return <div>Loading...</div>;
        }
        if (this.state.state == ComponentLoading.Failed) {
            return <div>Could not find scan</div>;
        }
        return (
            <div className={ScanListCss}>
                {/* <div className="filter">
                    <SiloTags minSize={4} resource={'tiberium'} silos={this.state.silos} />
                    <SiloTags minSize={4} resource={'crystal'} silos={this.state.silos} />
                    <SiloTags minSize={4} resource={'mixed'} silos={this.state.silos} />
                </div> */}

                {this.state?.bases.slice(0, 50).map(base => {
                    const baseId = BaseLocationPacker.pack(base.x, base.y);

                    const timeAgo = timeSince(base.updatedAt);
                    const silos = base.info.stats;
                    return (
                        <div className={BaseCardCss} key={baseId}>
                            <Divider>
                                <Link to={`/base/${BaseExporter.toCncOpt(base)}`}>
                                    {base.x}:{base.y}
                                </Link>
                            </Divider>
                            <div style={{ width: 24 * BaseX.Max + 'px' }}>
                                <ViewBaseMain base={base} key={baseId} size={24} />
                            </div>
                            <div className={BaseCardInfoCss}>
                                <SiloTags minSize={4} resource={'tiberium'} silos={silos} />
                                <SiloTags minSize={4} resource={'crystal'} silos={silos} />
                                <SiloTags minSize={4} resource={'mixed'} silos={silos} />
                                <div style={{ float: 'right' }} title={`Last seen ${timeAgo} ago`}>
                                    {timeAgo}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
