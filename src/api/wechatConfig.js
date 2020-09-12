import {request} from './request';

export const fetchWechatConfig = () => {
    return request({
        url: '/api/token/verify-file/_wechat-platform',
        method: 'get',
    });
};

export const enableFile = file => {
    return request({
        url: '/api/token/verify-file/_enable',
        method: 'post',
        data: {
            fileName: file,
        }
    });
};