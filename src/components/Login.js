import React from "react";
import { useState } from "react";
import { userLogin } from "../store/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import login from "../img/icons/login.png";
const Login = () => {
  const [usernamerror, setUsernameerror] = useState("");
  const lang = localStorage.getItem("userLanguage");
  const [username, setUsername] = useState("+993");
  const [password, setPassword] = useState("");
  const { loginError } = useSelector((state) => state.auth);
  const [errorLogin, setErrorLogin] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onUsernameChanged = (e) => {
    let mobile = e.target.value;
    if (Number(mobile) || mobile === "" || mobile === "+") {
      if (mobile.length > 12) {
        return;
      }
      if (
        mobile[0] === "+" &&
        mobile[1] === "9" &&
        mobile[2] === "9" &&
        mobile[3] === "3"
      ) {
        setUsername(mobile);
      }
    } else {
      return;
    }
  };
  //
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const usernam = username.slice(-8);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length === 12) {
      dispatch(userLogin({ username: usernam, password }));
      if (loginError || loginError !== "") {
        setErrorLogin("Loginde ýalňyşlyk bar");
      } else {
        setErrorLogin("");
        setUsername("+993");
        setPassword("");
        if (token === 0) {
          setErrorLogin("Loginde ýalňyşlyk bar");
        } else {
        }
      }
    } else {
      if (lang === "tm") {
        setErrorLogin("Telefon belgiňiz doly däl");
      } else {
        setErrorLogin("Ваш номер телефона неполный");
      }
    }
  };
  function clearError() {
    setErrorLogin("");
    setUsername("+993");
    setPassword("");
    setUsernameerror("");
  }

  return (
    <>
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 "
        data-te-toggle="modal"
        data-te-target="#staticBackdrop"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <img src={login} alt="login" className=" w-6 rounded-lg" />
          <p className="pl-2 text-base font-normal text-white">{lang === "tm" ? "Içeri gir" : "Логин"}</p>
        </div>
      </button>
      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="staticBackdrop"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2  shadow-inner shadow-green-600  border-opacity-100 p-4">
              <div></div>
              <h5
                className="text-2xl text-center font-medium leading-normal text-neutral-800"
                id="exampleModalLabel"
              >
                {lang === "tm" ? "Içeri gir" : "Логин"}
              </h5>
              <button
                onClick={clearError}
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div data-te-modal-body-ref className="relative p-4">
              <div className="contain">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                  <div className=" text-red-700 text-center">{errorLogin}</div>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-gray-600 mb-2 block"
                        >
                          {lang === "tm" ? "Telefon belgi" : "Телефон номер"}
                        </label>
                        <input
                          value={username}
                          onChange={onUsernameChanged}
                          type="name"
                          name="name"
                          id="name"
                          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        />
                        <p className=" text-red-700">{usernamerror}</p>
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="text-gray-600 mb-2 block"
                        >
                          {lang === "tm" ? "Parol" : "Парол"}
                        </label>
                        <input
                          value={password}
                          onChange={onPasswordChanged}
                          type="password"
                          name="password"
                          id="password"
                          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                          placeholder="*******"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <Link
                        to="/account/passwordreset"
                        className="text-primary"
                      >
                        {lang === "tm"
                          ? "Paroly ýatdan çykardy"
                          : "Забыли пароль"}
                      </Link>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                      >
                        {lang === "tm" ? "Içeri girmek" : "Логин"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
