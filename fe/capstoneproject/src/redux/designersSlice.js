import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getState } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlUploadAvatar = `${process.env.REACT_APP_SERVER_BASE_URL}/designers/cloudUpload`;
const apiUrlRegisterDesigner = `${process.env.REACT_APP_SERVER_BASE_URL}/designers/create`;
const apiUrlFetchDesigners = `${process.env.REACT_APP_SERVER_BASE_URL}/designers/`;

export const uploadAvatar = createAsyncThunk('designers/uploadAvatar', async (avatarFormData) => {
    try {
        const response = await axios.post(apiUrlUploadAvatar, avatarFormData);
        return response.data.avatar;
    } catch (error) {
        console.log(error)
        throw new Error('Errore durante l\'upload dell\'avatar');
    }
});

export const registerDesigner = createAsyncThunk('designers/registerDesigner', async (designerData,{ rejectWithValue }) => {
    try {
        const response = await axios.post(apiUrlRegisterDesigner, designerData);
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.error.errors)
          return rejectWithValue(error.response.data.message);
        } else {
          throw error;
        }
    }
});

export const fetchDesigner = createAsyncThunk('designers/fetchDesigner', async (_, {getState}) => {


  try {
    const userId = getState().designers.userId;  
    const response = await axios.get(apiUrlFetchDesigners+userId);
    return response.data.designer;
  } catch (error) {
    console.error('Errore durante il recupero dei dati del designer', error);
    throw new Error('Errore durante il recupero dei dati del designer');
  }
});

export const fetchDesigners = createAsyncThunk('designers/fetchDesigners', async () => {
  try {
    const response = await axios.get(apiUrlFetchDesigners);
    return response.data.designers;
  } catch (error) {
    console.error('Errore durante il recupero dei dati dei designers', error);
    throw new Error('Errore durante il recupero dei dati dei designers');
  }
});

export const fetchDesignerById = createAsyncThunk('designers/fetchDesignerById', async (designerId) => {
  try {
    const response = await axios.get(`${apiUrlFetchDesigners}${designerId}`);
    return response.data.designer;
  } catch (error) {
    console.error('Errore durante il recupero dei dati del designer', error);
    throw new Error('Errore durante il recupero dei dati del designer');
  }
});

export const fetchProjectsLikedByDesigner = createAsyncThunk('designers/fetchProjectsLikedByDesigner', async (designerId) => {
  try {
    const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await axios.get(`${apiUrlFetchDesigners}${designerId}/liked_projects`, {
      headers: { 'Authorization': `${token}` }
  });
    console.log(response.data.likedProjects)
    return response.data.likedProjects;
  } catch (error) {
    console.log(error)
    console.error('Errors occuring while fetching liked projects', error);
    throw new Error('Errors occuring while fetching liked projects');
  }
});

const designersSlice = createSlice({
    name: 'designers',
    initialState: {
      avatarURL: null,
      successMessage: null,
      isUploadLoading: true,
      designerData: {
        surname: '',
        nickname: '',
        description: '',
        tags: [],
        website: '',
        instagram: '',
        email: '',
        password: '',
        address: '',
        vatOrCf: '',
      },
      likedProjects: [],
      isLikedProjectsLoading: true,
      userId: null,
      singleDesigner: null, 
    },
    reducers: {
      setUserId: (state, action) => {
        state.userId = action.payload;
      },
      setIsLogged: (state, action) => {
        state.isLogged = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadAvatar.pending, (state, action) => {
          state.isUploadLoading = true;
        })
        .addCase(uploadAvatar.fulfilled, (state, action) => {
          state.avatarURL = action.payload;
          state.isUploadLoading = false;
        })
        .addCase(uploadAvatar.rejected, (state, action) => {
          state.isUploadLoading = false;
        })
        .addCase(registerDesigner.fulfilled, (state, action) => {
          state.successMessage = action.payload.message;
        })
        .addCase(registerDesigner.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchDesigner.fulfilled, (state, action) => {
          state.designer = action.payload;
        })
        .addCase(fetchDesigner.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchDesigners.fulfilled, (state, action) => {
          state.designers = action.payload;
        })
        .addCase(fetchDesigners.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchDesignerById.fulfilled, (state, action) => {
          state.singleDesigner = action.payload;
        })
        .addCase(fetchDesignerById.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchProjectsLikedByDesigner.fulfilled, (state, action) =>{
          state.likedProjects = action.payload
          state.isLikedProjectsLoading = false
        })
        .addCase(fetchProjectsLikedByDesigner.pending, (state, action) =>{
          state.likedProjects = action.payload
          state.isLikedProjectsLoading = true
        })
        .addCase(fetchProjectsLikedByDesigner.rejected, (state, action) =>{
          state.error = action.payload
          state.isLikedProjectsLoading = false
        })
    },
  });
  export const { setUserId } = designersSlice.actions;
  
  export default designersSlice.reducer;
