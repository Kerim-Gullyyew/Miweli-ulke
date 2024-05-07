const getDateFormatFilter = (startDate) => {
    if (startDate) {
        const nDay = startDate.getDate().toString().padStart(2, "0");
        const nMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
        const nYear = startDate.getFullYear();
        const newDate =
          nYear +
          "-" +
          nMonth +
          "-" +
          nDay;
        return newDate;
    }else{
        return "";
    }
  };
  
  export default getDateFormatFilter;