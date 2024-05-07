import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../../../data/ConstTexts';
import isStockManager from '../../../utils/isStockManager';
import { ReduceContext } from '../ReduceContext';
import { getreduceDetail } from '../reduceDetailSlice';
import ReduceEdit from './ReduceEdit';
import ReduceNew from './ReduceNew';

const ReduceView = () => {

    const dispatch = useDispatch();
    const groups = useSelector((state) => state.login.groups);
    const { id } = useParams();
    const { token } = useSelector((state) => state.login);
    const [error, SetError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        let isCancelled = false;
        dispatch(getreduceDetail({ id, token }))
          .unwrap()
          .catch((err) => SetError(err));
        return () => {
          isCancelled = true;
        };
    }, [dispatch, id, token]);
    const reduceDetail = useSelector((state) => state.reduceDetail.data);
  return (
    <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            reduce barada maglumat
          </div>

          <div className="flex items-center">
          {isStockManager(groups) ? (
              <>
            <div
              className="mr-5 flex items-center justify-between p-1  cursor-pointer text-lg font-bold font-poppins  text-white space-x-3 text-center rounded-lg"
            >
            <ReduceNew />
            </div>
            <div
              className="mr-5 flex items-center justify-between p-1  cursor-pointer text-lg font-bold font-poppins  text-white space-x-3 text-center rounded-lg"
            >
            <ReduceEdit reduceDetail1={reduceDetail} />
            </div>
              </>
          ):("")}


              <div className="pr-5 text-red-600 cursor-pointer">
                 
                <ImCross className="cursor-pointer" onClick={() => navigate(-1)} size={20} />
              </div>
          </div>
        </div>
        <hr className="border border-colorBorder" />

        <div className="text-center font-poppins font-bold text-red-600">
          {error}
        </div>
        <div className=" px-5 space-y-3 pt-3 bg-white  rounded-lg p-3 hover:shadow"> 
        
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.user}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.user?.username}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.created_at}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.created_at}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.updated_at}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.updated_at}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.price}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.price}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.amount}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.amount}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.reason}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.reason}</div>
          </div>
          <div className="grid grid-cols-10 items-center">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.image}:
            </div>
            <div className="grid col-span-7">
              <img className='w-20 h-20 object-contain' src={backendUrl + reduceDetail?.image} alt="img"/>  
            </div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.description}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.description}</div>
          </div>

          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.pallet}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.pallet?.title}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {ReduceContext.attr}:
            </div>
            <div className="grid col-span-7">{reduceDetail?.attribute?.title}</div>
          </div>

        
        </div>
      </section>
  )
}

export default ReduceView