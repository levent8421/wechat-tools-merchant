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


export const updatePrizeInfo = prize => {
    return request({
        url: `/api/token/invite-follow-prize/${prize.id}`,
        method: 'post',
        data: prize,
    });
};

export const togglePrizeState = id => {
    return request({
        url: `/api/token/invite-follow-prize/${id}/_toggle-state`,
        method: 'post',
    });
};