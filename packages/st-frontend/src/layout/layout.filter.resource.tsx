import { Component } from 'react';
import { SiloTag } from '../silo/silo.tag';
import { ViewLayouts } from './layout';
import { LayoutFilter, LayoutFilterItem } from './layout.filter';
import React = require('react');
import { style } from 'typestyle';

export class FilterResourceView extends Component<{ filter: LayoutFilter; resource: string }> {
    render() {
        const { filter, resource } = this.props;
        const output = [];
        for (const f of filter.filterResource) {
            if (f.type == resource.toLowerCase()) {
                output.push(this.renderFilter(filter, f as LayoutFilterItem));
            }
        }
        return (
            <div className={ViewLayouts.FilterCss}>
                <div className={ViewLayouts.FilterTitleCss}>{resource}</div>
                <div className={ViewLayouts.FilterListCss}>{...output}</div>
            </div>
        );
    }

    renderFilter(filter: LayoutFilter, f: LayoutFilterItem) {
        const className = [ViewLayouts.FilterButtonCss];
        if (f.isEnabled == false && filter.isAllDisabled == false) {
            className.push(ViewLayouts.FilterDisabledCss);
        }
        return (
            <div className={className.join(' ')} onClick={f.toggle} key={`${f.type}-${f.count}-${f.touches}`}>
                <SiloTag resource={f.type} count={f.count} touches={f.touches} />
                <FilerLayoutCountView count={f.layoutCount} />
            </div>
        );
    }
}

const CountDisabledCss = style({ color: 'rgba(0,0,0,0.17)' });

export function FilerLayoutCountView(obj: { count: number }) {
    let className = '';
    if (obj.count == 0) {
        className = CountDisabledCss;
    }
    return <span className={className}>{obj.count}</span>;
}
