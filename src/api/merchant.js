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