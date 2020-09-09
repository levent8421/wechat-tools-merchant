import React, {Component} from 'react';
import './MainContentHome.less';
import {Card, Carousel, Steps, Typography} from 'antd';
import {mapStateAndActions} from '../../store/storeUtils';

const {Step} = Steps;
const {Title, Text} = Typography;

class MainContentHome extends Component {
    componentDidMount() {
        this.props.setTitle('微信工具', 'WechatTools');
    }

    render() {
        const me = this.props.me || {name: '加载中。。。'};
        return (
            <div className="main-content-home">
                <Card title={me.name}>
                    欢迎入驻微信工具
                </Card>
                <Carousel className="carousel" autoplay>
                    <div className="carousel-item">
                        <Title level={1} className="title">商户入驻</Title>
                        <Text type="success" className="text">注册平台登录账户</Text>
                    </div>
                    <div className="carousel-item">
                        <Title level={1} className="title">开通权限</Title>
                        <Text type="success" className="text">联系管理员开通功能权限</Text>
                    </div>
                    <div className="carousel-item">
                        <Title level={1} className="title">配置功能</Title>
                        <Text type="success" className="text">配置具体业务功能</Text>
                    </div>
                </Carousel>
                <Steps current={3}>
                    <Step title="入驻申请" description="申请入驻平台."/>
                    <Step title="权限申请" description="申请权限."/>
                    <Step title="配置功能" description="配置模块功能."/>
                </Steps>
            </div>
        );
    }
}

export default mapStateAndActions(MainContentHome);