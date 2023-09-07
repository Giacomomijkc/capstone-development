import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlLogin = `${process.env.REACT_APP_SERVER_BASE_URL}/login`;
const apiUrlFetchDesigners = `${process.env.REACT_APP_SERVER_BASE_URL}/designers/`;
const apiUrlFetchClients = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/`;

export const login = createAsyncThunk('users/login', async (userLoginData,{ rejectWithValue }) => {
    try {
        const response = await axios.post(apiUrlLogin, userLoginData);
        const { data } = response;
    
        localStorage.setItem('userLoggedIn', JSON.stringify(data.token));
    
        return data;
    } catch (error) {
      console.log(error)
        if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
        } else {
          // Altrimenti, rilancia l'errore originale
          throw error;
        }
        /*const errorMessage = error.response?.data?.message || 'An error occurred during login';
        const dispatch = useDispatch();
        dispatch(setError(errorMessage));
        throw error;*/
    }
}) 

export const getDesignerDetails = createAsyncThunk('users/getDesignerDetails', async (designerId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${apiUrlFetchDesigners}${designerId}`);
      return response.data;
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})

export const getClientDetails = createAsyncThunk('users/getClientDetails', async (clientId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${apiUrlFetchDesigners}${clientId}`);
      return response.data;
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        designer: null,
        client: null,
        token: null,
        loading: false,
        successMessage: null,
        error: null,
        role: null,
    },
    isLogged: false,
    reducers: {
        // Aggiungi delle azioni sincrone, ad esempio per impostare l'utente o gestire gli errori
        /*setUser: (state, action) => {
          state.user = action.payload;
        },*/
        setError: (state, action) => {
          state.error = action.payload;
        },
        setRole: (state, action) => {
          state.role = action.payload;
        },
        setIsLogged: (state, action) => {
          state.isLogged = action.payload
        },
        setToken: (state, action) => {
          state.token = action.payload
        }
      },
      extraReducers: (builder) => {
        // Gestisci le azioni createAsyncThunk, come il caricamento in corso
        builder
          .addCase(login.pending, (state) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.token = localStorage.getItem('userLoggedIn');
            state.isLogged = localStorage.getItem('userLoggedIn');
            state.successMessage = action.payload.message;
            state.role = action.payload.role
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            //state.error = action.error.message || 'An error occurred during login';
            state.error = action.payload;
          })
          .addCase(getDesignerDetails.fulfilled, (state, action) => {
            state.designer = action.payload;
        })
        .addCase(getDesignerDetails.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(getClientDetails.fulfilled, (state, action) => {
          state.client = action.payload;
      })
      .addCase(getClientDetails.rejected, (state, action) => {
          state.error = action.payload;
      });
      },
});

export const { setUser, setError, setRole, setIsLogged, setToken } = loginSlice.actions;

export default loginSlice.reducer;