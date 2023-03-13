import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
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
};

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (editInfo) => {
    try {
      if(!auth.currentUser) return;
      const userDocRef = doc(db, "users", auth.currentUser.uid);

      await updateProfile(auth.currentUser, {
        displayName: editInfo.displayName,
      });
      await updateDoc(userDocRef, {
        displayName: editInfo.displayName,
        bio: editInfo.bio,
        location: editInfo.location,
      });
    } catch (err) {
      throw err.message;
    }
  }
)

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

export const register = createAsyncThunk(
  "user/emailLogin",
  async (registerInfo) => {
    try {
      await createUserWithEmailAndPassword (
        auth,
        registerInfo.email,
        registerInfo.password
      );

      if(!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        displayName: registerInfo.displayName
      });
      setUserInfoDoc();
    } catch (err) {
      throw err.message;
    }
  }
)

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
    builder.addMatcher(
      isAnyOf(
        emailLogin.fulfilled,
        editProfile.fulfilled
      ),
      (state) => {
        state.status = "successful";
      }
    );
    builder.addMatcher(
      isAnyOf(
        emailLogin.pending,
        editProfile.pending
      ),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isAnyOf(
        emailLogin.rejected,
        editProfile.rejected
      ),
      (state, action) => {
        state.status = "failed";
        
      }
    );
  },
});



export const getUserState = (state) => state.user;

export const { login } = userSlice.actions;

export default userSlice.reducer;