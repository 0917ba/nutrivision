import { textToSpeech } from './tts';
import { speechToText } from './stt';
import { positiveResponse } from './sttHandle';
import recommendedNutrients from './recommended';
import { NutrientsRate, ResultNutrient } from '../types/nutrient';

async function readNutrientsObject(element: ResultNutrient) {
  await textToSpeech('상품명 ' + element.name);
  await textToSpeech('칼로리 ' + element.calorie + '칼로리');
  await textToSpeech('탄수화물 ' + element.nutrients.carbohydrate + '그램');
  await textToSpeech('단백질 ' + element.nutrients.protein + '그램');
  await textToSpeech('지방 ' + element.nutrients.fat + '그램');
  await textToSpeech('당류 ' + element.nutrients.sugar + '그램');
  await textToSpeech('나트륨 ' + element.nutrients.sodium + '밀리그램');
  await textToSpeech(
    '콜레스테롤 ' + element.nutrients.cholesterol + '밀리그램'
  );
  await textToSpeech('포화지방 ' + element.nutrients.saturatedFat + '그램');
  await textToSpeech('트랜스지방 ' + element.nutrients.transFat + '그램');
}

async function askForRate() {
  await textToSpeech('1일 영양성분 기준치에 대한 비율을 알려드릴까요?');
  const res1 = await speechToText(3000);

  if (positiveResponse.has(res1)) return true;
  else return false;
}

function getNutrientsRate(nutrients: ResultNutrient): NutrientsRate {
  const calorieRate = Math.floor(
    (nutrients.calorie / recommendedNutrients.calorie) * 100
  );
  const carbohydrateRate = Math.floor(
    (nutrients.nutrients.carbohydrate / recommendedNutrients.carbohydrate) * 100
  );
  const proteinRate = Math.floor(
    (nutrients.nutrients.protein / recommendedNutrients.protein) * 100
  );
  const fatRate = Math.floor(
    (nutrients.nutrients.fat / recommendedNutrients.fat) * 100
  );
  const sugarRate = Math.floor(
    (nutrients.nutrients.sugar / recommendedNutrients.sugar) * 100
  );
  const sodiumRate = Math.floor(
    (nutrients.nutrients.sodium / recommendedNutrients.sodium) * 100
  );
  const cholesterolRate = Math.floor(
    (nutrients.nutrients.cholesterol / recommendedNutrients.cholesterol) * 100
  );
  const saturatedFatRate = Math.floor(
    (nutrients.nutrients.saturatedFat / recommendedNutrients.saturatedFat) * 100
  );

  return {
    calorieRate,
    carbohydrateRate,
    proteinRate,
    fatRate,
    sugarRate,
    sodiumRate,
    cholesterolRate,
    saturatedFatRate,
  };
}

async function readNutrientsRate(nutrientsRateObject: NutrientsRate) {
  console.log(nutrientsRateObject);
  await textToSpeech(
    '2000칼로리를 기준으로 한, 1일 영양성분 기준치에 대하여,',
    2
  );
  await textToSpeech(nutrientsRateObject.calorieRate + '퍼센트의 칼로리', 2);
  await textToSpeech(
    nutrientsRateObject.carbohydrateRate + '퍼센트의 탄수화물',
    2
  );
  await textToSpeech(nutrientsRateObject.proteinRate + '퍼센트의 단백질', 2);
  await textToSpeech(nutrientsRateObject.fatRate + '퍼센트의 지방', 2);
  await textToSpeech(nutrientsRateObject.sugarRate + '퍼센트의 당류', 2);
  await textToSpeech(nutrientsRateObject.sodiumRate + '퍼센트의 나트륨', 2);
  await textToSpeech(
    nutrientsRateObject.cholesterolRate + '퍼센트의 콜레스테롤',
    2
  );
  await textToSpeech(
    nutrientsRateObject.saturatedFatRate +
      '퍼센트의 포화지방을 섭취할 수 있습니다.',
    2
  );
}

export { readNutrientsObject, askForRate, getNutrientsRate, readNutrientsRate };
