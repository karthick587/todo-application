import CommonActions from "./action"

const initialState = {
    loader: false,
    toaster: {
        open: false,
        message: ""
    }
}

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case CommonActions.SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }

    }
}
export default CommonReducer;