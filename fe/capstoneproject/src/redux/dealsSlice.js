import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchDeals = `${process.env.REACT_APP_SERVER_BASE_URL}/deals/`;

export const fetchDesignerDeals = createAsyncThunk('deals/fetchDesignerDeals', async (designerId) =>{
    try {
      const response = await axios.get(`${apiUrlFetchDeals}designer/${designerId}`);
      console.log(response.data.deals)
      return response.data.deals;
    } catch (error) {
      console.error('Errors occuring while loading designer deals', error);
      throw new Error('Errors occuring while loading designer deals');
    }
  })

export const fetchClientDeals = createAsyncThunk('deals/fetchClientDeals', async (clientId) =>{
    try {
      const response = await axios.get(`${apiUrlFetchDeals}client/${clientId}`);
      console.log(response.data.deals)
      return response.data.deals;
    } catch (error) {
      console.error('Errors occuring while loading client deals', error);
      throw new Error('Errors occuring while loading client deals');
    }
})

  const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
      designerDeals: [],
      isLoadingDesignerDeals: true,
      clientDeals: [],
      isLoadingClientDeals: true, 
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchDesignerDeals.fulfilled, (state, action) => {
        state.designerDeals = action.payload;
        state.isLoadingDesignerDeals = false;
      })
      .addCase(fetchDesignerDeals.pending, (state, action) => {
        state.isLoadingDesignerDeals = true;
      })
      .addCase(fetchDesignerDeals.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingDesignerDeals = false;
      })
      .addCase(fetchClientDeals.fulfilled, (state, action) => {
        state.clientDeals = action.payload;
        state.isLoadingClientDeals = false;
      })
      .addCase(fetchClientDeals.pending, (state, action) => {
        state.isLoadingClientDeals = true;
      })
      .addCase(fetchClientDeals.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingClientDeals = false;
      })
    },
  });
  
  
  export default dealsSlice.reducer;