import {request} from './request';

export const fetchApps = () => {
    return request({
        url: '/api/token/app/',
        method: 'get',
    });
};
