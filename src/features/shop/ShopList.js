import React, { useLayoutEffect } from "react";
import {
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFilterProducts } from "../../store/features/product/productSlice";
import { useState, useEffect } from "react";
import Product from "./Product";
import { backendUrl, limit } from "../../rootUrl";
import {
  faHouse,
  faChevronRight,
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Accordion from "./Accordion";
import ScrollToTop from "../../scrollToTop";

function toTree(data, parent = null) {

  return data?.reduce((r, e) => {
    if (e.parent === parent) {
      const obj = { ...e };
      const children = toTree(data, e.id);
      if (children.length) obj.children = children;
      r.push(obj);
    }
    return r;
  }, []);
}

const ShopList = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});
  const dispatch = useDispatch();
  let { search } = useLocation();
  let [searchParams] = useSearchParams();
  let offset = searchParams.get("offset");
  let brand = searchParams.get("brand");
  let category = searchParams.get("category");
  let tag = searchParams.get("tag");
  let holiday = searchParams.get("holiday");
  let location = searchParams.get("location");
  let title = searchParams.get("title");
  let title_ru = searchParams.get("title_ru");
  if (brand === null) {
    brand = "";
  }
  if (offset === null) {
    offset = "";
  }
  if (title_ru === null) {
    title_ru = "";
  }
  if (title === null) {
    title = "";
  }
  if (location === null) {
    location = "";
  }
  if (holiday === null) {
    holiday = "";
  }
  if (category === null) {
    category = "";
  }
  if (tag === null) {
    tag = "";
  }
  useEffect(() => {
    dispatch(getFilterProducts({ search }));
  }, [dispatch, search]);

  const [min_price, setMin_price] = useState(-1);
  const onMin_priceChanged = (e) => setMin_price(e.target.value);

  const [max_price, setMax_price] = useState(100000);
  const onMax_priceChanged = (e) => setMax_price(e.target.value);
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const onOptionChange = (e) => {
    setSort(e.target.value);
    navigate(
      `/shop/?title=` +
        title +
        `&title_ru=` +
        title_ru +
        `&holiday=` +
        holiday +
        `&location=` +
        location +
        `&brand=` +
        brand +
        `&category=` +
        category +
        e.target.value +
        `&tag=` +
        tag +
        `&min_price=` +
        min_price +
        `&max_price=` +
        max_price
    );
  };

  const { filterProducts } = useSelector((state) => state?.product);
  const count = filterProducts?.count;
  const next = filterProducts?.next;
  const previous = filterProducts?.previous;
  const products = filterProducts?.results;

  const nextLink = next?.split("/");
  const previousLink = previous?.split("/");

  const categories = useSelector((state) => state?.info?.mainInfo?.categories);
  const category_list = toTree(categories);
  const brands = useSelector((state) => state?.info?.mainInfo?.brands);
  const lang = localStorage.getItem("userLanguage");

    return (
      <>
        {filterProducts ? (
          <>
            <div className="container py-4 flex items-center gap-3">
              <Link to="/" className="text-primary text-base">
                <FontAwesomeIcon icon={faHouse} />
              </Link>
              <span className="text-sm text-gray-400">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <p className="text-gray-600 font-medium">Shop</p>
            </div>
  
            <div className="container grid grid-cols-3 gap-6 pt-4 pb-16 items-start">
              <div className="col-span-1 bg-white px-6 pb-6 shadow rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200 space-y-5">
                  {category_list && category_list.length > 0 ? (
                    <div>
                      <h3 className="text-xl text-gray-800 mb-1 mt-2 uppercase font-medium">
                        {lang === "tm" ? "Kategoriýalar" : "Категории"}
                      </h3>
                      <div className="space-y-2">
                        <Accordion max_price={max_price} min_price={min_price} sort={sort} />
                      </div>
                    </div>
                  ) : (
                    " "
                  )}
  
                  <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                      {lang === "tm" ? "Brendler" : "Бренды"}
                    </h3>
                    <div className="space-y-2">
                      {brands ? (
                        <div className="items-center cursor-pointer grid grid-cols-2">
                          <>
                            {brands?.map((brand, key) => (
                              <Link
                                key={key}
                                to={
                                  `/shop/?title=` +
                                  title +
                                  `&title_ru=` +
                                  title_ru +
                                  `&holiday=` +
                                  holiday +
                                  `&location=` +
                                  location +
                                  `&brand=` +
                                  brand.id +
                                  sort +
                                  `&tag=` +
                                  tag +
                                  `&min_price=` +
                                  min_price +
                                  `&max_price=` +
                                  max_price
                                }
                              >
                                <div>
                                  <img
                                    src={backendUrl + brand?.image}
                                    alt={brand?.title}
                                    className=" h-10"
                                  />
                                </div>
                              </Link>
                            ))}
                          </>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
  
                  <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                      {lang === "tm" ? "Baha" : "Цена"}
                    </h3>
                    <div className="mt-4 flex items-center">
                      <input
                        type="text"
                        name="min"
                        value={min_price}
                        onChange={onMin_priceChanged}
                        id="min"
                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                        placeholder="min"
                      />
                      <span className="mx-3 text-gray-500">-</span>
                      <input
                        type="text"
                        name="max"
                        value={max_price}
                        onChange={onMax_priceChanged}
                        id="max"
                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                        placeholder="max"
                      />
                      <Link
                        to={
                          `/shop/?title=` +
                          title +
                          `&title_ru=` +
                          title_ru +
                          `&holiday=` +
                          holiday +
                          `&location=` +
                          location +
                          `&brand=` +
                          brand +
                          `&category=` +
                          category +
                          sort +
                          `&tag=` +
                          tag +
                          `&min_price=` +
                          min_price +
                          `&max_price=` +
                          max_price
                        }
                      >
                        <button className="mx-2 px-3 text-white text-lg font-semibold w-full border-gray-300 bg-primary rounded focus:ring-0 py-1  shadow-sm">
                          {lang === 'tm' ? "Gözlemek" : "Поиск"}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <select
                    onChange={onOptionChange}
                    name="sort"
                    id="sort"
                    className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-md rounded-lg focus:ring-primary focus:border-primary"
                  >
                    <option value="">
                      {lang === "tm" ? "Saýlanmadyk" : "Не выбран"}{" "}
                    </option>
  
                    <option value="&byprice=true">
                      {lang === "tm" ? "Baha görä" : "По цене"}{" "}
                    </option>
                    <option value="&bylikes=true">
                      {lang === "tm" ? "Halananlar" : "Лайком"}{" "}
                    </option>
                    <option value="&is_special=true">
                      {lang === "tm" ? "Saýlama görä" : "Особенный"}{" "}
                    </option>
                  </select>
                  <div className=" text-lg font-semibold pl-3">
                    {count} {lang === "tm" ? "tapyldy" : "найден"}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-2">
                  <Product products={products} />
                </div>
  
                <div className=" mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                      {lang === 'tm' ? "Görkezýär" : "Показывает"}{" "}
                        <span className="font-medium">
                          {offset === null ? "1" : offset / limit + 1}
                        </span>{" "}
                        {lang === 'tm' ? "ni" : "из"} {" "}
                        <span className="font-medium">
                          {Math.ceil(count / limit)}
                        </span>{" "}
                        {lang === 'tm' ? "sahypadan" : "страницы"} 
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        {previous !== null && previous !== undefined ? (
                          <Link to={previousLink[6]}>
                            <div className="border border-primary text-2xl shadow-lg w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                              <FontAwesomeIcon icon={faArrowCircleLeft} />
                            </div>
                          </Link>
                        ) : (
                          " "
                        )}
  
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
  
                        <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          {Math.ceil(count / limit)} {lang === 'tm' ? "sahypa" : "страница"}
                        </div>
  
                        {next !== null && next !== undefined ? (
                          <Link to={nextLink[6]}>
                            <div className="border border-primary text-2xl shadow-lg w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                              <FontAwesomeIcon icon={faArrowCircleRight} />
                            </div>
                          </Link>
                        ) : (
                          " "
                        )}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          " "
        )}
      </>
    );
};

export default ShopList;
