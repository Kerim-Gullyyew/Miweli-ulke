import React from "react";
import { Link } from "react-router-dom";
const PasswordReset = () => {
  const lang = localStorage.getItem("userLanguage")
  return (
    <>
      <div className="col-span-9 gap-4">
        <div>
          <Link to="/account/address">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              {lang === 'tm' ? "Yza dolanmak" : "Возвращение"}
            </button>
          </Link>
        </div>

        <div className="contain">
          <div className=" max-w-xl mx-auto shadow px-6 py-7 rounded-2xl overflow-hidden">
            <h2 className=" text-red-600 text-center pb-4">Error message</h2>
            <h2 className="text-center text-2xl uppercase font-medium mb-1 py-5">
              {lang === 'tm' ? "Paroly dikeltmek" : "Восстановление пароля"}
            </h2>
            <form autoComplete="off">
              <div className="flex ">
                <div className=" text-lg px-6 pt-2">+993</div>
                <div className=" flex-grow">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                      placeholder="fulan fulana"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                  
                  Send SMS
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
