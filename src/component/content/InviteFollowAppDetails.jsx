import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';
import {Button, Card, DatePicker, Form, Input, message, Switch} from 'antd';
import {fetchOneInviteFollowApp, setAppBaseInfo} from '../../api/inviteFollowApp';
import {inviteFollowAppStateText} from '../../util/converter';
import {SketchPicker} from 'react-color';
import moment from 'moment';
import ImageUpload from '../commons/ImageUpload';

class InviteFollowAppDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: {},
            showColorPicker: false,
        };
    }

    componentDidMount() {
        this.props.setTitle('邀请关注抽奖应用详情', 'Invite Follow App Details');
        const {id} = this.props.match.params;
        this.refreshApp(id);
    }

    refreshApp(id) {
        fetchOneInviteFollowApp(id).then(res => {
            res.deadlineDate = res.deadline && moment(res.deadline);
            this.setState({app: res});
            this.baseForm.setFieldsValue(res);
        });
    }

    showColorPicker(show) {
        this.setState({showColorPicker: show});
    }

    setThemeColor(color) {
        const {app} = this.state;
        const {hex} = color;
        this.setState({
            app: {
                ...app,
                themeColor: hex,
            },
            showColorPicker: false,
        });
        this.baseForm.setFieldsValue({
            themeColor: hex,
        });
    }

    setDeadline(date) {
        const {app} = this.state;
        this.setState({
            app: {
                ...app,
                deadline: date,
            },
        });
    }

    setBaseInfo(data) {
        const {deadline, id} = this.state.app;
        delete data.deadlineDate;
        const appBaseData = {
            ...data,
            deadline: deadline,
            id: id,
        };
        setAppBaseInfo(appBaseData).then(res => {
            message.success(`应用[${res.title}]的基本信息已更新！`);
        });
    }

    render() {
        const {app, showColorPicker} = this.state;
        const stateText = inviteFollowAppStateText(app.state);
        const {themeColor} = app;
        return (
            <div className="invite-follow-app-details">
                <Card title="APP基础信息" extra={<span style={{color: stateText.color}}>{stateText.text}</span>}>
                    <Form name="base-info" ref={form => this.baseForm = form} onFinish={data => this.setBaseInfo(data)}>
                        <Form.Item name="title" label="标题" rules={[{required: true, message: '请输入标题'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="subtitle" label="副标题">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="footerText" label="底部文字">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="themeColor" label="主题颜色" required={true}>
                            <Input readOnly={true} onClick={() => this.showColorPicker(true)}/>
                        </Form.Item>
                        {
                            showColorPicker ?
                                <SketchPicker color={themeColor} onChange={color => this.setThemeColor(color)}/> : null
                        }
                        <Form.Item name="rulesText" label="规则描述">
                            <Input.TextArea autoSize={{minRows: 3, maxRows: 10,}} placeholder="请输入抽奖规则描述"/>
                        </Form.Item>
                        <Form.Item name="deadlineDate" label="结束日期">
                            <DatePicker allowClear={true} format="yyyy-MM-DD"
                                        onChange={(_, ds) => this.setDeadline(ds)}/>
                        </Form.Item>
                        <Form.Item name="phoneRequired" label="收集电话" valuePropName="checked">
                            <Switch disabled={true}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="基本图片">
                    <Form name="base-images">
                        <Form.Item label="Banner图片">
                            <ImageUpload url={`/api/token/invite-follow-app/${app.id}/banner-image`}
                                         name="bannerImageFile"
                                         previewUrl={app.bannerImage}
                                         onSuccess={data => this.setState({app: data})}/>
                        </Form.Item>
                        <Form.Item label="抽奖按钮图片">
                            <ImageUpload url={`/api/token/invite-follow-app/${app.id}/button-image`}
                                         name="buttonImageFile"
                                         previewUrl={app.buttonImage}
                                         onSuccess={data => this.setState({app: data})}/>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default mapStateAndActions(InviteFollowAppDetails);