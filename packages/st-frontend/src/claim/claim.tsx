import { PlayerNameId, WorldId } from '@cncta/clientlib';
import { V2Sdk } from '@st/api';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import { FormComponentProps } from 'antd/es/form/Form';
import Icon from 'antd/es/icon';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Auth } from '../auth/auth.service';
import { Cs } from '../base/base';
import { FireAnalytics } from '../firebase';

@observer
export class ClaimPage extends React.Component<{}, {}> {
    render() {
        return (
            <React.Fragment>
                <Title>Claim Player</Title>
                <Paragraph>To gain access to player data you must claim your CNC:TA player</Paragraph>
                <ClaimForm />
            </React.Fragment>
        );
    }
}

export interface ClaimPlayerState {
    state: Cs;
    claim: Cs;
    worlds?: { worldId: WorldId; name: string }[];
}
function hasErrors(fieldsError: Record<string, string[] | undefined>) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class ClaimPlayerForm extends React.Component<FormComponentProps, ClaimPlayerState> {
    componentDidMount() {
        this.setState({ state: Cs.Loading, worlds: [] });
        this.loadWorlds();
    }

    async loadWorlds() {
        const worlds = await V2Sdk.call('world.list');
        if (!worlds.ok) {
            return;
        }
        this.setState({ state: Cs.Done, worlds: worlds.response.worlds });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values: { worldId: number; player: string }) => {
            if (err) {
                return;
            }
            FireAnalytics.logEvent('Claim:Send', { worldId: values.worldId, player: values.player });
            const worldId = values.worldId as WorldId;
            const player = values.player.toLowerCase() as PlayerNameId;

            this.setState({ ...this.state, claim: Cs.Loading });
            const res = await V2Sdk.call('player.claim.request', { worldId, player });

            if (res.ok) {
                this.setState({ ...this.state, claim: Cs.Done });
            } else {
                FireAnalytics.logEvent('Claim:Failed', {
                    worldId: values.worldId,
                    player: values.player,
                    uid: Auth.uid,
                });

                this.setState({ ...this.state, claim: Cs.Failed });
            }
        });
    };

    render() {
        if (this.state == null || this.state.state == Cs.Loading || this.state.worlds == null) {
            return <Spin />;
        }
        const { getFieldDecorator, getFieldsError } = this.props.form;
        if (this.state.claim == Cs.Done) {
            return <Text>Check your in game mailbox</Text>;
        }

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('player', {
                        rules: [{ required: true, message: 'Please input your player name!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Player"
                            disabled={this.state.claim == Cs.Loading}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('worldId', {
                        rules: [{ required: true, message: 'Please select a world you are on!' }],
                        initialValue: this.state.worlds[0].worldId,
                    })(
                        <Select disabled={this.state.claim == Cs.Loading}>
                            {...this.state.worlds.map(c => (
                                <Select.Option key={c.worldId} value={c.worldId}>
                                    {c.name}
                                </Select.Option>
                            ))}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                        loading={this.state.claim == Cs.Loading}
                    >
                        Claim
                    </Button>
                </Form.Item>
                {this.state.claim == Cs.Failed ? <Text type="danger">Failed to claim player</Text> : null}
            </Form>
        );
    }
}

const ClaimForm = Form.create()(ClaimPlayerForm);
