import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import CreateAdres from "./CreateAdres";
import {
  createOrderInfo,
  getAddressInfo,
  getProfileInfo,
} from "../../store/features/auth/authSlice";
import login from "../../img/icons/login.png";
import registerpng from "../../img/icons/register.png";
import { deleteAllFromCart } from "../../store/features/cart/cartSlice";
import { backendUrl } from "../../rootUrl";
const OrderCreate = () => {
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressInfo({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getProfileInfo({ token }));
  }, [dispatch, token]);

  registerLocale("ru", ru);

  const lang = localStorage.getItem("userLanguage");

  const [topping, setTopping] = useState("CASH");
  const onOptionChange = (e) => {
    setTopping(e.target.value);
  };
  const [classname, setClassname] = useState("hidden");
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryType, setDeliveryType] = useState("NORMAL");


  const onDeliveryTypeChange = (e) => {
    setDeliveryType(e.target.value);
    if (e.target.value === "TIME") {
      setClassname("");
    } else {
      setClassname("hidden");
      setStartDate(new Date());
    }
  };
  const { address } = useSelector((state) => state?.auth);
  const [addres, setAddress] = useState('');
  const [error, setError] = useState('');
  const { cartItems } = useSelector((state) => state?.cart);

  useEffect(() => {
    if (address && address.length > 0) {
      setAddress(address[0].id);
      setError('')
    }
  }, [setAddress, setError, address]);

  let sum = 0;
  cartItems.map((item) => (sum = sum + item.quantity * item.newprice));
  const items = [
    cartItems.map((item) => ({
      quantity: item?.quantity,
      price: item?.newprice,
      product: item?.product?.id,
      option: item?.id,
    })),
  ];
  const currentdate = new Date();
  const maxdate = new Date(currentdate.setDate(currentdate.getDate() + 6));
  const handleSubmit = (e) => {
    e.preventDefault();
    const nDay = startDate.getDate();
    const nMonth = startDate.getMonth();
    const nYear = startDate.getFullYear();
    const nHour = startDate.getHours();
    const nMins = startDate.getMinutes();
    const newDate =
      nYear +
      "-" +
      (nMonth + 1) +
      "-" +
      nDay +
      "T" +
      nHour +
      ":" +
      nMins +
      ":00";

    const json = {
      payment: topping,
      address: addres,
      delivery: deliveryType,
      delivery_time: newDate,
      items: items[0],
    };
    if (addres) {
      dispatch(createOrderInfo({ token, json }));
      dispatch(deleteAllFromCart());
      window.location.href = backendUrl +`/#/account/orderlist`;
      setTopping("");
      setDeliveryType("");
    }else{
      setError('Address doly dal');
    }
  };

  const content = (
    <>
      <div className="container py-4 flex items-center gap-3">
        <Link to="/" className="text-primary text-base">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <span className="text-sm text-gray-400">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <p className="text-gray-600 font-medium">{lang === 'tm' ? "Barlag" : "Проверить"}</p>
      </div>

      <div className="container  grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-8 bg-white border border-gray-200 shadow-lg p-4 rounded">
          <div className="space-y-4 ">
            <p className="text-center text-red-700">{error}</p>
            <div className="grid grid-cols-3">
              <div className=" w-full p-3 text-lg">
                <div className="pb-3">
                  <input
                    type="radio"
                    name="topping"
                    value="CASH"
                    id="nagt"
                    checked={topping === "CASH"}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="nagt" className="px-3">
                    {lang === "tm" ? "Nagt" : "Наличные"}
                  </label>
                </div>
                <div className="pb-3">
                  <input
                    type="radio"
                    name="topping"
                    value="TERMINAL"
                    id="terminal"
                    checked={topping === "TERMINAL"}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="terminal" className="px-3">
                    {lang === "tm" ? "Terminal" : "Терминал"}
                  </label>
                </div>
                <div className="pb-3">
                  <input
                    type="radio"
                    name="topping"
                    value="ONLINE"
                    id="online"
                    checked={topping === "ONLINE"}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="online" className="px-3">
                    {lang === "tm" ? "Onlaýn töleg" : "Онлайн"}
                  </label>
                </div>
              </div>
              <div className=" w-full p-3 text-lg">
                <div className="pb-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="NORMAL"
                    id="normal"
                    checked={deliveryType === "NORMAL"}
                    onChange={onDeliveryTypeChange}
                  />
                  <label htmlFor="normal" className="px-3">
                    {lang === "tm"
                      ? "Standart eltip bermek"
                      : "Стандартная доставка"}
                  </label>
                </div>
                <div className="pb-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="EXPRESS"
                    id="express"
                    checked={deliveryType === "EXPRESS"}
                    onChange={onDeliveryTypeChange}
                  />
                  <label htmlFor="express" className="px-3">
                    {lang === "tm"
                      ? "Express eltip bermek"
                      : "Экспресс доставка"}
                  </label>
                </div>
                <div className="pb-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="TIME"
                    id="time"
                    checked={deliveryType === "TIME"}
                    onChange={onDeliveryTypeChange}
                  />
                  <label htmlFor="time" className="px-3">
                    {lang === "tm" ? "Wagt saýlamak" : "Выбрать время"}
                  </label>
                </div>
              </div>
              {address && address.length > 0 ? (
                <div className="items-center">
                  <label htmlFor="address" className="text-gray-600 mb-2 block">
                    {lang === 'tm' ? "Adres" : "Адрес"}
                  </label>
                  <select
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    name="address"
                    autoComplete="address-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white   shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {address.map((add, key) => (
                      <option key={key} value={add.id}>
                        {add.address_line1}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <CreateAdres />
              )}
            </div>

            <div>
              <div className={classname}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  minDate={new Date()}
                  maxDate={maxdate}
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy hh:mm"
                  timeIntervals={15}
                  locale="ru"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            {lang === 'tm' ? "gysgaça mazmun" : "краткое содержание"}
          </h4>
          {cartItems.map((item, key) => (
            <div key={key} className="space-y-2 pb-3">
              <div className="grid grid-cols-12 justify-between">
                <div className="grid col-span-8">
                  <h5 className="text-gray-800 font-medium">
                    {lang === "tm" ? item.title : item.title_ru}
                  </h5>
                </div>
                <div className="grid col-span-2">
                  <p className="text-gray-600">x{item.quantity}</p>
                </div>
                <div className="grid col-span-2">
                  <p className="text-gray-800 font-medium">
                    {item.newprice * item.quantity}
                    {"  "}
                    {lang === "tm" ? "man" : "ман"}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex text-lg justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">{lang === "tm" ? "Jemi" : "Общий"}</p>
            <p>
              {sum} {"  "}
              {lang === "tm" ? "man" : "ман"}
            </p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="block w-full py-3 cursor-pointer px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            {lang === "tm" ? "Sargyt bermek" : "Разместить заказ"}
          </button>
        </div>
      </div>
    </>
  );

  const register = (
    <>
      <div className="col-span-9 gap-4">
        <div className="">
          <div className="container text-center justify-between max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm">
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-base font-semibold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 "
              data-te-toggle="modal"
              data-te-target="#staticBackdrop"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <div className="flex items-center">
                <img src={login} alt="login" className=" w-7 rounded-lg" />
                <p className="pl-2">{lang === "tm" ? "Içeri gir" : "Логин"}</p>
              </div>
            </button>

            <button
              type="button"
              className="inline-block ml-10 rounded bg-primary px-6 pt-2.5 pb-2 text-base font-semibold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600"
              data-te-toggle="modal"
              data-te-target="#staticBackdrop1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <div className="flex items-center">
                <img
                  src={registerpng}
                  alt="register"
                  className=" w-7 rounded-lg"
                />
                <p className="pl-2">
                  {lang === "tm" ? "Agza bolmak" : "Регистрировать"}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
  if (token.length === 0) {
    return register;
  } else {
    return content;
  }
};

export default OrderCreate;
