import React = require('react');
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Row from 'antd/es/row';
import { style } from 'typestyle';
import { BackgroundImage } from '../css.util';
import { GameResource, GameResources, formatNumber, Base } from '@st/shared';

const BaseStatsCss = {
    ResourceGroup: style({}),
    Resource: style({ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', ...BackgroundImage(75) }),
    Title: style({ display: 'flex', alignItems: 'center', fontWeight: 'bold' }),
    StatTotal: style({ fontWeight: 'bold' }),
};

export class ViewBaseResourcesHeader extends React.Component<{}> {
    render() {
        return (
            <Row type="flex" justify="space-between" gutter={[24, 24]}>
                <Col span={4}></Col>
                <Col span={4}>
                    <ViewResource resource="tiberium" />
                </Col>
                <Col span={4}>
                    <ViewResource resource="crystal" />
                </Col>
                <Col span={4}>
                    <ViewResource resource="power" />
                </Col>
                <Col span={4}>
                    <ViewResource resource="credits" />
                </Col>
            </Row>
        );
    }
}
function titleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
export class ResourceIcon extends React.Component<{ resource: GameResource }> {
    render() {
        const resource = this.props.resource;
        const title = titleCase(resource);

        return <div className={`${BaseStatsCss.Resource} Resource-${title}`}></div>;
    }
}
export class ViewResource extends React.Component<{ resource: GameResource }> {
    render() {
        const resource = this.props.resource;
        const title = titleCase(resource);
        return (
            <div className={`${BaseStatsCss.Title}`}>
                <ResourceIcon resource={this.props.resource}></ResourceIcon>
                {title}
            </div>
        );
    }
}

export class ViewBaseResources extends React.Component<{
    title: string;
    resources: GameResources;
    className?: string;
}> {
    render() {
        const { title, resources, className } = this.props;
        return (
            <Row type="flex" justify="space-between" gutter={[16, 8]} className={className}>
                <Col span={4}>{title}</Col>
                <Col span={4}>{formatNumber(resources.tiberium)}</Col>
                <Col span={4}>{formatNumber(resources.crystal)}</Col>
                <Col span={4}>{formatNumber(resources.power)}</Col>
                <Col span={4}>{formatNumber(resources.credits)}</Col>
            </Row>
        );
    }
}

export class ViewBaseStats extends React.Component<{ base: Base }> {
    render() {
        const base = this.props.base;
        const prod = base.info.production;
        const cost = base.info.cost;
        return (
            <React.Fragment>
                <Divider>Base Production</Divider>
                <ViewBaseResourcesHeader />
                <ViewBaseResources title="Cont" resources={prod.cont} />
                <ViewBaseResources title="Package" resources={prod.pkg} />
                <ViewBaseResources title="Alliance" resources={prod.alliance} />
                <ViewBaseResources title="Total" resources={prod.total} className={BaseStatsCss.StatTotal} />

                <Divider>Base Cost</Divider>
                <ViewBaseResourcesHeader />
                <ViewBaseResources title="Base" resources={cost.base} />
                <ViewBaseResources title="Defense" resources={cost.def} />
                <ViewBaseResources title="Offense" resources={cost.off} />
                <ViewBaseResources title="Total" resources={cost.total} className={BaseStatsCss.StatTotal} />
            </React.Fragment>
        );
    }
}
