import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech, stopTTS } from "../../js/tts";
import { speechToText } from "../../js/stt";
import { setNutrients } from "../../js/nutrientsHandle";
import {
  restaurantsList,
  positiveResponse,
  normalizeRestaurantName,
} from "../../js/sttHandle";
import styles from "./Restaurant.module.css";

function Restaurant() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  const [displayText, setDisplayText] = useState("");

  let userRestaurant = "";
  let userMenu = "";

  const getNutrients = async () => {
    const fetchNutrients = async () => {
      const url = `https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/100/DESC_KOR=${userMenu}&MAKER_NAME=${userRestaurant}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.I2790.total_count === "0") {
        return null;
      } else {
        return json;
      }
    };

    const selectProduct = async (rawNutrients) => {
      let isCorrectRes = false;
      let nutrients = null;
      for (const nutrientsData of rawNutrients.I2790.row) {
        setDisplayText(`찾으시는 메뉴가 ${nutrientsData.DESC_KOR} 인가요?`);
        await textToSpeech(
          `찾으시는 메뉴가 ${nutrientsData.DESC_KOR} 인가요?`,
          1
        );

        const userResponse = await speechToText(2500);
        if (positiveResponse.has(userResponse)) {
          nutrients = setNutrients(nutrientsData);
          console.log(nutrients);
          isCorrectRes = true;
          break;
        }
      }

      if (isCorrectRes) {
        navigateTo("/restaurant/result", { resNutrients: nutrients });
      } else {
        setDisplayText("찾으시는 메뉴가 존재하지 않습니다.");
        await textToSpeech(
          "찾으시는 메뉴가 존재하지 않습니다. 홈 화면으로 돌아갑니다.",
          1
        );
        navigateTo("/home");
      }
    };

    setDisplayText("주문하실 메뉴의 이름을 말씀해주세요.");
    await textToSpeech("주문하실 메뉴의 이름을 말씀해주세요.", 1);
    userMenu = await speechToText(3000);

    const rawNutrients = await fetchNutrients();
    if (rawNutrients !== null) selectProduct(rawNutrients);
    else if (userMenu === "취소") {
      setDisplayText("첫 화면으로 이동합니다.");
      await textToSpeech("첫 화면으로 이동합니다.", 1);
      navigateTo("/home");
    } else {
      setDisplayText(
        "찾으시는 메뉴가 존재하지 않습니다. 다시 말씀해주세요. 취소하려면 '취소'라고 말씀해주세요."
      );
      await textToSpeech(
        "찾으시는 메뉴가 존재하지 않습니다. 다시 말씀해주세요. 취소하려면 '취소'라고 말씀해주세요.",
        1
      );
      getNutrients();
    }
  };

  useEffect(() => {
    const init = async () => {
      setDisplayText("방문하신 매장의 이름을 말씀해주세요.");
      await textToSpeech("방문하신 매장의 이름을 말씀해주세요.", 1);
      userRestaurant = await speechToText(3000);

      if (restaurantsList.has(userRestaurant)) {
        userRestaurant = normalizeRestaurantName(userRestaurant);
        getNutrients();
      } else if (userRestaurant === "취소") {
        setDisplayText("첫 화면으로 이동합니다.");
        await textToSpeech("첫 화면으로 이동합니다.", 1);
        navigateTo("/home");
      } else {
        setDisplayText(
          "찾으시는 매장이 존재하지 않습니다. 다시 말씀해주세요. 취소하려면 '취소'라고 말씀해주세요."
        );
        await textToSpeech(
          "찾으시는 매장이 존재하지 않습니다. 다시 말씀해주세요. 취소하려면 '취소'라고 말씀해주세요.",
          1
        );
        init();
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();

    return () => {
      stopTTS();
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return <div className={styles.decodiv}>{displayText}</div>;
}

export default Restaurant;
