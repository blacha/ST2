import Layout from 'antd/es/layout';
import Spin from 'antd/es/spin';
import { observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { style } from 'typestyle';
import { ViewAlliance } from './alliance/alliance';
import { PrivateRoute } from './auth/auth.route';
import { Login } from './auth/login/login';
import { ViewBase } from './base/base';
import { FlexCenter } from './css.util';
import { ViewLandingPage } from './landing/landing';
import { NavHeader } from './nav';
import { ViewPlayer } from './player/player';
import { ViewScan } from './layout/layout';
import { Config } from '@st/shared';
import { Auth } from './auth/auth.service';
import { ClaimPage } from './claim/claim';
import { ClaimAcceptPage } from './claim/claim.accept';
const { Header, Footer, Content } = Layout;

@observer
export class App extends React.Component {
    static footerCss = style({ ...FlexCenter, $nest: { div: { padding: 4 } } });
    static containerCss = style({
        background: 'rgba(255,255,255,0.87)',
        margin: '2rem auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '100rem',
        width: '100%',
        padding: '2rem 4rem',
        minHeight: 'calc(100vh - 8rem - 80px)',
        overflow: 'auto',
    });

    public render() {
        return (
            <BrowserRouter>
                <Layout>
                    <NavHeader />
                    <Content className={App.containerCss}>{Auth.isReady ? this.renderRouter() : <Spin />}</Content>
                    <Footer className={App.footerCss}>
                        <div>
                            Created by <a href="mailto:contact@shockr.dev">shockr</a>
                        </div>
                        |
                        <div>
                            <a href="https://github.com/blacha/st/">v{Config.version}</a> ({Config.hash.substr(0, 8)})
                        </div>
                    </Footer>
                </Layout>
            </BrowserRouter>
        );
    }

    renderRouter() {
        return (
            <Switch>
                <Route exact={true} path="/" component={ViewLandingPage} />
                <Route path="/base/:cityId" component={ViewBase} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/claim/:claimId" component={ClaimAcceptPage} />

                <PrivateRoute path="/claim" component={ClaimPage} />
                <PrivateRoute path="/base" component={ViewBase} />
                <PrivateRoute path="/world/:worldId/player/:playerId/city/:cityId" component={ViewBase} />
                <PrivateRoute path="/world/:worldId/player/:playerId" component={ViewPlayer} />
                <PrivateRoute path="/world/:worldId/alliance/:allianceId" component={ViewAlliance} />
                <PrivateRoute path="/world/:worldId/alliance/:allianceId/layouts" component={ViewScan} />
                <Redirect to="/" />
            </Switch>
        );
    }
}
