import hasErrorReducer from './hasErrorReducer.js';
import loggedInReducer from './loggedInReducer.js';
import { showNavigationReducer } from './showNavigationReducer.js';

function reducer (state={}, action) {
    console.log(action.type);
    return {
        hasError: hasErrorReducer(state, action),
        loggedIn: loggedInReducer(state, action),
        showNavigation: showNavigationReducer(state, action)
    };
}

export default reducer;