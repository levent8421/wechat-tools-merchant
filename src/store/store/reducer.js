import {ACTION_LOGIN, ACTION_SET_TITLE, ACTION_SET_TOKEN, ACTION_TOGGLE_LOGIN_DIALOG} from './actionTypes';

const TOKEN_STORAGE_NAME = 'wechat_tools.merchant_token';
const getToken = () => {
    return sessionStorage.getItem(TOKEN_STORAGE_NAME);
};
const setToken = token => {
    sessionStorage.setItem(TOKEN_STORAGE_NAME, token);
};
const defaultState = {
    admin: null,
    webToken: getToken(),
};

const actionTable = {};
const registerReducer = (type, reducer) => {
    actionTable[type] = reducer;
};

export default (state = defaultState, action) => {
    const type = action.type;
    if (type in actionTable) {
        const handler = actionTable[type];
        return handler(state, action);
    }
    return state;
}
