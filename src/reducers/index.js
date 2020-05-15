import hasErrorReducer from './hasErrorReducer.js';
import loggedInReducer from './loggedInReducer.js';

function reducer (state={}, action) {
    console.log(action.type);
    return {
        hasError: hasErrorReducer(state, action),
        loggedIn: loggedInReducer(state, action)
    };
}

export default reducer;