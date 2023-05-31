import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const baseURL = 'http://localhost:8080/api/v1';

// get cookie accesstoken/ refresh token
export const login = createAsyncThunk(
    'login/login',
    async (form) => {
        try {
            const response = await axios.post(`${baseURL}/auth/login`,form,{withCredentials: true})
            console.log(response)
            return response
        }catch(err){
            return err.response
        }
    }
)

//  try to authenticate by accessToken
export const authenticate = createAsyncThunk(
    'login/users',
    async () => {
        try {
            const response = await axios.get(`${baseURL}/users`,{withCredentials: true})
            return response
        }catch(err){
            console.log(err.response)
            return err.response
        }
    }
)

// create account
export const register = createAsyncThunk(
    'login/register',
    async (form) => {
        const headers = {
            'content-type':'application/json'
        }
        try {
            const response = await axios.post(`${baseURL}/auth/register`,form,headers)
            return response
        }catch(err){
            return err.response
        }
    }
)

// verify account
export const verify = createAsyncThunk(
    'login/verify',
    async (form) => {
        try {
            const response = await axios.post(`${baseURL}/users/active`,form,{withCredentials: true})
            console.log(response)
            return response
        }catch(err){
            return err.response
        }
    }
)
// refresh token
export const refreshToken =  createAsyncThunk(
    'login/refreshToken',
    async () => {

        try {
            const response = await axios.get(`${baseURL}/auth/refreshToken`,{withCredentials: true})
            console.log(response)
            return response
        }catch(err){
            console.log(err.response)
            return err.response
        }
    }
)

export const passwordReset = createAsyncThunk(
    'login/passwordReset',
    async (form) => {
        try {
            const response = await axios.post(`${baseURL}/users/emails`,form )
            return response
        }catch(err){
            return err.response
        }
    }
)

export const confirmPasswordReset = createAsyncThunk(
    'login/confirmPasswordReset',
    async (form) => {
        try {

            const response = await axios.post(`${baseURL}/users/reset-password`,form )
            return response
        }catch(err){
            return err.response
        }
    }
)


export const logout = createAsyncThunk(
    'login/logout',
    async () => {
        try {

            const response = await axios.get(`${baseURL}/auth/logout`, {withCredentials: true} )
            return response
        }catch(err){
            return err.response
        }
    }
)


const authSlice = createSlice({
    name:'login',
    initialState: { user:null,
                    error: null,
                    activeError: null,
                    registerError: null,
                    sendMailNotification: null,
                    isAuthenticated:false,
                    checkPass: false,
                    isLoading: true, 
                    // acctive parameter
                    isActiveMessage: null,
                    isActive : false,
                    passwordResetError: null,
                    // email reset password instace
                    sendMailMessage: null,
                    // login error 
                    errorLogin: null,
                    // mailTimeOut: false
                    // confirm password and auth token message
                    confirmPasswordResetSuccess: null,
                    confirmPasswordResetReject: false
                },
    extraReducers:(builder) =>  {
        // login thunk
        builder.addCase(login.pending, (state,action)=> {
            state.error = null
            state.isLoading = true
            state.checkPass = false
        }),
        builder.addCase(login.fulfilled, (state,action)=> {
            if(action.payload.status === 200){
                state.error = null
                state.errorLogin = null
                state.isAuthenticated = true
            }else if (action.payload.status === 401){
                state.errorLogin = 'Unauthorized'
            }
            else if (action.payload.status === 400){
                state.errorLogin = 'Unauthorized'
            }
        }),

        // authenticate thunk
        builder.addCase(authenticate.pending, (state, action)=>{
            state.error= null
            state.isLoading = true
            state.user = null
        }),
        builder.addCase(authenticate.fulfilled, (state, action)=>{
            if(action.payload.status === 200){
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload.data.data
            }else if (action.payload.status === 401){
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            }
        }),

        // register thunk
        builder.addCase(register.pending, (state, action)=>{
            state.error= null
            state.isLoading = true
        }),
        builder.addCase(register.fulfilled, (state, action)=>{
            if(action.payload.status === 200){
                state.isLoading = false
                state.isSuccess = true
                state.registerError = null
            }else if (action.payload.status === 400){
                state.isLoading = false
                state.registerError = 'API002_ER'
            }
        }),

        // active verify thunk
        builder.addCase(verify.pending, (state, action)=>{
            state.error= null
            state.isLoading = true
        }),
        builder.addCase(verify.fulfilled, (state, action)=>{
            if(action.payload.status === 200){
                state.isLoading = false
                state.isActive = true
                state.activeError = null
                state.isActiveMessage = "activeIsSuccess"
            }else if (action.payload.status === 400){
                state.isLoading = false
                state.isActive = false
                state.activeError = 'TIMEOUT'
            }
        }),
        
        // password reset thunk
        builder.addCase(passwordReset.pending, (state, action)=>{
            state.error= null
            state.isLoading = true
        }),
        builder.addCase(passwordReset.fulfilled, (state, action)=>{
            if(action.payload.status === 200){
                state.isLoading = false
                state.sendMailNotification = true
            }else if (action.payload.status === 400){
                state.isLoading = false
                state.isActive = false
                state.sendMailNotification = false
                state.passwordResetError = 'invalidEmail'
            }
        }),
        // password reset thunk
        builder.addCase(confirmPasswordReset.pending, (state, action)=>{
            state.error= null
            state.isLoading = true
            state.confirmPasswordResetReject = false
            state.confirmPasswordResetSuccess= false
            state.sendMailNotification = false
        }),
        builder.addCase(confirmPasswordReset.fulfilled, (state, action)=>{
            if(action.payload.status === 200){
                state.isLoading = false
                state.sendMailNotification = true
                state.confirmPasswordResetSuccess= true
                state.confirmPasswordResetReject = false
            }else if (action.payload.status === 400){
                state.isLoading = false
                state.confirmPasswordResetSuccess=false
                state.sendMailNotification = false
                state.confirmPasswordResetReject = true
            }
        }),

        // get new access token by refresh token
        builder.addCase(refreshToken.pending, (state,action )=>{
            state.error= null
            state.isLoading = true
        }),
        builder.addCase(refreshToken.fulfilled, (state,action )=>{
            state.error= null
            state.isLoading = false
        }),

        // logout  function
        builder.addCase(logout.pending, (state,action )=>{
            state.isLoading = true
        }),
        builder.addCase(logout.fulfilled, (state,action )=>{
            if (action.payload.status === 200){
                state.error= null
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            }
        })

    }
})

export default authSlice.reducer


// 
export const selectIsLoading = (state ) => state.login.isLoading
export const selectError = (state) => state.login.error
export const selectErrorLogin = (state) => state.login.errorLogin
// user info
export const selectUser = (state) => state.login.user
// is authen
export const selectIsAuthenticated = (state) =>  state.login.isAuthenticated
// authen is success
export const selectIsSuccess = (state) => state.login.isSuccess
// active account
export const selectIsActive = (state) => state.login.isActive
export const selectIsActiveMessage = (state) => state.login.isActiveMessage
export const selectActiveError = (state) => state.login.activeError

// register state
export const selectRegisterError = (state) => state.login.registerError
export const selectSendMailNotification = (state) => state.login.sendMailNotification
export const selectMailTimeOut = (state) => state.login.mailTimeOut

// reset password state
export const selectPasswordResetError = (state) => state.login.passwordResetError
export const selectConfirmPasswordResetSuccess = (state) => state.login.confirmPasswordResetSuccess
export const selectConfirmPasswordResetReject = (state) => state.login.confirmPasswordResetReject