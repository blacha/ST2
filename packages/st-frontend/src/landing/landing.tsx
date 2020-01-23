import { Stores, UId } from '@st/model';
import { ModelPlayer } from '@st/model/src/db/model.player';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import Spin from 'antd/es/spin';
import Table from 'antd/es/table';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { style } from 'typestyle';
import { Auth } from '../auth/auth.service';
import { ComponentLoading } from '../base/base';
import { timeSince } from '../time.util';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

export const LandingColumns = [
    {
        title: '#',
        key: 'playerId',
        render: (player: ModelPlayer, record: any, index: number) => index + 1,
        width: 35,
    },
    {
        title: 'Player',
        dataIndex: '',
        key: 'name',
        render: (p: ModelPlayer) => <Link to={`/world/${p.worldId}/player/${p.playerId}`}>{p.player}</Link>,
        sorter: (a: ModelPlayer, b: ModelPlayer) => a.player.localeCompare(b.player),
    },
    {
        title: 'World',
        dataIndex: '',
        key: 'worldId',
        render: (p: ModelPlayer) => String(p.worldId),
        sorter: (a: ModelPlayer, b: ModelPlayer) => a.worldId - b.worldId,
        width: 150,
    },
    {
        title: 'Alliance',
        dataIndex: '',
        key: 'allianceId',
        render: (p: ModelPlayer) => <Link to={`/world/${p.worldId}/alliance/${p.allianceId}`}>{p.alliance}</Link>,
        sorter: (a: ModelPlayer, b: ModelPlayer) => (a.alliance ?? '').localeCompare(b.alliance ?? ''),
    },
    {
        title: 'Updated',
        dataIndex: '',
        key: 'updatedAt',
        render: (p: ModelPlayer) => timeSince(p.updatedAt),
        sorter: (a: ModelPlayer, b: ModelPlayer) => a.updatedAt - b.updatedAt,
    },
];
interface LandingState {
    state: ComponentLoading;
    data?: ModelPlayer[];
}
@observer
export class ViewLandingPage extends React.Component<{}, LandingState> {
    state: LandingState = { state: ComponentLoading.Ready };

    static landingCss = style({ display: 'flex', flexDirection: 'column'})
    static containerCss = style({ width: '100%' });

    componentDidMount() {
        const uid = Auth.uid;
        if (uid == null) {
            this.setState({ state: ComponentLoading.Done });
            return;
        }
        this.setState({ state: ComponentLoading.Loading });
        this.loadPlayerInfo(uid as UId);
    }

    async loadPlayerInfo(uId: UId) {
        const user = await Stores.User.get(uId);
        if (user == null) {
            this.setState({ state: ComponentLoading.Done });
            return;
        }

        const playerClaims = user.claims.map(c => c.player);
        const playerData = await Stores.Player.getAllBy({ player: playerClaims });
        this.setState({ state: ComponentLoading.Done, data: playerData });
    }

    authButton = () => {
        Auth.login();
    };

    render() {
        if (Auth.isLoggedIn) {
            return this.renderAuth();
        }
        return (
            <div className={ViewLandingPage.landingCss}>
                <Title>Welcome</Title>
                <Paragraph>Please register / login to continue</Paragraph>
                <Button onClick={this.authButton} type="primary" loading={Auth.isLoading}>
                    Continue
                </Button>
            </div>
        );
    }

    renderAuth() {
        if (this.state.state == ComponentLoading.Loading) {
            return <Spin />;
        }

        if (this.state.data == null || this.state.data.length == 0) {
            return <Redirect to="/claim" />;
        }

        return (
            <div className={ViewLandingPage.containerCss}>
                <Divider>Your Players</Divider>
                <Table
                    rowKey="id"
                    dataSource={this.state.data}
                    columns={LandingColumns}
                    pagination={false}
                    bordered
                    size="small"
                />
            </div>
        );
    }
}
