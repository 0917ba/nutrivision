import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "./../../js/tts";
import { speechToText } from "../../js/stt";

function Restaurant() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  let userRestaurant = "";
  let userMenu = "";

  const divOnClick = () => {};

  const setNutrients = (candidate) => {
    if (candidate !== "") {
      //set nutrients
      const calories = candidate.NUTR_CONT1;
      const carbohydrate = candidate.NUTR_CONT2;
      const protein = candidate.NUTR_CONT3;
      const fat = candidate.NUTR_CONT4;
      const sugar = candidate.NUTR_CONT5;
      const sodium = candidate.NUTR_CONT6;
      const cholesterol = candidate.NUTR_CONT7;
      const saturatedFat = candidate.NUTR_CONT8;
      const transFat = candidate.NUTR_CONT9;

      //output Object
      const result = {};
      const nutrients = {
        name: candidate.DESC_KOR,
        maker: candidate.MAKER_NAME,
        calories: calories,
        nutrients: {
          carbohydrate: carbohydrate,
          protein: protein,
          fat: fat,
          sugar: sugar,
          sodium: sodium,
          cholesterol: cholesterol,
          saturatedFat: saturatedFat,
          transFat: transFat,
        },
      };

      //set zero default value
      for (let key in nutrients.nutrients) {
        if (nutrients.nutrients[key] === "") {
          nutrients.nutrients[key] = "0";
        }
      }

      //return
      result["nuts"] = nutrients;
      console.log(result);
      return result;
    }
  };

  const getNutrients = async () => {
    const fetchNutrients = async () => {
      const url = `https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/100/DESC_KOR=${userMenu}&MAKER_NAME=${userRestaurant}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.I2790.total_count === "0") {
        throw new Error("일치하는 제품이 없습니다.");
      }

      //console.log(json);
      return json;
    };

    const selectProduct = async () => {
      let isCorrectRes = false;
      let nutrients = null;

      for (const nutrientsData of json.I2790.row) {
        console.log(`찾으시는 제품이 ${nutrientsData.DESC_KOR} 인가요?`);
        await textToSpeech(`찾으시는 제품이 ${nutrientsData.DESC_KOR} 인가요?`);

        const userResponse = await speechToText(2500);
        if (userResponse === "네") {
          nutrients = setNutrients(nutrientsData);
          console.log(nutrients);
          isCorrectRes = true;
          break;
        }
      }

      if (isCorrectRes) {
        navigateTo("/restaurant/result", { resNutrients: nutrients });
      } else {
        await textToSpeech("찾으시는 제품이 없습니다...ㅠㅠ");
        console.log("찾으시는 제품이 없습니다...ㅠㅠ");
      }
    };

    const json = await fetchNutrients();
    selectProduct();
  };

  useEffect(() => {
    const init = async () => {
      console.log("I'm started!");
      await textToSpeech("방문하신 매장의 이름을 말씀해주세요.");
      userRestaurant = await speechToText(3000);
      await textToSpeech("주문하실 메뉴의 이름을 말씀해주세요.");
      userMenu = await speechToText(3000);
      console.log(userRestaurant, userMenu);
    };

    const speakNutrients = async () => {
      await init();
      console.log("init end!");
      getNutrients();
    };

    speakNutrients();
  }, []);

  return <div></div>;
}

export default Restaurant;
