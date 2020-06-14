function loggedInReducer ({loggedIn = true}, action) {
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