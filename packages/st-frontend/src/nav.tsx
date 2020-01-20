import React = require('react');

import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import { Auth } from './auth/auth.service';

@observer
export class NavHeader extends React.Component {
    static headerCss = style({
        background: '#f4f5f6',
        borderBottom: '.1rem solid #d1d1d1',
        height: '5.2rem',
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
    static headerIconCss = style({ display: 'flex' });
    static headerOptionsCss = style({ display: 'flex', $nest: { button: { marginRight: 12 } } });

    render() {
        return (
            <div className={NavHeader.headerCss}>
                <section className={NavHeader.headerContainerCss}>
                    <div className={NavHeader.headerIconCss}>
                        <div className="Icon"></div>
                        <div className="IconTitle">
                            <Link to="/">ShockrTools</Link>
                        </div>
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
            </div>
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
