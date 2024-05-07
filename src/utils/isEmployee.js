import { Employee } from "../data/Roles";
const isEmployee = (groups) => {
    return groups.some(item => Employee === item.name);
  };
  
  export default isEmployee;
  