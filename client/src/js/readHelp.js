import { textToSpeech } from "./tts";

async function explainBtn() {
  await textToSpeech("앱의 기능에 대해서 설명해드리도록 하겠습니다", 2);
  await textToSpeech(
    "식품 정보를 말씀하시면, 가공식품의 영양정보와, 음식점 메뉴의 영양정보 중, 한 가지를 선택하여 들으실 수 있습니다.",
    2
  );
  await textToSpeech(
    "가공식품의 경우, 카메라를 이용해 가공 식품을 촬영하여, 실시간으로 식품 표면의 품목보고번호를 인식 시키면, 해당 식품에 대한 영양정보를 제공합니다.",
    2
  );
  await textToSpeech(
    "음식점의 경우, 시중 음식점 브랜드명과 식품명을 음성으로 입력하면, 해당 식품에 대한 영양정보를 제공합니다.",
    2
  );
  await textToSpeech(
    "제공하는 영양정보에는 칼로리, 탄수화물, 단백질 등의 함량과, 일일 영양성분 기준치에 대한 비율이 있습니다.",
    2
  );

  await textToSpeech(
    "유통기한을 말씀하시면, 카메라를 이용해 국내 가공 식품 표면의 유통기한을 인식해, 식품의 유통기한 정보를 제공합니다.",
    2
  );

  await textToSpeech(
    "유통기한이 지난 경우 경고 메세지, 유통기한이 3일 이하로 남은 경우 주의 메세지, 유통기한이 4일 이상으로 남은 경우 안심 메세지를 음성으로 전달합니다.",
    2
  );
  await textToSpeech(
    "재활용을 말씀하시면, 카메라를 이용해 가공 식품 표면의 재활용 마크를 인식하여, 해당 식품 포장지의 분리배출 방법 정보를 제공합니다."
  );
  await textToSpeech(
    "설정을 말씀하시면, 음성 속도 조절과, 시각장애인 모드와 비 시각장애인 모드 간 전환이 가능합니다. 음성 속도 조절의 경우, 느림, 중간, 빠름 중 한 가지의 속도를 선택하실 수 있습니다."
  );
}

async function explainApp() {
  await textToSpeech("앱소개입니다", 2);
  await textToSpeech(
    "이 앱은 인천 과학 고등학교 29기 이우진, 김민재, 김보경이 개발한 앱입니다.",
    2
  );
  await textToSpeech(
    "앱 로고는 인천 과학 고등학교 29기 이하늘, 김보경이 디자인하였습니다.",
    2
  );

  await textToSpeech(
    "이 앱은, 시각장애인들이 음식에 들어있는 영양 성분을 알기 힘들어하는 문제를 해결하기 위해 만들어졌습니다.",
    2
  );
  await textToSpeech(
    "일반적으로 시각장애인들은 텍스트를 읽어주는 휴대폰 앱을 사용해서 정보를 얻는데, 대부분의 앱은 카메라로 읽은 텍스트를 처리없이 그대로 읽어주기 때문에, 시각장애인들이 정보를 이해하는 데 어려움이 있을 수 있습니다."
  );
  await textToSpeech(
    "그래서 이 앱은 가공식품에 나타나있는 품목보고번호를 이용해서 주요 정보를 제공합니다.",
    2
  );
  await textToSpeech(
    "예를 들어, 과자봉지의 품목보고번호를 인식하면, 그 과자에 대한 영양 정보를 알려줄 수 있습니다.",
    2
  );
  await textToSpeech(
    "그리고, 시각장애인들 뿐만 아니라 비장애인도 쉽게 알 수 없는 일반 음식점 메뉴의 영양 정보도 제공합니다.",
    2
  );
  await textToSpeech(
    "예시로, '메가커피', '아메리카노'와 같은 메뉴 정보를 음성으로 입력하면, 해당 메뉴의 영양정보를 제공합니다.",
    2
  );
  await textToSpeech(
    "또한, 시각장애인들은 유통기한을 확인하는 것에 어려움이 있기 때문에, 이 앱은 유통기한에 대한 정보도 제공합니다.",
    2
  );
  await textToSpeech(
    "뿐만 아니라, 식품 표면에 있는 재활용 마크를 인식하여 분리배출 방법에 대한 정보를 제공할 수 있습니다.",
    2
  );
  await textToSpeech(
    "예를 들어, 인식된 재활용 마크가 '플라스틱' 일 경우, 플라스틱의 분리배출 방법을 알려줄 수 있습니다.",
    2
  );
  await textToSpeech(
    "마지막으로, 대부분의 시각장애인의 경우, 음성 속도를 매우 빠르게 하여 듣는다는 점을 파악하여, 기본적으로 음성 속도가 빠르도록 했습니다.",
    2
  );
  await textToSpeech(
    "이렇게 개발된 이 앱은, 식품에 대한 전반적인 정보부터 세부적인 정보까지 집약적으로 제공하여, 시각장애인들이 식품을 더 편리하고 효과적으로 선택하게 도와줄 수 있어, 시각장애인들의 삶의 질을 높일 수 있습니다.",
    2
  );
}

export { explainBtn, explainApp };
