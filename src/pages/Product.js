import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import isOdd from "../utils/isOdd";
import { FaPlus } from "react-icons/fa";
import ProductNew from "../features/product/product/component/ProductNew";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getProduct, getProductFilter } from "../features/product/product/productSlice";
import {
  ProductContext,
  ProductFilterContext,
  ProductStatusContext,
} from "../features/product/ProductContext";
import { paginationContext } from "../components/table/tableContext";
import { name } from "../features/featuresSlice";
import { backendUrl } from "../data/ConstTexts";
import Loader from "../utils/Loader";
import { FiFilter } from "react-icons/fi";
import { BiDownload } from "react-icons/bi";
const Product = () => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(name("view"));
  }, [dispatch]);

  const product = useSelector((state) => state.product);
  const download = useSelector((state) => state.product.file);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [minprice, setMinprice] = useState("");
  const [maxprice, setMaxprice] = useState("");
  const [error, SetError] = useState("");
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
    let { search } = useLocation();

    useEffect(() => {
      if (searchParams.get("title") === null) {
        setTitle("");
      }else{
        setTitle(searchParams.get("title"));
      }
      if (searchParams.get("code") === null) {
        setCode("");
      }else{
        setCode(searchParams.get("code"));
      }
      if (searchParams.get("minprice") === null) {
        setMinprice("");
      }else{
        setMinprice(searchParams.get("minprice"));
      }
      if (searchParams.get("maxprice") === null) {
        setMaxprice("");
      }else{
        setMaxprice(searchParams.get("maxprice"));
      }
    }, [searchParams])

    useEffect(() => {
      let isCancelled = false;
        dispatch(getProductFilter({ token, search }))
          .unwrap()
          .catch((err) => SetError(err));
        return () => {
          isCancelled = true;
        };
    }, [dispatch, token, search]);
  const views = useSelector((state) => state.views);

  function handleClick({ link }) {
    try {
      dispatch(getProduct({ token, link }))
        .unwrap()
        .then((res) => {});
    } catch (err) {
      SetError(err);
    }
    return () => {};
  }

  const onDownload = async (e) => {
    e.preventDefault();
    if (download !== null) {
      window.location.href = backendUrl + "/media/" + download;
      // navigate(backendUrl + `/media/` + download);
    }
  }
  const onFilter = async (e) => {
    e.preventDefault();
    navigate(`/product/?title=` + title + `&code=` + code + `&minprice=` + minprice + `&maxprice=` + maxprice);
  };
  let content = (
    <>
      {views.name === "view" && (
        <section className="bg-white rounded-lg hover:shadow">
          <p className="text-center text-lg font-bold font-poppins text-red-600">
            {error?.detail}
          </p>

          <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
            <div className="font-bold font-poppins text-lg grow">Product</div>

            <div className="mr-10 flex items-center p-1 cursor-pointer bg-blue-600 text-white  text-lg font-bold font-poppins text-center rounded-lg">
              <FaPlus onClick={() => dispatch(name("new"))} />
            </div>
          </div>
          <hr className="border border-colorBorder" />

          <div className="flex flex-wrap px-10 py-3 justify-center">
            <div className="pr-3">
              <label htmlFor="title">{ProductFilterContext.title}:</label>
              <div className="bg-white items-center border-b border-blue-500">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={title}
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="pr-3">
              <label htmlFor="code">{ProductFilterContext.code}:</label>
              <div className="bg-white items-center border-b border-blue-500">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={code}
                  id="code"
                  name="code"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>

            <div className="pr-3">
              <label htmlFor="minprice">{ProductFilterContext.minprice}:</label>
              <div className="bg-white items-center border-b border-blue-500">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={minprice}
                  id="minprice"
                  name="minprice"
                  onChange={(e) => setMinprice(e.target.value)}
                />
              </div>
            </div>

            <div className="pr-3">
              <label htmlFor="maxprice">{ProductFilterContext.maxprice}:</label>
              <div className="bg-white items-center border-b border-blue-500">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={maxprice}
                  id="maxprice"
                  name="maxprice"
                  onChange={(e) => setMaxprice(e.target.value)}
                />
              </div>
            </div>

            <div className="pr-3">
              <div>Filter</div>
              <FiFilter
                onClick={onFilter}
                className="flex w-full text-blue-600  cursor-pointer"
                size={30}
              />
            </div>
            {download ? (
            <div>
              <div>Ýüklemek</div>
              <BiDownload
                onClick={onDownload}
                className="flex w-full text-blue-600  cursor-pointer"
                size={30}
              />
            </div>

            ):("")}
            
            {/* {BatchFilterContext.search} */}
          </div>

          <div className="w-full">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block overflow-x-auto min-w-full p-2">
                  <div className="overflow-hidden">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="font-medium">
                          <tr className=" bg-blue-50 text-colorTextDarkBlue">
                            <th scope="col" className=" px-6 py-2">
                              {ProductContext.code}
                            </th>
                            <th scope="col" className=" px-6 py-2">
                              {ProductContext.image}
                            </th>
                            <th scope="col" className=" px-6 py-2">
                              {ProductContext.title}
                            </th>
                            <th scope="col" className=" px-6 py-2">
                              {ProductContext.price}
                            </th>
                            <th scope="col" className=" px-6 py-2">
                              {ProductContext.status}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {product?.results?.map((product, key) => (
                              <tr
                                key={key}
                                onClick={() =>
                                  navigate("/product/" + product.id)
                                }
                                // onClick={navigateBatchDetail(batch?.id)}
                                className={
                                  isOdd(key)
                                    ? " bg-white cursor-pointer hover:bg-blue-200"
                                    : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                                }
                              >
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {product.code}
                                </td>
                                <td className=" whitespace-nowrap flex justify-center p-2 font-medium">
                                  <img
                                    className="w-10 h-10 object-contain"
                                    src={backendUrl + product.image}
                                    alt="img"
                                  />
                                </td>
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {product.title}
                                </td>
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {product.price}
                                </td>
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {product.is_active
                                    ? ProductStatusContext.active
                                    : ProductStatusContext.inactive}
                                </td>
                              </tr>
                            ))}
                          </>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav
            aria-label="Page navigation"
            className="flex justify-end xs:pr-5 pb-3"
          >
            <ul className="inline-flex">
              <li>
                {product.previous !== null && (
                  <button
                    onClick={() => handleClick({ link: product.previous })}
                    className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
                  >
                    {paginationContext.prev}
                  </button>
                )}
              </li>

              <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
                {product.count}
              </button>

              <li>
                {product.next !== null && (
                  <button
                    onClick={() => handleClick({ link: product.next })}
                    className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
                  >
                    {paginationContext.next}
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </section>
      )}

      {views.name === "new" && <ProductNew />}
    </>
  );
  return content;
};

export default Product;
