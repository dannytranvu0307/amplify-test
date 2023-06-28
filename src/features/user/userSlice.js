import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../auth/loginSlice";

export const userUpdate = createAsyncThunk(
    'user/userUpdate',
    async (form) => {
        try {
            const response = await axios.put(`${baseURL}/users`,form,{withCredentials: true})
            return response
        }catch(err){
            return err.response
        }
    }
)


const userSlice = createSlice({
    name:'user',
    initialState: { updateMessage: null },
    extraReducers:(builder) =>  {
        builder.addCase(userUpdate.pending, (state)=> {
            state.updateSuccess = false
            state.updateMessage = null
        }),
        builder.addCase(userUpdate.fulfilled, (state,action)=> {
            if (action.payload.status === 200 &&  action.payload.data.type ==="INFO" && action.payload.data.message === "Update successfull") {
                state.updateMessage = ""
            }else if (action.payload === 401){
                state.error = ""
            }
        })
    }
})

export const { setNullMessage } = userSlice.actions;
export default userSlice.reducer

export const selectUpdateMessage = (state) => state.user.updateMessage;