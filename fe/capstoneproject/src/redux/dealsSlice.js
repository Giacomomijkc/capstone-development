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

export const createDeal = createAsyncThunk('deals/createDeal', async (dealData,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(`${apiUrlFetchDeals}create`, dealData, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.savedDeal;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

  const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
      successMessage: null,
      designerDeals: [],
      isLoadingDesignerDeals: true,
      clientDeals: [],
      isLoadingClientDeals: true,
      newDeal: null,
      isNewDealLoading: true, 
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchDesignerDeals.fulfilled, (state, action) => {
        state.designerDeals = action.payload;
        state.isLoadingDesignerDeals = false;
        state.successMessage = action.payload.message
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
        state.successMessage = action.payload.message
      })
      .addCase(fetchClientDeals.pending, (state, action) => {
        state.isLoadingClientDeals = true;
      })
      .addCase(fetchClientDeals.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingClientDeals = false;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.newDeal = action.payload;
        state.isNewDealLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(createDeal.pending, (state, action) => {
        state.isNewDealLoading = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isNewDealLoading = false;
      })
    },
  });
  
  
  export default dealsSlice.reducer;