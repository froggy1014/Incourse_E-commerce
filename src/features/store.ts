// //@delete:line
import counterSlice from '@features/counter/counterSlice';
import detailReviewsSlice from '@features/detailReview/detailReviewSlice';
import paymentSlice from '@features/payment/paymentSlice';
// import modalSlice from '@features/modal/modalSlice';
import pgSlice from '@features/pg/pgSlice';
import userSlice from '@features/user/userSlice';

import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
  return configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      // [modalSlice.name]: modalSlice.reducer,
      [pgSlice.name]: pgSlice.reducer,
      [detailReviewsSlice.name]: detailReviewsSlice.reducer,
      [paymentSlice.name]: paymentSlice.reducer,
    },
  });
}

const store = makeStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
