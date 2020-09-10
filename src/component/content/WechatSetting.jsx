import React, {Component} from 'react';
import './WechatSetting.less';
import {mapStateAndActions} from '../../store/storeUtils';
import {Alert, Button, Card, Form, Input, message, Select} from 'antd';
import store from '../../store';
import {setWechatInfo} from '../../api/merchant';
import {findStrategyByMerchant, setTokenStrategy} from '../../api/tokenStrategy';

const TokenFetchStrategies = [
    {
        code: 1,
        name: '标准微信接口',
    },
    {
        code: 2,
        name: 'HTTP JSON API(不可用)',
        disabled: true,
    },
    {
        code: 3,
        name: 'HTTP XML API(不可用)',
        disabled: true,
    },
];

const StrategyFormItemRenders = {
    1: () => {
        return (<Alert message="该策略无需配置其他信息!" type="success"/>);
    }
};

class WechatSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            merchant: {},
            selectedStrategyCode: -1,
            strategy: {},
        };
    }

    componentDidMount() {
        this.props.setTitle('微信公众号配置', 'wechat setting');
        this.subscribeStore();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    fetchTokenStrategy(merchant) {
        findStrategyByMerchant(merchant.id).then(res => {
            this.setState({strategy: res});
            if (this.strategyForm) {
                this.strategyForm.setFieldsValue(res);
            }
        });
    }

    loadMerchant() {
        const state = store.getState();
        const merchant = state.me;
        if (!merchant) {
            console.log('null merchant');
            return;
        }
        this.setState({merchant: merchant});
        if (this.wechatForm) {
            const formValues = {
                wechatAppId: merchant.wechatAppId,
                wechatSecret: merchant.wechatSecret,
            };
            this.wechatForm.setFieldsValue(formValues);
        }
        this.fetchTokenStrategy(merchant);
    }

    subscribeStore() {
        if (this.props.me) {
            this.loadMerchant();
            return;
        }
        this.unsubscribe = store.subscribe(() => {
            this.loadMerchant();
        });
    }

    setWechatInfo(data) {
        const {merchant} = this.state;
        setWechatInfo(merchant.id, data).then(() => {
            message.success('微信配置已生效！');
        });
    }

    onStrategyChange(code) {
        this.setState({selectedStrategyCode: code})
    }

    setTokenStrategy(data) {
        const {merchant} = this.state;
        setTokenStrategy(merchant.id, data).then(() => {
            message.success('配置已生效');
        })
    }

    render() {
        const {merchant, selectedStrategyCode, strategy} = this.state;
        const strategyFormRender = StrategyFormItemRenders[selectedStrategyCode];
        return (
            <div className="wechat-setting">
                <Card title="微信公众号配置" extra={merchant.name}>
                    <p className="kvp">
                        <b className="label">商户名称:</b>
                        <span className="value">{merchant.name}</span>
                    </p>
                    <Form name="wechatForm" ref={form => this.wechatForm = form}
                          onFinish={data => this.setWechatInfo(data)}>
                        <Form.Item name="wechatAppId" label="微信公众号APP ID"
                                   rules={[{required: true, message: '请输入APP_ID'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="wechatSecret" label="微信公众号Secret"
                                   rules={[{required: true, message: '请输入Secret'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">使用配置</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="微信令牌获取策略配置" extra="wechat token fetch strategy">
                    <Form ref={form => this.strategyForm = form} onFinish={data => this.setTokenStrategy(data)}>
                        <Form.Item label="获取策略" name="strategyCode" rules={[{required: true, message: '请选择获取策略'}]}>
                            <Select onChange={(code) => this.onStrategyChange(code)} defaultActiveFirstOption={true}>
                                {
                                    TokenFetchStrategies.map(strategy => (
                                        <Select.Option value={strategy.code}
                                                       key={strategy.code}
                                                       disabled={strategy.disabled}>
                                            {strategy.name}
                                        </Select.Option>))
                                }
                            </Select>
                        </Form.Item>
                        {
                            strategyFormRender && strategyFormRender(merchant, strategy)
                        }
                        <Form.Item>
                            <Button htmlType="submit" type="primary">使用配置</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default mapStateAndActions(WechatSetting);
