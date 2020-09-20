import React, {Component} from 'react';
import {Button, message, Upload} from "antd";
import {mapStateAndActions} from '../../store/storeUtils';
import PropTypes from 'prop-types';
import './ImageUpload.less';

class ImageUpload extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        previewUrl: PropTypes.string,
        onSuccess: PropTypes.func.isRequired,
    };
    static  defaultProps = {
        method: 'post',
        name: 'file',
        alt: '图片',
        onSuccess: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onUploadStateChange(e) {
        const {file} = e;
        if (file.status === 'done') {
            const {name, response} = file;
            if (response.code === 200) {
                this.props.onSuccess(response.data);
                message.success(`文件[${name}]上传成功！`);
            } else {
                message.error(response.msg);
            }
        }
    }

    render() {
        const {webToken, url, method, name, alt, previewUrl} = this.props;
        return (
            <Upload headers={{'X-Token': webToken}}
                    action={url}
                    method={method}
                    name={name}
                    showUploadList={false}
                    onChange={file => this.onUploadStateChange(file)}>
                {previewUrl ? <img alt={alt} src={previewUrl} className="preview-img"/> :
                    <Button type="primary">点击上传图片</Button>}
            </Upload>
        );
    }
}

export default mapStateAndActions(ImageUpload);