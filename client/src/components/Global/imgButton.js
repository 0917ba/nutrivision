import setting from "../../images/Setting.png";
import close from "../../images/Close.png";
import logo from "../../routes/logo.jpg";

function ImgButton({ onClick, classname, imgclassname, imgSource }) {
  let imgSourceObject = imgSource;
  switch (imgSource) {
    case "setting":
      imgSourceObject = setting;
      break;
    case "close":
      imgSourceObject = close;
      break;
    case "logo":
      imgSourceObject = logo;
  }
  return (
    <button onClick={onClick} className={classname}>
      <img src={imgSourceObject} className={imgclassname} />
    </button>
  );
}

export default ImgButton;
