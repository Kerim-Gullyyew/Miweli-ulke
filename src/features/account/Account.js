import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../../config/seo";
import { useDispatch, useSelector } from "react-redux";
import { getProfileInfo } from "../../store/features/auth/authSlice";
import { getAddressInfo } from "../../store/features/auth/authSlice";
import login from "../../img/icons/login.png";
import register from "../../img/icons/register.png";
const Account = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileInfo({ token }));
  }, [dispatch, token]);
  useEffect(() => {
    dispatch(getAddressInfo({ token }));
  }, [dispatch, token]);

  const lang = localStorage.getItem("userLanguage");
  const { profile } = useSelector((state) => state?.auth);
  const { address } = useSelector((state) => state?.auth);

  let warn = (
    <>
      <SEO
        titleTemplate={lang === "tm" ? "Akaunt" : "Акаунт"}
        description="Akaunt, profil"
      />
      <div className="col-span-9 grid grid-cols-2 gap-4">
        <div className="shadow rounded bg-white px-5 pt-6 pb-4">
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {lang === "tm" ? "Şahsy profiliňiz ýok" : "Личный профиль нет"}
              </h3>
            </div>
            <div className="flex">
              <div className="px-2">
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
                    <p className="pl-2">
                      {lang === "tm" ? "Içeri gir" : "Логин"}
                    </p>
                  </div>
                </button>
                {/* <Login /> */}
              </div>
              <div className="px-2">
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-base font-semibold uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600"
                  data-te-toggle="modal"
                  data-te-target="#staticBackdrop1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <div className="flex items-center">
                    <img
                      src={register}
                      alt="register"
                      className=" w-7 rounded-lg"
                    />
                    <p className="pl-2">
                      {lang === "tm" ? "Agza bolmak" : "Регистрировать"}
                    </p>
                  </div>
                </button>
                {/* <Register /> */}
              </div>
            </div>
          </>
        </div>
        <div className="shadow rounded bg-white px-5 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              {lang === "tm" ? "Iberilýän salgy" : "Адрес доставки"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
  let content = (
    <>
      <SEO
        titleTemplate={lang === "tm" ? "Akaunt" : "Акаунт"}
        description="Akaunt, profil"
      />
      <div className="col-span-9 grid grid-cols-2 gap-4">
        <div className="shadow rounded bg-white px-5 pt-6 pb-4">
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {lang === "tm" ? "Şahsy profil" : "Личный профиль"}
              </h3>
              <Link
                to={`/account/profile/` + profile?.id}
                className="text-primary"
              >
                {lang === "tm" ? "Üýtget" : "Редактировать"}
              </Link>
            </div>

            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">
                {profile?.name} {"  "} {profile?.surname}
              </h4>
              <p className="text-gray-800">{profile?.email}</p>
            </div>
          </>
        </div>

        <div className="shadow rounded bg-white px-5 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              {lang === "tm" ? "Iberilýän salgy" : "Адрес доставки"}
            </h3>
            {address && address.length > 0 ? (
              ""
            ) : (
              <Link to="/account/address/new" className="text-primary">
                {lang === "tm" ? "Goşmak" : "Добавить"}
              </Link>
            )}
          </div>
          {address && address.length > 0 ? (
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">
                {address[0]?.fullname}
              </h4>
              <p className="text-gray-800">{address[0]?.email}</p>
              <p className="text-gray-800">{address[0]?.address_line1}</p>
              <p className="text-gray-800">{address[0]?.address_line2}</p>
            </div>
          ) : (
            <div className=" flex">
              <h4 className="font-medium text-gray-800 text-lg">
                {lang === "tm" ? "Adres ýok" : "Нет адреса"}
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
  if (token.length === 0) {
    return warn;
  } else {
    return content;
  }
};

export default Account;
