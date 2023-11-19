import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backendUrl } from "../rootUrl";
import bannerimage from "../img/banner/nature.jpg";
const Banner = () => {
  const { banners } = useSelector((state) => state.info.mainInfo);
  return (
    <>
      {banners && banners.length > 0 ? (
        <div className="container">
          <div className=" grid grid-cols-5 rounded-2xl pt-3">
            <div className=" w-full col-span-4">
              <div
                id="carouselExampleIndicators"
                className="relative"
                data-te-carousel-init
                data-te-carousel-slide
              >
                <div
                  className="absolute right-0 bottom-0 left-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                  data-te-carousel-indicators
                >
                  {banners.map((key)=>(
                    <button
                    key={key}
                    type="button"
                    data-te-target="#carouselExampleIndicators"
                    data-te-slide-to="0"
                    data-te-carousel-active
                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  ))}
                </div>
                <div className="relative p-2 w-full overflow-hidden after:clear-both after:block after:content-['']">
                  {banners.map((banner, key) => (
                    <div
                      key={key}
                      className=" relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                      data-te-carousel-item
                      data-te-carousel-active
                    >
                      <img
                        src={backendUrl + banner.image}
                        className="block shadow-md w-full rounded-3xl"
                        alt={banner.title}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                  type="button"
                  data-te-target="#carouselExampleIndicators"
                  data-te-slide="prev"
                >
                  <span className="inline-block h-8 w-8">
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
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </span>
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Previous
                  </span>
                </button>
                <button
                  className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                  type="button"
                  data-te-target="#carouselExampleIndicators"
                  data-te-slide="next"
                >
                  <span className="inline-block h-8 w-8">
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Next
                  </span>
                </button>
              </div>
            </div>

            <div className=" grid grid-rows-2 col-span-1 mr-5 mb-5 mt-10 object-contain">
              <div className=" justify-center pb-1">
                <div className="block max-w-sm rounded-lg bg-white shadow-lg ">
                  <Link to="/">
                    <img className="rounded-lg" src={bannerimage} alt="" />
                  </Link>
                </div>
              </div>

              <div className=" justify-center">
                <div className="object-fill block max-w-sm rounded-lg bg-white shadow-lg ">
                  <Link to="/">
                    <img className="rounded-lg" src={bannerimage} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Banner;
