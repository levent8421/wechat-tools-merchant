import {connect} from 'react-redux';

const mapAllState2Props = (state, props) => {
    return {
        ...props,
        ...state,
    };
};
const mapAllAction2Props = (dispatch, props) => {
    return {
        ...props,
    };
};

export const mapStateAndActions = component => {
    return connect(mapAllState2Props, mapAllAction2Props)(component);
};
