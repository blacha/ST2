import { WorldId } from '@cncta/clientlib/src';
import { Stores } from '@st/model/src';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import { FormComponentProps } from 'antd/es/form/Form';
import Icon from 'antd/es/icon';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ComponentLoading } from '../base/base';
import { Api } from '../api/api';

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
    state: ComponentLoading;
    claim: ComponentLoading;
    worlds?: { worldId: WorldId; name: string }[];
}
function hasErrors(fieldsError: Record<string, string[] | undefined>) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class ClaimPlayerForm extends React.Component<FormComponentProps, ClaimPlayerState> {
    componentDidMount() {
        this.setState({ state: ComponentLoading.Loading, worlds: [] });
        this.loadWorlds();
    }

    async loadWorlds() {
        const worlds = await Stores.BotWorld.get('worlds');
        if (worlds == null) {
            return;
        }
        this.setState({ state: ComponentLoading.Done, worlds: worlds.worlds });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values: { worldId: number; player: string }) => {
            if (err) {
                return;
            }
            this.setState({ ...this.state, claim: ComponentLoading.Loading });
            const res = await Api.claimPlayerRequest(values.worldId, values.player);
            this.setState({ ...this.state, claim: ComponentLoading.Done });
        });
    };

    render() {
        if (this.state == null || this.state.state == ComponentLoading.Loading || this.state.worlds == null) {
            return <Spin />;
        }
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('player', {
                        rules: [{ required: true, message: 'Please input your player name!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Player"
                            disabled={this.state.claim == ComponentLoading.Loading}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('worldId', {
                        rules: [{ required: true, message: 'Please select a world you are on!' }],
                        initialValue: this.state.worlds[0].worldId,
                    })(
                        <Select disabled={this.state.claim == ComponentLoading.Loading}>
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
                        loading={this.state.claim == ComponentLoading.Loading}
                    >
                        Claim
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const ClaimForm = Form.create()(ClaimPlayerForm);
