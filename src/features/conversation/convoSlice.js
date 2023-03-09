import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";

const initialState = {
  chatId: "",
  recipient: {}
};

export const convoSlice = createSlice({
  name: "convo",
  initialState,
  reducers: {
    changeConvo: (
      state,
      action
    ) => {
      if(!auth.currentUser || !action.payload) return;

      const currentUser = auth.currentUser;
      const recipient = action.payload.recipient;

      state.recipient = action.payload.recipient;
      state.chatId = currentUser.uid > recipient.uid
      ? currentUser.uid + recipient.uid
      : recipient.uid + currentUser.uid;
    },
    resetConvo: (state) => {
      state.chatId = "";
      state.recipient = {};
    },
  },
});

export const getConvoState = (state) => state.convo;
export const { changeConvo, resetConvo } = convoSlice.actions;
export default convoSlice.reducer;