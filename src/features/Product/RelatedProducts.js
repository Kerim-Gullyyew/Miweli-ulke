import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFilterProducts } from "../../store/features/product/productSlice";
import SingleProduct from "../../components/SingleProduct";
const RelatedProducts = () => {
  const dispatch = useDispatch();
  const lang = localStorage.getItem("userLanguage");
  const { singleProduct } = useSelector((state) => state?.product);
  const { id } = useParams();
  const search = `?category=` + singleProduct?.category?.id + `&limit=5`;
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getFilterProducts({ search }));
    }
  }, [dispatch, id, search]);
  const { filterProducts } = useSelector((state) => state?.product);
  const relatedProducts = filterProducts.results;
  return (
    <>
      <div className="container pb-16 pt-6">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          {lang === 'tm' ? "Meňzeş harytlar" : "Сопутствующие товары"}
          
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-2 lg:grid-cols-5">
          <SingleProduct nproducts={relatedProducts} />
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
