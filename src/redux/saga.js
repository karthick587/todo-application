import { all } from "redux-saga/effects";
import AuthSaga from "./auth/saga";

const RootSaga = function* () {
    yield all([
        AuthSaga(),
    ])
}

export default AuthSaga;