import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const thunkUserData = createAsyncThunk("userdata", async () => {
  console.log("step 2222");
  // try {
  const res = await axios.get("http://localhost:3000/posts");

  console.log("data in response", res.data);
  return res.data;
  // } catch (err) {
  //   return err;
  // }
});

export const deleteThunk = createAsyncThunk(
  "userData/deleteThunk",

  async (id, thunkAPI) => {
    const del = await axios.delete(`http://localhost:3000/posts/${id}`);
    console.log("data for delete", del);
    if (del?.status === 200) {
      thunkUserData();
    }

    console.log("id", id);
    return thunkAPI.dispatch(thunkUserData());
  }
);

export const addUserThunk = createAsyncThunk(
  "userData/addUserThunk",

  async (val, thunkAPI) => {
    const add = await axios.post(`http://localhost:3000/posts`, val);
    const res = add.data;
    console.log("response in addthunk", res);
    if ((res?.status === 200) | 201) {
      return thunkAPI.dispatch(thunkUserData());
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
        state.allData = null;
        state.hasError = false;
        console.log("State", state);
      })

      .addCase(thunkUserData.fulfilled, (state, action) => {
        console.log("step 3333", action.payload);
        console.log("initialState", state.allData);

        state.isLoading = false;
        state.hasError = false;
        state.allData = action.payload;
        console.log("State.alldata", state.allData);
      })
      .addCase(thunkUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
    // .addCase(deleteThunk.fulfilled,(state, action)=>{
    //     state.isLoading = false;
    //     state.hasError = false;
    //     //  console.log("Newdata after Delate opretion:", state.allData);

    //     // const newData= state.allData.filter(data=>{
    //     //     return data.id !== action.payload;
    //     // })
    //     // state.allData = newData;
    //     console.log("Newdata after Delate opretion:",state.allData)
    // })
    // .addCase(addUserThunk.fulfilled,(states,action)=>{
    //       console.log("addUserThunkdata in extrareducer",action.payload)

    // })
    // ;
  },
});

export default userDataSlice.reducer;
