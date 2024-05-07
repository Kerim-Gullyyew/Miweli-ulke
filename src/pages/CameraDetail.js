import React, { Fragment, useEffect, useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../data/ConstTexts";
import { getCamera } from "../features/stock/cameraSlice";
import Loader from "../utils/Loader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const CameraDetail = () => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    let isCancelled = false;
    dispatch(getCamera({ id, token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, id, token]);
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  const stock = useSelector((state) => state.stock);
  const camera = useSelector((state) => state.camera);
  const isLoading = useSelector((state) => state.camera.isLoading);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [camera_index, setCameraIndex] = useState("");

  useEffect(() => {
    setCameraIndex(stock.data.findIndex((obj) => obj.id === camera.data.id));
  }, [id, stock.data, camera.data.id]);
  console.log("camera_index", camera_index);
  return (
    <section>
      <div className=" w-full p-3 bg-white">
        <div className="mr-10 flex items-center justify-end px-3 text-lg font-bold font-poppins text-center rounded-lg">
          <IoMdReturnLeft
            onClick={() => navigate(-1)}
            className="font-bold cursor-pointer text-red-700"
            size={30}
          />
        </div>
        <div className="flex flex-wrap justify-between px-5 items-center space-x-5 text-colorTextDarkBlue">
          <div className="flex space-x-5">
            <p className=" font-bold">Konteýner: {" " + camera.data.title}</p>
            <p className=" font-bold">
              Düşündiriş: {" " + camera.data.description}
            </p>
            <p className=" font-bold">
              Doly:{" "}
              {" " +
                (
                  ((camera.data.total_cells - camera.data.empty_cells) * 100) /
                  camera.data.total_cells
                ).toFixed(1)}
              %
            </p>
          </div>
          <div>
            <p className=" font-bold">Kod: {" " + camera.data.code}</p>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-auto p-3 pb-10 bg-colorBgContainer">
            <div className="flex">
              {camera?.data?.rows?.map((row, key) => (
                <div key={key} className="flex w-full pr-14 pb-14">
                  {row?.columns?.map((col, key) => (
                    <div key={key} className="flex">
                      <div className=" mx-auto">
                        {col?.cells?.map((cell, key) => (
                          <div
                            key={key}
                            onClick={() => navigate("/cell/" + cell.id)}
                            className={
                              "group relative rounded-full w-10 h-10 " +
                              (cell?.is_full === false
                                ? "bg-white"
                                : "bg-green-600")
                            }
                          >
                            <span className="absolute z-10  flex w-[90px] text-center scale-0 transition-all justify-center items-center rounded border bg-white p-1 text-xs text-black group-hover:scale-100 left-10">
                              {cell?.is_full ? (
                                <div>
                                  <div>{cell.code}</div>
                                  <img
                                    className=" w-10 h-10 object-contain"
                                    src={backendUrl + cell?.product?.image}
                                    alt="img"
                                  />
                                  <p>{cell?.product?.title}</p>
                                  {cell?.pallet?.attributes?.length > 0 ? (
                                    cell?.pallet?.attributes?.map((attr) => {
                                      return (
                                        <p className=" text-left font-bold">{attr.name + ` : ` + attr.value}</p>
                                      )
                                    })
                                  ) : ("")}
                                </div>
                              ) : (
                                cell?.code
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <div className="flex justify-center flex-wrap">
            {stock.data.map(st => {
              let key = 0
              if (st.id === camera.data.id) {
                let previous = stock.data[key - 1]
                let next = stock.data[key + 1]
                return (
                  <Fragment key={key}>


                  <div>{stock.data[key + 1] ? (
                    stock.data[key + 1].title
                  ): ("")}</div>


                  <div>{stock.data[key - 1] ? (
                    stock.data[key - 1].title
                  ):("")}</div>


                  </Fragment>
                )
              }
              key = key + 1
            })}
        </div> */}

        {/* <div>{stock.data[camera_index] ? stock.data[camera_index].title : ""}</div> */}
        <div className="p-3 flex justify-between">
          {stock.data[camera_index - 1] && (
            <div
              onClick={() =>
                navigate("/camera/" + stock.data[camera_index - 1].id)
              }
              title={stock.data[camera_index - 1].description}
              className=" w-[150px] h-[180px] hover:shadow-lg border rounded-lg justify-between flex cursor-pointer flex-col m-3"
            >
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">
                  №{stock.data[camera_index - 1].code}
                </p>
                <p className="text-black">
                  {stock.data[camera_index - 1].title}
                </p>
                <p className="text-black">
                  Jemi: {stock.data[camera_index - 1].total_cells}
                </p>
                <p className="text-black">
                  Bosy: {stock.data[camera_index - 1].empty_cells}
                </p>
              </div>
              <div className="flex items-center justify-between px-3">
                <FaArrowLeft className=" text-blue-600" size={20} />
                <p className="text-black font-bold text-right pr-2">
                  {(
                    ((stock.data[camera_index - 1].total_cells -
                      stock.data[camera_index - 1].empty_cells) *
                      100) /
                    stock.data[camera_index - 1].total_cells
                  ).toFixed(1)}
                  %
                </p>
              </div>

              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div
                  style={{
                    width:
                      ((stock.data[camera_index - 1].total_cells -
                        stock.data[camera_index - 1].empty_cells) *
                        100) /
                        stock.data[camera_index - 1].total_cells +
                      "%",
                  }}
                  className="bg-colorGreen bottom-0 h-3 rounded-r flex"
                ></div>
              </div>
            </div>
          )}

          {stock.data[camera_index + 1] && (
            <div
              onClick={() =>
                navigate("/camera/" + stock.data[camera_index + 1].id)
              }
              title={stock.data[camera_index + 1].description}
              className=" w-[150px] h-[180px] hover:shadow-lg border rounded-lg justify-between flex cursor-pointer flex-col m-3"
            >
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">
                  №{stock.data[camera_index + 1].code}
                </p>
                <p className="text-black">
                  {stock.data[camera_index + 1].title}
                </p>
                <p className="text-black">
                  Jemi: {stock.data[camera_index + 1].total_cells}
                </p>
                <p className="text-black">
                  Bosy: {stock.data[camera_index + 1].empty_cells}
                </p>
              </div>
              <div className="flex items-center justify-between px-3">
                <p className="text-black font-bold text-right pr-2">
                  {(
                    ((stock.data[camera_index + 1].total_cells -
                      stock.data[camera_index + 1].empty_cells) *
                      100) /
                    stock.data[camera_index + 1].total_cells
                  ).toFixed(1)}
                  %
                </p>
                <FaArrowRight className=" text-blue-600" size={20} />
              </div>

              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div
                  style={{
                    width:
                      ((stock.data[camera_index + 1].total_cells -
                        stock.data[camera_index + 1].empty_cells) *
                        100) /
                        stock.data[camera_index + 1].total_cells +
                      "%",
                  }}
                  className="bg-colorGreen bottom-0 h-3 rounded-r flex"
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CameraDetail;
