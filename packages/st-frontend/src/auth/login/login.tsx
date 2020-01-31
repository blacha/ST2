import React = require('react');
import { StLog } from '@st/shared';
import Button from 'antd/es/button';
import { observer } from 'mobx-react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { style } from 'typestyle';
import { Auth } from '../auth.service';

export type LoginProps = RouteComponentProps<{}, {}, { from?: { pathname: string } }>;

@observer
export class Login extends React.Component<LoginProps> {
    loginCss = style({ margin: 8, $nest: { div: { margin: 8 } } });

    onClick() {
        Auth.login();
    }

    render() {
        if (Auth.isLoggedIn) {
            StLog.info({ to: this.props.location.state.from?.pathname }, 'Redirect');
            return <Redirect to={this.props.location.state.from?.pathname ?? '/'} />;
        }
        StLog.info({ from: this.props.location.state.from?.pathname }, 'NeedLogin');
        return (
            <div className={this.loginCss}>
                <Button onClick={this.onClick} loading={Auth.isLoading}>
                    Login
                </Button>
            </div>
        );
    }
}
