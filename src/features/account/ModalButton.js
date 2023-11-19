import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getOrderPaymentInfo } from "../../store/features/auth/authSlice";
const ModalButton = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const lang = localStorage.getItem("userLanguage");
  const [bank, setBank] = useState("HALK");
  const onOptionChange = (e) => {
    setBank(e.target.value);
  };
  const { token } = useSelector((state) => state?.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getOrderPaymentInfo({ id, bank, token }));
  };

  return (
    <>
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {lang === 'tm' ? "Töleg geç" : "Оплатит"}
        
      </button>

      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none ">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 ">
              <div></div>
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 "
                id="exampleModalLabel"
              >
                {lang === 'tm' ? "Töleg" : "Оплата"}
              </h5>
              <button
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

            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              <div className=" w-full p-3 text-lg ">
                <div className="mb-3 py-2 border-2 rounded-lg bg-gray-200 flex items-center justify-between px-5">
                  <label htmlFor="altyn" className="">
                    {lang === "tm"
                      ? "Altyn asyr karty"
                      : "Алтын асыр карта"}
                  </label>
                  <input
                    checked={bank === "HALK"}
                    onChange={onOptionChange}
                    className=" border-2  border-primary"
                    type="radio"
                    name="kart"
                    value="HALK"
                    id="altyn"
                  />
                </div>
                <div className="mb-3 py-2 border-2 rounded-lg bg-gray-200 flex items-center justify-between px-5">
                  <label htmlFor="senagat" className="">
                    {lang === "tm" ? "Senagat Bank" : "Сенагат Банк"}
                  </label>
                  <input
                    checked={bank === "SENAGAT"}
                    onChange={onOptionChange}
                    className=" border-2  border-primary"
                    type="radio"
                    name="kart"
                    value="SENAGAT"
                    id="senagat"
                  />
                </div>
                <div className="mb-3 py-2 border-2 rounded-lg bg-gray-200 flex items-center justify-between px-5">
                  <label htmlFor="rysgal" className="">
                    {lang === "tm" ? "Rysgal Bank" : "Рысгал Банк"}
                  </label>
                  <input
                    checked={bank === "RYSGAL"}
                    onChange={onOptionChange}
                    className=" border-2  border-primary"
                    type="radio"
                    name="kart"
                    value="RYSGAL"
                    id="rysgal"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4">
              <button
                onClick={handleSubmit}
                type="button"
                className="ml-1 w-full inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                {lang === "tm" ? "Töleg geç" : "Оплатит"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalButton;
