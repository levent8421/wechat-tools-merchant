import React, {Component} from 'react';
import './Login.less';
import {Button, Form, Input, message, Typography} from 'antd';
import {merchantLogin} from "../api/merchant";
import {mapStateAndActions} from '../store/storeUtils';

class Login extends Component {
    componentDidMount() {
        const {webToken} = this.props;
        if (webToken) {
            this.toContentPage();
        }
    }

    toContentPage() {
        this.props.history.push({
            pathname: '/content/',
        });
    }

    doLogin(data) {
        merchantLogin(data.loginName, data.password).then(res => {
            const {setToken} = this.props;
            setToken(res.token, res.account);
            message.success('登录成功');
            this.toHome();
        })
    }

    render() {
        return (
            <div className="login">
                <div className="form-wrapper">
                    <Typography.Title level={1}>
                        商户登录
                    </Typography.Title>
                    <Form name="login" onFinish={data => this.doLogin(data)}>
                        <Form.Item name="loginName" label="账户名" rules={[{required: true, message: '登录名必填'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="password" label="密码" rules={[{required: true, message: '密码必填'}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default mapStateAndActions(Login);
