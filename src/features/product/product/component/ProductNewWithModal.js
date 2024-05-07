import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Dialog, Switch, Transition } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TfiSave } from "react-icons/tfi";
import { ProductAttributeNewContext, ProductContext } from "../../ProductContext";
import { createProduct, getSimpleProduct } from "../productSlice";
import { getProductDetail } from "../productDetailSlice";
import { getProductUnit } from "../../unit/productUnitSlice";

import { Select, initTE } from "tw-elements";
import ProductUnitNew from "../../unit/ProductUnitNew";
const ProductNewWithModal = () => {
    
    useEffect(() => {
        initTE({ Select });
      }, []);
    
      const dispatch = useDispatch();
      const groups = useSelector((state) => state.login.groups);
      const { id } = useParams();
      const { token } = useSelector((state) => state.login);
      const navigate = useNavigate();
      const [error, SetError] = useState("");
      const [is_active, setIs_active] = useState(true);
      const [title, setTitle] = useState("");
      const [code, setCode] = useState("");
      const [description, setDescription] = useState("");
      const [price, setPrice] = useState("");
      const [open, setOpen] = useState(false);
      const cancelButtonRef = useRef(null);
    
      const [selectedImage, setSelectedImage] = useState("");
      const [image, setImage] = useState("");
    
      const [unit, setUnit] = useState("");
      const [selectedQrcode, setSelectedQrcode] = useState("");
      const [qrcode, setQrcode] = useState("");
      useEffect(() => {
        if (id !== undefined) {
          let isCancelled = false;
          dispatch(getProductUnit({ token }))
            .unwrap()
            .catch((err) => SetError(err));
          return () => {
            isCancelled = true;
          };
        }
      }, [dispatch, id, token]);
      useEffect(() => {
        if (!selectedImage) {
          setImage(undefined);
          return;
        }
        const objectUrl = URL.createObjectURL(selectedImage);
        setImage(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedImage]);
    
      useEffect(() => {
        if (!selectedQrcode) {
          setQrcode(undefined);
          return;
        }
        const objectUrl = URL.createObjectURL(selectedQrcode);
        setQrcode(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedQrcode]);
    
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
        formData.append("code", code);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("is_active", is_active);
        formData.append("price", price);
        formData.append("unit", unit);
        formData.append("image", selectedImage === undefined ? "" : selectedImage);
        formData.append("qrcode", selectedQrcode === undefined ? "" : selectedQrcode);
    
        let isCancelled = false;
        dispatch(createProduct({ token, formData }))
          .unwrap()
          .then((res) => {
            dispatch(getSimpleProduct({ token })).unwrap().then(() => {
                setOpen(false);
                SetError("");
                setIs_active(true);
                setTitle("");
                setCode("");
                setDescription("");
                setPrice("");
                setSelectedImage("");
                setImage("");
                setUnit("");
                setSelectedQrcode("");
                setQrcode("");
            })
          })
          .catch((err) => SetError(err));
        return () => {
          isCancelled = true;
        };
      };
      const productDetail = useSelector((state) => state.productDetail);
      const productUnit = useSelector((state) => state.productUnit);
     
  return (
    <>
          <FaPlus
            onClick={() => setOpen(!open)}
            title="Täze atribut goşmak"
            size={20}
            className="text-yellow-600 cursor-pointer"
          />
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
    
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  xs:w-full xs:max-w-xl">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <div className="flex justify-between">
                              <Dialog.Title
                                as="h3"
                                className="text-base pb-3 font-semibold leading-6 text-gray-900"
                              >
                                {ProductAttributeNewContext.title}
                              </Dialog.Title>
                              <div className="text-red-600">
                                <ImCross className=" cursor-pointer" onClick={() => setOpen(false)} size={20} />
                              </div>
                            </div>
    
                            <div className="mt-2 grid grid-cols-1 space-y-3">
                            <div className="text-center font-poppins font-bold text-red-600">
              {error?.detail}
            </div>
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
                    name="unit"
                    id="unit"
                    onChange={(e) => setUnit(e.target.value)}
                    data-te-select-init
                    data-te-select-filter="true"
                  >
                    <option value=""></option>
                    {productUnit.data.map((attr, key) => (
                      <option key={key} value={attr.id}>
                        {attr.title}
                      </option>
                    ))}
                  </select>
                  <div className="pl-3">
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
                  {selectedImage && <img src={image} alt="Img" />}
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
                  {selectedQrcode && <img src={qrcode} alt="Qrcode" />}
                </div>
              </div>
              
            </div>
    
    
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-10 py-3 flex flex-row-reverse">
                        <TfiSave
                          onClick={handleSubmit}
                          size={20}
                          className="text-blue-600 cursor-pointer"
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
    
        </>
  )
}

export default ProductNewWithModal