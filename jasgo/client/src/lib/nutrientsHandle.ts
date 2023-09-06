import {
  ApiNutrientResponse,
  ResultNutrient,
  ResultNutrientWrapped,
} from '../types/nutrient';

/**
 *  function that returns sanitized nutrients data
 *  @param {object} candidate json.I2790.row[i]
 *  @return object{nuts: {name, maker, calories, nutrients}}
 */
function setNutrients(
  candidate: ApiNutrientResponse
): ResultNutrientWrapped | null {
  if (!candidate?.NUM) return null;

  //set nutrients
  const calorie = candidate.NUTR_CONT1;
  const carbohydrate = candidate.NUTR_CONT2;
  const protein = candidate.NUTR_CONT3;
  const fat = candidate.NUTR_CONT4;
  const sugar = candidate.NUTR_CONT5;
  const sodium = candidate.NUTR_CONT6;
  const cholesterol = candidate.NUTR_CONT7;
  const saturatedFat = candidate.NUTR_CONT8;
  const transFat = candidate.NUTR_CONT9;

  const nutrientsObj: ResultNutrient = {
    name: candidate.DESC_KOR,
    maker: candidate.MAKER_NAME,
    calorie: Number(calorie),
    nutrients: {
      carbohydrate: Number(carbohydrate),
      protein: Number(protein),
      fat: Number(fat),
      sugar: Number(sugar),
      sodium: Number(sodium),
      cholesterol: Number(cholesterol),
      saturatedFat: Number(saturatedFat),
      transFat: Number(transFat),
    },
  };

  //return
  const result: ResultNutrientWrapped = {
    nuts: nutrientsObj,
  };
  return result;
}

export { setNutrients };
