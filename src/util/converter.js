import {ERROR, PRIMARY, STRESS, WARN} from '../context/colors';
import dateformat from 'dateformat';

const INVITE_FOLLOW_APP_STATE_TABLE = {
    0x01: {
        text: '待审核',
        color: PRIMARY,
    },
    0x02: {
        text: '已上线',
        color: STRESS,
    },
    0x03: {
        text: '未通过',
        color: ERROR,
    },
    0x04: {
        text: '已下线',
        color: WARN,
    },
};
export const inviteFollowAppStateText = state => {
    if (INVITE_FOLLOW_APP_STATE_TABLE.hasOwnProperty(state)) {
        return INVITE_FOLLOW_APP_STATE_TABLE[state];
    }
    return {
        text: `Error:${state}`,
        color: ERROR,
    };
};

export const formatDate = date => {
    return dateformat(date, 'yyyy-MM-dd');
};