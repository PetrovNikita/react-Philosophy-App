function loggedInReducer ({loggedIn = false}, action) {
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