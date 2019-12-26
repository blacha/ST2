import Tag from 'antd/es/tag';
import React = require('react');
import { Base } from '../../lib/base/base';

export class SiloTag extends React.Component<{ resource: 'tiberium' | 'crystal' | 'mixed'; base: Base; size: number }> {
    render() {
        const { resource, size, base } = this.props;
        const stats = base.info.stats;
        const count = stats[resource][size];
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
    base: Base;
}> {
    render() {
        const { minSize, resource, base } = this.props;
        const output = [];
        for (let i = minSize; i < 7; i++) {
            output.push(<SiloTag resource={resource} size={i} base={base} key={`${resource}-${i}`} />);
        }
        return <React.Fragment>{...output}</React.Fragment>;
    }
}
