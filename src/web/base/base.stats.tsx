import React = require("react");
import { Base } from "../../lib/base";
import { BaseCss } from "./base";
import { formatNumber } from "../../lib/util";

export class ViewBaseStats extends React.Component<{ base: Base }> {
    render() {
        const prod = this.props.base.production;
        return (
            <div className={BaseCss.Base}>
                <div>
                    <div className={BaseCss.Title}>Tiberium</div>
                    <div className={BaseCss.Total}>{formatNumber(prod.total.tiberium)}</div>
                </div>
                <div>
                    <div className={BaseCss.Title}>Crystal</div>
                    <div className={BaseCss.Total}>{formatNumber(prod.total.crystal)}</div>
                </div>
                <div>
                    <div className={BaseCss.Title}>Power</div>
                    <div className={BaseCss.Total}>{formatNumber(prod.total.power)}</div>
                </div>
                <div>
                    <div className={BaseCss.Title}>Credits</div>
                    <div className={BaseCss.Total}>{formatNumber(prod.total.credits)}</div>
                </div>
            </div>
        );
    }
}
