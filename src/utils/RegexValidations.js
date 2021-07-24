const validateEmail = (text) => {
  const regex = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
  return regex.test(text);
};

const validateText = (text) => {
  const regex = /.{6}/;
  console.log(regex.test(text));
  return regex.test(text);
};

export { validateEmail, validateText };
