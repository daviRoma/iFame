export const emailValidator = (text, email, setEmail, setEmailError) => {
  setEmailError('');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    setEmailError('This is not a valid email address');
  }
  setEmail(text);
};
