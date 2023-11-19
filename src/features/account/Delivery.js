import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDelivery } from "../../store/features/delivery/deliverySlice";
import { backendUrl } from "../../rootUrl";

const Delivery = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDelivery());
  }, [dispatch]);

  const { delivery } = useSelector((state) => state.delivery);
  const lang = localStorage.getItem("userLanguage");
  return (
    <div className="col-span-9 gap-4">
      <div className="">
        <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm">
          <div className="mt-3">
            <p
              rel="noopener noreferrer"
              className="text-2xl font-bold hover:underline"
            >
              {lang === 'tm' ? delivery.delivery_title_tm : delivery.delivery_title_ru}
            </p>
            <p className="mt-2">
              {lang === 'tm' ? delivery.delivery_content_1_tm : delivery.delivery_content_1_ru}
            </p>
          </div>

          <div className="mt-3">
            <p
              rel="noopener noreferrer"
              className="text-2xl font-bold hover:underline"
            >
              {lang === 'tm' ? delivery.payment_title_tm : delivery.payment_title_ru}
            </p>
            <p className="mt-2">
              {lang === 'tm' ? delivery.payment_content_1_tm : delivery.payment_content_1_ru}
            </p>
          </div>

          <div className="mt-3 w-80">
            <img src={backendUrl + (lang === 'tm' ? delivery.payment_image_1_tm : delivery.payment_image_1_ru)} alt={delivery.payment_image_1_tm} />
          </div>

          <div className="mt-3">
            <p className="mt-2">
              {lang === 'tm' ? delivery.payment_content_2_tm : delivery.payment_content_2_ru}
            </p>
          </div>

          <div className="mt-3 w-80">
            <img src={backendUrl + (lang === 'tm' ? delivery.payment_image_2_tm : delivery.payment_image_2_ru)} alt={delivery.payment_image_2_tm} />
          </div>

          <div className="mt-3">
            <p className="mt-2">
              {lang === 'tm' ? delivery.payment_content_3_tm : delivery.payment_content_3_ru}
            </p>
          </div>

          <div className="mt-3 w-80">
            <img src={backendUrl + delivery.payment_image_3_tm} alt={delivery.payment_image_3_tm} />
          </div>

          <div className="mt-3">
            <p className="mt-2">
              {lang === 'tm' ? delivery.payment_content_4_tm : delivery.payment_content_4_ru}
            </p>
          </div>

          <div className="mt-3 w-80">
            <img src={backendUrl + delivery.payment_image_4_tm} alt={delivery.payment_image_4_tm} />
          </div>

          <div className="mt-3 ">
            <p className="mt-2">
              {lang === 'tm' ? delivery.payment_content_5_tm : delivery.payment_content_5_ru}
            </p>
          </div>

          <div className="mt-3 w-80">
            <img src={backendUrl + delivery.payment_image_5_tm} alt={delivery.payment_image_5_tm} />
          </div>

          <div className="mt-3">
            <p className="mt-2">
              {lang === 'tm' ? delivery.payment_content_6_tm : delivery.payment_content_6_ru}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
