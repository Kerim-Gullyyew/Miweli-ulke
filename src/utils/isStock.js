import { Stock } from "../data/Roles";

const isStock = (groups) => {
    return groups.some(item => Stock === item.name);
  };
  
  export default isStock;
  