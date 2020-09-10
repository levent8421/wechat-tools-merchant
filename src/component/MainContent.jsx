import React, {Component} from 'react';
import {Avatar, Layout, Menu, message, PageHeader} from 'antd';
import './MainContent.less';
import {UserOutlined} from '@ant-design/icons';
import {mapStateAndActions} from '../store/storeUtils';
import {currentMerchant} from '../api/merchant';
import {contentRouters} from '../router/routers';
import {renderRoutes} from 'react-router-config';

const {Header, Content, Footer, Sider} = Layout;

const MenuKeyPathTable = {
    'home': '/content/',
    'wechat-setting': '/content/wechat',
    'invitation': '/content/invitation',
    'wechat-pay': '/content/pay',
    'luck-draw': '/content/luck-draw',
    'merchant-info': '/content/merchant',
};

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {me, webToken} = this.props;
        if (!me) {
            currentMerchant().then(res => {
                message.success('刷新商户信息成功');
                this.props.setToken(webToken, res);
            });
        }
    }

    onMenuClick(item) {
        const {key} = item;
        const path = MenuKeyPathTable[key];
        if (path) {
            this.props.history.push({
                pathname: path,
            });
        } else {
            console.error('can not find path for key ' + key);
        }
    }

    render() {
        const me = this.props.me || {name: '未知'};
        const {title} = this.props;
        return (
            <Layout className="main-content">
                <Sider className="sider">
                    <div className="avatar">
                        <Avatar icon={<UserOutlined/>} size="large"/>
                    </div>
                    <Menu theme="dark" mode="inline" onClick={(...args) => this.onMenuClick(...args)}>
                        <Menu.Item key="home">首页</Menu.Item>
                        <Menu.Item key="wechat-setting">公众号配置</Menu.Item>
                        <Menu.SubMenu title="功能配置">
                            <Menu.Item key="invitation">关注抽奖</Menu.Item>
                            <Menu.Item key="wechat-pay">微信支付</Menu.Item>
                            <Menu.Item key="luck-draw">幸运转盘</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="merchant-info">商户信息</Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="content-layout">
                    <Header className="header">
                        <div className="logo">
                            WechatTools
                        </div>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item>反馈建议</Menu.Item>
                            <Menu.Item>权限申请</Menu.Item>
                            <Menu.Item>数据导出</Menu.Item>
                        </Menu>
                        <div className="avatar">
                            <span className="name">{me.name}</span>
                            <Avatar icon={<UserOutlined/>}/>
                        </div>
                    </Header>
                    <Content className="content">
                        <PageHeader title={title.mainTitle} subTitle={title.subTitle}/>
                        <div className="content-wrapper">
                            {renderRoutes(contentRouters)}
                        </div>
                    </Content>
                    <Footer className="footer">
                        Powered by <b>Levent8421</b>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default mapStateAndActions(MainContent);
