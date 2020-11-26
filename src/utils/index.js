/**
 * Utils
 */

export const emailValidator = (text, email, setEmail, setEmailError) => {
  setEmailError('');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    setEmailError('This is not a valid email address');
  }
  setEmail(text);
};

export const dateFormat = (dateString) => {
  let date = null;
  if (typeof dateString === 'string') {
    date = new Date(dateString);
  } else {
    date = dateString;
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return day + '/' + month + '/' + year;
};

export const timeFormat = (date) => {
  return `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${
    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  }`;
};
