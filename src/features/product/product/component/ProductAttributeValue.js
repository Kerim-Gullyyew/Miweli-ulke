import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TfiSave } from "react-icons/tfi";

import { Select, initTE } from "tw-elements";
import { getProductAttribute } from "../../attribute/productAttributeSlice";
import { productAttributeValueCreate } from "../productDetailSlice";
import ProductAttributeNew from "../../attribute/ProductAttributeNew";
import ProductAttributeEdit from "../../attribute/ProductAttributeEdit";

const ProductAttributeValue = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const [productAttributeName, setproductAttributeName] = useState("");
  const [productAttributeValue, setproductAttributeValue] = useState("");
  useEffect(() => {
    let isCancelled = false;
    dispatch(getProductAttribute({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token]);
  const { productAttribute } = useSelector((state) => state);
  const onSetproductAttributeValueChanged = (e) => {
    setproductAttributeValue(e.target.value);
  };

  const createProductAttributeClicked = (e) => {
    // e.preventDefault();
    const json = {
      value: productAttributeValue,
      product_id: id,
      product_attribute_id: productAttributeName,
    };
    dispatch(productAttributeValueCreate({ token, json }))
      .unwrap()
      .then(() => {
        setproductAttributeValue("");
        SetError("");
      })
      .catch((err) => SetError(err));

    return () => {};
  };
  return (
    <>
      {error ? (
        <div className="text-red-600 font-poppins font-bold">
          {error?.detail}
        </div>
      ) : (
        ""
      )}

      <div className="space-x-3 flex flex-wrap items-center ">
        <div className="font-bold w-40 mb-3 mr-3">
          <select
            name="name"
            id="name"
            onChange={(e) => setproductAttributeName(e.target.value)}
            data-te-select-init
            data-te-select-filter="true"
          >
            <option value=""></option>
            {productAttribute.data.map((attr, key) => (
              <option key={key} value={attr.id}>
                {attr.title}
              </option>
            ))}
          </select>
        </div>
        {productAttributeName ? (
          <ProductAttributeEdit attr_id={productAttributeName} />
        ) : (
          ""
        )}

        <ProductAttributeNew />
        <div className="mb-3 mr-3 w-32 flex-1 items-center border-b border-blue-500 py-2">
          <input
            value={productAttributeValue}
            onChange={onSetproductAttributeValueChanged}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createProductAttributeClicked();
              }
            }}
            className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Baha"
            ref={null}
          />
        </div>
        <div className=" flex flex-1">
          <TfiSave
            onClick={() => createProductAttributeClicked()}
            size={20}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default ProductAttributeValue;
