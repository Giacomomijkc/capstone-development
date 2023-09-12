import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchProjects = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/`;
const apirUrlFetchCoverProjectUpload = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/cover/upload`;
const apiUrlFetchImagesProjectUpload = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/images/upload`;
const apiUrlFetchProjectUpload = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/create`;

// Crea un'azione asincrona per ottenere i progetti

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  try {
    const response = await axios.get('http://localhost:5050/projects/');
    return response.data.projects;
  } catch (error) {
    console.log(error)
    throw new Error('Errors uploading cover'); 
  }
});

// Crea un'azione asincrona per caricare una cover per un progetto
export const uploadCover = createAsyncThunk('projects/uploadCover', async (coverFormData) => {
  try {
    const response = await axios.post(apirUrlFetchCoverProjectUpload, coverFormData);
    return response.data.cover;
  } catch (error) {
    console.log(error)
        throw new Error('Errors uploading cover');
  }
});

// Crea un'azione asincrona per aggiornare la cover di un progetto
export const updateCover = createAsyncThunk('projects/updateCover', async ({ projectId, cover }) => {
    const formData = new FormData();
    formData.append('cover', cover);
  
    const response = await axios.patch(`http://localhost:5050/projects/${projectId}/cover/update`, formData);
    return response.data.cover;
});

// Crea un'azione asincrona per caricare immagini per un progetto
export const uploadImages = createAsyncThunk('projects/uploadImages', async (imagesFormData) => {
    try {
      const response = await axios.post(apiUrlFetchImagesProjectUpload, imagesFormData);
      return response.data.images;
    } catch (error) {
      console.log(error)
      throw new Error('Errors uploading images');
    }
});

// Crea un'azione asincrona per aggiornare le immagini di un progetto
export const updateImages = createAsyncThunk('projects/updateImages', async ({ projectId, images }) => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
  
    const response = await axios.patch(`http://localhost:5050/projects/${projectId}/images/update`, formData);
    return response.data.images;
});

// Crea un'azione asincrona per creare un nuovo progetto
export const createProject = createAsyncThunk('projects/createProject', async (projectData,{ rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(apiUrlFetchProjectUpload, projectData, {
        headers: { 'Authorization': `${token}` }
    })
      return response.data.createdProject
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.error.errors)
        return rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
});

// Crea un'azione asincrona per ottenere un progetto singolo
export const fetchSingleProject = createAsyncThunk('projects/fetchSingleProject', async (projectId) => {
  try {
    const response = await axios.get(`${apiUrlFetchProjects}${projectId}`);
    console.log(response.data.project)
    return response.data.project;
  } catch (error) {
    console.error('Errore durante il recupero dei dati del progetto', error);
    throw new Error('Errore durante il recupero dei dati del progetto');
  }
});

//Crea un'azione asincrona per ottenere i projects di un designer
export const fetchDesignerProjects = createAsyncThunk('projects/fetchDesignerProjects', async (designerId) =>{
  try {
    const response = await axios.get(`${apiUrlFetchProjects}designer/${designerId}`);
    return response.data.projects;
  } catch (error) {
    console.error('Errore durante il recupero dei progetti del designer', error);
    throw new Error('Errore durante il recupero dei progetti del designer');
  }
})

export const fetchDesignerLikedProjects = createAsyncThunk('projects-liked/fetchDesignerLikedProjects', async (designerId) =>{
  try {
    const response = await axios.get(`${apiUrlFetchProjects}liked/designer/${designerId}`);
    return response.data.liked_projects;
  } catch (error) {
    console.error('Errore durante il recupero dei progetti del designer', error);
    throw new Error('Errore durante il recupero dei progetti del designer');
  }
})

//crea un'azione asincrona per mettere/togliere like a un progetto
export const toggleLike = createAsyncThunk('projects/toggleLike', async (projectId, { rejectWithValue, getState }) => {
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(`${apiUrlFetchProjects}${projectId}/like`, {}, {
          headers: { 'Authorization': `${token}` }
      });
      const {updatedProject} = response.data;
      console.log(response);
      console.log(updatedProject)
      return updatedProject
  } catch (error) {
    console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})

//crea una seconda azione asincrona per mettere/togliere al componente SingleProject
export const toggleSingleProjectLike = createAsyncThunk('projects/toggleSingleProjectLike', async (projectId, { rejectWithValue, getState }) => {
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(`${apiUrlFetchProjects}${projectId}/like`, {}, {
          headers: { 'Authorization': `${token}` }
      });
      const {updatedSingleProject} = response.data;
      console.log(response);
      console.log(updatedSingleProject)
      return updatedSingleProject
  } catch (error) {
    console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    singleProject: {},
    isSingleProjectLoading: true,
    singleProjectComponent: {},
    projects: [],
    liked_projects: [],
    isLikedProjectsLoading: true,
    isDesignerProjectsLoading: true,
    designerProjects: [],
    isUploadingCover: true,
    isUploadingImages: true,
    coverURL: null,
    imagesURL: null,
    successMessage: null,
    createdProject: null
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    })
    .addCase(fetchSingleProject.fulfilled, (state, action) => {
      state.singleProject = action.payload
      state.isSingleProjectLoading = false
    })
    .addCase(fetchSingleProject.pending, (state, action) => {
      state.isSingleProjectLoading = true
    })
    .addCase(fetchSingleProject.rejected, (state, action) => {
      state.isSingleProjectLoading = false
    })
    .addCase(fetchDesignerProjects.fulfilled, (state, action) => {
      state.designerProjects = action.payload
      state.isDesignerProjectsLoading= false
    })
    .addCase(fetchDesignerProjects.pending, (state, action) => {
      state.isDesignerProjectsLoading= true
    })
    .addCase(fetchDesignerProjects.rejected, (state, action) => {
      state.error= action.payload
      state.isDesignerProjectsLoading= false
    })
    .addCase(toggleLike.fulfilled, (state, action) => {
      state.singleProject = action.payload;
    })
    .addCase(toggleLike.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(toggleSingleProjectLike.fulfilled, (state, action) => {
      state.singleProjectComponent = action.payload;
    })
    .addCase(toggleSingleProjectLike.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(uploadCover.rejected, (state, action) => {
      state.error = action.payload;
      state.isUploadingCover = false;
    })
    .addCase(uploadCover.pending, (state, action) => {
      state.isUploadingCover = true;
    })
    .addCase(uploadCover.fulfilled, (state, action) => {
      state.coverURL = action.payload;
      state.isUploadingCover = false;
    })
    .addCase(uploadImages.rejected, (state, action) =>{
      state.error = action.payload;
      state.isUploadingImages = false;
    })
    .addCase(uploadImages.pending, (state, action) =>{
      state.isUploadingImages = true;
    })
    .addCase(uploadImages.fulfilled, (state, action) =>{
      state.imagesURL = action.payload;
      state.isUploadingImages = false;
    })
    .addCase(createProject.rejected, (state, action) =>{
      state.error = action.payload;
    })
    .addCase(createProject.fulfilled, (state, action) =>{
      state.createdProject = action.payload;
    })
    .addCase(fetchDesignerLikedProjects.fulfilled, (state, action) => {
      state.liked_projects = action.payload;
      state.isLikedProjectsLoading = false;
    })
    .addCase(fetchDesignerLikedProjects.rejected, (state, action) => {
      state.error = action.payload;
      state.isLikedProjectsLoading = false;
    })
    .addCase(fetchDesignerLikedProjects.pending, (state, action) => {
      state.isLikedProjectsLoading = true;
    })
  },
});

export const { setCurrentPage } = projectsSlice.actions;

export default projectsSlice.reducer;
