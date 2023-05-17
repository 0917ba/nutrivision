import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { textToSpeech } from "../js/tts";
import { speechToText } from "../js/stt";
import Button from "../components/Global/Button";
import ImgButton from "../components/Global/ImgButton";
import Logo from "./logo.jpg";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    console.log("Redirecting...");
  };

  useEffect(() => {
    const init = async () => {
      await textToSpeech(
        "영양성분, 유통기한, 도움말 중 원하시는 기능을 말씀해주세요."
      );
      const getButton = async () => {
        const res1 = await speechToText(3000);
        switch (res1) {
          case "영양 성분":
          case "영양성분":
            await textToSpeech(
              "가공식품의 영양성분을 알고 싶으시다면 '가공식품', 음식점 메뉴의 영양성분을 알고 싶으시다면 '음식점'을 말씀해주세요."
            );
            const getNutrientsWhere = async () => {
              const res2 = await speechToText(3000);
              if (res2 === "가공식품" || res2 === "가공 식품") {
                await textToSpeech(
                  "가공식품 영양정보 찾기 화면으로 이동합니다."
                );
                navigateTo("/nutrients");
              } else if (res2 === "음식점") {
                await textToSpeech(
                  "음식점 메뉴 영양정보 찾기 화면으로 이동합니다."
                );
                navigateTo("/restaurant");
              } else {
                await textToSpeech("다시 한 번 말씀해 주시겠어요?");
                getNutrientsWhere();
              }
            };
            getNutrientsWhere();
            break;

          case "유통기한":
            await textToSpeech("유통기한 찾기 화면으로 이동합니다.");
            navigateTo("/expiration");
            break;

          case "도움말":
            await textToSpeech("도움말 화면으로 이동합니다.");
            navigateTo("/help");
            break;

          default:
            await textToSpeech("다시 한 번 말씀해 주시겠어요?");
            getButton();
            break;
        }
      };
      getButton();
    };
    init();
  }, []);

  return (
    <div>
      <div>
        <ImgButton
          classname={styles.settingimg}
          onclick={() => navigateTo("/Settings")}
        />
      </div>
      <div className={styles.aboutlogo}>
        <img src={Logo} width={300}></img>
      </div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButton}
            text="영양성분"
            onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButton}
            text="유통기한"
            onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButton}
            text="음식점"
            onClick={() => navigateTo("/restaurant")}
          />

          <Button
            classname={styles.myButton}
            text="도움말"
            onClick={() => navigateTo("/help")}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;