import { useEffect } from "react";
import { textToSpeech } from "../../lib/tts";
import styles from "./Help.module.css";
import { speechToText } from "../../lib/stt";
import { positiveResponse } from "../../lib/sttHandle";
import useNavigateTo from "../../hooks/useNavigateTo";
import { symbol } from "prop-types";
import Button from "../../components/Global/Button";

function Help() {

  const navigateTo = useNavigateTo();

  return (
    <div className={styles.center}>
      <h1 className={styles.prettytext}> 도움말 </h1>
      <div>
        <h2 className={styles.warnm}>유의사항</h2>
        <div className={styles.decodiv}>
          <li className={styles.decoli}>
            후면 카메라를 활용하여 물체를 인식하며, 물체 표면을 인식하기 위해
            카메라와 물체 사이의 거리를 약 7~15cm로 유지
          </li>
          <li className={styles.decoli}>
            카메라 인식 결과가 실제와 다를 수 있음
          </li>
        </div>
      </div>
      <hr />
      <div>
        <h2 className={styles.btnhad}>앱 기능</h2>

        <div className={styles.decodiv}>
          <div>
            <li className={styles.decoli}>유통기한</li>
            <p>
              카메라를 이용해 국내 가공 식품 표면의 유통기한을 인식시키면 식품의
              유통기한 정보 제공
            </p>
            <ul>
              <li className={styles.message}>
                유통기한이 지난 경우 :{" "}
                <span className={styles.clred}>경고메세지</span>
              </li>
              <li className={styles.message}>
                유통기한이 3일 이하로 남은 경우 :{" "}
                <span className={styles.clyellow}>주의메세지</span>
              </li>
              <li className={styles.message}>
                유통기한이 4일 이상으로 남은 경우 :{" "}
                <span className={styles.clgreen}>안심메세지</span>
              </li>
            </ul>
          </div>

          <div>
            <li className={styles.decoli}>식품정보</li>
            <ul className={styles.decoul}>
              <li className={styles.nutri}>가공식품</li>
              <p className={styles.pmargin}>
                카메라를 이용해 가공 식품 표면을 촬영하며 식품 표면의
                품목보고번호를 인식시키면 해당식품에 대한 영양성분과 일일 적정
                섭취량 등의 정보 제공
              </p>
              <li className={styles.nutri}>음식점</li>
              <p className={styles.pmargin}>
                시중 음식점 브랜드명과 식품명을 음성으로 입력하면 해당 식품에
                대한 영양성분 정보 제공
              </p>
            </ul>
          </div>

          <div>
            <li className={styles.decoli}>알레르기</li>
            <p>
              카메라를 이용해 가공 식품 표면의 알레르기 유발성분을 인식시키면
              해당 식품의 알레르기 유발성분 정보 제공 {"\n"} 인식 확률이 100%가
              아니여서 잘못 인식될 가능성이 있으므로 주의를 요함
            </p>
          </div>

          <div>
            <li className={styles.decoli}>분리배출</li>
            <p>
              카메라를 이용해 가공 식품 표면의 분리배출 마크를 인식시키면 해당
              식품 포장지의 분리배출 방법 정보 제공
            </p>
          </div>

          <div>
            <li className={styles.decoli}>설정</li>
            <p>음성 속도 조절 가능</p>
          </div>
          <hr className={styles.decohr} />
        </div>

        <h2 className={styles.btnhad}>앱 소개</h2>
        <div className={styles.decodiv}>
          <p className={styles.psize}>
            우리는 일상 속에서 시각장애인들이 식품 소비와 관련하여 유통기한을
            파악하는 데 어려움을 겪는다는 사실을 알게 되었습니다.
            <br />
            <br />
            이러한 어려움을 해소하고 시각장애인들의 삶의 질을 향상시키기 위해 이
            앱을 개발하게 되었습니다.
            <br />
            <br />
            시각장애인들은 식품의 유통기한 정보를 확인하는 과정에서 어려움을
            겪습니다.
            <br /> 따라서 이 앱은 식품의 유통기한 정보를 제공합니다.
            <br />
            <br />
            더불어 시각장애인들은 음식의 영양 성분에 대한 정보를 파악하는 것도
            어렵움이 있습니다.
            <br />
            일반적으로 시각장애인들은 휴대폰 앱을 통해 텍스트 정보를 듣는
            방식으로 정보를 얻습니다. <br />
            그러나 대부분의 앱은 카메라로 읽은 텍스트를 처리 없이 읽어주기
            때문에 정보를 이해하는 데 어려움을 겪을 수 있습니다.
            <br />
            <br />
            따라서 이 앱은 가공식품에 표기된 품목보고번호를 활용하여 선택적으로
            정보를 제공합니다.
            <br /> 예를 들어, 과자 봉지의 품목보고번호를 인식하면 해당 과자의
            영양 성분 정보를 전달합니다.
            <br />
            <br />
            뿐만 아니라 이 앱은 시각장애인들 뿐만 아니라 비장애인들도 알기
            어려운 일반 음식점 메뉴의 영양 성분 정보도 제공합니다.
            <br />
            <br />
            더불어 알레르기 유발 성분을 식품 표면에서 인식하여 해당 식품의
            알레르기 유발 성분 정보도 제공합니다.
            <br />
            <br />
            또한, 식품 표면에 있는 분리배출 마크를 인식하여 분리 배출 방법을
            음성 안내로 제공합니다.
            <br />
            <br />
            마지막으로, 대부분의 시각장애인의 경우, 음성 속도를 매우 빠르게 하여
            듣는다는 점을 파악하여, 기본적으로 음성 속도가 빠르도록 했습니다.
            <br />
            <br /> 이렇게 개발된 이 앱은, 식품에 대한 전반적인 정보부터 세부적인
            정보까지 집약적으로 제공하여, 시각장애인들이 식품을 더 편리하고
            효과적으로 선택하게 도와줄 수 있어, 시각장애인들의 삶의 질을 높일 수
            있습니다.
            <br />
          </p>
        </div>
      </div>
      <Button classname='' text="홈 화면으로" onClick={() => navigateTo('/home')}/>
    </div>
  );
}

export default Help;
