function logIn () {
    return {
        type: "LOG_IN"
    }
}

function logOut () {
    return {
        type: "LOG_OUT"
    }
}

function toggleNav () {
    return {
        type: "TOGGLE_SHOW_NAVIGATION"
    }
}

export {logIn, logOut, toggleNav};