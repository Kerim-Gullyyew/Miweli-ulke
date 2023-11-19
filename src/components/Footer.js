import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import android from "../img/icons/android.png";
import ios from "../img/icons/ios.png";
const Footer = () => {
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
      <footer className="bg-white pt-6 pb-6 border-t shadow-inner border-gray-100">
        <div className="container grid grid-cols-5">
          <div className="col-span-1 space-y-8">
            <div>
              <img src={logo} alt="Logo" className=" w-36 " />
            </div>
            <div className="mr-2 font-semibold">
              <p className="text-gray-500 text-xl">Sowgatlar</p>
              <p className="text-gray-500 text-xl ">
                {lang === "tm" ? "Siz üçin" : "Для Вас"}
              </p>
            </div>
          </div>

          <div className="col-span-4 grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  {lang === "tm" ? "Habarlaşmak" : "Контакты"}
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="text-base text-gray-500 hover:text-gray-900 block">
                    +993 62 18 33 30
                  </div>
                  <div className="text-base text-gray-500 hover:text-gray-900 block">
                    +993 62 18 92 22
                  </div>
                  <div className="text-base text-gray-500 hover:text-gray-900 block">
                    info@sowgatlar.com
                  </div>
                  <div className="text-base text-gray-500 hover:text-gray-900 block">
                    @sowgatlar.com.tm
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  {lang === "tm" ? "Sahypalar" : "Страницы"}
                </h3>
                <div className="mt-4 space-y-4">
                  <Link
                    to="/aboutUs"
                    className="text-base text-gray-500 hover:text-gray-900 block"
                  >
                    {lang === "tm" ? "Biz barada" : "О нас"}
                  </Link>
                  <Link
                    to="/brand"
                    className="text-base text-gray-500 hover:text-gray-900 block"
                  >
                    {lang === "tm" ? "Brendler" : "Бренды"}
                  </Link>
                  <Link
                    to="/account/wishlist"
                    className="text-base text-gray-500 hover:text-gray-900 block"
                  >
                    {lang === "tm" ? "Halanlarym" : "Список желаний"}
                  </Link>
                  <Link
                    to="/account/card"
                    className="text-base text-gray-500 hover:text-gray-900 block"
                  >
                    {lang === "tm" ? "Sebet" : "Корзина"}
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  FAQ
                </h3>
                <div className="mt-4 space-y-4">
                  <Link
                    to="/privacy_policy"
                    className="text-base text-gray-500 hover:text-gray-900 block"
                  >
                    {lang === "tm"
                      ? "Gizlinlik syýasaty"
                      : "Политика конфиденциальности"}
                  </Link>
                  <Link
                    to="/account/delivery"
                    className="text-base text-gray-500 hover:text-gray-900 block"
                  >
                    {lang === "tm" ? "Töleg metody" : "Способ оплата"}
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  {lang === "tm"
                    ? "Mobile üçin programma"
                    : "Программа для мобильного"}
                </h3>
                <div className="mt-4 space-y-4 xl:pr-10">
                  <div onClick={DownloadFromPlayMarket} className="flex border cursor-pointer rounded-lg p-2">
                    <div className="flex items-center">
                      <img
                        src={android}
                        alt="android"
                        className="px-2 opacity-80"
                      />
                      <div className="px-3">
                        <div className="text-xs text-gray-400 font-base">
                          Get it on
                        </div>
                        <div className="text-sm text-gray-600">Google Play</div>
                      </div>
                    </div>
                  </div>
                  <div onClick={DownloadFromAppStore} className="flex border cursor-pointer rounded-lg p-2">
                    <div className="flex items-center">
                      <img
                        src={ios}
                        alt="android"
                        className="px-2"
                      />
                      <div className="px-3">
                        <div className="text-xs text-gray-400 font-base">
                          Download on the
                        </div>
                        <div className="text-sm text-gray-600">App Store</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
