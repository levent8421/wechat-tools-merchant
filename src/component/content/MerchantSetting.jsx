import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import {Button, Card, Form, Input, message, Modal} from 'antd';
import store from '../../store';
import {resetPassword, updateMerchantInfo} from '../../api/merchant';

class MerchantSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordModalVisible: false,
        };
    }

    componentDidMount() {
        this.props.setTitle('商户信息编辑', 'Edit my profiles!');
        this.unsubscribe = store.subscribe(() => this.loadMerchant());
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    loadMerchant() {
        const {me} = store.getState();
        if (me) {
            if (this.merchantForm) {
                this.merchantForm.setFieldsValue(me);
            }
        }
    }

    showChangePasswordModal(show) {
        this.setState({changePasswordModalVisible: show});
    }

    doResetPassword(data) {
        resetPassword(data).then(() => {
            message.success('密码重置成功');
            this.showChangePasswordModal(false);
        })
    }

    resetPassword(data) {
        const {newPassword, reNewPassword} = data;
        if (newPassword !== reNewPassword) {
            message.warn('两次输入密码不一致！');
            return;
        }
        Modal.confirm({
            title: '确定重置密码?',
            content: '确定修改当前商户的登录密码？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.doResetPassword(data);
            },
            onCancel: () => {
                this.showChangePasswordModal(false);
            }
        });
    }

    doUpdateMerchantInfo(data) {
        updateMerchantInfo(data).then(res => {
            const {webToken} = this.props;
            this.props.setToken(webToken, res);
            message.success('商户信息更新成功');
        });
    }

    render() {
        const me = this.props.me || {};
        const {changePasswordModalVisible} = this.state;
        return (
            <div className="merchant-setting">
                <Card title="商户信息" extra={me.sn}>
                    <Form name="merchant-form" ref={form => this.merchantForm = form}
                          onFinish={data => this.doUpdateMerchantInfo(data)}>
                        <Form.Item label="商户名" name="name" rules={[{required: true, message: '请输入商户名'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="登录密码">
                            <Button type="primary" onClick={() => this.showChangePasswordModal(true)}>修改密码</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">确认修改</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Modal title="修改登录密码"
                       visible={changePasswordModalVisible}
                       onCancel={() => this.showChangePasswordModal(false)}
                       onOk={() => this.changePasswordForm.submit()}>
                    <Form name="chane-password-form" ref={form => this.changePasswordForm = form}
                          onFinish={data => this.resetPassword(data)}>
                        <Form.Item label="原密码" name="password" rules={[{required: true, message: '请输入原密码'}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item label="新密码" name="newPassword" rules={[{required: true, message: '请输入新密码'}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item label="重复新密码" name="reNewPassword" rules={[{required: true, message: '请输入相同的新密码'}]}>
                            <Input.Password/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default mapStateAndActions(MerchantSetting);
