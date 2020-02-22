import { Component } from 'react';
import { ViewLayouts } from './layout';
import React = require('react');
import { timeSince } from '../time.util';
import { LayoutFilter } from './layout.filter';
import Tag from 'antd/es/tag';
import { FilerLayoutCountView } from './layout.filter.resource';

export class FilterTimeView extends Component<{ filter: LayoutFilter }> {
    render() {
        const filters = this.props.filter;
        return (
            <div className={ViewLayouts.FilterCss}>
                <div className={ViewLayouts.FilterTitleCss}>Last Seen</div>
                <div className={ViewLayouts.FilterListCss}>
                    {filters.filterTime.map(f => {
                        const className = [ViewLayouts.FilterButtonCss];
                        if (f.isEnabled == false && filters.isAllDisabled == false) {
                            className.push(ViewLayouts.FilterDisabledCss);
                        }
                        return (
                            <div className={className.join(' ')} onClick={f.toggle} key={`${f.type}-${f.duration}`}>
                                <Tag color={'geekblue'}>{timeSince(Date.now() - f.duration)}</Tag>{' '}
                                <FilerLayoutCountView count={f.layoutCount} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
