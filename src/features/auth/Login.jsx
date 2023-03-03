import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

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
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign in to OChat</h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-8">
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
          Next
        </button>
        <p>
          Need an account?{" "}
          <span
            className="font-medium cursor-pointer"
            onClick={() => setIsAuth(false)}
          >
            Register
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
