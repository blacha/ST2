import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ViewBase } from './base/base';
import { ViewLandingPage } from './landing/landing';
import { style } from 'typestyle';

const AppCss = {
    Main: style({
        fontFamily: '"Roboto Condensed"'
    })
}

export class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div className={AppCss.Main}>
                    <Switch>
                        <Route exact={true} path="/" component={ViewLandingPage} />
                        <Route path="/base/:baseId" component={ViewBase} />
                        <Route path="/base" component={ViewBase} />

                        <Redirect to="/" />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
