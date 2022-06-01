import {
  Action, 
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit';
import themeModeReducer from './reducers/darkMode';
import product from './reducers/product';
import auth from './reducers/auth';

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
    product,
    auth
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
