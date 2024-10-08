import AuthActions from "./action";

const initialState = {
    isAuthenticated:false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActions.SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload
            }

    }
}
export default AuthReducer;