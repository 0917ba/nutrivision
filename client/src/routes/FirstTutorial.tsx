import { useEffect } from 'react';
import Button from '../components/Global/Button';
import ImgButton from '../components/Global/imgButton';
import { textToSpeech } from '../lib/tts';
import { speechToText } from '../lib/stt';
import { negativeResponse } from '../lib/sttHandle';
import Logo from './logo.jpg';
import ISHSlogo from './ISHSlogo.png';
import styles from './Home.module.css';
import useNavigateTo from '../hooks/useNavigateTo';

function FirstTutorial() {
  const navigateTo = useNavigateTo();

  useEffect(() => {
    const init = async () => {
      await textToSpeech('안녕하세요, 뉴트리비전에 오신 걸 환영합니다.', 3);
      await textToSpeech(
        '이 앱의 사용 방법을 알고 계시나요? 띵 소리가 난 후에 말씀해주세요.'
      );
      const res = await speechToText(3000);
      if (negativeResponse.has(res)) {
        await textToSpeech('이 앱에 대한 설명을 들려드리겠습니다.');
        navigateTo('/help');
      } else {
        navigateTo('/home');
      }
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
      <div className={styles.line}>
        <ImgButton
          classname={styles.settingimg}
          //onClick={() => navigateTo("/settings")}
          imgSource="setting"
          imgclassname={styles.decoimgbtn}
        />
        {/*<img className={styles.ishslogo} src={ISHSlogo} alt="logo"></img>*/}
      </div>

      <div className={styles.aboutlogo}>
        <img className={styles.titleimage} src={Logo} alt="logo"></img>
      </div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButtonone}
            text="식품정보"
            //onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButtontwo}
            text="유통기한"
            //onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButtonone}
            text="분리배출"
            //onClick={() => navigateTo("/restaurant")}
          />

          <Button
            classname={styles.myButtontwo}
            text="알레르기"
            //onClick={() => navigateTo("/help")}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h6 style={{ margin: '0px' }}>
          시각장애인용 모드입니다. 버튼이 눌리지 않습니다.
        </h6>
      </div>
    </div>
  );
}

export default FirstTutorial;
