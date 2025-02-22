import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { guessWhatGameReducer } from "./gameSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "guessWhat"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    guessWhat: guessWhatGameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
