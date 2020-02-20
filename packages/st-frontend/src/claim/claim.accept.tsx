import { V2Sdk } from '@st/api';
import Spin from 'antd/es/spin';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Cs } from '../base/base';
import { FireAnalytics } from '../firebase';

type ClaimProps = RouteComponentProps<{ claimId: string }>;
export interface ClaimAcceptState {
    state: Cs;
    message?: string;
}
@observer
export class ClaimAcceptPage extends React.Component<ClaimProps, ClaimAcceptState> {
    state: ClaimAcceptState = { state: Cs.Loading };
    componentDidMount() {
        const { claimId } = this.props.match.params;
        FireAnalytics.logEvent('Claim:Accept', { claimId });

        this.claimPlayer(claimId);
    }

    async claimPlayer(claimId: string) {
        this.setState({ state: Cs.Loading });
        const res = await V2Sdk.call('player.claim.accept', { claimId });
        if (res.ok) {
            this.setState({ state: Cs.Done });
        } else {
            this.setState({ state: Cs.Failed, message: 'Failed to accept claim' });
        }
    }

    renderText() {
        if (this.state.state == Cs.Done) {
            return (
                <Paragraph>
                    Claim Accepted! <Link to="/">Home</Link>
                </Paragraph>
            );
        }

        if (this.state.state == Cs.Failed) {
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

        if (this.state.state == Cs.Loading) {
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
