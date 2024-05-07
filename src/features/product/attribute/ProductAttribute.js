import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import isStockManager from "../../../utils/isStockManager";
import { getProductDetail } from "../product/productDetailSlice";
import ProductAttributeValue from "../product/component/ProductAttributeValue";
import ProductAttributeValueEdit from "./ProductAttributeValueEdit";
import Loader from "../../../utils/Loader";
const ProductAttribute = () => {
  const groups = useSelector((state) => state.login.groups);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");

  // useEffect(() => {
  //   if (id !== undefined) {
  //     let isCancelled = false;
  //     dispatch(getProductDetail({ id: id, token }))
  //       .unwrap()
  //       .catch((err) => SetError(err));
  //     return () => {
  //       isCancelled = true;
  //     };
  //   }
  // }, [dispatch, id, token]);
  const productDetail = useSelector((state) => state.productDetail);
  const isLoading = useSelector((state) => state.productDetail.isLoading);

  return productDetail.errorInProductDetail ? (
    ""
  ) : (
    <section className=" mx-10 border m-4 border-gray-200 bg-white rounded-lg p-3 hover:shadow">
      <div className=" text-center py-4 text-xl font-bold text-colorTextDarkBlue">
        Goşmaça maglumatlar
      </div>

      <div className=" text-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {productDetail?.attribute?.map((attr, key) => (
                <div key={key} className="items-center pb-4 grid grid-cols-5">
                  <div className="font-bold col-span-3">{attr?.name}:</div>
                  <p className=" col-span-1">{attr?.value}</p>

                  {isStockManager(groups) ? (
                    <ProductAttributeValueEdit
                      value={attr?.value}
                      id={attr?.id}
                      attr_id={attr?.attr_id}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ))}
              {isStockManager(groups) ? <ProductAttributeValue /> : ""}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductAttribute;
