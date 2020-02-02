import Tag from 'antd/es/tag';
import React = require('react');
import { SiloCounts, GameResource } from '@st/shared';

const Colors = {
    tiberium: 'green',
    crystal: 'blue',
    mixed: 'purple',
    power: 'orange',
    credits: 'cyan',
};

export class SiloTag extends React.Component<{
    resource: GameResource | 'mixed';
    count: number;
    touches: number;
}> {
    render() {
        const { resource, touches, count } = this.props;
        if (count == 0) {
            return null;
        }
        let color = Colors[resource];
        if (touches == 6 && resource == 'tiberium') {
            color = 'magenta';
        }
        let title = `${count} silo${count == 1 ? '' : 's'} touching ${touches} ${resource} harvesters`;
        if (resource == 'power') {
            title = `${count} accumulators touching ${touches} power plants`;
        }
        return (
            <Tag color={color} title={title}>
                {count} x {touches}{' '}
            </Tag>
        );
    }
}

export class SiloTags extends React.Component<{
    resource: 'tiberium' | 'crystal' | 'mixed';
    minSize: number;
    silos: SiloCounts;
}> {
    render() {
        const { minSize, resource, silos } = this.props;
        const output = [];
        for (let i = minSize; i < 7; i++) {
            const count = silos[resource][i].length;
            output.push(
                <SiloTag resource={resource as GameResource} touches={i} count={count} key={`${resource}-${i}`} />,
            );
        }
        return <React.Fragment>{...output}</React.Fragment>;
    }
}
