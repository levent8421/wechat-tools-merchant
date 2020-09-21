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

export const fetchOneInviteFollowApp = id => {
    return request({
        url: `/api/token/invite-follow-app/${id}`,
        method: 'get',
    });
};

export const setAppBaseInfo = data => {
    return request({
        url: `/api/token/invite-follow-app/${data.id}/_base-info`,
        method: 'post',
        data: data,
    });
};

export const deleteImage = (id, index) => {
    return request({
        url: `/api/token/invite-follow-app/${id}/image`,
        method: 'delete',
        params: {
            index: index,
        }
    });
};