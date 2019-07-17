import { combineReducers } from 'redux';

const dummyReducer = () => {
    return {};
};

export default combineReducers({
    dummyData: dummyReducer
});
