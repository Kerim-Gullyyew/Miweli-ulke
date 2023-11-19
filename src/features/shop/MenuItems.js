import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
// import ChevronRight from '../../assets/icons/ChevronRight';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  }

  return (
    <li
      className='category-item relative'
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.children ? (
        <Link to="#">

          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            className='flex items-center justify-between px-2 h-10 bg-white 
            hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer 
            text-qblack hover:text-white w-full'
          >
            <span className="text-sm font-700">
              {items.title}
            </span>
            {/* <ChevronRight /> */}


          </button>
          
          <Dropdown depthLevel={depthLevel} submenus={items.children} dropdown={dropdown} />

        </Link>) : (
        <Link to="#">
          <button
            type="button"
            className='flex items-center justify-between px-2 h-10 bg-white 
            hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer 
            text-qblack hover:text-white w-full'

          >
            {items.title}
          </button>
        </Link>
      )}
    </li>
  )
}

export default MenuItems