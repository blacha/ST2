import React = require('react');
import { AllianceId, BaseX, CompositeId, WorldId } from '@cncta/clientlib';
import { BaseLocationPacker } from '@cncta/util';
import { Stores } from '@st/model';
import { Base, BaseExporter, SiloCounts, WorldAllianceId } from '@st/shared';
import Divider from 'antd/es/divider';
import Spin from 'antd/es/spin';
import { Link, RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { ComponentLoading } from '../base/base';
import { ViewBaseMain } from '../base/tiles/base.main';
import { SiloTags } from '../silo/silo.tag';
import { timeSince } from '../time.util';
import { unpackLayouts } from './layout.util';
import Pagination from 'antd/es/pagination/Pagination';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
const ScanListCss = style({ display: 'flex', flexWrap: 'wrap' });
const BaseCardCss = style({
    padding: '4px',
    margin: '8px',
    borderRadius: '8px',
});
const BaseCardInfoCss = style({ marginTop: '4px', padding: '0 4px' });

interface ScanState {
    layouts: Base[];
    state: ComponentLoading;
    silos: SiloCounts;
    currentPage?: number;
}
type ViewLayoutsProps = RouteComponentProps<{ worldId: string; allianceId: string }>;

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

@observer
export class ViewLayouts extends React.Component<ViewLayoutsProps, ScanState> {
    @observable currentPage = 1;

    pageSize = 18;
    componentDidMount() {
        console.log('Mounted');
        this.setState({ state: ComponentLoading.Loading });
        const params = this.props.match.params;
        const worldId = Number(params.worldId);
        const allianceId = Number(params.allianceId);
        this.loadScan(worldId as WorldId, allianceId as AllianceId);
    }

    async loadScan(worldId: WorldId, allianceId: AllianceId) {
        const docId = WorldAllianceId.pack({ worldId, allianceId }) as CompositeId<[WorldId, AllianceId]>;

        const layoutData = await Stores.Layout.get(docId);
        if (layoutData == null) {
            this.setState({ state: ComponentLoading.Failed });
            return;
        }

        const layouts = unpackLayouts(layoutData);

        const silos = {
            tiberium: { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 },
            crystal: { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 },
            mixed: { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 },
        };
        layouts.forEach(c => addStats(c.info.stats, silos));

        this.setState({ layouts, silos, state: ComponentLoading.Done });
    }

    @computed get visibleLayouts(): Base[] {
        const layouts = this.state.layouts;
        if (layouts == null || layouts.length == 0) {
            return [];
        }

        return layouts;
    }

    @computed get layouts(): Base[] {
        const minItem = (this.currentPage - 1) * this.pageSize;
        const maxItem = this.currentPage * this.pageSize;
        return this.visibleLayouts.slice(minItem, maxItem);
    }

    @action.bound
    handlePageChange(currentPage: number) {
        this.currentPage = currentPage;
    }

    render() {
        if (this.state == null || this.state?.state == ComponentLoading.Loading) {
            return <Spin />;
        }
        if (this.state.state == ComponentLoading.Failed || this.state.layouts.length == 0) {
            return <div>Could not find scan</div>;
        }
        const layoutCount = this.visibleLayouts.length;
        const layouts = this.layouts;
        const currentPage = this.currentPage ?? 1;

        return (
            <React.Fragment>
                <div className="filter">
                    <SiloTags minSize={4} resource={'tiberium'} silos={this.state.silos} />
                    <SiloTags minSize={4} resource={'crystal'} silos={this.state.silos} />
                    <SiloTags minSize={4} resource={'mixed'} silos={this.state.silos} />
                </div>
                <Divider>Layouts</Divider>
                <Pagination
                    current={currentPage}
                    total={layoutCount - 1}
                    pageSize={this.pageSize}
                    onChange={this.handlePageChange}
                />
                <div className={ScanListCss}>
                    {layouts.map(base => {
                        const baseId = BaseLocationPacker.pack(base.x, base.y);
                        return <LayoutView base={base} key={baseId} />;
                    })}
                </div>

                <Pagination
                    current={currentPage}
                    total={layoutCount - 1}
                    pageSize={this.pageSize}
                    onChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export class LayoutView extends React.Component<{ base: Base }> {
    render() {
        const base = this.props.base;
        const baseId = BaseLocationPacker.pack(base.x, base.y);
        const timeAgo = timeSince(base.updatedAt);
        const silos = base.info.stats;

        return (
            <div className={BaseCardCss} style={{ width: 24 * BaseX.Max + 'px' }} key={baseId}>
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
    }
}
