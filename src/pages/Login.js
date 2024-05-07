import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TfiSave } from "react-icons/tfi";
import ErrorText from "../components/form/ErrorText";
import Input from "../components/form/Input";
import Label from "../components/form/Label";
import Button from "../components/form/Button";
import { LoginContext } from "../features/auth/login/LoginContext";
import { LoginStyle } from "../features/auth/login/LoginStyle";
import { getProfile, userLogin } from "../features/auth/login/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onUsernameChanged = (e) => {
    setUsername(e.target.value);
  };
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    // e.preventDefault();
    let isCancelled = false;
    try {
      await dispatch(userLogin({ username, password }))
        .unwrap()
        .then((res) =>
          dispatch(getProfile({ token: res.access }))
            .unwrap()
            .then(() => navigate("/account"))
        );
    } catch (err) {
      setError(err);
    }
    return () => {
      isCancelled = true;
    };
  };

  return (
    <>
      <section className=" bg-colorBackground flex flex-col px-2 h-screen">
        <p className="text-center text-colorTextDarkBlue font-bold text-lg pt-10">
          {LoginContext.login}
        </p>

        <form
          onSubmit={(e) => handleSubmit()}
          className="bg-white m-auto mt-6 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <Label
              className={LoginStyle.loginLabelStyle}
              placeholder={LoginContext.usernameplaceholder}
              htmlFor={LoginContext.usernamehtmlFor}
            />
            <div className="flex items-center border-b border-blue-500 py-2">
              <Input
                value={username}
                onChange={onUsernameChanged}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                placeholder={LoginContext.usernameplaceholder}
                className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                htmlFor={LoginContext.usernamehtmlFor}
              />
            </div>
          </div>
          <div className="mb-6">
            <Label
              className={LoginStyle.loginLabelStyle}
              placeholder={LoginContext.passwordplaceholder}
              htmlFor={LoginContext.passwordhtmlFor}
            />
            <div className="flex items-center border-b border-blue-500 py-2">
              <Input
                value={password}
                onChange={onPasswordChanged}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                placeholder={LoginContext.passwordplaceholder}
                className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                htmlFor={LoginContext.passwordhtmlFor}
              />
            </div>
            {error ? <ErrorText message={error.response} /> : ""}
          </div>
          <div className="flex items-center justify-between">
            <Button className={LoginStyle.loginButtonStyle} type="submit">
              <TfiSave className="mr-3" />
              {LoginContext.loginbutton}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
