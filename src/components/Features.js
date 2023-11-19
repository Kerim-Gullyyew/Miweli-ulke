import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backendUrl } from "../rootUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
SwiperCore.use([Pagination, Scrollbar, A11y]);
const Features = () => {
  const lang = localStorage.getItem("userLanguage");
  const { groups } = useSelector((state) => state.info?.mainInfo);
  return (
    <>
      {groups && groups?.length > 0 ? (
        <div>
          {groups.map((group, key) => (
            <div key={key} className="container py-3">
              <h2 className="text-2xl font-poppins text-center font-medium text-gray-800 uppercase mb-6">
                {lang === "tm" ? group?.title : group?.title_ru}
              </h2>

              <div className="w-full mx-auto justify-center">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                >
                  {group?.group_tag?.map((tag, key) => (
                    <SwiperSlide key={key}>
                      <div className=" lg:px-3 xl:px-6 justify-center pb-10 mx-2 flex">
                        <Link
                          to={`/shop/?tag=` + tag?.id}
                          className=" bg-white shadow-md  hover:bg-opacity-60 rounded-full px-5 py-5 flex-col flex justify-center items-center gap-2"
                        >
                          <img  
                            src={backendUrl + tag?.image}
                            alt={lang === "tm" ? tag?.title : tag?.title_ru}
                            className="w-12 h-12 object-contain"
                          />
                          <div>
                            <h4 className="font-medium font-poppins capitalize text-lg">
                              {lang === "tm" ? tag?.title : tag?.title_ru}
                            </h4>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Features;
