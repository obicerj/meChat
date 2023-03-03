import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Input from "../../components/Input";

const Login = ({ setIsAuth}) => {
  const [err, setErr] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // navigate("/chats")
    } catch (err) {
        setErr(true);
    }
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
              inputPlaceholder={"e.g your-email@mechat.com"}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              labelText={"Password"}
              inputType={"password"}
              inputName={"password"}
              inputID={"password"}
              inputPlaceholder={"********"}
            />
          </div>

          {err && 
          <div className="bg-red-500 rounded-md text-slate-200 text-sm px-2 py-1.5">
            <span>Something went wrong</span>
          </div>
          }

          <button className="bg-green-500 font-bold text-lg text-white rounded-lg px-4 py-2.5">
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
