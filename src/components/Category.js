import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { backendUrl } from "../rootUrl";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CategoryPanel from "./CategoryPanel";
import { Link } from "react-router-dom";
const lang = localStorage.getItem("userLanguage");

function toTree(data, parent = null) {
  return data?.reduce((r, e) => {
    if (e.parent === parent) {
      const obj = { ...e };
      const children = toTree(data, e.id);
      if (children.length) obj.children = children;
      r.push(obj);
    }
    return r;
  }, []);
}
const Category = ({ categories }) => {
  const category_list = toTree(categories);

  const [categoryData, setCategoryData] = useState(category_list[0]);
  let content = (
    <div className="px-5 py-3 bg-primary flex items-center relative">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex  justify-center rounded-full px-1 py-1 text-sm font-medium text-gray-700 shadow-sm">
            <div className=" text-lg">
              <span className="text-white">
                <FontAwesomeIcon icon={faBars} />
              </span>
              <span className="ml-2 text-white">
                {lang === "tm" ? "Kategoriyalar" : "Категории"}{" "}
              </span>
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-5 w-screen rounded-b-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className=" px-6 py-5 lg:px-8 grid grid-cols-5">
                <div className=" col-span-1">
                  <div>
                    {category_list?.map((cat, key) => (
                      <div key={key}>
                        {cat.children !== undefined ? (
                          <div
                            onClick={() => setCategoryData(cat)}
                            aria-current="true"
                            className="flex  items-center px-6 py-2 transition duration-150 ease-in-out hover:bg-neutral-50 hover:text-neutral-700 "
                          >
                            <img
                              src={backendUrl + cat.image}
                              alt={cat.title}
                              className="w-10 mr-2"
                            />
                            {lang === "tm" ? cat.title : cat.title_ru}
                          </div>
                        ) : (
                            <Menu.Item>
                            {({ active }) => (
                              <Link to={`/shop/?category=` + cat.id}>
                                <button
                                  className={`${
                                    active
                                      ? "bg-neutral-50 text-neutral-700"
                                      : "text-gray-900"
                                  } group flex pl-5 items-center rounded-md text-base px-2 py-2`}
                                >
                                  <img
                                    src={backendUrl + cat.image}
                                    alt={lang === 'tm' ? cat.title : cat.title_ru}
                                    className="w-10 mr-2"
                                  />
                                  {lang === 'tm' ? cat.title : cat.title_ru}
                                </button>
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <CategoryPanel data={categoryData} />
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );

  return content;
};

export default Category;
