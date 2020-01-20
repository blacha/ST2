import { observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { style } from 'typestyle';
import { ViewAlliance } from './alliance/alliance';
import { PrivateRoute } from './auth/auth.route';
import { Login } from './auth/login/login';
import { ViewBase } from './base/base';
import { ViewLandingPage } from './landing/landing';
import { ViewPlayer } from './player/player';
import { ViewScan } from './scan/scan.result';
import { NavHeader } from './nav';

const AppCss = {
    Main: style({}),

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
                    <NavHeader />
                    <div className="Content">
                        <Switch>
                            <Route exact={true} path="/" component={ViewLandingPage} />
                            <Route path="/base/:baseId" component={ViewBase} />
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/base" component={ViewBase} />
                            <PrivateRoute path="/world/:worldId/player/:playerId/base/:baseId" component={ViewBase} />
                            <PrivateRoute path="/world/:worldId/player/:playerId" component={ViewPlayer} />
                            <PrivateRoute path="/world/:worldId/alliance/:allianceId" component={ViewAlliance} />
                            <PrivateRoute path="/world/:worldId/layout/:scanId" component={ViewScan} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
