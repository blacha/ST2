import React = require('react');
import { AllianceId, AllianceName, BaseX, WorldId } from '@cncta/clientlib';
import { BaseLocationPacker, getWorldName, LayoutPacker } from '@cncta/util';
import { V2Sdk } from '@st/api';
import { Base, BaseExporter, BaseOptimizer, SiloCounts, StLog, BaseLayoutPacker } from '@st/shared';
import Divider from 'antd/es/divider';
import Pagination from 'antd/es/pagination/Pagination';
import Spin from 'antd/es/spin';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Cs } from '../base/base';
import { ViewBaseMain } from '../base/tiles/base.main';
import { SiloTags } from '../silo/silo.tag';
import { timeSince } from '../time.util';
import { StBreadCrumb } from '../util/breacrumb';
import { LayoutFilter } from './layout.filter';
import { FilterLayoutView } from './layout.filter.layout';
import { FilterResourceView } from './layout.filter.resource';
import { FilterTimeView } from './layout.filter.time';
import { unpackLayouts, LayoutData } from './layout.util';
import Button from 'antd/es/button';

const ScanListCss = style({ display: 'flex', flexWrap: 'wrap' });
const BaseCardCss = style({ padding: 4, margin: 8, borderRadius: 8 });
const BaseCardInfoCss = style({ marginTop: 4, padding: '0 4px' });

interface ScanState {
    layouts: Base[];
    state: Cs;
    silos: SiloCounts;
    currentPage?: number;
}
type ViewLayoutsProps = RouteComponentProps<{ worldId: string; allianceId: string }>;

@observer
export class ViewLayouts extends React.Component<ViewLayoutsProps, ScanState> {
    static RefreshButtonContainerCss = style({ display: 'flex', flexDirection: 'column', width: '100%' });
    static RefreshButtonCss = style({ alignSelf: 'flex-end' });
    static FilterLayoutCss = style({ display: 'flex' });
    static FilterLayoutContainerCss = style({ display: 'flex', width: '50%', flexDirection: 'column' });

    static FilterDisabledCss = style({ opacity: 0.4 });
    static FilterButtonCss = style({ cursor: 'pointer', marginRight: 8, $nest: { span: { cursor: 'pointer' } } });
    static FilterListCss = style({ display: 'flex' });
    static FilterCss = style({ display: 'flex', padding: 4 });
    static FilterTitleCss = style({ width: 95, fontWeight: 'bold' });

    @observable currentPage = 1;
    worldId: WorldId;
    filters = new LayoutFilter();

    pageSize = 18;
    alliance?: { id: AllianceId; name: AllianceName };
    componentDidMount() {
        this.setState({ state: Cs.Loading });
        const params = this.props.match.params;
        const worldId = Number(params.worldId);
        const allianceId = Number(params.allianceId);
        this.loadScan(worldId as WorldId, allianceId as AllianceId);
    }

    async refresh() {
        this.setState({ ...this.state, state: Cs.Refreshing });

        const worldId = this.worldId;
        const allianceId = this.alliance?.id;
        if (worldId == null || allianceId == null) {
            this.setState({ state: Cs.Failed });
            return;
        }
        const layoutData = await V2Sdk.call('layout.get', { worldId, allianceId });
        if (layoutData.ok == false) {
            this.setState({ state: Cs.Failed });
            return;
        }
        this.updateLayouts(layoutData.response.layouts, worldId);
    }

    async loadScan(worldId: WorldId, allianceId: AllianceId) {
        this.worldId = worldId;

        const [layoutData, allianceData] = await Promise.all([
            V2Sdk.call('layout.get', { worldId, allianceId }),
            V2Sdk.call('alliance.get', { worldId, allianceId }),
        ]);
        if (layoutData.ok == false || allianceData.ok == false) {
            this.setState({ state: Cs.Failed });
            return;
        }
        const firstPlayer = allianceData.response.players[0];
        if (firstPlayer && firstPlayer.alliance) {
            this.alliance = { id: allianceId, name: firstPlayer.alliance };
        }
        this.updateLayouts(layoutData.response.layouts, worldId);
    }

    updateLayouts(layoutData: LayoutData[], worldId: WorldId) {
        StLog.info('UnpackLayouts');
        const layouts = unpackLayouts(layoutData, worldId);
        StLog.info('ComputeLayouts');
        console.time('ComputeLayout');
        for (const layout of layouts) {
            BaseOptimizer.buildSilos(layout);
            // Calculate accumulator data
            layout.info.computePower();
        }
        console.timeEnd('ComputeLayout');

        this.filters.setLayouts(layouts);
        this.setState({ layouts, state: Cs.Done });
    }

    @computed get layouts(): Base[] {
        const minItem = (this.currentPage - 1) * this.pageSize;
        const maxItem = this.currentPage * this.pageSize;
        return this.filters.filtered.slice(minItem, maxItem);
    }

    @action.bound
    handlePageChange(currentPage: number) {
        this.currentPage = currentPage;
    }

    render() {
        if (this.state == null || this.state?.state == Cs.Loading) {
            return <Spin />;
        }
        if (this.state.state == Cs.Failed || this.state.layouts.length == 0) {
            return <div>Could not find scan</div>;
        }
        const layoutCount = this.filters.filtered.length;
        const layouts = this.layouts;
        const currentPage = this.currentPage ?? 1;
        console.log(currentPage, currentPage * this.pageSize, layoutCount);
        if ((currentPage - 1) * this.pageSize > layoutCount) {
            setTimeout(() => {
                this.currentPage = 1;
            });
        }
        return (
            <div style={{ width: '100%' }}>
                <StBreadCrumb worldId={this.worldId} alliance={this.alliance} layout={true} />
                <Divider>{getWorldName(this.worldId as WorldId)} - Layouts</Divider>
                <div className={ViewLayouts.FilterLayoutCss}>
                    <div className={ViewLayouts.FilterLayoutContainerCss}>
                        <FilterResourceView resource={'Tiberium'} filter={this.filters} />
                        <FilterResourceView resource={'Crystal'} filter={this.filters} />
                        <FilterResourceView resource={'Mixed'} filter={this.filters} />
                        <FilterResourceView resource={'Power'} filter={this.filters} />
                        <FilterTimeView filter={this.filters} />
                        <FilterLayoutView filter={this.filters} />
                    </div>
                    <div className={ViewLayouts.RefreshButtonContainerCss}>
                        <Button
                            className={ViewLayouts.RefreshButtonCss}
                            type="primary"
                            loading={this.state.state == Cs.Refreshing}
                            onClick={() => this.refresh()}
                        >
                            Refresh
                        </Button>
                    </div>
                </div>

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
            </div>
        );
    }
}

export class LayoutView extends React.Component<{ base: Base }> {
    render() {
        const base = this.props.base;
        const baseId = BaseLocationPacker.pack(base.x, base.y);
        const timeAgo = timeSince(base.updatedAt);
        const silos = base.info.silos;

        return (
            <div className={BaseCardCss} style={{ width: 24 * BaseX.Max + 'px' }} key={baseId}>
                <Divider>
                    <Link
                        to={`/b?layout=${BaseLayoutPacker.pack(base)}&x=${base.x}&y=${base.y}&worldId=${base.worldId}`}
                    >
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
