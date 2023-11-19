import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../store/features/auth/authSlice";
import { useState } from "react";
import register from "../img/icons/register.png";
import { useEffect } from "react";
const Register = () => {
  const lang = localStorage.getItem("userLanguage");
  const dispatch = useDispatch();
  const [regUsername, setRegUsername] = useState("+993");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { smsResponse } = useSelector((state) => state.auth);
  const { regError } = useSelector((state) => state.auth);
  const [ regError1, setRegError] = useState("");
  const onregUsernameChanged = (e) => {
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
        setRegUsername(mobile);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    setRegError(regError);
  }, [regError]);
  const regUsernam = regUsername.slice(-8);
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setRegError("");
      if (lang === 'tm') {
        setError("Parollar deň gelenok");
      }else{
        setError("Пароли не совпадают");
      }
    }else if(password.length <= 3){
      setRegError("");
      if (lang === 'tm') {
        setError("Parol 3 harpdan kän bolmaly");
      }else{
        setError("Пароль должен быть длиннее 3 символов");
      }
    }
    else {
     if (regUsername.length === 12) {
       setRegError("");
       setError("");
       dispatch(userRegister({ username: regUsernam, password }));
       setRegError(regError);
       if (smsResponse === "success") {
         setRegUsername("");
         setPassword("");
         setPassword2("");
       }
     } else {
      setRegError(regError);
      if (lang === 'tm') {
        setError("Telefon belgiňiz doly däl");
      }else{
        setError("Ваш номер телефона неполный");
      }
     }
   }

  };

  function clearError(){
    setError("");
    setRegError("");
  }

  return (
    <>
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600"
        data-te-toggle="modal"
        data-te-target="#staticBackdrop1"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <img src={register} alt="register" className=" w-6 rounded-lg" />
          <p className="pl-2 text-md font-normal text-white">{lang === 'tm' ? "Agza bolmak" : "Регистрировать"}</p>
        </div>
      </button>
      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="staticBackdrop1"
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
            <div className="flex shadow-inner shadow-green-600 flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
              <div></div>
              <h5
                className="text-2xl text-center font-medium leading-normal text-neutral-800"
                id="exampleModalLabel"
              >
                {lang === 'tm' ? "Agza bolmak" : "Регистрировать"}
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
                  <form onSubmit={handleRegisterSubmit} autoComplete="off">
                    <p className="text-center text-red-700">{regError1}</p>
                    <p className="text-center text-red-700">{error}</p>
                    <div className="space-y-2">
                      <div>
                        <label
                          htmlFor="regname"
                          className="text-gray-600 mb-2 block"
                        >
                          {lang === "tm" ? "Telefon belgiňiz" : "Номер телефон"}
                        </label>
                        <input
                          onChange={onregUsernameChanged}
                          value={regUsername}
                          type="text"
                          name="regname"
                          id="regname"
                          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                          placeholder={
                            lang === "tm" ? "Telefon nomer" : "Номер телефон"
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password1"
                          className="text-gray-600 mb-2 block"
                        >
                          {lang === "tm" ? "Parol" : "Парол"}
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          name="password1"
                          id="password1"
                          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                          placeholder="*******"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirm2"
                          className="text-gray-600 mb-2 block"
                        >
                          {lang === "tm"
                            ? "Parol tassykla"
                            : "Подтвердите пароль"}
                        </label>
                        <input
                          onChange={(e) => setPassword2(e.target.value)}
                          value={password2}
                          type="password"
                          name="confirm2"
                          id="confirm2"
                          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                          placeholder="*******"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                      >
                        {lang === "tm"
                          ? "Registrasiýa bolmak"
                          : "Зарегистрироваться"}
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

export default Register;
