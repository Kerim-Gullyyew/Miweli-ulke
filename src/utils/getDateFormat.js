const getDateFormat = (startDate) => {
    const nDay = startDate.getDate();
    const nMonth = startDate.getMonth();
    const nYear = startDate.getFullYear();
    const nHour = startDate.getHours();
    const nMins = startDate.getMinutes();
    const newDate =
      nYear +
      "-" +
      (nMonth + 1) +
      "-" +
      nDay +
      "T" +
      nHour +
      ":" +
      nMins +
      ":00";
    return newDate;
  };
  
  export default getDateFormat;