import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ViewBase } from './base/base';
import { ViewLandingPage } from './landing/landing';
import { ViewScan } from './scan/scan.result'
import { style } from 'typestyle';


const AppCss = {
    Main: style({
        fontFamily: '"Roboto Condensed"',
        color: 'rgba(0,0,0,0.87)'
    }),
    Header: style({
        background: '#f4f5f6',
        borderBottom: '.1rem solid #d1d1d1',
        display: 'block',
        height: '5.2rem',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
    })
}

export class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div className={AppCss.Main}>
                    <div className={AppCss.Header}>
                        <section className="Container">
                            <div className="Icon"></div>
                            <div className="IconTitle">ShockrTools</div>
                        </section>
                    </div>
                    <div className="Content">
                        <Switch>
                            <Route exact={true} path="/" component={ViewLandingPage} />
                            <Route path="/base/:baseId" component={ViewBase} />
                            <Route path="/base" component={ViewBase} />
                            <Route path="/scan/:scanId" component={ViewScan} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
