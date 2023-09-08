import {configureStore} from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import designersReducer from './designersSlice';
import loginReducer from './usersSlice';
import clientsReducer from './clientsSlice';

export const store = configureStore({
    reducer: {
      projects: projectsReducer,
      designers: designersReducer,
      users: loginReducer,
      clients: clientsReducer
      // ... altri reducer se necessario ...
    },
  });