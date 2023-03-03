import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase";

const Register = ({setIsAuth}) => {
  const [err, setErr] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Creaste user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        //Update profile
        await updateProfile(res.user, {
          displayName,
        });

        // Store user to firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});

        // navigate("/chats");
        // dispatch Convo
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  }
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Join OChat today</h1>
      </div>

      <form onSubmit={handleRegistration} className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Display name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Your name"
            className="
        border rounded-lg text-lg px-4 py-2.5
        "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="e.g your-email@ochat.com"
            className="
        border rounded-lg text-lg px-4 py-2.5
        "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className="
        border rounded-lg text-lg px-4 py-2.5 
        "
          />
        </div>

        <span>{err && <span>Something went wrong</span>}</span>

        <button className="bg-green-500 text-lg text-white rounded-lg px-4 py-2.5">
          Submit
        </button>
        <p>
          Have an account?{" "}
          <span
            className="font-medium cursor-pointer"
            onClick={() => setIsAuth(true)}
          >
            Sign in
          </span>
        </p>
      </form>
    </>
  );
};

export default Register;
