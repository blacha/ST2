import React = require('react');

import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import { Auth } from './auth/auth.service';
import Layout from 'antd/es/layout';

@observer
export class NavHeader extends React.Component {
    static headerCss = style({
        color: 'rgba(255,255,255,0.87)',
        borderBottom: '.1rem solid #d1d1d1',
        height: '4rem',
        maxWidth: '100%',
        width: '100%',
        padding: '0 4rem',
    });
    static headerContainerCss = style({
        height: '100%',
        maxWidth: '80rem',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        fontSize: '140%',
        justifyContent: 'space-between',
    });
    static headerIconCss = style({ display: 'flex', alignItems: 'center' });
    static headerOptionsCss = style({ display: 'flex', $nest: { button: { marginRight: 12 } } });

    render() {
        return (
            <Layout.Header className={NavHeader.headerCss}>
                <section className={NavHeader.headerContainerCss}>
                    <div className={NavHeader.headerIconCss}>
                        <div className="Icon"></div>
                        <div className="IconTitle">ShockrTools</div>
                    </div>
                    <div className={NavHeader.headerOptionsCss}>
                        {this.renderOptions()}
                        <Tooltip title="Install ShockrTools user script" arrowPointAtCenter>
                            <Button icon="download" href="/extension/st.user.js">
                                Install
                            </Button>
                        </Tooltip>
                    </div>
                </section>
            </Layout.Header>
        );
    }

    onClick() {
        if (Auth.isLoggedIn) {
            Auth.logout();
        } else {
            Auth.login();
        }
    }

    renderOptions() {
        if (!Auth.isReady) {
            return null;
        }

        if (Auth.isLoggedIn) {
            return <Button onClick={this.onClick}>Logout</Button>;
        }

        return (
            <Button onClick={this.onClick} type="primary">
                Login
            </Button>
        );
    }
}
