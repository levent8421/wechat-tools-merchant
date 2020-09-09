import {SET_TITLE, SET_TOKEN} from './actionTypes';

export const setToken = (token, merchant) => {
    return {
        type: SET_TOKEN,
        merchant: merchant,
        token: token,
    }
};
export const setTitle = (mainTitle, subTitle) => {
    return {
        type: SET_TITLE,
        mainTitle,
        subTitle,
    }
};