import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import loginSlice from '../features/auth/login/loginSlice';
import batchSlice from '../features/batch/batch/batchSlice';
import batchAttributeSlice from '../features/batch/attribute/batchAttributeSlice';
import featuresSlice from '../features/featuresSlice';
import batchDetailSlice from '../features/batch/batch/batchDetailSlice';
import containerSlice from '../features/batch/container/containerSlice';
import containerDetailSlice from '../features/batch/container/containerDetailSlice';
import containerAttributeSlice from '../features/batch/container/attribute/containerAttributeSlice';
import stockSlice from '../features/stock/stockSlice';
import productSlice from '../features/product/product/productSlice';
import productDetailSlice from '../features/product/product/productDetailSlice';
import productAttributeSlice from '../features/product/attribute/productAttributeSlice';
import productUnitSlice from '../features/product/unit/productUnitSlice';
import containerPalletSlice from '../features/batch/container/pallet/containerPalletSlice';
import palletAttributeSlice from '../features/batch/container/pallet/attribute/palletAttributeSlice';
import cameraSlice from '../features/stock/cameraSlice';
import transferSlice from '../features/transfer/transferSlice';
import transferDetailSlice from '../features/transfer/transferDetailSlice';
import transferAttributeSlice from '../features/transfer/attribute/transferAttributeSlice';
import moveSlice from '../features/move/moveSlice';
import moveDetailSlice from '../features/move/moveDetailSlice';
import reduceSlice from '../features/reduce/reduceSlice';
import reduceDetailSlice from '../features/reduce/reduceDetailSlice';
import cellSlice from '../features/stock/cellSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { ImOffice } from 'react-icons/im';


const persistConfig = {
    key: "Miweli_Ulke",
    version: 1.1,
    storage,
};


export const rootReducer = combineReducers({
    login: loginSlice,
    batch: batchSlice,
    views: featuresSlice,
    batchDetail: batchDetailSlice,
    batchAttribute: batchAttributeSlice,
    container: containerSlice,
    containerDetail: containerDetailSlice,
    containerAttribute: containerAttributeSlice,
    product: productSlice,
    productDetail: productDetailSlice,
    productAttribute: productAttributeSlice,
    productUnit: productUnitSlice,
    containerPallet: containerPalletSlice,
    palletAttribute: palletAttributeSlice,
    stock: stockSlice,
    camera: cameraSlice,
    cell: cellSlice,
    transfer: transferSlice,
    transferDetail: transferDetailSlice,
    transferAttribute: transferAttributeSlice,
    move: moveSlice,
    moveDetail: moveDetailSlice,
    reduce: reduceSlice,
    reduceDetail: reduceDetailSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);