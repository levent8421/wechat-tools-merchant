import React, {Component} from 'react';
import './InviteFollowApp.less';
import {mapStateAndActions} from '../../store/storeUtils';
import {Button, Card, Form, Input, message, Modal, Space, Switch} from 'antd';
import {AppstoreOutlined, OrderedListOutlined, PlusOutlined} from '@ant-design/icons';
import {createInviteFollowApp, fetchMyApps, setInviteFollowAppAsDefault} from '../../api/inviteFollowApp';
import {SketchPicker} from 'react-color';

const stateTable = {
    1: '等待审核',
    2: '已上线',
    3: '审核未通过',
    5: '活动已结束',
};
const renderAppName = app => {
    return (<Space>
        <AppstoreOutlined/>
        <span>{app.title || '名称未设置'}</span>
    </Space>);
};
const renderAppState = app => {
    const {state} = app;
    if (!state) {
        return '未知';
    }
    if (stateTable.hasOwnProperty(state)) {
        return stateTable[state];
    } else {
        return `未知状态${state}`;
    }
};

class InviteFollowApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            showCreateModal: false,
            showThemeColorPicker: false,
            themeColor: '#3171FA',
        };
    }

    showCreateModal(show) {
        this.setState({
            showCreateModal: show,
        });
    }

    componentDidMount() {
        this.props.setTitle('邀请关注抽奖APP', 'Invite Follow Apps');
        this.refreshApps();
    }

    refreshApps() {
        fetchMyApps().then(res => {
            this.setState({apps: res});
        });
    }

    render() {
        const _this = this;
        const {showCreateModal, apps} = this.state;
        return (
            <div className="invite-follow-app">
                <div className="operation-panel">
                    <Space>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => this.showCreateModal(true)}>创建应用</Button>
                        <Button type="default" icon={<OrderedListOutlined/>}>审核申请</Button>
                    </Space>
                </div>
                <div className="apps">
                    {
                        apps.map(app => (
                            <Card key={app.id}
                                  title={renderAppName(app)}
                                  className="app-card"
                                  extra={renderAppState(app)}>
                                <Space>
                                    <span>默认应用</span>
                                    <Switch checked={app.defaultApp}
                                            onChange={isDefault => this.setAppAsDefault(app, isDefault)}/>
                                </Space>
                            </Card>))
                    }
                </div>
                {
                    _this.renderCreateModal(showCreateModal)
                }
            </div>
        );
    }

    renderCreateModal(show) {
        const {showThemeColorPicker, themeColor} = this.state;
        return (<Modal visible={show}
                       onCancel={() => this.showCreateModal(false)}
                       onOk={() => this.createForm.submit()}
                       closable={false}
                       maskClosable={false}
                       okText="确认创建"
                       cancelText="取消">
            <Form ref={form => this.createForm = form} onFinish={data => this.createApp(data)}>
                <Form.Item name="title" label="标题" rules={[{required: true, message: '请输入标题'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="subTitle" label="副标题">
                    <Input/>
                </Form.Item>
                <Form.Item name="footerText" label="底部文字">
                    <Input/>
                </Form.Item>
                <Form.Item name="themeColor" label="主题颜色" rules={[{required: true, message: '请选择主题颜色'}]}>
                    <Input onClick={() => this.setState({showThemeColorPicker: true})} readOnly={true}/>
                </Form.Item>
                {showThemeColorPicker ?
                    <SketchPicker type="sketch" color={themeColor} display={showThemeColorPicker}
                                  onChange={color => this.setCreateFormThemeColor(color)}/> : null}
            </Form>
        </Modal>);
    }

    setCreateFormThemeColor(color) {
        const {hex} = color;
        this.setState({themeColor: hex, showThemeColorPicker: false,});
        this.createForm.setFieldsValue({themeColor: hex});
    }

    createApp(data) {
        createInviteFollowApp(data).then(res => {
            const {title} = res;
            message.success(`应用[${title}]创建成功`);
            this.showCreateModal(false);
            this.refreshApps();
        });
    }

    setAppAsDefault(app, isDefault) {
        setInviteFollowAppAsDefault(app.id, isDefault).then(res => {
            const {title} = res;
            message.success(`${isDefault ? '' : '取消'}设置[${title}]为默认应用`);
            this.refreshApps();
        });
    }
}

export default mapStateAndActions(InviteFollowApp);