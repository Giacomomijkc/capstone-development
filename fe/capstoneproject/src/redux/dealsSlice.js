import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchDeals = `${process.env.REACT_APP_SERVER_BASE_URL}/deals/`;

export const fetchDesignerDeals = createAsyncThunk('deals/fetchDesignerDeals', async (designerId) =>{
    try {
      const response = await axios.get(`${apiUrlFetchDeals}designer/${designerId}`);
      console.log(response.data.deals)
      return response.data.deals;
    } catch (error) {
      console.error('Errore durante il recupero dei progetti del designer', error);
      throw new Error('Errore durante il recupero dei progetti del designer');
    }
  })

  const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
      designerDeals: [],
      isLoading: true,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchDesignerDeals.fulfilled, (state, action) => {
        state.designerDeals = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDesignerDeals.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchDesignerDeals.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
    },
  });
  
  
  export default dealsSlice.reducer;