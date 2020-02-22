import { Component } from 'react';
import { ViewLayouts } from './layout';
import React = require('react');
import { timeSince } from '../time.util';
import { LayoutFilter } from './layout.filter';
import Tag from 'antd/es/tag';
import { FilerLayoutCountView } from './layout.filter.resource';

export class FilterLayoutView extends Component<{ filter: LayoutFilter }> {
    render() {
        const filters = this.props.filter;
        return (
            <div className={ViewLayouts.FilterCss}>
                <div className={ViewLayouts.FilterTitleCss}>Tiberium tiles</div>
                <div className={ViewLayouts.FilterListCss}>
                    {filters.filterLayout.map(f => {
                        let color = f.touches == 7 ? 'green' : f.touches == 6 ? 'orange' : 'geekblue';
                        const className = [ViewLayouts.FilterButtonCss];
                        if (f.isEnabled == false && filters.isAllDisabled == false) {
                            className.push(ViewLayouts.FilterDisabledCss);
                        }
                        return (
                            <div className={className.join(' ')} onClick={f.toggle} key={`${f.type}-${f.touches}`}>
                                <Tag color={color}>{f.touches}</Tag> <FilerLayoutCountView count={f.layoutCount} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
