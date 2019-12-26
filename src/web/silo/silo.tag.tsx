import Tag from 'antd/es/tag';
import { SiloCounts } from '../../lib/base/base.stats';
import React = require('react');

export class SiloTag extends React.Component<{
    resource: 'tiberium' | 'crystal' | 'mixed';
    silos: SiloCounts;
    size: number;
}> {
    render() {
        const { resource, size, silos } = this.props;
        const count = silos[resource][size];
        if (count == 0) {
            return '';
        }
        let color = 'green';
        if (size == 6 && resource == 'tiberium') {
            color = 'volcano';
        } else if (resource == 'crystal') {
            color = 'blue';
        } else if (resource == 'mixed') {
            color = 'purple';
        }
        return (
            <Tag color={color} title={`${count} silo${count == 1 ? '' : 's'} touching ${size} ${resource} harvesters`}>
                {count} x {size}
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
            output.push(<SiloTag resource={resource} size={i} silos={silos} key={`${resource}-${i}`} />);
        }
        return <React.Fragment>{...output}</React.Fragment>;
    }
}
