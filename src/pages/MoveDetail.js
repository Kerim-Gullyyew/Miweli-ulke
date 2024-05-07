import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { name, nameContainer, nameHelper, nameHelperHelper, nameHelperPallet } from '../features/featuresSlice';
import MoveView from '../features/move/component/MoveView';
import { getMoveDetail } from '../features/move/moveDetailSlice';
const MoveDetail = () => {
    const [error, SetError] = useState("")
    const { id } = useParams();
    const { token } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(name("view"));
        dispatch(nameHelper("view"));
        dispatch(nameContainer("view"));
        dispatch(nameHelperHelper(""));
        dispatch(nameHelperPallet(""));
      }, [dispatch]);
      const views = useSelector((state) => state.views);

      useEffect(() => {
        let isCancelled = false;
        dispatch(getMoveDetail({ token, id }))
          .unwrap()
          .catch((err) => SetError(err));
        return () => {
          isCancelled = true;
        };
      }, [dispatch, token, id]);


  return (
    <div className=" bg-colorBackground">
    {views.name === "view" && <MoveView />}
    {/* {views.name === "edit" && <MoveEdit />} */}

    {views.name !== "new" ? (
      <>
        {/* {views.nameHelper === "view" && <TransferAttribute />} */}

        <div className=" mx-10 border border-opacity-50 rounded-lg border-colorBlue ">
          {/* {views.nameContainer === "view" && <TransferPallet />} */}
          {/* {views.nameHelperHelper === "view" && <BatchContainerView />}
          {views.nameHelperHelper === "edit" && <BatchContainerEdit />} */}

          {/* {views.nameHelperHelper === "view" ||
          views.nameHelperHelper === "edit" ? (
            <>
              {<ContainerAttribute />}
              {<ContainerPallet />}

                {views.nameHelperPallet === "view" && <ContainerPalletView />}
                {views.nameHelperPallet === "edit" && <ContainerPalletEdit />}
                {views.nameHelperPallet === "view" || views.nameHelperPallet === "edit" ? (
                  <PalletAttribute />
                ):("")}
                
            </>
          ) : (
            ""
          )} */}
        </div>
      </>
    ) : (
      ""
    )}
  </div>
  )
}

export default MoveDetail