import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getState } from '@reduxjs/toolkit';
import axios from 'axios';
const apirUrlFetchClients = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/`;
const apiUrlUploadAvatar = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/cloudUpload`;
const apiUrlRegisterClient = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/create`;

export const uploadAvatar = createAsyncThunk('clients/uploadAvatar', async (avatarFormData) => {
    try {
        const response = await axios.post(apiUrlUploadAvatar, avatarFormData);
        return response.data.avatar;
    } catch (error) {
        console.log(error)
        throw new Error('Errore durante l\'upload dell\'avatar');
    }
});

export const registerClient = createAsyncThunk('clients/registerDesigner', async (clientData,{ rejectWithValue }) => {
    try {
        const response = await axios.post(apiUrlRegisterClient, clientData);
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

export const fetchClientById = createAsyncThunk('clients/fetchClientById', async (clientId) => {
  try {
      const response = await axios.get(`${apirUrlFetchClients}${clientId}`);
      return response.data.client;
  } catch (error) {
    console.error('Errore durante il recupero dei progetti del designer', error);
    throw new Error('Errore durante il recupero dei progetti del designer');
  }
});

const clientsSlice = createSlice({
    name: 'client',
    initialState: {
      avatarURL: null,
      successMessage: null,
      isUploadLoading: true,
      client: null,
      clientIsLoading: true,
    },
    reducers: {
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
        .addCase(registerClient.fulfilled, (state, action) => {
          state.successMessage = action.payload.message;
        })
        .addCase(registerClient.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchClientById.fulfilled, (state, action) => {
          state.client = action.payload;
          state.clientIsLoading = false;
        })
        .addCase(fetchClientById.pending, (state, action) => {
          state.clientIsLoading = true;
        })
        .addCase(fetchClientById.rejected, (state, action) => {
          state.error = action.payload;
          state.clientIsLoading = false;
        })
    },
  });
  
  export default clientsSlice.reducer;