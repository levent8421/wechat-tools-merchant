import {request} from './request';

export const fetchMyApps = () => {
    return request({
        url: '/api/token/invite-follow-app/',
        method: 'get',
    });
};

export const createInviteFollowApp = data => {
    return request({
        url: '/api/token/invite-follow-app/',
        method: 'put',
        data: data,
    });
};

export const setInviteFollowAppAsDefault = (appId, isDefault) => {
    return request({
        url: `/api/token/invite-follow-app/${appId}/defaultApp`,
        method: 'post',
        data: {
            defaultApp: isDefault,
        },
    });
};