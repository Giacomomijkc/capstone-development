import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchJobOffers = `${process.env.REACT_APP_SERVER_BASE_URL}/joboffers/`;


export const fetchClientJobOffers = createAsyncThunk('joboffers/fetchClientJobOffers', async (clientId, {rejectWithValue}) =>{
    try {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await axios.get(`${apiUrlFetchJobOffers}client/${clientId}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log(response)
        return response.data.jobOffers;

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
    }
  })


  const jobOffersSlice = createSlice({
    name: 'joboffers',
    initialState: {
      jobOffers: [],
      isJobOffersLoading: true,
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchClientJobOffers.pending, (state, action) => {
        state.isJobOffersLoading = true
      })
      .addCase(fetchClientJobOffers.fulfilled, (state, action) => {
        state.jobOffers = action.payload
        state.isJobOffersLoading = false
      })
      .addCase(fetchClientJobOffers.rejected, (state, action) => {
        state.error = action.payload
        state.isJobOffersLoading = false
      })
    },
  });
  
  export default jobOffersSlice.reducer;
  