import { Employee, Manager } from "../data/Roles";
const isEmployyeManager = (groups) => {
    const isEmployee = groups.some(item => Employee === item.name);
    const isManager = groups.some(item => Manager === item.name);
    if (isEmployee && isManager) {
        return true
    }else{
        return false;
    }
  };
  
  export default isEmployyeManager;
  