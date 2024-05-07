import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { name } from "../features/featuresSlice";
import ProductView from "../features/product/product/component/ProductView";
import ProductEdit from "../features/product/product/component/ProductEdit";
import ProductAttribute from "../features/product/attribute/ProductAttribute";
import ProductNew from "../features/product/product/component/ProductNew";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../features/product/product/productDetailSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  useEffect(() => {
    dispatch(name("view"));
  }, [dispatch]);

  useEffect(() => {
      let isCancelled = false;
      dispatch(getProductDetail({ id: id, token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {
        isCancelled = true;
      };
  }, [dispatch, id, token]);
  const views = useSelector((state) => state.views);
  let content = (
    <>
      <div className=" bg-colorBackground">
        {views.name === "view" && <ProductView />}
        {views.name === "edit" && <ProductEdit />}
        {views.name === "new" && <ProductNew />}

        {views.name !== "new" ? (
          <>
            {views.nameHelper === "view" && <ProductAttribute />}

            <div className=" mx-10 border border-opacity-50 rounded-lg border-colorBlue "></div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
  return content;
};

export default ProductDetail;
