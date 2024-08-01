import {call,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
} from '../reducers/productReducer';
import { isAnyOf } from '@reduxjs/toolkit';

function * fetchProducts(){
    try{
        const response = yield call(axios.get, 'http://stating.php-dev.in:8844/trainingapp/api/products/getList',

        );
        yield put(fetchProductsSuccess(response.data.data)); 
    } catch (error: any){
        yield put(fetchProductsFailure(error.message))
    }
}

function * productSaga(): SagaIterator {
    yield takeLatest(fetchProductsRequest.type, fetchProducts);
    return undefined;
}
export default productSaga;
