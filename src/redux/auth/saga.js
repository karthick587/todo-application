import { all, takeEvery } from "redux-saga/effects"
import CommonActions from "../common/action";

const AuthSaga = function* () {
    yield all([
        yield takeEvery(CommonActions,)
    ])
}

const Login = function* (data) {
    const { payload } = data
    

}

export default AuthSaga;