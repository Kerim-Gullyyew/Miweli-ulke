import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BatchEdit from "../features/batch/batch/component/BatchEdit";
import BatchView from "../features/batch/batch/component/BatchView";
import BatchAttribute from "../features/batch/attribute/component/BatchAttribute";
import {
  name,
  nameHelper,
  nameContainer,
  nameHelperHelper,
  nameHelperPallet,
} from "../features/featuresSlice";
import BatchNew from "../features/batch/batch/component/BatchNew";
import BatchContainer from "../features/batch/container/component/BatchContainer";
import BatchContainerView from "../features/batch/container/component/BatchContainerView";
import BatchContainerEdit from "../features/batch/container/component/BatchContainerEdit";
import ContainerAttribute from "../features/batch/container/attribute/component/ContainerAttribute";
import ContainerPallet from "../features/batch/container/pallet/component/ContainerPallet";
import PalletAttribute from "../features/batch/container/pallet/attribute/PalletAttribute";
import ContainerPalletView from "../features/batch/container/pallet/component/ContainerPalletView";
import ContainerPalletEdit from "../features/batch/container/pallet/component/ContainerPalletEdit";
const BatchDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(name("view"));
    dispatch(nameHelper("view"));
    dispatch(nameContainer("view"));
    dispatch(nameHelperHelper(""));
    dispatch(nameHelperPallet(""));
  }, [dispatch]);
  const views = useSelector((state) => state.views);
  let content = (
    <>
      <div className=" bg-colorBackground">
        {views.name === "view" && <BatchView />}
        {views.name === "edit" && <BatchEdit />}
        {views.name === "new" && <BatchNew />}

        {views.name !== "new" ? (
          <>
            {views.nameHelper === "view" && <BatchAttribute />}

            <div className=" mx-10 border border-opacity-50 rounded-lg border-colorBlue ">
              {views.nameContainer === "view" && <BatchContainer />}
              {views.nameHelperHelper === "view" && <BatchContainerView />}
              {views.nameHelperHelper === "edit" && <BatchContainerEdit />}

              {views.nameHelperHelper === "view" ||
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
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
  return content;
};

export default BatchDetail;
