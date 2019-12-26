import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { style } from 'typestyle';
import { ViewAlliance } from './alliance/alliance';
import { ViewBase } from './base/base';
import { ViewLandingPage } from './landing/landing';
import { ViewScan } from './scan/scan.result';

const AppCss = {
    Main: style({
        fontFamily: '"Roboto Condensed"',
        color: 'rgba(0,0,0,0.87)',
    }),
    Header: style({
        background: '#f4f5f6',
        borderBottom: '.1rem solid #d1d1d1',
        height: '5.2rem',
        maxWidth: '100%',
        width: '100%',
        padding: '0 4rem',
    }),
    Content: style({
        margin: 'auto',
        maxWidth: '100rem',
        padding: '0 4rem',
    }),
};

export class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div className={AppCss.Main}>
                    <div className={AppCss.Header}>
                        <section className="Container">
                            <div className="Icon"></div>
                            <div className="IconTitle">
                                <Link to="/">ShockrTools</Link>
                            </div>
                        </section>
                    </div>
                    <div className="Content">
                        <Switch>
                            <Route exact={true} path="/" component={ViewLandingPage} />
                            <Route path="/base/:baseId" component={ViewBase} />
                            <Route path="/base" component={ViewBase} />
                            <Route path="/world/:worldId/alliance/:allianceId" component={ViewAlliance} />
                            <Route path="/world/:worldId/layout/:scanId" component={ViewScan} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
