import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStock } from "../features/stock/stockSlice";
import Loader from "../utils/Loader";
const Stock = () => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(getStock({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token]);
  const classnames=({percent}) => {
    return `bg-colorGreen bottom-0 h-3 rounded-r flex w-[${percent}%]`
  }
  const stock = useSelector((state) => state.stock);
  const [error, SetError] = useState("");
  const [persent, setPersent] = useState(15);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.stock.isLoading);
  return (
    <section className="bg-white h-full">
      {isLoading ? (
        <Loader />
      ) : (
      <div className=" w-full p-3">
        <div className="text-center text-lg text-red-600 font-bold">
          {error?.detail}
        </div>
        <div className="flex flex-wrap justify-center">
          {stock.data.map((stock, key) => (
            <div
              key={key}
              onClick={() => navigate("/camera/" + stock.id)}
              title={stock.description}
              className=" w-[150px] h-[180px] hover:shadow-lg border rounded-lg justify-between flex cursor-pointer flex-col m-3"
            >
              <div className="text-center text-lg">
                <p className="text-black font-poppins font-bold">
                  №{stock.code}
                </p>
                <p className="text-black">{stock.title}</p>
                <p className="text-black">Jemi: {stock.total_cells}</p>
                <p className="text-black">Bosy: {stock.empty_cells}</p>
              </div>
                <p className="text-black font-bold text-right pr-2">{((stock.total_cells - stock.empty_cells)*100/stock.total_cells).toFixed(1)}%</p>
              <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                <div style={{width: (stock.total_cells - stock.empty_cells)*100/stock.total_cells + '%'}} className="bg-colorGreen bottom-0 h-3 rounded-r flex"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </section>
  );
};

export default Stock;
