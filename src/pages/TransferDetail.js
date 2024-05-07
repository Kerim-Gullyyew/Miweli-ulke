import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  name,
  nameContainer,
  nameHelper,
  nameHelperHelper,
  nameHelperPallet,
} from "../features/featuresSlice";
import TransferAttribute from "../features/transfer/attribute/component/TransferAttribute";
import TransferView from "../features/transfer/component/TransferView";
import { getTransferDetail } from "../features/transfer/transferDetailSlice";
import TransferPallet from "../features/transfer/pallet/component/TransferPallet";

const TransferDetail = () => {
  const [error, SetError] = useState("");
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
    dispatch(getTransferDetail({ token, id }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token, id]);

  let content = (
    <>
      <div className=" bg-colorBackground">
        {views.name === "view" && <TransferView />}

        {views.name !== "new" ? (
          <>
            {views.nameHelper === "view" && <TransferAttribute />}

            <div className=" mx-10 border border-opacity-50 rounded-lg border-colorBlue ">
              {views.nameContainer === "view" && <TransferPallet />}
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

export default TransferDetail;
