import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Crea un'azione asincrona per ottenere i progetti
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get('http://localhost:5050/projects/');
  return response.data.projects;
});

// Crea un'azione asincrona per caricare una cover per un progetto
export const uploadCover = createAsyncThunk('projects/uploadCover', async (cover) => {
    const formData = new FormData();
    formData.append('cover', cover);
  
    const response = await axios.post('http://localhost:5050/projects/cover/upload', formData);
    return response.data.cover;
});

// Crea un'azione asincrona per aggiornare la cover di un progetto
export const updateCover = createAsyncThunk('projects/updateCover', async ({ projectId, cover }) => {
    const formData = new FormData();
    formData.append('cover', cover);
  
    const response = await axios.patch(`http://localhost:5050/projects/${projectId}/cover/update`, formData);
    return response.data.cover;
});

// Crea un'azione asincrona per caricare immagini per un progetto
export const uploadImages = createAsyncThunk('projects/uploadImages', async (images) => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
  
    const response = await axios.post('http://localhost:5050/projects/images/upload', formData);
    return response.data.images;
});

// Crea un'azione asincrona per aggiornare le immagini di un progetto
export const updateImages = createAsyncThunk('projects/updateImages', async ({ projectId, images }) => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
  
    const response = await axios.patch(`http://localhost:5050/projects/${projectId}/images/update`, formData);
    return response.data.images;
});

// Crea un'azione asincrona per creare un nuovo progetto
export const createProject = createAsyncThunk('projects/createProject', async (projectData) => {
    const response = await axios.post('http://localhost:5050/projects/create', projectData);
    return response.data.project;
});

// Crea un'azione asincrona per ottenere un progetto singolo
export const fetchSingleProject = createAsyncThunk('projects/fetchSingleProject', async (projectId) => {
    const response = await axios.get(`http://localhost:5050/projects/${projectId}`);
    return response.data.project;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
    
    .addCase(fetchProjects.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default projectsSlice.reducer;
