export const time = (date) => {
  let hour = date.getHours();
  if (hour <= 9) {
    hour = "0" + hour;
  }

  let minutes = date.getMinutes();
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return hour + ":" + minutes;
};

export const date = (date) => {
  let day = date.getDate();
  if (day <= 9) {
    day = "0" + day;
  }

  let month = date.getMonth() + 1;
  if (month <= 9) {
    month = "0" + month;
  }

  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
