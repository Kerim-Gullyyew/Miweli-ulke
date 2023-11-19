import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { backendUrl } from "../../rootUrl";
const Brand = () => {
  const lang = localStorage.getItem("userLanguage");
  const { brands } = useSelector((state) => state?.info?.mainInfo);
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const results = brands.filter(o => o?.title?.toLowerCase()?.includes(keyword));
    setSearchResults(results);
  }, [keyword, brands]);
  return (
    <>
      {brands && brands.length ? (
        <div className="container px-14 pb-5">
          <section className="mb-5 pt-5 text-gray-800">
            <div className="mb-3 xl:w-96 bg-white rounded-lg">
              <input
                type="search"
                value={keyword}
                onChange={onKeywordChanged}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                id="exampleSearch"
                placeholder={lang === 'tm' ? "Brend gözleg" : "Найти бренд"}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {searchResults?.map((brand, key) => (
                <div key={key} className="flex justify-center">
                  <div className="block max-w-sm rounded-lg bg-white text-center shadow-lg">
                    <Link to={`/shop/?brand=` + brand.id}>
                      
                      <div className="p-6">
                        <img
                          src={backendUrl + brand?.image}
                          alt={brand?.title}
                          className="w-full"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Brand;
