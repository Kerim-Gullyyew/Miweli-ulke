import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { backendUrl } from "../rootUrl";
import SwiperCore, { Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
SwiperCore.use([Pagination, Scrollbar, A11y]);
const Categories = () => {
  const lang = localStorage.getItem("userLanguage");
  const { brands } = useSelector((state) => state?.info?.mainInfo);
  return (
    <>
      {brands && brands?.length > 0 ? (
        <div className="container py-3 pb-6">
          <h2 className="text-2xl text-center font-medium text-gray-800 uppercase mb-6">
            {lang === "tm" ? "Brendler" : "Бренды"}
          </h2>

          <div className="w-full mx-auto justify-center">
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              pagination={{ clickable: true }}
            >
              {brands.map((brand, key) => (
                <SwiperSlide key={key}>
                  <div className=" lg:px-2 xl:px-2 pb-10 mx-2 flex">
                    <Link
                      to={`/shop/?brand=` + brand.id}
                      className="border bg-white shadow-md hover:bg-opacity-60 rounded-full px-4 py-4 lg:px-7 lg:py-7 flex justify-center items-center gap-5"
                    >
                      <img
                        src={backendUrl + brand.image}
                        alt={lang === "tm" ? brand?.title : brand?.title_ru}
                        className=" h-20 object-contain"
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Categories;
