const PasswordStr = (props) => {
  const { length } = props;
  let strColor;
  let strWidth;

  switch (true) {
    case length >= 1 && length < 4:
      strColor = "red";
      strWidth = "20%";
      break;
    case length >= 4 && length < 6:
      strColor = "orange";
      strWidth = "40%";
      break;
    case length >= 6 && length < 8:
      strColor = "yellow";
      strWidth = "60%";
      break;
    case length >= 8 && length < 10:
      strColor = "#5cff47";
      strWidth = "80%";
      break;
    case length >= 10:
      strColor = "green";
      strWidth = "100%";
      break;
    default:
      strColor = "transparent";
      strWidth = "0%";
  }

  const style = {
    backgroundColor: strColor,
    height: "5px",
    width: strWidth,
    transition: "all 300ms ease-in-out",
  };

  return (
    <div>
      <p className="pwStrWeak">Débil</p>
      <p className="pwStrStrong">Fuerte</p>
      <div style={style} />
    </div>
  );
};

export default PasswordStr;
