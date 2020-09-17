import React, {Component} from 'react';
import {fetchApps} from '../../api/apps';
import {Collapse} from 'antd';

const {Panel} = Collapse;

class MerchantApps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteFollowApps: [],
        };
    }

    componentDidMount() {
        this.refreshApps();
    }

    refreshApps() {
        fetchApps().then(res => {
            this.setState({...res});
        });
    }

    render() {
        const {inviteFollowApps} = this.state;
        return (
            <div className="merchant-apps">
                <Collapse defaultActiveKey={['invite-follow-apps']}>
                    <Panel key="invite-follow-apps" header="转发关注抽奖APP">
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default MerchantApps;
