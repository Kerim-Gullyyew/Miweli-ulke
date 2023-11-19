import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { backendUrl } from "../rootUrl";

const CategoryPanel = ({ data }) => {
  const lang = localStorage.getItem("userLanguage");
  return (
    <div className=" col-span-4">
      <p className="flex items-center border-b  border-neutral-200 px-6 py-2 font-semibold uppercase text-neutral-700 ">
        <img
          src={backendUrl + data.image}
          alt={lang === 'tm' ? data.title : data.title_ru}
          className="w-10 mr-2"
        />
        {lang === "tm" ? data.title : data.title_ru}
      </p>
      {data.children === undefined ? (
        ""
      ) : (
        <>
          {data.children.map((child, key) => (
            <div key={key}>
              {child.children === undefined ? (
                ""
              ) : (
                <p className=" flex items-center border-b border-neutral-200 px-6 py-2 font-semibold uppercase text-neutral-700 ">
                  <img
                    src={backendUrl + child.image}
                    alt={lang === 'tm' ? child.title : child.title_ru}
                    className="w-10 mr-2"
                  />
                  {lang === "tm" ? child.title : child.title_ru}
                </p>
              )}
              <div className="grid md:grid-cols-1 lg:grid-cols-2">
                {child.children === undefined ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={`/shop/?category=` + child.id}>
                          <button
                            className={`${
                              active
                                ? "bg-neutral-50 text-neutral-700"
                                : "text-gray-900"
                            }  flex  pl-10 items-center rounded-md text-base font-semibold px-6 py-2`}
                          >
                            <img
                              src={backendUrl + child.image}
                              alt={lang === 'tm' ? child.title : child.title_ru}
                              className="w-10 mr-2"
                            />
                            {lang === 'tm' ? child.title : child.title_ru}
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    {child.children.map((child, key) => (
                      <div key={key} className="">
                        <div
                          aria-current="true"
                          className="  items-center transition duration-150 ease-in-out hover:bg-neutral-50 hover:text-neutral-700 "
                        >
                          {child.children === undefined ? (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link to={`/shop/?category=` + child.id}>
                                    <button
                                      className={`${
                                        active
                                          ? "bg-neutral-50 text-neutral-700"
                                          : "text-gray-900"
                                      } group flex pl-16 items-center rounded-md text-base px-2 py-2`}
                                    >
                                      <img
                                        src={backendUrl + child.image}
                                        alt={lang === 'tm' ? child.title : child.title_ru}
                                        className="w-10 mr-2"
                                      />
                                      {lang === 'tm' ? child.title : child.title_ru}
                                    </button>
                                  </Link>
                                )}
                              </Menu.Item>
                            </>
                          ) : (
                            <>
                              {child.children.map((child, key) => (
                                <div key={key} className="">
                                  <div
                                    aria-current="true"
                                    className="flex  items-center px-6 py-2 transition duration-150 ease-in-out hover:bg-neutral-50 hover:text-neutral-700 "
                                  >
                                    <span className="mr-1.5">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                    {lang === "tm"
                                      ? child.title
                                      : child.title_ru}
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryPanel;
