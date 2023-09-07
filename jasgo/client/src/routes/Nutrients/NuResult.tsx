import { useLocation } from 'react-router-dom';
import { textToSpeech, stopTTS } from '../../lib/tts';
import { speechToText } from '../../lib/stt';
import { useEffect, useRef, useState } from 'react';
import { positiveResponse } from '../../lib/sttHandle';
import {
  readNutrientsObject,
  askForRate,
  getNutrientsRate,
  readNutrientsRate,
} from '../../lib/readNutrients';
import styles from './NuResult.module.css';
import useNavigateTo from '../../hooks/useNavigateTo';
import { NutrientsRate, ResultNutrient } from '../../types/nutrient';
import Button from '../../components/Global/Button';

function NuResult() {
  const navigateTo = useNavigateTo();
  const location = useLocation();

  const [rate, setRate] = useState<null | NutrientsRate>(null);
  const result = useRef<ResultNutrient>(location.state.resNutrients.nuts);

  const nutrients = result.current.nutrients;
  const calorie = result.current.calorie;

  useEffect(() => {
    // const readNutrients = async () => {
    //   await readNutrientsObject(result.current);

    //   const resForRate = await askForRate();
    //   if (resForRate === true) {
    //     const nutrientsRate = getNutrientsRate(result.current);
    //     setRate(nutrientsRate);
    //     await readNutrientsRate(nutrientsRate);
    //   }

    //   await textToSpeech('영양성분 정보를 다시 들려드릴까요?', 1);
    //   const userRes = await speechToText(3000);
    //   if (positiveResponse.has(userRes)) {
    //     readNutrients();
    //   } else {
    //     await textToSpeech('첫 화면으로 이동합니다.', 1);
    //     navigateTo('/home');
    //   }
    // };

    const init = async () => {
      stopTTS();
      await textToSpeech('제품을 찾았습니다.', 2);
      // readNutrients();
    };

    const preventGoBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    init();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  return (
    <div>
      <h1 className={styles.pretty}>상품명 | {result.current.name}</h1>
      <ul className={styles.decoul}>
        <li className={styles.decoli}>
          칼로리 | {calorie}kcal
          {rate ? ` / ${rate.calorieRate}%` : null}
        </li>
        <li className={styles.decoli}>
          탄수화물 | {nutrients.carbohydrate}g
          {rate ? ` / ${rate.carbohydrateRate}%` : null}
        </li>
        <li className={styles.decoli}>
          단백질 | {nutrients.protein}g{rate ? ` / ${rate.proteinRate}%` : null}
        </li>
        <li className={styles.decoli}>
          지방 | {nutrients.fat}g{rate ? ` / ${rate.fatRate}%` : null}
        </li>
        <li className={styles.decoli}>
          당류 | {nutrients.sugar}g{rate ? ` / ${rate.sugarRate}%` : null}
        </li>
        <li className={styles.decoli}>
          나트륨 | {nutrients.sodium}mg
          {rate ? ` / ${rate.sodiumRate}%` : null}
        </li>
        <li className={styles.decoli}>
          콜레스테롤 | {nutrients.cholesterol}mg
          {rate ? ` / ${rate.cholesterolRate}%` : null}
        </li>
        <li className={styles.decoli}>
          포화지방 | {nutrients.saturatedFat}g
          {rate ? ` / ${rate.saturatedFatRate}%` : null}
        </li>

        <li className={styles.decolisad}>트랜스지방 | {nutrients.transFat}g</li>
      </ul>
      <Button classname='' text="홈 화면으로" onClick={() => navigateTo('/home')}/>
    </div>
  );
}

export default NuResult;
