const formatNumber = ({ value }) => {
  const stringValue = String(value);
  const length = stringValue.length;

  if (length === 4) {
    return (
      stringValue.substring(0, 1) + "." + stringValue.substring(1, 2) + "K"
    );
  } else if (length === 5) {
    return stringValue.substring(0, 2) + "K";
  } else if (length === 6) {
    return stringValue.substring(0, 3) + "K";
  } else if (length === 7) {
    return (
      stringValue.substring(0, 1) + "." + stringValue.substring(1, 3) + "M"
    );
  } else if (length === 8 || length === 9) {
    return stringValue.substring(0, length - 6) + "M";
  } else if (length === 10) {
    return (
      stringValue.substring(0, 1) + "." + stringValue.substring(1, 3) + "B"
    );
  } else if (length >= 11 && length <= 12) {
    return stringValue.substring(0, length - 9) + "B";
  } else if (length > 12) {
    return stringValue.substring(0, 2) + "B+";
  } else {
    return stringValue;
  }
};

export default formatNumber;
