import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userArray: null,
    currentUser: null,
    currentUserId: null,
    currentPage: 1,
    isEditOn: false,
    isUserProfileOn: false,
    isNewUserOn: false,
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.userArray = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setCurrentUserId: (state, action) => {
            state.currentUserId = action.payload;
        },
        setEditOn: (state, action) => {
            state.isEditOn = action.payload;
        },
        setUserProfileOn: (state, action) => {
            state.isUserProfileOn = action.payload;
        },
        setNewUserOn: (state, action) => {
            state.isNewUserOn = action.payload;
        }
    }
})

export const { getUsers, setCurrentPage, setCurrentUser, setEditOn, setCurrentUserId, setUserProfileOn, setNewUserOn} = userSlice.actions;
export const selectUsers = (state) => state.users.userArray;
export const selectPage = (state) => state.users.currentPage;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectEditOn = (state) => state.users.isEditOn;
export const selectCurrentUserId = (state) => state.users.currentUserId;
export const selectIsUserProfileOn = (state) => state.users.isUserProfileOn;
export const selectNewUserOn = (state) => state.users.isNewUserOn;
export default userSlice.reducer;