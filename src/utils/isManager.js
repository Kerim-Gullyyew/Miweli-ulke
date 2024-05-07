import { Manager } from "../data/Roles";
const isManager = (groups) => {
    return groups.some(item => Manager === item.name);
  };
  
  export default isManager;