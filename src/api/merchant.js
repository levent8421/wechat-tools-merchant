import {request} from "./request";

export const merchantLogin = (loginName, password) => {
    return request({
        url: '/api/open/merchant/_login',
        method: 'post',
        data: {
            loginName,
            password,
        }
    });
};


export const currentMerchant = () => {
    return request({
        url: '/api/token/merchant/_me',
        method: 'get'
    });
};

export const setWechatInfo = (merchantId, wechatInfo) => {
    return request({
        url: `/api/token/merchant/${merchantId}/_wechat-info`,
        method: 'post',
        data: wechatInfo,
    });
};


export const resetPassword = passwordOptions => {
    return request({
        url: '/api/token/merchant/_reset-password',
        method: 'post',
        data: passwordOptions,
    });
};

export const updateMerchantInfo = merchant => {
    return request({
        url: '/api/token/merchant/_me',
        method: 'post',
        data: merchant,
    });
};


export const fetchQrCode = () => {
    return request({
        url: '/api/token/merchant/_qr-code',
        method: 'get',
    });
};