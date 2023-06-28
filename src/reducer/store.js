import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/auth/loginSlice';
import departmentsReducer from '../features/department/departmentsSlice';
import userReducer from '../features/user/userSlice'

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