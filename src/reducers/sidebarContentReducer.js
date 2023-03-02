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
    }
  }
});

export const getSidebarContent = (state) => state.sidebarContent;
export const { changeSidebarContent } = sidebarContentSlice.actions;
export default sidebarContentSlice.reducer;