import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import isStockManager from '../../../utils/isStockManager';
import { MoveContext } from '../MoveContext';
import { getMoveDetail } from '../moveDetailSlice';
import MoveEdit from './MoveEdit';
import MoveNew from "../component/MoveNew";

const MoveView = () => {

    const dispatch = useDispatch();
    const groups = useSelector((state) => state.login.groups);
    const { id } = useParams();
    const { token } = useSelector((state) => state.login);  
    const [error, SetError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        let isCancelled = false;
        dispatch(getMoveDetail({ id, token }))
          .unwrap()
          .catch((err) => SetError(err));
        return () => {
          isCancelled = true;
        };
    }, [dispatch, id, token]);
    const moveDetail = useSelector((state) => state.moveDetail.data);
  return (
    <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            move barada maglumat
          </div>

          <div className="flex items-center">
          {isStockManager(groups) ? (
              <>
              
            <div
              className="mr-10 flex items-center justify-between p-1  cursor-pointer text-lg font-bold font-poppins  text-white space-x-3 text-center rounded-lg"
            >
                <MoveEdit moveDetail1={moveDetail} />
            </div>
            
            <div
              className="mr-10 flex items-center justify-between p-1 cursor-pointer  text-lg font-bold font-poppins space-x-3 text-center rounded-lg"
            >
              <MoveNew />
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
              {MoveContext.created_at}:
            </div>
            <div className="grid col-span-7">{moveDetail?.created_at}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {MoveContext.updated_at}:
            </div>
            <div className="grid col-span-7">{moveDetail?.updated_at}</div>
          </div>
          <div className="grid grid-cols-10">
            <div className="grid col-span-3 font-bold">
              {MoveContext.username}:
            </div>
            <div className="grid col-span-7">{moveDetail?.user?.username}</div>
          </div>

          <div className='flex border sm:grid sm:grid-cols-2 flex-wrap justify-between'>
              <div className='w-full border'>
                <div>{moveDetail?.out_cell?.code}</div>
              </div>

              <div className='w-full border'>
                <div>{moveDetail?.in_cell?.code}</div>
              </div>
          </div>
        
        </div>
      </section>
  )
}

export default MoveView