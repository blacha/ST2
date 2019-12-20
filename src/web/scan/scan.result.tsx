import React = require("react");
import { RouteComponentProps } from "react-router-dom";
import { LayoutScanApi } from "../../api/city.layout";
import { Base } from "../../lib/base";
import { BaseBuilder } from "../../lib/base.builder";
// import { ScanResults } from "../data/scan.result";
import { style } from "typestyle";
import { ViewBaseMain } from "../base/base.main";

const ScanCss = {
    ScanList: style({
        display: 'flex',
        flexWrap: 'wrap'

    }),
    BaseCard: style({
        padding: "4px"
    })
}

interface ViewScanProps extends RouteComponentProps<{ scanId?: string }> { }

export class ViewScan extends React.Component<ViewScanProps> {
    scan: LayoutScanApi;
    bases: Base[];

    constructor(props: ViewScanProps) {
        super(props)
        const { scanId } = this.props.match.params;
        this.scan = { v: 1, player: { id: 1, accountId: 2, name: 'foo' }, world: 410, layouts: [] }; // ScanResults[1]
        console.log('Scan', scanId, this.scan)

        this.bases = this.scan.layouts.map(c => BaseBuilder.load(c));

        this.bases.sort((a, b) => b.stats.tiberium.score - a.stats.tiberium.score)
    }

    render() {
        return (
            <div className={ScanCss.ScanList}>
                {
                    this.bases.map(base => {
                        return (
                            <div className={ScanCss.BaseCard}>
                                <div> {base.x}:{base.y} </div>
                                <ViewBaseMain base={base} key={base.id} size={24} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
