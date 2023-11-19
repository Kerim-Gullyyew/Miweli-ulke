import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileInfo } from '../../store/features/auth/authSlice';
import { logoutUser } from '../../store/features/auth/authSlice';
import {
  faAddressCard,
  faCreditCard,
  faHeart,
  faShoppingBag,
  faBoxArchive,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from '../../rootUrl';
const Sidebar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfileInfo({ token }));
  }, [dispatch, token]);
  const lang = localStorage.getItem("userLanguage");
  const { profile } = useSelector((state) => state?.auth);
  return (
    <div className="col-span-3">

      <div className="px-4 py-3 shadow flex items-center gap-4">
        <div className="flex-shrink-0">
          <img src={backendUrl + profile?.avatar} alt={lang === 'tm' ? "awatar" : "аватар"}
            className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
        </div>
        <div className="flex-grow">
          <p className="text-gray-600">{lang === 'tm' ? "Telefon nomer" : "Номер телефон"}</p>
          <h4 className="text-gray-800 font-medium">{profile?.user?.username}</h4>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
        {token.length === 0 ? ("") : (
          <>
            <div className="space-y-1 pl-8">
              <Link to="/account"
                className="relative text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FontAwesomeIcon icon={faAddressCard} />
                </span>
                {lang === 'tm' ? "Akaundym" : "Мой акаунт"}
              </Link>

              <Link to="/account/address"
                className="relative hover:text-primary block capitalize transition"
              >
                {lang === 'tm' ? "Salgylary dolandyrmak" : "Управление адресами"}
              </Link>
              <Link to="/account/passwordreset"
                className="relative hover:text-primary block capitalize transition"
              >
                {lang === 'tm' ? "Paroly üýtgetmek" : "Изменить пароль"}
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link to="/account/orderlist"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FontAwesomeIcon icon={faBoxArchive} />
                </span>
                {lang === 'tm' ? "Sargytlarym" : "Моя история заказов"}
              </Link>

            </div>
          </>
        )}

        <div className="space-y-1 pl-8 pt-4">
          <Link to="/account/delivery"
            className="relative hover:text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-8 top-0 text-base">
              <FontAwesomeIcon icon={faCreditCard} />
            </span>
            {lang === 'tm' ? "Töleg usullary" : "Способы оплаты"}
          </Link>

        </div>

        <div className="space-y-1 pl-8 pt-4">
          <Link to="/account/card"
            className="relative hover:text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-8 top-0 text-base">
              <FontAwesomeIcon icon={faShoppingBag} />
            </span>
            {lang === "tm" ? "Sebet" : "Корзина"}
          </Link>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <Link to="/account/wishlist"
            className="relative hover:text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-8 top-0 text-base">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            {lang === "tm" ? "Halanlarym" : "Список желаний"}
          </Link>
        </div>
        {token.length === 0 ? ('') : (
          <div className="space-y-1 pl-8 pt-4">
            <div
            onClick={() => dispatch(logoutUser())}
              className="relative cursor-pointer hover:text-primary block font-medium capitalize transition"
            >
              <span className="absolute -left-8 top-0 text-base">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
              {lang === 'tm' ? "Hasapdan çykmak" : "Выйти"}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar