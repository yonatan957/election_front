import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { candidatesState, DataStatus, userState } from "../../types/redux"
import { IUser } from "../../types/user"
import { ICandidate } from "../../types/candidate"

const initialState:candidatesState ={
    error:null,
    status:DataStatus.IDLE,
    candidates:null
}

const fetchcandidates = createAsyncThunk('candidates/getList',
    async (_, thunkApi) => {
        try {
            const res = await fetch('http://localhost:2222/api/candidates/all')
            if (!res.ok){
                thunkApi.rejectWithValue("can't login, please try again")
            }
            const data = await res.json();
            thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue("can't login, please try again")

        }
    }
)

const candidatesSlice = createSlice({
    name:'candidates',
    initialState,
    reducers:{},
    extraReducers:(builder:ActionReducerMapBuilder<candidatesState>)=>{
        builder.addCase(fetchcandidates.pending, (state, action)=>{
            state.status = DataStatus.LOADING
            state.error = null
            state.candidates = null
        })
        .addCase(fetchcandidates.fulfilled, (state, action)=>{
            state.status = DataStatus.SUCCESS
            state.error = null
            state.candidates = action.payload as unknown as ICandidate[]
        })
        .addCase(fetchcandidates.rejected, (state, action)=>{
            state.status = DataStatus.FAILED
            state.error = action.error as string
            state.candidates = null
        })
    }
})

export default candidatesSlice