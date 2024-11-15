import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IaddVote, candidatesState, DataStatus } from "../../types/redux";
import { ICandidate } from "../../types/candidate";

const initialState: candidatesState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: null,
};

export const fetchcandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/candidates/all", {
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      });
      if (!res.ok) {
        thunkApi.rejectWithValue("can't login, please try again");
        return;
      }
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      thunkApi.rejectWithValue("can't login, please try again");
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addVote: (state, action: PayloadAction<IaddVote>) => {
      state.candidates?.forEach((c) => {
        if (c._id === action.payload.candidate._id) {
          c.votes += 1;
        }
      });
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<candidatesState>) => {
    builder
      .addCase(fetchcandidates.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.candidates = null;
      })
      .addCase(fetchcandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.candidates = action.payload as unknown as ICandidate[];
      })
      .addCase(fetchcandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.candidates = null;
      });
  },
});

export default candidatesSlice;
