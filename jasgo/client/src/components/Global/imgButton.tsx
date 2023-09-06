import setting from '../../images/Setting.png';
import close from '../../images/Close.png';
import logo from '../../routes/logo.jpg';

interface ImgButtonProps {
  onClick?: () => void;
  classname: string;
  imgclassname: string;
  imgSource: string;
}

function ImgButton({
  onClick,
  classname,
  imgclassname,
  imgSource,
}: ImgButtonProps) {
  let imgSourceObject = imgSource;
  switch (imgSource) {
    case 'setting':
      imgSourceObject = setting;
      break;
    case 'close':
      imgSourceObject = close;
      break;
    case 'logo':
      imgSourceObject = logo;
  }

  if (!onClick) {
    return (
      <button onClick={() => null} className={classname}>
        <img src={imgSourceObject} className={imgclassname} alt="imgButton" />
      </button>
    );
  }

  return (
    <button onClick={onClick} className={classname}>
      <img src={imgSourceObject} className={imgclassname} alt="imgButton" />
    </button>
  );
}

export default ImgButton;
