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

          <div className="grid sm:grid-cols-2 gap-x-6 lg:gap-x-12">

            <div className="mb-6 md:px-10">
              <div onClick={DownloadFromPlayMarket} className="border cursor-pointer p-5 rounded-lg shadow-md">
                <div className="flex items-center">
                  <img src={android} alt="android" className="w-20 pr-3" />
                  <div className=" text-start">
                    <div>Get it on</div>
                    <div>Google Play</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6 md:px-10">
              <div onClick={DownloadFromAppStore} className="border cursor-pointer p-5 rounded-lg shadow-md">
                <div className="flex items-center">
                  <img src={ios} alt="android" className="w-20 pr-3" />
                  <div className=" text-start">
                    <div>Download on the</div>
                    <div>App Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* </div> */}
    </>
  );
};

export default Mobile;
