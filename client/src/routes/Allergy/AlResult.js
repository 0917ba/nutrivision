import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";
import styles from "./ExResult.module.css";


function AlResult() {
  const [resText, setResText] = useState("");
  const [text, setText] = useState("");

  const location = useLocation();

  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  useEffect(() => {
    const speakInfo = async () => {
      const result = loaction.state.result;


      

    const speakData = async () => {
      await textToSpeech(ttsText);
      await speakInfo();
      await textToSpeech("다시 들려드릴까요?", true);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        speakDate();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/home");
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    const resDate = setDate();
    const ttsText = `상품의 유통기한은 ${resDate} 입니다.`;

    const speakTotal = async () => {
      setResText(ttsText);
      setText(resDate);
      await speakDate();
    };

    speakTotal();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
  }

  return (
    <div>
      <h1 className={styles.description}>
        상품 유통기한 <span className={styles.textcolor}>{text}</span>
      </h1>
      <div>
        {caneat === 0 && (
          <p className={styles.nope}>건강에 위험할 수 있습니다.</p>
        )}
      </div>
      <div>
        {caneat === 1 && (
          <p className={styles.warn}>
            제품의 유통기한이 얼마남지 않았습니다. 빠른 시일 내에 섭취하시길
            권고드립니다.
          </p>
        )}
      </div>
      <div>
        {caneat === 2 && <p className={styles.caneat}>먹어도 좋습니다.</p>}
      </div>
    </div>
  );

}

export default AlResult;
