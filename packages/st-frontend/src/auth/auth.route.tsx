import { StLog } from '@st/shared';
import Spin from 'antd/es/spin';
import { observer } from 'mobx-react';
import { Redirect, Route } from 'react-router-dom';
import { Auth } from './auth.service';
import React = require('react');

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

        const from = (this.props as any).location;
        StLog.info({ from }, 'RedirectToLogin');
        const to = {
            pathname: '/login',
            state: { from },
        };

        return <Redirect to={to} />;
    }
}
