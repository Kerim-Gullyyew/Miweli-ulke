import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const lang = localStorage.getItem("userLanguage");
const Search = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onSearchClicked = (e) => {
    if (lang === 'tm') {
      navigate('/shop/?title=' + title);
    }else{
      navigate('/shop/?title_ru=' + title);
    }
  }

  return (
    <>
      <div className=" w-full max-w-md mx-6 relative flex">
        <span className="absolute left-4 top-3 text-lg text-gray-400">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          value={title}
          onChange={onTitleChanged}
          type="text"
          name="search"
          id="search"
          className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
          placeholder={lang === "tm" ? "Gözle" : "Найти"}
        />
        <button onClick={onSearchClicked} className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
          {lang === "tm" ? "Gözle" : "Найти"}
        </button>
      </div>
    </>
  );
};

export default Search;
