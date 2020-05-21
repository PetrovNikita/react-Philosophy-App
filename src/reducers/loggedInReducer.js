function loggedInReducer ({loggedIn = false}, action) {
    switch (action.type) {
        case "LOG_IN": {
            return true;
        }
        case "LOG_OUT": {
            return false;
        }
        default: {
            return loggedIn;
        }
    }
};

export default loggedInReducer;