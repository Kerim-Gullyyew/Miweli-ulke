import React from "react";
import { useEffect } from "react";
import { getOrderDetailInfo } from "../../store/features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../rootUrl";
import ModalButton from "./ModalButton";
const OrderDetail = () => {
  const lang = localStorage.getItem("userLanguage");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getOrderDetailInfo({ id: id, token: token }));
    }
  }, [dispatch, id, token]);
  const navigate = useNavigate();
  const { orderDetail } = useSelector((state) => state?.auth);

  let content = (
    <>
      <div className="col-span-9 gap-4">
        <div className=" shadow-md rounded-lg">
          <div className=" bg-white flex justify-between rounded-t-lg px-5 py-2">
            {lang === 'tm' ? "Sargyt belgisi:" : "Номер заказа:"}
            <div> {orderDetail?.id}</div>
            <div>{orderDetail?.delivery_time}</div>
          </div>

          <div className=" bg-white flex justify-between px-5 py-2">
            <div>{lang === 'tm' ? "Jemi bahasy:" : "Общая стоимость:"}</div>
            <div>{orderDetail?.total_price} m.</div>
          </div>

          <div className=" bg-white flex justify-between px-5 py-2">
            <div>{lang === 'tm' ? "Töleg şekli" : "Способ оплаты"}</div>
            <div>
              {orderDetail?.payment === "CASH" ? lang === 'tm' ? "NAGT" : "НАЛИЧНЫЕ" : orderDetail?.payment === "ONLINE" ? lang === 'tm' ? "ONLAÝN" : "ОНЛАЙН" : orderDetail?.payment === "TERMINAL" ? lang === 'tm' ? "TERMINAL" : "ТЕРМИНАЛ" : ""}
            </div>
          </div>

          <div className=" bg-white flex rounded-b-lg justify-between px-5 py-2">
            <div></div>
            <div className="bg-gray-200 p-1 text-green-600 font-semibold">
              {orderDetail?.status === "TOPAY" &&
                orderDetail?.payment === "ONLINE" ? (
                <ModalButton />
              ) : (
                orderDetail?.status === "TOPAY" &&
                orderDetail?.payment === "ONLINE"
                ? lang === 'tm' ? "TÖLENMELI" : "ПЛАТИТЬ"
                : orderDetail?.status === "ORDERPLACED"
                  ? lang === 'tm' ? "SARGYT ÝERLEŞDIRILDI" : "ЗАКАЗ РАЗМЕЩЕН"
                  : orderDetail?.status === "REVISED"
                    ? lang === 'tm' ? "SEREDILDI" : "ПЕРЕСМОТРЕН"
                    : orderDetail?.status === "ACCEPTED"
                      ? lang === 'tm' ? "KABUL EDILDI" : "ПРИНЯЛ"
                      : orderDetail?.status === "DECLINED" ? lang === 'tm' ? "INKÄR EDILDI" : "ОТКЛОНЕННЫЙ"
                        : orderDetail?.status === "SHIPPED" ? lang === 'tm' ? "IBERILDI" : "ОТПРАВЛЕН"
                          : orderDetail?.status === "DELIVERED" ? lang === 'tm' ? "BERILDI" : "ДОСТАВЛЕН"
                            : orderDetail?.status === "RETURNED" ? lang === 'tm' ? "GAÝTARYLAN" : "ВОЗВРАЩЕН"
                              : orderDetail?.status === "PAID" ? lang === 'tm' ? "TÖLENEN" : "ОПЛАЧЕН"
                                : orderDetail?.status === "NOTPAID" ? lang === 'tm' ? "TÖLENMEDIK" : "НЕ ВЫПЛАЧЕН" : ""
              
              )}
            </div>

          </div>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md">
              <table className="table-fixed">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      {lang === 'tm' ? "Surat" : "Изображение"}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {lang === 'tm' ? "Ady" : "Заголовок"}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {lang === 'tm' ? "Düşündiriş" : "Описание"}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {lang === 'tm' ? "Mukdar" : "Количество"}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {lang === 'tm' ? "Jemi" : "Сумма"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail?.items?.map((order, key) => (
                    <tr
                      key={key}
                      className="border-b break-normal border-neutral-100 text-neutral-800 bg-white "
                    >
                      <td className=" px-2 py-4 font-medium w-28">
                        <img
                          src={backendUrl + order?.option?.image}
                          alt={lang === 'tm' ? order?.option?.title : order?.option?.title_ru}
                        />
                      </td>
                      <td className=" px-6 py-4">{lang === 'tm' ? order?.option?.title : order?.option?.title_ru}</td>
                      <td className=" px-6 py-4">
                        {lang === 'tm' ? order?.product?.description?.substring(0, 200) : order?.product?.description_ru?.substring(0, 200)}
                      </td>
                      <td className=" px-6 py-4">{order?.quantity}</td>
                      <td className=" px-6 py-4">
                        {order?.option?.price_new * order?.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (token.length > 0) {
    return content;
  } else {
    navigate('/')
  }
};

export default OrderDetail;
