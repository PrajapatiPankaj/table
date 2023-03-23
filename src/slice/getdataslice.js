import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/instance";
import { useSelector } from "react-redux";


export const thunkUserData = createAsyncThunk(
  "userdata",
  async (_,thunkApi) => {
    console.log("step 2222");
    try {
      const res = await axios.get("/posts");

      console.log("data in response in thunkuserdata", res.data);
      return res.data;
    } catch (err) {
      console.log("Errors in Catch Block:", err);
      return thunkApi.rejectWithValue(err.message)
      // return err.message;
    }
  }
);

export const deleteThunk = createAsyncThunk(
  "userData/deleteThunk",


  async (id, thunkApi) => {
    try{
    const del = await axios.delete(`/posts/${2020}`);
    console.log("data for delete", del);
    if (del?.status === 200) {
      thunkUserData();
       console.log("id", id);
       return thunkApi.dispatch(thunkUserData());
    }
}catch(err){
    console.log("Error in deleteTunk:",err.message)
  return thunkApi.rejectWithValue(err.message)
}
   
  }
);

export const addUserThunk = createAsyncThunk(
  "userData/addUserThunk",

  async (val, thunkAPI) => {
    const add = await axios.post(`/posts`, val);
    const res = add.data;
    console.log("response in addthunk", res);
    if ((res?.status === 200) | 201) {
      return thunkAPI.dispatch(thunkUserData());
    }
  }
);

export const updateThunk = createAsyncThunk(
  "userData/updateThunk",

  async (data, thunkAPI) => {
    console.log("UpdateThunk", data);

    const updt = await axios.put(`/posts/${data.id}`, data);
    // const res = add.data;
    console.log("response in Updatethunk", updt.data);
    if ((updt?.status === 200) | 201) {
      thunkAPI.dispatch(thunkUserData());
    }
    // if ((res?.status === 200) | 201) {
    //   return thunkAPI.dispatch(thunkUserData());
    // }
  }
);

const initialState = {
  allData: [],
  isLoading: false,
  hasError: false,
  errMsg: "",
};

//  console.log("initial State",initialState )
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    errReset: (state, action) => {
      state.hasError = false;
    },
  },

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
        state.errMsg = action.payload;
        console.log("payload in rejection", action.payload);
      })
      .addCase(deleteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errMsg = action.payload;
        console.log("payload in rejection", action.payload);
      });
  },
});

export default userDataSlice.reducer;
  export const { errReset } = userDataSlice.actions;
