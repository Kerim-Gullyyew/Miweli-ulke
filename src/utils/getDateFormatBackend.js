const getDateFormatBackend = (startDate) => {
    const date_array = startDate.split('-');

    const nDay = date_array[0];
    const nMonth = date_array[1];
    const nYear = date_array[2];

    const newDate =
      nYear +
      "-" +
      (nMonth) +
      "-" +
      nDay +
      "T" +
      "00:00:00";
    return newDate;
  };
  
  export default getDateFormatBackend;