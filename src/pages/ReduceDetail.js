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
import ReduceView from "../features/reduce/component/ReduceView";
import { getreduceDetail } from "../features/reduce/reduceDetailSlice";

const ReduceDetail = () => {
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
    dispatch(getreduceDetail({ token, id }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token, id]);

  let content = (
    <>
      <div className=" bg-colorBackground">
        {views.name === "view" && <ReduceView />}
      </div>
    </>
  );
  return content;
};

export default ReduceDetail;
