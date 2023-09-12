import {configureStore} from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import designersReducer from './designersSlice';
import loginReducer from './usersSlice';
import clientsReducer from './clientsSlice';
import dealsReducer from './dealsSlice';

export const store = configureStore({
    reducer: {
      projects: projectsReducer,
      designers: designersReducer,
      users: loginReducer,
      clients: clientsReducer,
      deals: dealsReducer
      // ... altri reducer se necessario ...
    },
  });