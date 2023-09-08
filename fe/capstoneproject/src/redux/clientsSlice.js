import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getState } from '@reduxjs/toolkit';
import axios from 'axios';
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

const clientsSlice = createSlice({
    name: 'client',
    initialState: {
      avatarURL: null,
      successMessage: null,
      isUploadLoading: true,
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
    },
  });
  
  export default clientsSlice.reducer;