import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearPaymentInfo, getCheckPaymentInfo, getPaymentInfo } from "../../store/features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHouse
} from "@fortawesome/free-solid-svg-icons";
const CheckPayment = () => {
  const { id: order_id } = useParams();
  const lang = localStorage.getItem("userLanguage");
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [payerror, setPayError] = useState('');
  useEffect(() => {
    dispatch(clearPaymentInfo());
    dispatch(getPaymentInfo({ order_id }));
  }, [dispatch, order_id]);
  const { order } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (order?.response === 'error') {
      setError("Error");
    } else {
      setError('')
    }
  }, [order?.response]);
  const { token } = useSelector((state) => state?.auth);
  const bank = order?.data?.bank;
  const id = order?.data?.id;
  useEffect(() => {
    dispatch(getCheckPaymentInfo({ id, bank, token }));
  }, [dispatch, id, bank, token]);
  const { payment } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (order?.response === 'error') {
      setError("Error");
    } else {
      setError('')
    }
    if (payment?.error) {
      setPayError(payment?.error)
    } else {
      setPayError('')
    }
  }, [payment?.error, order?.response]);

  let content = (
    <div className="container px-6 mx-auto">
      <section className="mb-5 text-gray-800">
        <div className="container mx-auto xl:px-32 text-center lg:text-left">
          <div className="mb-12 lg:mb-0">
            <div className="block rounded-lg text-center px-6 py-12 md:px-12 lg:-mr-14">

              <h4 className="text-lg text-red-700 font-bold mb-6 text-center">{error}</h4>
              <h4 className="text-lg text-red-700 font-bold mb-6 text-center">{payerror}</h4>

              {!error && payment?.data?.orderStatus === 6 ? (
                <>
                  <h2 className="text-3xl text-warning-600 font-bold mb-6 text-center">{lang === 'tm' ? "Töleg amala aşyrylmady. Täzeden synanyşyň" : "Оплата не произведена. Пожалуйста, попробуйте еще раз"}</h2>

                  <Link to='/'>
                    <div
                      className="inline-block mb-5 mx-5 px-3 rounded border-2 border-warning  text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700"
                    >
                      <FontAwesomeIcon className=" w-16 h-16" icon={faHouse} />
                      <p>{lang === 'tm' ? "Baş sahypa dolanmak" : "Вернуться на главную страницу"}</p>
                    </div>
                  </Link>

                  <Link to={'/account/orderDetail/' + id}>
                    <div
                      className="inline-block mx-5 px-3 rounded border-2 border-warning  text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700"
                      data-te-ripple-init>
                      <FontAwesomeIcon className="w-16 h-16" icon={faEye} />
                      <p>{lang === 'tm' ? "Harydy görmek" : "Посмотреть продукт"}</p>
                    </div>
                  </Link>
                </>
              ) : ('')
              }

              <div>
                {error === '' && payerror === '' && payment?.data?.orderStatus === 2 ? (
                  <>
              <h2 className="text-3xl text-success-600 font-bold mb-6 text-center">{lang === 'tm' ? 'Töleg üstünlikli amala aşyryldy' : "Оплата прошла успешно"}</h2>

                    <Link to='/'>
                      <div
                        className="inline-block mb-5 mx-5 px-3 rounded border-2 border-success  text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700"
                      >
                        <FontAwesomeIcon className=" w-16 h-16" icon={faHouse} />
                        <p>{lang === 'tm' ? "Baş sahypa dolanmak" : "Вернуться на главную страницу"}</p>
                      </div>
                    </Link>

                    <Link to={'/account/orderDetail/' + id}>
                      <div
                        className="inline-block mx-5 px-3 rounded border-2 border-success  text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700"
                        data-te-ripple-init>
                        <FontAwesomeIcon className="w-16 h-16" icon={faEye} />
                        <p>{lang === 'tm' ? "Harydy görmek" : "Посмотреть продукт"}</p>
                      </div>
                    </Link>
                  </>
                ) : ("")}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
  return content;
  // } else {
  //   return (
  //     <>
  //       <div>
  //         Error
  //       </div>
  //     </>
  //   );
  // }







};

export default CheckPayment;
