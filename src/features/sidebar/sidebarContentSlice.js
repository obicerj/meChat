import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "convos",
  userProfileData: null,
};

const sidebarContentSlice = createSlice({
  name: "sidebarContent",
  initialState,
  reducers: {
    changeSidebarContent: (state, action) => {
      state.content = action.payload.content;
    },
    showUserProfile: (state, action) => {
      state.content = "profile";
      state.userProfileData = action.payload.userProfileData;
    },
  },
});

export const getSidebarContent = (state) => state.sidebarContent;
export const { changeSidebarContent, showUserProfile } = sidebarContentSlice.actions;
export default sidebarContentSlice.reducer;