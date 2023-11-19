import React from "react";
import android from "../img/icons/playmarket.png";
import ios from "../img/icons/appstore.png";
const Mobile = () => {
  const lang = localStorage.getItem("userLanguage");
  const DownloadFromPlayMarket = (e) => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.sowgatlar.app&pli=1";
  };
  const DownloadFromAppStore = (e) => {
    window.location.href =
      "https://apps.apple.com/us/app/sowgatlar/id6447701349";
  };
  return (
    <>
    {/* <div className=" flex-1 px-2 bg-primaryBackground flex flex-col h-screen justify-between"> */}

      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800 text-center">
          <h2 className="text-3xl font-bold mb-12">
            {lang === "tm"
              ? "Telefon üçin programmalar"
              : "Мобильные приложения"}
          </h2>

          <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-12">
            <div onClick={DownloadFromPlayMarket} className="mb-12 cursor-pointer md:mb-0">
              <div className="flex justify-center mb-6">
                <img src={android} alt="android" className="w-32" />
              </div>
              <h5 className="text-lg font-bold text-blue-600 mb-4">
                {lang === "tm"
                  ? "Playmarketden ýüklemek"
                  : "Скачать с плеймаркета"}
              </h5>
            </div>
            <div onClick={DownloadFromAppStore} className="mb-12 cursor-pointer md:mb-0">
              <div className="flex justify-center mb-6">
                <img src={ios} alt="ios" className="w-32" />
              </div>
              <h5 className="text-lg font-bold text-blue-600 mb-4">
                {lang === "tm"
                  ? "App Storedan ýüklemek"
                  : "Скачать из App Store"}
              </h5>
            </div>
          </div>
        </section>
      </div>
    {/* </div> */}
    </>
  );
};

export default Mobile;
