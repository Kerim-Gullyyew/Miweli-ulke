import MenuItems from "./MenuItems";
const Dropdown = ({
    submenus,
    dropdown,
    depthLevel
}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "bg-red-600" : "";
    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""} -right-60 -top-0 z-50 w-full`} >
            {submenus.map((submenu, index) => (
                <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
            ))}
        </ul>
    )
};

export default Dropdown;