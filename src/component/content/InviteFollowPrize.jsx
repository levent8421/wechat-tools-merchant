import React, {Component} from 'react';
import {formatSearch} from '../../util/pathUtils';
import {Button, Card, Form, Input, InputNumber, message, Modal, Space, Table} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {fetchOneInviteFollowApp} from '../../api/inviteFollowApp';
import {mapStateAndActions} from '../../store/storeUtils';
import {createPrizeWithAppId, fetchPrizesByApp, togglePrizeState, updatePrizeInfo} from '../../api/inviteFollowPrize';
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
            editModalVisible: false,
            editPrize: {},
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

    togglePrizeState(prize) {
        togglePrizeState(prize.id).then(res => {
            this.refreshPrizes(this.appId);
            message.success(`奖品[${res.name}]状态已更新！`);
        });
    }

    showEditModal(prize, show) {
        if (this.editForm) {
            this.editForm.setFieldsValue(prize);
        }
        this.setState({editModalVisible: show, editPrize: prize,});
    }

    renderOperations(value, row) {
        return (<Space>
            <Button type="link" onClick={() => this.showEditModal(row, true)}>编辑</Button>
            <Button type="link" onClick={() => this.togglePrizeState(row)}>停用/启用</Button>
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

    updatePrize(data) {
        console.log(data);
        const {editPrize} = this.state;
        const {id} = editPrize;
        data.id = id;
        updatePrizeInfo(data).then(res => {
            this.refreshPrizes(this.appId);
            message.success(`奖品[${res.name}]信息已更新！`);
            this.showEditModal({}, false);
        });
    }

    render() {
        const {app, prizes, createModalVisible, editModalVisible, editPrize} = this.state;
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
                        <Table.Column title="中奖率(%)" dataIndex="winningRate"/>
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
                        <Form.Item name="winningRate" label="中奖率(%)" rules={[{required: true, message: '请输入中奖率'}]}>
                            <InputNumber max={100} min={0}/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal visible={editModalVisible}
                       title="编辑奖品"
                       onCancel={() => this.showEditModal(editPrize, false)}
                       onOk={() => this.editForm.submit()}
                       okText="确认更改" cancelText="取消更改"
                       maskClosable={false}
                       closable={false}>
                    <Form name="edit-form"
                          ref={form => this.editForm = form}
                          onFinish={data => this.updatePrize(data)}
                          initialValues={editPrize}>
                        <Form.Item name="name" label="名称" rules={[{required: true, message: '请输入奖品名称！'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="totalStock" label="总数" rules={[{required: true, message: '请输入奖品数量！'}]}>
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item name="winningRate" label="中奖率(%)" rules={[{required: true, message: '请输入奖品中奖率！'}]}>
                            <InputNumber max={100} min={0}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default mapStateAndActions(InviteFollowPrize);
