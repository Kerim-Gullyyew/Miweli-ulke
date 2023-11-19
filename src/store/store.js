import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import infoSlice from './features/info/infoSlice';
import productSlice from './features/product/productSlice';
import authSlice from './features/auth/authSlice';
import aboutSlice from './features/about/aboutSlice';
import langSlice from './features/lang/langSlice'; 
import cartSlice from './features/cart/cartSlice';
import wishlistSlice from './features/wishlist/wishlistSlice';
import deliverySlice from './features/delivery/deliverySlice';
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


const persistConfig = {
    key: "Sowgatlar",
    version: 1.1,
    storage,
};


export const rootReducer = combineReducers({
    info: infoSlice,
    product: productSlice,
    auth: authSlice,
    about: aboutSlice,
    lang: langSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    delivery: deliverySlice,
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