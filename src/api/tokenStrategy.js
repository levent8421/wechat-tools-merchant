import {request} from './request';

export const findStrategyByMerchant = merchantId => {
    return request({
        url: '/api/token/token-strategy/_by-merchant',
        method: 'get',
        params: {
            merchantId: merchantId
        }
    });
};

export const setTokenStrategy = (merchantId, options) => {
    return request({
        url: `/api/token/token-strategy/merchant/${merchantId}`,
        method: 'post',
        data: options,
    });
};
