import React, {Component} from 'react';
import './Home.less';
import {Button, Col, Layout, Menu, Row, Typography} from 'antd';

const {Header, Content, Footer} = Layout;
const {Title, Text} = Typography;

class Home extends Component {

    toLogin() {
        this.props.history.push({
            pathname: '/login',
        });
    }

    render() {
        return (
            <Layout className="home">
                <Header className="header">
                    <div className="logo">WechatTools</div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="sign_in">登录</Menu.Item>
                        <Menu.Item key="sign_up">申请入驻</Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Row className="content-row">
                        <Col span={18} className="left">
                            <div className="inner">
                                <Title level={1} className="title">WechatTools</Title>
                                <Text type="secondary" className="text">微信公众号工具</Text>
                            </div>
                        </Col>
                        <Col span={6} className="right">
                            <div className="inner">
                                <Title level={1} className="title">管理控制台</Title>
                                <Button type="primary" onClick={() => this.toLogin()}>进入控制台/登录</Button>
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    Powered By <b>Levent8421</b>
                </Footer>
            </Layout>
        );
    }
}

export default Home;
