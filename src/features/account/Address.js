import React from "react";
import { Link } from "react-router-dom";
import {
  deleteAddressInfo,
  getAddressInfo,
} from "../../store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SEO from "../../config/seo";
const Address = () => {
  const lang = localStorage.getItem("userLanguage");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAddressInfo({ token }));
  }, [dispatch, token]);
  const { address } = useSelector((state) => state?.auth);
  return (
    <>
      <SEO
        titleTemplate={lang === "tm" ? "Adres" : "Адрес"}
        description="Akaunt, profil, adres, адрес"
      />
      <div className="col-span-9 gap-4">
        <div>
          <Link to="/account/address/new">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              {lang === "tm" ? "Adres Goşmak" : "Добавить адрес"}
            </button>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        {lang === "tm" ? "Telefon" : "Телефон"}
                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === "tm" ? "Adres" : "Адрес"}
                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === "tm" ? "Doly ady" : "Полная имя"}
                      </th>
                      <th scope="col" className="px-6 py-4">
                        {lang === "tm" ? "Hereket" : "Действие"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {address === undefined ||
                    address === null ||
                    address.length < 0 ? (
                      <tr className="border-b border-neutral-100 bg-stone-200 text-neutral-800">
                        <td className="whitespace-nowrap px-6 py-4 font-medium"></td>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                      </tr>
                    ) : (
                      <>
                        {address.map((add, key) => (
                          <tr
                            key={key}
                            className="border-b border-neutral-100 bg-stone-200 text-neutral-800"
                          >
                            <td className="whitespace-nowrap px-3 py-2 font-medium">
                              {add.mobile}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 font-medium">
                              {add.address_line1}
                              <br /> {add.address_line2}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2">
                              {add.fullname}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2">
                              <Link to={`/account/address/` + key}>
                                <button
                                  type="button"
                                  className="inline-block px-2 py-2 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  {lang === "tm" ? "Üýtget" : "Редактировать"}
                                </button>
                              </Link>
                              <div
                                onClick={() =>
                                  dispatch(
                                    deleteAddressInfo({
                                      token,
                                      id: add.id,
                                    })
                                  )
                                }
                                className="inline-block cursor-pointer px-2 py-2 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-600 active:shadow-lg transition duration-150 ease-in-out"
                              >
                                {lang === "tm" ? "Poz" : "Удалить"}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
