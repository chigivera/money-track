import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import budgetReducer from './slice/budgetSlice';
import categoryReducer from './slice/categorySlice';
import transactionReducer from './slice/transactionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    budget: budgetReducer,
    category: categoryReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* Add any custom middleware here */),
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools only in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;