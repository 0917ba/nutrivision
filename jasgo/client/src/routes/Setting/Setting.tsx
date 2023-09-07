import { useEffect, useState } from "react";
import { textToSpeech, getSpeakRate, setSpeakRate } from "../../lib/tts";
import { speechToText } from "../../lib/stt";
import Button from "../../components/Global/Button";
import styles from "./Setting.module.css";
import useNavigateTo from "../../hooks/useNavigateTo";

function Setting() {
  const [speed, setSpeed] = useState<string>(getSpeakRate());

  const navigateTo = useNavigateTo();

  useEffect(() => {
    setSpeakRate(speed);
    console.log("speed changed to " + getSpeakRate());
  }, [speed]);

  //아래 버튼에 onClick 없음
  return (
    <div className={styles.container}>
      <Button classname={styles.closeButton} text="X" />
      <h1 style={{ textAlign: "center" }}>설정</h1>
      <div className={styles.settingBody}>
        <h4>음성 재생 속도</h4>
        <div>
          <input
            type="radio"
            value="1"
            checked={speed === "1"}
            onChange={() => setSpeed("1")}
          />
          <label>느림</label>
          <input
            type="radio"
            value="1.4"
            checked={speed === "1.4"}
            onChange={() => setSpeed("1.4")}
          />
          <label>중간</label>
          <input
            type="radio"
            value="1.8"
            checked={speed === "1.8"}
            onChange={() => setSpeed("1.8")}
          />
          <label>빠름</label>
        </div>
      </div>
      <Button classname='' text="홈 화면으로" onClick={() => navigateTo('/home')}/>
    </div>
  );
}

export default Setting;
