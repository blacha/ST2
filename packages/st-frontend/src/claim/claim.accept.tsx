import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Api } from '../api/api';
import { ComponentLoading } from '../base/base';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Spin from 'antd/es/spin';

type ClaimProps = RouteComponentProps<{ claimId: string }>;
export interface ClaimAcceptState {
    state: ComponentLoading;
    message?: string;
}
@observer
export class ClaimAcceptPage extends React.Component<ClaimProps, ClaimAcceptState> {
    state: ClaimAcceptState = { state: ComponentLoading.Loading };
    componentDidMount() {
        const { claimId } = this.props.match.params;
        this.claimPlayer(claimId);
    }

    async claimPlayer(claimId: string) {
        this.setState({ state: ComponentLoading.Loading });
        try {
            await Api.claimPlayerAccept(claimId);
            this.setState({ state: ComponentLoading.Done });
        } catch (e) {
            this.setState({ state: ComponentLoading.Failed, message: e.message });
        }
    }

    renderText() {
        if (this.state.state == ComponentLoading.Done) {
            return (
                <Paragraph>
                    Claim Accepted! <Link to="/">Home</Link>
                </Paragraph>
            );
        }

        if (this.state.state == ComponentLoading.Failed) {
            return (
                <React.Fragment>
                    <Paragraph>Failed to claim player</Paragraph>
                    <Paragraph type="danger">Reason: {this.state.message}</Paragraph>
                    <Paragraph>
                        Please try again later... <Link to="/claim">Claim player</Link>
                    </Paragraph>
                </React.Fragment>
            );
        }

        if (this.state.state == ComponentLoading.Loading) {
            return (
                <React.Fragment>
                    <Paragraph>Claiming player please hold</Paragraph>
                    <Spin />
                </React.Fragment>
            );
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <Title>Claim Player</Title>
                {this.renderText()}
            </React.Fragment>
        );
    }
}
