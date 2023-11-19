import React from "react";
import { useSelector } from "react-redux";
import { backendUrl } from "../../rootUrl";
import { Link, useSearchParams } from "react-router-dom";
function toTree(data, parent = null) {
  
  return data?.reduce((r, e) => {
    if (e.parent === parent) {
      const obj = { ...e };
      const children = toTree(data, e.id);
      if (children?.length) obj.children = children;
      r.push(obj);
    }
    return r;
  }, []);
}
const Accordion = ({ max_price, min_price, sort }) => {
  let [searchParams] = useSearchParams();
  let offset = searchParams?.get("offset");
  let brand = searchParams?.get("brand");
  let category = searchParams?.get("category");
  let tag = searchParams?.get("tag");
  let holiday = searchParams?.get("holiday");
  let location = searchParams?.get("location");
  let title = searchParams?.get("title");
  let title_ru = searchParams?.get("title_ru");
  if (brand === null) {
    brand = "";
  }
  if (offset === null) {
    offset = "";
  }
  if (title_ru === null) {
    title_ru = "";
  }
  if (title === null) {
    title = "";
  }
  if (location === null) {
    location = "";
  }
  if (holiday === null) {
    holiday = "";
  }
  if (category === null) {
    category = "";
  }
  if (tag === null) {
    tag = "";
  }
  const categories = useSelector((state) => state?.info?.mainInfo?.categories);
  const category_list = toTree(categories);
  const lang = localStorage?.getItem("userLanguage");
  return (
    <div id="accordionFlushExample">
      {category_list?.map((cat, key) => (
        <div
          key={key}
          className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white "
        >
          {cat?.children && cat?.children?.length > 0 ? (
            <>
              <h2 className="mb-0">
                <button
                  className="group relative flex w-full items-center rounded-none border-0 bg-white px-2 py-2 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none  [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                  type="button"
                  data-te-collapse-init
                  data-te-target={"#flush-collapse" + cat?.id}
                  aria-expanded="true"
                  aria-controls={"flush-collapse" + cat?.id}
                >
                  <img
                    className=" w-10 mr-2"
                    src={backendUrl + cat?.image}
                    alt="a"
                  />
                  {lang === 'tm' ? cat?.title : cat?.title_ru}
                  <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id={"flush-collapse" + cat?.id}
                className="!visible hidden border-0"
                data-te-collapse-item
                aria-labelledby={"flush-heading" + cat?.id}
                data-te-parent="#accordionFlushExample"
              >
                {cat?.children?.map((cat, key) => (
                  <div key={key} className="px-2 ">
                    {cat?.children && cat?.children?.length > 0 ? (
                      <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white ">
                        <h2 className="mb-0">
                          <button
                            className="group relative flex w-full items-center rounded-none border-0 bg-white px-2 py-2 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none  [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                            type="button"
                            data-te-collapse-init
                            data-te-target={"#flush-collapse" + cat?.id}
                            aria-expanded="false"
                            aria-controls={"flush-collapse" + cat?.id}
                          >
                            <img
                              className=" w-10 mr-2"
                              src={backendUrl + cat?.image}
                              alt="a"
                            />
                            {lang === 'tm' ? cat?.title : cat?.title_ru}
                            <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </span>
                          </button>
                        </h2>
                        <div
                          id={"flush-collapse" + cat?.id}
                          className="!visible hidden border-0"
                          data-te-collapse-item
                          aria-labelledby={"flush-heading" + cat?.id}
                          data-te-parent={"#accordionFlushExample2"}
                        >
                          {cat?.children?.map((cat, key) => (
                            <div key={key} className="px-2 py-2">
                              {cat?.children && cat?.children?.length > 0 ? (
                                <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white ">
                                  <h2 className="mb-0">
                                    <button
                                      className="group relative flex w-full items-center rounded-none border-0 bg-white px-2 py-2 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none  [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] "
                                      type="button"
                                      data-te-collapse-init
                                      data-te-collapse-collapsed
                                      data-te-target={
                                        "#flush-collapse" + cat?.id
                                      }
                                      aria-expanded="false"
                                      aria-controls={"flush-collapse" + cat?.id}
                                    >
                                      <img
                                        className=" w-10 mr-2"
                                        src={backendUrl + cat?.image}
                                        alt="a"
                                      />
                                      {lang === 'tm' ? cat?.title : cat?.title_ru}
                                      <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none ">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-6 w-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                          />
                                        </svg>
                                      </span>
                                    </button>
                                  </h2>
                                  <div
                                    id={"flush-collapse" + cat?.id}
                                    className="!visible hidden border-0"
                                    data-te-collapse-item
                                    aria-labelledby={"flush-heading" + cat?.id}
                                    data-te-parent="#accordionFlushExample3"
                                  >
                                    <div className="px-2 py-2 flex">
                                      <img
                                        className=" w-10 mr-2"
                                        src={backendUrl + cat?.image}
                                        alt="a"
                                      />
                                      {lang === 'tm' ? cat?.title : cat?.title_ru}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <Link
                                    to={
                                      `/shop/?title=` +
                                      title +
                                      `&title_ru=` +
                                      title_ru +
                                      `&holiday=` +
                                      holiday +
                                      `&location=` +
                                      location +
                                      `&category=` +
                                      cat?.id +
                                      sort +
                                      `&tag=` +
                                      tag +
                                      `&min_price=` +
                                      min_price +
                                      `&max_price=` +
                                      max_price
                                    }
                                  >
                                    <div className="flex">
                                      <img
                                        className=" w-10 mr-2"
                                        src={backendUrl + cat?.image}
                                        alt="a"
                                      />
                                      <h2 className="px-2 py-2">{lang === 'tm' ? cat?.title : cat?.title_ru}</h2>
                                    </div>
                                  </Link>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link
                          to={
                            `/shop/?title=` +
                            title +
                            `&title_ru=` +
                            title_ru +
                            `&holiday=` +
                            holiday +
                            `&location=` +
                            location +
                            `&category=` +
                            cat?.id +
                            sort +
                            `&tag=` +
                            tag +
                            `&min_price=` +
                            min_price +
                            `&max_price=` +
                            max_price
                          }
                        >
                          <div className="flex">
                            <img
                              className=" w-10 mr-2"
                              src={backendUrl + cat?.image}
                              alt="a"
                            />
                            <h2 className="px-2 py-2">{lang === 'tm' ? cat?.title : cat?.title_ru}</h2>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <Link
                to={
                  `/shop/?title=` +
                  title +
                  `&title_ru=` +
                  title_ru +
                  `&holiday=` +
                  holiday +
                  `&location=` +
                  location +
                  `&category=` +
                  cat?.id +
                  sort +
                  `&tag=` +
                  tag +
                  `&min_price=` +
                  min_price +
                  `&max_price=` +
                  max_price
                }
              >
                <div className="flex">
                  <img
                    className=" w-10 mr-2"
                    src={backendUrl + cat?.image}
                    alt="a"
                  />
                  <h2 className="px-2 py-2">{lang === 'tm' ? cat?.title : cat?.title_ru}</h2>
                </div>
              </Link>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
