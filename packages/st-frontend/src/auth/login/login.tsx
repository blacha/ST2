import React = require('react');
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Auth } from '../auth.service';
import Spin from 'antd/es/spin';
import Button from 'antd/es/button';
import { style } from 'typestyle';
import { observer } from 'mobx-react';

export type LoginProps = RouteComponentProps<{}, {}, { from?: { pathname: string } }>;

@observer
export class Login extends React.Component<LoginProps> {
    loginCss = style({ margin: 8, $nest: { div: { margin: 8 } } });

    onClick() {
        Auth.login();
    }

    render() {
        console.log('Render');
        if (Auth.isLoggedIn) {
            console.log('Redirect');
            return <Redirect to={this.props.location.state.from?.pathname ?? '/'} />;
        }
        console.log('NeedLogin', this.props);
        return (
            <div className={this.loginCss}>
                <Button onClick={this.onClick} loading={Auth.isLoading}>
                    Login
                </Button>
            </div>
        );
    }
}
