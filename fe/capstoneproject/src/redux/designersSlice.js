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
        //return response.data.payload;
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response && error.response.data && error.response.data.message) {
          // Se il backend restituisce un messaggio di errore, utilizza rejectWithValue per passare il messaggio al componente
          console.log(error.response.data.error.errors)
          return rejectWithValue(error.response.data.message);
        } else {
          // Altrimenti, rilancia l'errore originale
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
      isLogged: false,
      userId: null,
    },
    reducers: {
      // a cosa servirebbe qui?
      /*setAvatarURL: (state, action) => {
        state.avatarURL = action.payload;
      },*/
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
          // Gestisci la registrazione del designer qui, se necessario
          state.successMessage = action.payload.message;
          //perché non riesco qui a svuotare i campi / reindirizzare /
          //per modificare l'oggetto devo creare una copia
          /*state.designerData = {
            ...state.designerData,
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
          };*/
        })
        .addCase(registerDesigner.rejected, (state, action) => {
          // Gestisci l'errore qui
          state.error = action.payload;
        })
        .addCase(fetchDesigner.fulfilled, (state, action) => {
          state.designer = action.payload;
        })
        .addCase(fetchDesigners.fulfilled, (state, action) => {
          state.designers = action.payload;
        })
    },
  });
  
  export const { setAvatarURL, setUserId, setIsLogged } = designersSlice.actions;
  
  export default designersSlice.reducer;
