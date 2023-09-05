import {configureStore} from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import designersReducer from './designersSlice';
import loginReducer from './usersSlice';

export const store = configureStore({
    reducer: {
      projects: projectsReducer,
      designers: designersReducer,
      users: loginReducer
      // ... altri reducer se necessario ...
    },
  });