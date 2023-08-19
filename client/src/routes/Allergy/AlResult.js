import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";
import { positiveResponse } from "../../js/sttHandle";
import styles from "./AlResult.module.css";

function AlResult() {
  const location = useLocation();

  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  useEffect(() => {
    const speakAllergy = async () => {
      const allergyList = location.state.allergyList;
      console.log(allergyList);

      if (!allergyList) {
        await textToSpeech("식품에 함유된 알레르기 유발성분이 없습니다.", 4);
        await textToSpeech("첫 화면으로 이동합니다.", 4);
        navigateTo("/home");
      }

      await textToSpeech("식품에 함유된 알레르기 유발성분은", 4);
      for (let allery of allergyList) {
        await textToSpeech(allery, 4);
      }
      await textToSpeech("입니다.", 4);

      await textToSpeech("다시 들려드릴까요?", 4);
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        speakAllergy();
      } else {
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/home");
      }
    };

    speakAllergy();

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className={styles.center}>
      <p className={styles.first}> 식품에 함유된 알레르기 유발성분으로</p>
      <div className={styles.textcolor}>
        {location.state.allergyList.map((element, index) => (
          <span className={styles.second} key={index}>
            {element}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AlResult;
