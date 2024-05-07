import { Manager, Stock } from "../data/Roles";
const isStockManager = (groups) => {
    const isStock = groups.some(item => Stock === item.name);
    const isManager = groups.some(item => Manager === item.name);
    if (isStock && isManager) {
        return true
    }else{
        return false;
    }
  };
  
  export default isStockManager;
  