import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
const NewArrival = () => {
  const { nproducts } = useSelector((state) => state?.info?.mainInfo);
  const lang = localStorage.getItem("userLanguage");

  return (
    <>
      {nproducts && nproducts?.length > 0 ? (
        <div className="container pb-8">
          <h2 className="text-2xl font-medium text-center text-gray-800 uppercase mb-6">
            {lang === "tm" ? "Täze Harytlar" : "Новые товары"}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-2 lg:grid-cols-4 xl:grid-cols-5">
            
            <SingleProduct nproducts={nproducts}/>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default NewArrival;
