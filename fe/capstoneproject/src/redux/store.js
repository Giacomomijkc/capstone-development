import {configureStore} from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import designersReducer from './designersSlice';

export const store = configureStore({
    reducer: {
      projects: projectsReducer,
      designers: designersReducer
      // ... altri reducer se necessario ...
    },
  });