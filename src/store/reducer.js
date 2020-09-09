import {storageGet, storageSave} from './storage';
import {SET_TITLE, SET_TOKEN} from './actionTypes';

const TOKEN_STORAGE_NAME = 'wechat_tools.merchant_token';
const getToken = () => {
    return storageGet(TOKEN_STORAGE_NAME);
};
const setToken = token => {
    storageSave(TOKEN_STORAGE_NAME, token);
};

const defaultState = {
    me: null,
    webToken: getToken(),
    title: {
        mainTitle: 'WechatTools',
        subTitle: 'WechatTools',
    },
};

const actionTable = {};
const registerReducer = (type, reducer) => {
    actionTable[type] = reducer;
};
registerReducer(SET_TOKEN, (state, action) => {
    const {token, merchant} = action;
    setToken(token);
    return {
        ...state,
        webToken: token,
        me: merchant,
    };
});
registerReducer(SET_TITLE, (state, action) => {
    return {
        ...state,
        title: {
            mainTitle: action.mainTitle,
            subTitle: action.subTitle,
        }
    };
});
export default (state = defaultState, action) => {
    const type = action.type;
    if (type in actionTable) {
        const handler = actionTable[type];
        return handler(state, action);
    }
    return state;
}
