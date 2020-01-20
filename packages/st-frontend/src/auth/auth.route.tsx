import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { Auth } from './auth.service';
import React = require('react');
import Spin from 'antd/es/spin';
import { observer } from 'mobx-react';

interface AuthRouteProps {
    component: typeof React.Component;
    path: string;
    exact?: boolean;
}

@observer
export class PrivateRoute extends React.Component<AuthRouteProps> {
    render() {
        if (!Auth.isReady) {
            return <Spin />;
        }

        if (Auth.isLoggedIn) {
            return <Route {...this.props} />;
        }

        const to = {
            pathname: '/login',
            state: { from: (this.props as any).location },
        };

        return <Redirect to={to} />;
    }
}
