import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
const Product = () => {
  const { fproducts } = useSelector((state) => state?.info?.mainInfo);
  const lang = localStorage.getItem("userLanguage");

  return (
    <>
      {fproducts && fproducts?.length > 0 ? (
        <div className="container pb-8">
          <h2 className="text-2xl text-center font-medium text-gray-800 uppercase mb-6">
            {lang === 'tm' ? 'Saýlanan harytlar' : 'Выбранные товары'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-2 ">
           
           <SingleProduct nproducts={fproducts}/>

          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Product;
