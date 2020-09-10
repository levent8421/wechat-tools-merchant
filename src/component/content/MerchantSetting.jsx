import React, {Component} from 'react';
import {mapStateAndActions} from '../../store/storeUtils';

class MerchantSetting extends Component {
    componentDidMount() {
        this.props.setTitle('商户信息编辑', 'Edit my profiles!');
    }

    render() {
        return (
            <div className="merchant-setting">
                商户信息配置
            </div>
        );
    }
}

export default mapStateAndActions(MerchantSetting);
