import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const initialState = {
  user: {},
  status: "idle",
  errorMessage: "",
};

const setUserInfoDoc = async () => {
  if (!auth.currentUser) return;
  
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userDocData = await getDoc(userDocRef);
  const userChatsDocRef = doc(db, "userChats", auth.currentUser.uid);
  const userChatsDocData = await getDoc(userChatsDocRef);

  const userInfo = {
    isUser: true,
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: auth.currentUser.email,
    bio: "Bio info",
    status: "off",
    location: "Location info",
    contacts: [],
  };

  if(!userDocData.exists()) {
    setDoc(userDocRef, userInfo);
  }

  if(!userChatsDocData.exists()) {
    await setDoc(userChatsDocRef, {});

    const userChatsData = userChatsDocData.data();

    if(userChatsData) return;
  }
}

export const emailLogin = createAsyncThunk(
  "user/emailLogin",
  async(loginInfo) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      setUserInfoDoc();
    } catch (err) {
      throw err.message;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (state) => {
  try {
    if(auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        status: "offline",
      });
    }
  } catch (err) {
    throw err.message;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(userDocRef, {
          status: "offline",
        });
      }
      state.user = initialState;
      signOut(auth);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = initialState;
      signOut(auth);
    });
  }
});



export const getUserState = (state) => state.user;

export const { login } = userSlice.actions;

export default userSlice.reducer;