import { all, takeEvery } from "redux-saga/effects"

const CommonSaga = function* () {
    yield all([
        yield takeEvery()
    ])
}