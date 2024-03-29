import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import { getUserState, register } from "./userSlice";

const Register = ({setIsAuth}) => {

  const [email, setEmail] = useState("");
  
  const [displayName, setDisplayName] = useState("");

  const [password, setPassword] = useState("");
  const { status, errorMessage } = useSelector(getUserState);

  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const handleRegistration = async (e) => {
    e.preventDefault();

    dispatch(
      register({ email, password, displayName })
    );
  }

  return (
    <div className="bg-slate-900">
      <div className="w-full md:w-2/5 px-4 md:px-0 py-8 mx-auto flex flex-col justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-200">Create 
          <span className="text-blue-500"> Me</span>
            <span className="text-red-500">CHAT </span>
            account
          </h1>
        </div>

        <form
          onSubmit={handleRegistration}
          className="flex flex-col gap-4 mt-8"
        >
          <div className="flex flex-col gap-2">
            <Input
              labelText={"Display name"}
              inputType={"text"}
              inputName={"displayName"}
              inputID={"displayName"}
              inputPlaceholder={"Toni McLovin"}
              value={displayName}
              setValue={setDisplayName}
            />
          </div>

          <div className="flex flex-col gap-2">
          <Input
              labelText={"Email"}
              inputType={"email"}
              inputName={"email"}
              inputID={"email"}
              inputPlaceholder={"e.g your-email@mechat.com"}
              value={email}
              setValue={setEmail}
            />
          </div>

          <div className="flex flex-col gap-2">
          <Input
              labelText={"Password"}
              inputType={"password"}
              inputName={"password"}
              inputID={"password"}
              inputPlaceholder={"********"}
              value={password}
              setValue={setPassword}
            />
          </div>

          {err && 
          <div className="bg-red-500 rounded-md text-slate-200 text-sm px-2 py-1.5">
            <span>Something went wrong</span>
          </div>
          }

          <button className="bg-green-600 font-bold text-lg text-white rounded-lg px-4 py-2.5 mt-2.5">
            Submit
          </button>
          <p className="text-slate-300">
            Have an account?{" "}
            <span
              className="font-medium cursor-pointer text-indigo-300"
              onClick={() => setIsAuth(true)}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
