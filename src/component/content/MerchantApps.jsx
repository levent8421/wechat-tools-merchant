import React, {Component} from 'react';
import {fetchApps} from '../../api/apps';
import {Button, Card, Collapse} from 'antd';
import './MerchantApps.less';

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

    toInviteFollowAppPage(app) {
        this.props.history.push({
            pathname: `/content/${app.id}/invite-app-details`,
        });
    }

    renderInviteFollowAppCard(app) {
        return (
            <Card title={app.title} className="invite-follow-app-card" onClick={() => this.toInviteFollowAppPage(app)}>
                <p>{app.subtitle}</p>
                <Button type="link">点击查看详情</Button>
            </Card>);
    }

    render() {
        const {inviteFollowApps} = this.state;
        return (
            <div className="merchant-apps">
                <Collapse defaultActiveKey={['invite-follow-apps']}>
                    <Panel key="invite-follow-apps" header="转发关注抽奖APP">
                        <div className="apps">
                            {
                                inviteFollowApps.map(app => this.renderInviteFollowAppCard(app))
                            }
                        </div>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default MerchantApps;
