import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { textToSpeech } from '../../lib/tts';
import { speechToText } from '../../lib/stt';
import { positiveResponse } from '../../lib/sttHandle';
import styles from './ExResult.module.css';
import useNavigateTo from '../../hooks/useNavigateTo';
import Button from '../../components/Global/Button';

type ExpirationType = 0 | 1 | 2 | null;

function ExResult() {
  const [text, setText] = useState('');
  const [expireType, setExpireType] = useState<ExpirationType>(null);

  const location = useLocation();
  const navigateTo = useNavigateTo();

  useEffect(() => {
    const setDate = () => {
      let resDate: string = location.state.resDate;
      resDate = resDate.replace('-', '년 ');
      resDate = resDate.replace('-', '월 ');
      resDate += '일';
      console.log(resDate);
      return resDate;
    };

    const speakInfo = () => {
      let ndate = new Date();
      const pdate = new Date(location.state.resDate);

      //can't eat : 0 / warn to eat : 1 / can eat : 2
      if (pdate > ndate) {
        const tmpdate = new Date(pdate);
        tmpdate.setDate(tmpdate.getDate() - 3);

        if (tmpdate <= ndate) {
          setExpireType(1);
          // await textToSpeech(
            // '제품의 유통기한이 얼마남지 않았습니다. 빠른 시일 내에 섭취하시길 권고드립니다.',
            // 3
          // );
        } else {
          setExpireType(2);
          // await textToSpeech('먹어도 좋습니다.', 3);
        }
      } else {
        setExpireType(0);
        // await textToSpeech('건강에 위험할 수 있습니다.', 3);
      }
    };

    // const speakDate = async () => {
    //   await textToSpeech(ttsText, 7);
    //   await speakInfo();
    //   await textToSpeech('다시 들려드릴까요?', 4);
    //   const userRes = await speechToText(3000);
    //   if (positiveResponse.has(userRes)) {
    //     speakDate();
    //   } else {
    //     await textToSpeech('첫 화면으로 이동합니다.', 1);
    //     navigateTo('/home');
    //   }
    // };

    const preventGoBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    const resDate = setDate();
    const ttsText = `상품의 유통기한은 ${resDate} 입니다.`;

    const speakTotal = async () => {
      setText(resDate);
      speakInfo();
    };

    speakTotal();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, [location.state.resDate]);

  return (
    <div>
      <h1 className={styles.description}>
        상품 유통기한 <span className={styles.textcolor}>{text}</span>
      </h1>
      <div>
        {expireType === 0 && (
          <p className={styles.nope}>건강에 위험할 수 있습니다.</p>
        )}
      </div>
      <div>
        {expireType === 1 && (
          <p className={styles.warn}>
            제품의 유통기한이 얼마남지 않았습니다. 빠른 시일 내에 섭취하시길
            권고드립니다.
          </p>
        )}
      </div>
      <div>
        {expireType === 2 && <p className={styles.caneat}>먹어도 좋습니다.</p>}
      </div>
      <Button classname='' text="홈 화면으로" onClick={() => navigateTo('/home')}/>
    </div>
  );
}

export default ExResult;
