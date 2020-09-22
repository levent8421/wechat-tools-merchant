import React, {Component} from 'react';
import {formatSearch} from '../../util/pathUtils';
import {Button, Card, Form, Input, InputNumber, message, Modal, Space, Table} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {fetchOneInviteFollowApp} from '../../api/inviteFollowApp';
import {mapStateAndActions} from '../../store/storeUtils';
import {createPrizeWithAppId, fetchPrizesByApp} from '../../api/inviteFollowPrize';
import './InviteFollowPrize.less';
import ImageUpload from "../commons/ImageUpload";
import {inviteFollowPrizeStateText} from '../../util/converter';

class InviteFollowPrize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: {},
            prizes: [],
            createModalVisible: false,
        };
    }

    componentDidMount() {
        const params = formatSearch(this.props.location.search);
        this.appId = params.appId;
        if (!this.appId) {
            Modal.error({
                title: '未指定APP',
                content: '未指定参数: [appId]',
            });
        }
        this.props.setTitle('关注抽奖应用奖品编辑', 'Invite follow app prize edit');
        this.refreshAppInfo(this.appId);
        this.refreshPrizes(this.appId);
    }

    refreshAppInfo(appId) {
        fetchOneInviteFollowApp(appId).then(res => {
            this.setState({app: res})
        });
    }

    refreshPrizes(appId) {
        fetchPrizesByApp(appId).then(res => {
            for (let row of res) {
                row.key = row.id;
            }
            this.setState({
                prizes: res,
            });
        })
    }

    showCreateModal(show) {
        this.setState({createModalVisible: show});
    }

    createPrize(data) {
        data.inviteFollowAppId = this.appId;
        createPrizeWithAppId(data).then(res => {
            this.refreshPrizes(this.appId);
            this.showCreateModal(false);
            message.success(`奖品[${res.name}]创建成功！`);
        });
    }

    deletePrize(prize) {

    }

    updatePrizeState(prize, state) {

    }

    renderOperations(value, row) {
        return (<Space>
            <Button type="link" onClick={() => this.deletePrize(row)}>删除</Button>
            <Button type="link" onClick={() => this.updatePrizeState(row, false)}>停用</Button>
            <Button type="link" onClick={() => this.updatePrizeState(row, true)}>启用</Button>
        </Space>);
    }

    onImageUploadSuccess(prize) {
        Modal.success({
            title: '上传成功',
            content: `奖品[${prize.name}]的图片上传成功`,
            onOk: () => {
                this.refreshPrizes(this.appId);
            },
            okText: '知道了',
        });
    }

    renderImage(value, prize) {
        const {id} = prize;
        return (<ImageUpload previewUrl={value}
                             buttonText="更改图片"
                             url={`/api/token/invite-follow-prize/${id}/image`}
                             name="imageFile"
                             onSuccess={res => this.onImageUploadSuccess(res)}/>);
    }


    render() {
        const {app, prizes, createModalVisible} = this.state;
        return (
            <div className="invite-follow-prize">
                <Card title={app.title} extra={app.subtitle}>
                    <Space className="operation-panel">
                        <span>操作：</span>
                        <Button type="primary"
                                icon={<PlusCircleOutlined/>}
                                onClick={() => this.showCreateModal(true)}>
                            创建
                        </Button>
                    </Space>
                    <Table dataSource={prizes} pagination={false}>
                        <Table.Column title="#" width={50} dataIndex="id" key="id"/>
                        <Table.Column title="名称" dataIndex="name" key="name"/>
                        <Table.Column title="图片" dataIndex="image"
                                      render={(value, row) => this.renderImage(value, row)}/>
                        <Table.Column title="总数" dataIndex="totalStock"/>
                        <Table.Column title="中奖率" dataIndex="winningRate"/>
                        <Table.Column title="已中奖数" dataIndex="sales"/>
                        <Table.Column title="状态" dataIndex="state" render={value => {
                            const stateText = inviteFollowPrizeStateText(value);
                            return (<b style={{color: stateText.color}}>{stateText.text}</b>);
                        }}/>
                        <Table.Column title="操作" render={(value, row) => this.renderOperations(value, row)}/>
                    </Table>
                </Card>
                <Modal visible={createModalVisible}
                       title="创建奖品"
                       onOk={() => this.createForm.submit()}
                       onCancel={() => this.showCreateModal(false)}
                       okText="创建"
                       cancelText="取消"
                       maskClosable={false}
                       closable={false}>
                    <Form name="form-create" ref={form => this.createForm = form}
                          onFinish={data => this.createPrize(data)}>
                        <Form.Item name="name" label="名称" rules={[{required: true, message: '请输入名称'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="totalStock" label="总数" rules={[{required: true, message: '请输入总数'}]}>
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item name="winningRate" label="中奖率" rules={[{required: true, message: '请输入中奖率'}]}>
                            <InputNumber/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default mapStateAndActions(InviteFollowPrize);
