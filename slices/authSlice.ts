import { createSlice , } from "@reduxjs/toolkit";


interface loggedData{
    loggedIn:Boolean
}

const initialState : loggedData={
    loggedIn:true
}


const loggedSlice = createSlice({
    name:"logged",
    initialState,
    reducers:{
        loginUser: (state)=>{
            state.loggedIn=true;
        },
        logoutUser :(state)=>{
            state.loggedIn=false;
        }
    }
});

export const {loginUser,logoutUser} = loggedSlice.actions;
export const LoggedReducer = loggedSlice.reducer;
