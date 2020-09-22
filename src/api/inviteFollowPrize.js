import {request} from './request';

export const fetchPrizesByApp = appId => {
    return request({
        url: `/api/token/invite-follow-prize/_by-app`,
        method: 'get',
        params: {
            appId
        },
    });
};


export const createPrizeWithAppId = (data) => {
    return request({
        url: '/api/token/invite-follow-prize/',
        method: 'put',
        data: data,
    });
};
