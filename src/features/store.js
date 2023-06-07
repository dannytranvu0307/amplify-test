import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './auth/loginSlice';
import departmentsReducer from './department/departmentsSlice';
import userReducer from './user/userSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    departments: departmentsReducer,
    user: userReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});