import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../productDetailSlice";
import { ProductContext } from "../../ProductContext";
import { name } from "../../../featuresSlice";
import { backendUrl } from "../../../../data/ConstTexts";
import { IoMdReturnLeft } from "react-icons/io";
import { Switch } from "@headlessui/react";
import { Select, initTE } from "tw-elements";
import { TfiSave } from "react-icons/tfi";
import { editProduct } from "../productSlice";
import { getProductUnit } from "../../unit/productUnitSlice";
import ProductUnitNew from "../../unit/ProductUnitNew";
import ProductUnitEdit from "../../unit/ProductUnitEdit";
import Loader from "../../../../utils/Loader";
const ProductEdit = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
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

  const navigate = useNavigate();
  const [error, SetError] = useState("");
  const [is_active, setIs_active] = useState(productDetail.is_active);
  const [title, setTitle] = useState(productDetail.title);
  const [code, setCode] = useState(productDetail.code);
  const [description, setDescription] = useState(productDetail.description);
  const [price, setPrice] = useState(productDetail.price);

  const [oldImage] = useState(productDetail.image);

  const [selectedImage, setSelectedImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const [unit, setUnit] = useState(productDetail.unit);
  const [unitTitle, setUnitTitle] = useState("");

  const [oldQrcode] = useState(productDetail.qrcode);

  const [selectedQrcode, setSelectedQrcode] = useState();
  const [previewqrcode, setPreviewQrcode] = useState();

  useEffect(() => {
      let isCancelled = false;
      dispatch(getProductUnit({ token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {
        isCancelled = true;
      };
  }, [dispatch, id, token]);
  const productUnit = useSelector((state) => state.productUnit);
  useEffect(() => {
    if (unit === null) {
      setUnit("");
    } else {
      productUnit.data.map((units) => {
        if (units.id === unit) {
          setUnitTitle(units.title);
        }
      });
    }
  }, [unit, productUnit.data]);
  useEffect(() => {
    if (!selectedImage) {
      setPreviewImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedQrcode) {
      setPreviewQrcode(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedQrcode);
    setPreviewQrcode(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedQrcode]);
  useEffect(() => {
    if (id !== undefined) {
      let isCancelled = false;
      dispatch(getProductDetail({ id: id, token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {
        isCancelled = true;
      };
    }
  }, [dispatch, id, token]);

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  };
  const onSelectQrcode = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedQrcode(undefined);
      return;
    }
    setSelectedQrcode(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", id);
    formData.append("code", code);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("is_active", is_active);
    formData.append("price", price);

    formData.append("unit", unit);
    formData.append("image", selectedImage === undefined ? "" : selectedImage);
    formData.append(
      "qrcode",
      selectedQrcode === undefined ? "" : selectedQrcode
    );

    let isCancelled = false;
    dispatch(editProduct({ id, token, formData }))
      .unwrap()
      .then((res) => {
        SetError("");
        setTitle("");
        setCode("");
        setDescription("");
        setPrice("");

        setSelectedImage("");
        setPreviewImage("");

        setUnit("");
        setSelectedQrcode("");
        setPreviewQrcode("");
        navigate("/product/" + res.data.id);
        dispatch(name("view"));
      })
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  };
  let content = (
    <>
      <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            Product Edit
          </div>
          <div
            onClick={() => {
              dispatch(name("view"));
            }}
            className="mr-10 flex items-center justify-between cursor-pointer text-lg font-bold font-poppins text-center rounded-lg"
          >
            <IoMdReturnLeft className="font-bold text-red-700" size={30} />
          </div>
        </div>
        <hr className="border border-colorBorder" />

        <div className="text-center font-poppins font-bold text-red-600">
          {error?.detail}
        </div>
        {isLoading ? (
          <Loader />
        ) : (
        <div className=" px-5 space-y-3 pt-3 bg-white  rounded-lg p-3 hover:shadow">
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.code}:
            </div>
            <div className="col-span-7 flex items-center border-b border-blue-500 py-2">
              <input
                onChange={(e) => setCode(e.target.value)}
                type="text"
                name="code"
                id="code"
                value={code}
                className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.title}:
            </div>
            <div className="col-span-7 flex items-center border-b border-blue-500 py-2">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                value={title}
                className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.description}:
            </div>
            <div className="col-span-7 flex items-center border-b border-blue-500 py-2">
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                id="description"
                value={description}
                className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.price}:
            </div>
            <div className="col-span-7 flex items-center border-b border-blue-500 py-2">
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                name="price"
                id="price"
                value={price}
                className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.unit}:
            </div>
            <div className="col-span-7 flex items-center py-2">
              <select
                defaultValue={unit}
                name="unit"
                id="unit"
                onChange={(e) => setUnit(e.target.value)}
                data-te-select-init
                data-te-select-filter="true"
              >
                <option value=""></option>
                {productUnit.data.map((attr, key) => (
                  <Fragment key={key}>
                    <option value={attr.id}>{attr.title}</option>
                  </Fragment>
                ))}
              </select>
              <div className="pl-3 flex">
                {unit ? <ProductUnitEdit unit_id={unit} /> : ""}
                <ProductUnitNew />
                {/* <FaPlus className="text-yellow-600 cursor-pointer" size={20} /> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.status}:
            </div>
            <div className="col-span-7 flex items-center py-2">
              <Switch
                checked={is_active}
                onChange={setIs_active}
                className={`${is_active ? "bg-blue-700" : "bg-gray-700"}
          relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${is_active ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.image}:
            </div>
            <input
              className="grid col-span-4"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={onSelectImage}
              name="image"
            />
            <div className="grid col-span-3 w-32 h-32">
              {previewImage ? (
                selectedImage && <img src={previewImage} alt="Preview" />
              ) : (
                <img src={backendUrl + oldImage} alt="OldImage" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ProductContext.qrcode}:
            </div>
            <input
              className="grid col-span-4"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={onSelectQrcode}
              name="qrcode"
            />
            <div className="grid col-span-3 w-32 h-32">
              {previewqrcode ? (
                selectedQrcode && <img src={previewqrcode} alt="Preview" />
              ) : (
                <img src={backendUrl + oldQrcode} alt="OldQrcode" />
              )}
            </div>
          </div>
          <div className="flex justify-end px-10 pb-3">
            <TfiSave
              size={30}
              onClick={handleSubmit}
              className=" text-blue-600 cursor-pointer"
            />
          </div>
        </div>

        )}
      </section>
    </>
  );
  return content;
};

export default ProductEdit;
