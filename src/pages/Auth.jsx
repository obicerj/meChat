import React, { useState } from "react";
import { Login, Register } from "../features/auth";

const Auth = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <>
    {isAuth && (
      <Login setIsAuth={setIsAuth} />
    )}

    {!isAuth && (
      <Register setIsAuth={setIsAuth} />
    )}
    </>
  );
};

export default Auth;
