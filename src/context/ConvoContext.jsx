import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ConvoContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const {currentUser} = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const convoReducer = (state, action) => {
    switch (action.type) {
        
        case "CHANGE_USER":
            return {
                user: action.payload,
                chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
            };

        default:
            return state;
    }
  };

  const [state, dispatch] = useReducer(convoReducer, INITIAL_STATE);

  return (
    <ConvoContext.Provider value={{data:state, dispatch}}>
        {children}
    </ConvoContext.Provider>
);
};