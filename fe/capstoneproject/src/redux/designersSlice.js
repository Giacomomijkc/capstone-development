import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Definisci la thunk per l'upload dell'avatar
export const uploadAvatar = createAsyncThunk('designers/uploadAvatar', async (avatarFormData) => {
    try {
        const response = await axios.post('http://localhost:5050/designers/cloudUpload', avatarFormData);
        return response.data.avatar;
    } catch (error) {
        console.log(error)
        throw new Error('Errore durante l\'upload dell\'avatar');
    }
});

// Definisci la thunk per la registrazione del designer
export const registerDesigner = createAsyncThunk('designers/registerDesigner', async (designerData,{ rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5050/designers/create', designerData);
        //return response.data.payload;
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response && error.response.data && error.response.data.message) {
          // Se il backend restituisce un messaggio di errore, utilizza rejectWithValue per passare il messaggio al componente
          return rejectWithValue(error.response.data.message);
        } else {
          // Altrimenti, rilancia l'errore originale
          throw error;
        }
    }
});

const designersSlice = createSlice({
    name: 'designers',
    initialState: {
      avatarURL: null,
      successMessage: null,
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
      // ... altri campi dello stato ...
    },
    reducers: {
      // ... altre azioni e reducer ...
      setAvatarURL: (state, action) => {
        state.avatarURL = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadAvatar.fulfilled, (state, action) => {
          state.avatarURL = action.payload;
        })
        .addCase(registerDesigner.fulfilled, (state, action) => {
          // Gestisci la registrazione del designer qui, se necessario
          state.successMessage = action.payload.message;

          //perché non riesco qui a svuotare i campi / reindirizzare /
    
        })
        .addCase(registerDesigner.rejected, (state, action) => {
          // Gestisci l'errore qui
          state.error = action.payload;
        });
    },
  });
  
  export const { setAvatarURL } = designersSlice.actions;
  
  export default designersSlice.reducer;
