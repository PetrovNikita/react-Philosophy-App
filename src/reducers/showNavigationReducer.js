export const showNavigationReducer = ({showNavigation = false}, action) => {
    switch (action.type) {
        case "TOGGLE_SHOW_NAVIGATION": {
            return !showNavigation;
        }
        default: {
            return showNavigation;
        }
    }
}