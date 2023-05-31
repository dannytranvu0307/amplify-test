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
    initialState: { updateSuccess: false, updateMessage: null },
    extraReducers:(builder) =>  {
        builder.addCase(userUpdate.pending, (state)=> {
            state.updateSuccess = false
            state.updateMessage = null
        }),
        builder.addCase(userUpdate.fulfilled, (state,action)=> {
            console.log(action.payload)
            if(action.payload.status === 200 &&  action.payload.data.type ==="ERROR" && action.payload.data.message === "Old password is not match"){
                state.updateSuccess = false
                state.updateMessage = "oldPasswordNotMatch"
            }else if (action.payload.status === 200 &&  action.payload.data.type ==="INFO" && action.payload.data.message === "Update successfull") {
                state.updateSuccess = true
            }else if (action.payload === 401){
                state.error = []
            }
        })
    }
})

export const { setNullMessage } = userSlice.actions;
export default userSlice.reducer

export const selectUpdateSuccess = (state) => state.user.updateSuccess;
export const selectUpdateMessage = (state) => state.user.updateMessage;