import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrderInfo } from "../../store/features/auth/authSlice";

import Pagination from "./Pagination";
const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = localStorage.getItem("userLanguage");
  const { token } = useSelector((state) => state.auth);
  let url = "";
  useEffect(() => {
    dispatch(getOrderInfo({ url, token }));
  }, [dispatch, token, url]);
  const { orders } = useSelector((state) => state.auth);

  let content = (
    <>
      <div className="col-span-9 gap-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        {lang === 'tm' ? "Sargyt belgisi:" : "Номер заказа:"}
                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === 'tm' ? "Sargydyň senesi" : "Дата заказа"}

                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === 'tm' ? "Jemi bahasy:" : "Общая стоимость:"}
                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === 'tm' ? "Töleg şekli" : "Способ оплаты"}
                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === 'tm' ? "Ýagdaýy" : "Ситуация"}

                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === 'tm' ? "Hereket" : "Действие"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.results?.map((order, key) => (
                      <tr
                        key={key}
                        className={`${order?.status === "TOPAY"
                          ? " bg-yellow-200 border-b border-neutral-100 text-neutral-800"
                          : "bg-stone-200 border-b border-neutral-100 text-neutral-800"
                          }`}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {order?.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order?.delivery_time}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order?.total_price}{lang === 'tm' ? " m" : " м"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order?.payment === "CASH" ? lang === 'tm' ? "NAGT" : "НАЛИЧНЫЕ" : order?.payment === "ONLINE" ? lang === 'tm' ? "ONLAÝN" : "ОНЛАЙН" : order?.payment === "TERMINAL" ? lang === 'tm' ? "TERMINAL" : "ТЕРМИНАЛ" : ""}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {order?.status === "TOPAY" &&
                            order?.payment === "ONLINE"
                            ? lang === 'tm' ? "TÖLENMELI" : "ПЛАТИТЬ"
                            : order?.status === "ORDERPLACED"
                              ? lang === 'tm' ? "SARGYT ÝERLEŞDIRILDI" : "ЗАКАЗ РАЗМЕЩЕН"
                              : order?.status === "REVISED"
                                ? lang === 'tm' ? "SEREDILDI" : "ПЕРЕСМОТРЕН"
                                : order?.status === "ACCEPTED"
                                  ? lang === 'tm' ? "KABUL EDILDI" : "ПРИНЯЛ"
                                  : order?.status === "DECLINED" ? lang === 'tm' ? "INKÄR EDILDI" : "ОТКЛОНЕННЫЙ"
                                    : order?.status === "SHIPPED" ? lang === 'tm' ? "IBERILDI" : "ОТПРАВЛЕН"
                                      : order?.status === "DELIVERED" ? lang === 'tm' ? "BERILDI" : "ДОСТАВЛЕН"
                                        : order?.status === "RETURNED" ? lang === 'tm' ? "GAÝTARYLAN" : "ВОЗВРАЩЕН"
                                          : order?.status === "PAID" ? lang === 'tm' ? "TÖLENEN" : "ОПЛАЧЕН"
                                            : order?.status === "NOTPAID" ? lang === 'tm' ? "TÖLENMEDIK" : "НЕ ВЫПЛАЧЕН" : ""
                          }
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link to={"/account/orderDetail/" + order?.id}>
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
                              data-te-ripple-init>
                              {lang === 'tm' ? "Giňişleýin görmek" : "Подробнее"}
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination orders={orders} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (token.length > 0) {
    return content;
  } else {
    navigate("/");
  }
};

export default OrderList;
