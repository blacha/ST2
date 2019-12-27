import React = require('react');
import BreadCrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';

export interface IdName {
    id: number | string;
    name: string;
}
export interface BreadCrumbProps {
    worldId: number;
    alliance?: IdName;
    player?: IdName;
    base?: IdName;
}

const BreadCrumbCss = style({ marginTop: '8px', marginBottom: '8px' });

export class StBreadCrumb extends React.Component<BreadCrumbProps> {
    viewAlliance() {
        const { alliance, worldId } = this.props;

        if (alliance == null) {
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
        const { base, worldId } = this.props;
        if (base == null) {
            return null;
        }
        return (
            <BreadCrumb.Item>
                <Link to={`/world/${worldId}/base/${base.id}`}>{base.name}</Link>
            </BreadCrumb.Item>
        );
    }

    render() {
        if (this.props.worldId == -1) {
            return null;
        }
        return (
            <div className={BreadCrumbCss}>
                <BreadCrumb>
                    <BreadCrumb.Item>
                        <Link to={`/world/${this.props.worldId}`}>World {this.props.worldId}</Link>
                    </BreadCrumb.Item>
                    {this.viewAlliance()}
                    {this.viewPlayer()}
                    {this.viewPlayerBase()}
                </BreadCrumb>
            </div>
        );
    }
}
