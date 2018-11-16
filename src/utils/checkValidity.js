const checkValidity = (value, rules) => {
  let isValid = true;
  let message = null;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    message = isValid ? null : 'Input cannot be emty';
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    message = isValid ? null : 'Input must be an email';
  }
  return {isValid, message};
}

export default checkValidity;