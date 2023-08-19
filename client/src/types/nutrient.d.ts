/*
1	NUM	번호
2	FOOD_CD	식품코드
3	SAMPLING_REGION_NAME	지역명
4	SAMPLING_MONTH_NAME	채취월
5	SAMPLING_REGION_CD	지역코드
6	SAMPLING_MONTH_CD	채취월코드
7	GROUP_NAME	식품군
8	DESC_KOR	식품이름
9	RESEARCH_YEAR	조사년도
10	MAKER_NAME	제조사명
11	SUB_REF_NAME	자료출처
12	SERVING_SIZE	총내용량
13	NUTR_CONT1	열량(kcal)(1회제공량당)
14	NUTR_CONT2	탄수화물(g)(1회제공량당)
15	NUTR_CONT3	단백질(g)(1회제공량당)
16	NUTR_CONT4	지방(g)(1회제공량당)
17	NUTR_CONT5	당류(g)(1회제공량당)
18	NUTR_CONT6	나트륨(mg)(1회제공량당)
19	NUTR_CONT7	콜레스테롤(mg)(1회제공량당)
20	NUTR_CONT8	포화지방산(g)(1회제공량당)
21	NUTR_CONT9	트랜스지방(g)(1회제공량당)
*/

interface ApiNutrientResponse {
  NUM: string;
  FOOD_CD: string;
  SAMPLING_REGION_NAME: string;
  SAMPLING_MONTH_NAME: string;
  SAMPLING_REGION_CD: string;
  SAMPLING_MONTH_CD: string;
  GROUP_NAME: string;
  DESC_KOR: string;
  RESEARCH_YEAR: string;
  MAKER_NAME: string;
  SUB_REF_NAME: string;
  SERVING_SIZE: string;
  NUTR_CONT1: string;
  NUTR_CONT2: string;
  NUTR_CONT3: string;
  NUTR_CONT4: string;
  NUTR_CONT5: string;
  NUTR_CONT6: string;
  NUTR_CONT7: string;
  NUTR_CONT8: string;
  NUTR_CONT9: string;
}

interface ResultNutrient {
  name: string;
  maker: string;
  calorie: number;
  nutrients: {
    [key?: string]: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
    saturatedFat: number;
    transFat: number;
  };
}

interface ResultNutrientWrapped {
  nuts: ResultNutrient;
}

interface NutrientsRate {
  calorieRate: number;
  carbohydrateRate: number;
  proteinRate: number;
  sodiumRate: number;
  fatRate: number;
  sugarRate: number;
  cholesterolRate: number;
  saturatedFatRate: number;
}

export {
  ApiNutrientResponse,
  ResultNutrient,
  ResultNutrientWrapped,
  NutrientsRate,
};
