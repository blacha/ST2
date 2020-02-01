import { PlayerNameId } from '@cncta/clientlib';
import { ModelPlayer, Stores, UId } from '@st/model';
import { StLog } from '@st/shared';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import Spin from 'antd/es/spin';
import Table from 'antd/es/table';
import List from 'antd/es/list';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { style } from 'typestyle';
import { Auth } from '../auth/auth.service';
import { ComponentLoading } from '../base/base';
import { timeSince } from '../time.util';

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
    claims?: PlayerNameId[];
}
@observer
export class ViewLandingPage extends React.Component<{}, LandingState> {
    state: LandingState = { state: ComponentLoading.Init };

    static landingCss = style({ display: 'flex', flexDirection: 'column' });
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
        StLog.info({ uId }, 'LoadPlayer');
        const user = await Stores.User.get(uId);
        if (user == null) {
            this.setState({ state: ComponentLoading.Done });
            return;
        }

        const playerClaims = user.claims.map(c => c.player);
        StLog.info({ uId, claims: playerClaims }, 'LoadPlayer:Done');

        const playerData = await Stores.Player.getAllBy({ playerNameId: playerClaims });
        StLog.info({ uId, count: playerData.length }, 'LoadPlayerData:Done');

        this.setState({ state: ComponentLoading.Done, claims: playerClaims, data: playerData });
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
        if (this.state.state == ComponentLoading.Loading || this.state.state == ComponentLoading.Init) {
            return <Spin />;
        }

        if (this.state.claims?.length && !this.state.data?.length) {
            return (
                <React.Fragment>
                    <Title>Player info</Title>
                    <Paragraph>No data found for your players</Paragraph>

                    <List dataSource={this.state.claims} renderItem={item => <List.Item>{item}</List.Item>} />
                    <Paragraph>
                        <Link to="/claim">Claim another player</Link> |{' '}
                        <a href="/extension/st.user.js">Install Addon</a>
                    </Paragraph>
                </React.Fragment>
            );
        }

        if (this.state.data == null || this.state.data.length == 0) {
            return <Redirect to="/claim" />;
        }

        return (
            <div className={ViewLandingPage.containerCss}>
                <Divider>Your data</Divider>
                <Table
                    rowKey="id"
                    dataSource={this.state.data}
                    columns={LandingColumns}
                    pagination={false}
                    bordered
                    size="small"
                />

                <Divider>Your claimed players</Divider>
                <div
                    style={{
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: 'auto',
                    }}
                >
                    <List
                        style={{ width: '100%', textAlign: 'center' }}
                        dataSource={this.state.claims}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                    <Text>
                        <Link to="/claim">Claim another player</Link>
                    </Text>
                </div>
            </div>
        );
    }
}
