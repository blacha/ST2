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
}
@observer
export class ClaimAcceptPage extends React.Component<ClaimProps, ClaimAcceptState> {
    state = { state: ComponentLoading.Loading };
    componentDidMount() {
        const { claimId } = this.props.match.params;
        this.claimPlayer(claimId);
    }

    async claimPlayer(claimId: string) {
        this.setState({ state: ComponentLoading.Loading });
        const result = await Api.claimPlayerAccept(claimId);
        if (result) {
            this.setState({ state: ComponentLoading.Done });
        }
        this.setState({ state: ComponentLoading.Failed });
    }

    render() {
        return (
            <React.Fragment>
                <Title>Claim Player</Title>
                {this.state.state == ComponentLoading.Done ? (
                    <Paragraph>
                        Claim Accepted! <Link to="/">Home</Link>
                    </Paragraph>
                ) : null}
                {this.state.state == ComponentLoading.Failed ? (
                    <Paragraph type="danger">
                        Failed to claim player, try again later <Link to="/claim">Claim</Link>
                    </Paragraph>
                ) : null}
                {this.state.state == ComponentLoading.Loading ? (
                    <React.Fragment>
                        <Paragraph>Claiming player please hold</Paragraph>
                        <Spin />
                    </React.Fragment>
                ) : null}
            </React.Fragment>
        );
    }
}
