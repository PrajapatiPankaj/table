import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const thunkUserData = createAsyncThunk(
  "userdata",
  async () => {
          console.log("step 2222");
    try {
     const res = await axios.get("https://jsonplaceholder.typicode.com/users")

         console.log("data in response", res.data);
        return res.data;
    
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
   allData: [],
   isLoading: false,
   hasError: false,
 };

//  console.log("initial State",initialState )
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkUserData.pending, (state, action) => {
        state.isLoading = true;
        console.log("State", state);
      })
      .addCase(thunkUserData.fulfilled, (state, action) => {
        console.log("step 3333", action.payload);
        console.log("initialState", state.allData);

        state.isLoading = false;
        state.hasError = false;
        state.allData = action.payload;
      })
      .addCase(thunkUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default userDataSlice.reducer;
