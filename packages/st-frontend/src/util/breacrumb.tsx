import React = require('react');
import BreadCrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import Icon from 'antd/es/icon';
import { WorldNames } from '@cncta/util';

export interface IdName {
    id: number | string;
    name: string;
}
export interface BreadCrumbProps {
    worldId: number;
    alliance?: IdName;
    player?: IdName;
    base?: IdName & { cityId?: number };
    layout?: boolean;
}

const BreadCrumbCss = style({ marginTop: '8px', marginBottom: '8px', alignSelf: 'flex-start' });

export class StBreadCrumb extends React.Component<BreadCrumbProps> {
    viewAlliance() {
        const { alliance, worldId } = this.props;

        if (alliance == null || alliance.id == 0 || alliance.name == '') {
            return null;
        }
        return (
            <BreadCrumb.Item>
                <Link to={`/world/${worldId}/alliance/${alliance.id}`}>{alliance.name}</Link>
            </BreadCrumb.Item>
        );
    }

    viewPlayer() {
        const { player, worldId } = this.props;
        if (player == null) {
            return null;
        }
        return (
            <BreadCrumb.Item>
                <Link to={`/world/${worldId}/player/${player.id}`}>{player.name}</Link>
            </BreadCrumb.Item>
        );
    }

    viewPlayerBase() {
        const { base, worldId, player } = this.props;
        if (base == null) {
            return null;
        }
        if (player) {
            return (
                <BreadCrumb.Item>
                    <Link to={`/world/${worldId}/player/${player.id}/city/${base.cityId}`}>{base.name}</Link>
                </BreadCrumb.Item>
            );
        }
        return (
            <BreadCrumb.Item>
                <Link to={`/base/${base.id}`}>{base.name}</Link>
            </BreadCrumb.Item>
        );
    }

    viewLayout() {
        if (this.props.layout) {
            return <BreadCrumb.Item>Layouts</BreadCrumb.Item>;
        }
        return null;
    }
    render() {
        if (this.props.worldId == -1) {
            return null;
        }
        return (
            <div className={BreadCrumbCss}>
                <BreadCrumb>
                    <BreadCrumb.Item>
                        <Link to="/">
                            <Icon type="home" />
                        </Link>
                    </BreadCrumb.Item>
                    <BreadCrumb.Item>{WorldNames[this.props.worldId].name}</BreadCrumb.Item>
                    {this.viewAlliance()}
                    {this.viewPlayer()}
                    {this.viewPlayerBase()}
                    {this.viewLayout()}
                </BreadCrumb>
            </div>
        );
    }
}
