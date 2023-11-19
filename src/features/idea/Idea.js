import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { backendUrl } from "../../rootUrl";
import { getInfo } from "../../store/features/info/infoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const Idea = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
  const { ideas } = useSelector((state) => state?.info?.mainInfo);
  const idea = ideas[id];

  const ideaList = ideas[id].idea_list;

  const lang = localStorage.getItem("userLanguage");
  return (
    <div className="col-span-9 gap-4">
      <div className="">
        <div className="container text-center max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm">
          <div className="mt-3">
            <p
              rel="noopener noreferrer"
              className="text-2xl text-primary font-bold hover:underline"
            >
              {lang === "tm" ? idea.title_tm : idea.title_ru}
            </p>
            <p className="mt-4 text-black">
              {lang === "tm" ? idea.description_tm : idea.description_ru}
            </p>
          </div>

          <div className=" mt-5">
            {ideaList && ideaList?.length > 0 ? (
              <div>
                {ideaList.map((idea, key) => (
                  <div key={key}>
                    <div className=" text-lg font-bold">
                      {lang === "tm" ? idea?.title_tm : idea?.title_ru}
                    </div>
                    <div className=" mt-3">
                      {lang === "tm"
                        ? idea?.description_tm
                        : idea?.description_ru}
                    </div>

                    <div>
                      <div className="container grid mt-5 pb-7 grid-cols-2 gap-6">
                        <div>
                          <img
                            src={backendUrl + idea?.product?.main_image}
                            alt={
                              lang === "tm"
                                ? idea.product.title_tm
                                : idea.product.title_ru
                            }
                            className="w-full rounded-lg shadow-lg"
                          />
                        </div>

                        <div>
                          <h2 className="text-xl font-medium uppercase mb-2">
                            {lang === "tm"
                              ? idea?.product?.title_tm
                              : idea?.product?.title_ru}
                          </h2>

                          <p className="mt-4 text-gray-600">
                            {lang === "tm"
                              ? idea?.product?.description_tm
                              : idea?.product?.description_ru}
                          </p>

                          <div className="mt-3 flex gap-3 border-b border-gray-200 pb-5 pt-3">
                            <Link to={"/product/" + idea?.product?.id}>
                              <div className="bg-primary border cursor-pointer border-primary text-white px-14 py-3 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                                <FontAwesomeIcon icon={faBagShopping} />
                                <p className="px-3">
                                  {lang === "tm"
                                    ? "Sebede goşmak"
                                    : "Добавить корзину"}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
