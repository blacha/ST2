import React = require('react');
import { RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { ViewBaseMain } from '../base/base.main';
import { FirebaseFirestore } from '../firebase';

const ScanCss = {
    ScanList: style({
        display: 'flex',
        flexWrap: 'wrap',
    }),
    BaseCard: style({
        padding: '4px',
    }),
};

interface ScanState {
    bases: Base[];
}
type ViewScanProps = RouteComponentProps<{ scanId?: string }>;

export class ViewScan extends React.Component<ViewScanProps, ScanState> {
    componentDidMount() {
        this.loadScan();
    }

    async loadScan() {
        const baseStore = FirebaseFirestore.collection('base');
        const results = await baseStore.where('worldId', '==', 410).get();
        const bases = results.docs.map(c => {
            const base = BaseBuilder.load(c.data() as any);
            base.clear();
            return base;
        });

        bases.sort((a, b) => b.stats.tiberium.score - a.stats.tiberium.score);
        this.setState({ bases });
    }

    render() {
        return (
            <div className={ScanCss.ScanList}>
                {this.state?.bases.map(base => {
                    return (
                        <div className={ScanCss.BaseCard} key={base.id}>
                            <div>
                                <div>
                                    {base.x}:{base.y}
                                </div>
                                <div>{base.name}</div>
                            </div>
                            <ViewBaseMain base={base} key={base.id} size={24} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
