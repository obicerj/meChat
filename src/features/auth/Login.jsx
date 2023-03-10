import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from "../../components/Input";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarContent } from "../sidebar/sidebarContentSlice";
import { emailLogin, getUserState } from "./userSlice";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {status, errorMessage} = useSelector(getUserState);
  const dispatch = useDispatch();

  const [err, setErr] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(emailLogin({ email, password }));
    
    // const email = e.target[0].value;
    // const password = e.target[1].value;

    // try {
    //     await signInWithEmailAndPassword(auth, email, password);
    //     dispatch(changeSidebarContent("convos"));
    // } catch (err) {
    //     setErr(true);
    // }
  }



  return (
    <div className="bg-slate-900">
      <div className="w-2/5 mx-auto flex flex-col justify-center h-screen">
        <div className="text-center ">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-500">Me</span>
            <span className="text-red-500">CHAT</span>
          </h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <Input
              labelText={"Email"}
              inputType={"email"}
              inputName={"email"}
              inputID={"email"}
              value={email}
              setValue={setEmail}
              inputPlaceholder={"e.g your-email@mechat.com"}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              labelText={"Password"}
              inputType={"password"}
              inputName={"password"}
              inputID={"password"}
              value={password}
              setValue={setPassword}
              inputPlaceholder={"********"}
            />
          </div>

          {err && 
          <div className="bg-red-500 rounded-md text-slate-200 text-sm px-2 py-1.5">
            <span>Something went wrong</span>
          </div>
          }

          <button className="bg-blue-700 font-bold text-lg text-white rounded-lg px-4 py-2.5 mt-2.5">
            Log in
          </button>
          <p className="text-slate-300">
            Need an account?{" "}
            <span
              className="font-medium cursor-pointer text-indigo-300"
              onClick={() => setIsAuth(false)}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
