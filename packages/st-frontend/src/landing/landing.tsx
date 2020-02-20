import { PlayerNameId } from '@cncta/clientlib';
import { getWorldName } from '@cncta/util';
import { V2Sdk, UserId } from '@st/api';
import { StLog } from '@st/shared';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import List from 'antd/es/list';
import Spin from 'antd/es/spin';
import Table from 'antd/es/table';
import Tooltip from 'antd/es/tooltip';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { style } from 'typestyle';
import { getDiffIcon } from '../alliance/alliance.table';
import { Auth } from '../auth/auth.service';
import { Cs } from '../base/base';
import { timeSince } from '../time.util';

import { TypeOf } from 'io-ts';
import { V2PlayerType } from '@st/api/build/v2/v2.player';

export type ModelPlayer = TypeOf<typeof V2PlayerType>;

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
        render: (p: ModelPlayer) => getWorldName(p.worldId) + ` (${p.worldId})`,
        sorter: (a: ModelPlayer, b: ModelPlayer) => a.worldId - b.worldId,
        width: 150,
    },
    {
        title: 'B#',
        dataIndex: '',
        key: 'bases',
        render: (p: ModelPlayer) => Object.keys(p.cities).length,
        sorter: (a: ModelPlayer, b: ModelPlayer) => Object.keys(a.cities).length - Object.keys(b.cities).length,
        width: 70,
    },
    {
        title: 'Alliance',
        dataIndex: '',
        key: 'allianceId',
        render: (p: ModelPlayer) => <Link to={`/world/${p.worldId}/alliance/${p.allianceId}`}>{p.alliance}</Link>,
        sorter: (a: ModelPlayer, b: ModelPlayer) => (a.alliance ?? '').localeCompare(b.alliance ?? ''),
    },
    {
        width: 50,
        title: '',
        dataIndex: '',
        key: 'updatedAt',
        render: (p: ModelPlayer) => {
            const title = 'Last updated ' + timeSince(p.updatedAt) + ' ago';
            return <Tooltip title={title}>{getDiffIcon(p.updatedAt)}</Tooltip>;
        },
        sorter: (a: ModelPlayer, b: ModelPlayer) => a.updatedAt - b.updatedAt,
    },
];
interface LandingState {
    state: Cs;
    data?: any[];
    claims?: PlayerNameId[];
}
@observer
export class ViewLandingPage extends React.Component<{}, LandingState> {
    state: LandingState = { state: Cs.Init };

    static landingCss = style({ display: 'flex', flexDirection: 'column' });
    static containerCss = style({ width: '100%' });

    componentDidMount() {
        const uid = Auth.uid;
        if (uid == null) {
            this.setState({ state: Cs.Done });
            return;
        }
        this.setState({ state: Cs.Loading });
        this.loadPlayerInfo(uid as UserId);
    }

    async loadPlayerInfo(uId: UserId) {
        StLog.info({ uId }, 'LoadPlayer');
        const user = await V2Sdk.call('player.list');
        if (!user.ok) {
            this.setState({ state: Cs.Done });
            return;
        }

        const playerClaims = user.response.players.map(c => c.player);
        StLog.info({ uId, claims: playerClaims }, 'LoadPlayer:Done');

        const playerData = await V2Sdk.call('player.get', { playerNameIds: playerClaims });
        if (!playerData.ok) {
            this.setState({ state: Cs.Done });
            return;
        }
        const players = playerData.response.players;
        StLog.info({ uId, count: players.length }, 'LoadPlayerData:Done');

        this.setState({ state: Cs.Done, claims: playerClaims, data: players });
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
        if (this.state.state == Cs.Loading || this.state.state == Cs.Init) {
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
