import React = require('react');
import { RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Base } from '../../lib/base';
import { BaseBuilder } from '../../lib/base.builder';
import { ViewBaseMain } from '../base/base.main';
import { FireStoreBases } from '../firebase';

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
type ViewScanProps = RouteComponentProps<{ worldId: string }>;

export class ViewScan extends React.Component<ViewScanProps, ScanState> {
    componentDidMount() {
        this.loadScan();
    }

    async loadScan() {
        const results = await FireStoreBases.where('worldId', '==', Number(this.props.match.params.worldId))
            .where('ownerId', '<', 0)
            .limit(100)
            .get();

        const bases: Base[] = results.docs.map(c => {
            const base = BaseBuilder.load(c.data());
            base.clear(); // Remove buildings
            return base;
        });

        bases.sort((a: Base, b: Base) => b.stats.tiberium.score - a.stats.tiberium.score);
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
