function loggedInReducer ({loggedIn = true}, action) {
    switch (action.type) {
        case "LOG_IN": {
            return true;
        }
        default: {
            return loggedIn;
        }
    }
};

export default loggedInReducer;