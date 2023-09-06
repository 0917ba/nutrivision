import { useCallback, useEffect, useRef, useState } from 'react';
import { textToSpeech } from '../../lib/tts';
import Video from '../../components/Global/Video';
import Canvas from '../../components/Global/Canvas';
import useNavigateTo from '../../hooks/useNavigateTo';

const cycleLimit = 7;

function Expiration() {
  const [expiration, setExpiration] = useState<string>('');
  const [isDateDetected, setIsDateDetected] = useState<boolean>(false);
  const [resultArr, setResultArr] = useState<string[]>([]);

  const isFirstLoaded = useRef<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigateTo = useNavigateTo();

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, 300, 400);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendImage = useCallback(() => {
    try {
      if (canvasRef.current) {
        const image = canvasRef.current
          .toDataURL()
          .replace('data:image/png;base64,', '');
        let formData = new FormData();
        formData.append('imageInfo', image);

        const serverUrl = process.env.REACT_APP_SERVER_URL as string;
        fetch(serverUrl + '/utong', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result !== 'not found' && !isDateDetected) {
              setIsDateDetected(true);
            }
            setResultArr((current) => [...current, data.result]);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [isDateDetected]);

  useEffect(() => {
    let intervalId: null | NodeJS.Timer = null;

    const notFound = async () => {
      await textToSpeech('유통기한이 감지되지 않았습니다.', 2);
      await textToSpeech('홈 화면으로 이동합니다.', 2);
      navigateTo('/home');
    };

    const init = async () => {
      let cycleCnt = 0;
      await textToSpeech('유통기한 탐색을 시작합니다.', 2);
      await textToSpeech(
        '카메라를 식품에 가까이 대고, 유통기한이 인식될 때까지 카메라를 천천히 이동시켜주세요.',
        2
      );
      const id = setInterval(() => {
        if (!intervalId) intervalId = id;
        if (cycleCnt && cycleCnt % 14 === 0) {
          textToSpeech('탐색중.', 0);
        }
        if (cycleCnt >= 300) {
          console.log('not found');
          clearInterval(intervalId);
          notFound();
        }
        drawToCanvas();
        sendImage();
        cycleCnt += 1;
      }, 350);
    };

    const preventGoBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    init();

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  useEffect(() => {
    if (isDateDetected) {
      console.log('date detected!');
      textToSpeech('유통기한이 감지되었습니다.', 1);
    }
  }, [isDateDetected]);

  useEffect(() => {
    const init = () => {
      setIsDateDetected(false);
      setResultArr([]);
    };

    if (resultArr.length >= cycleLimit) {
      let { res } = getMode(resultArr);
      if (res === 'not found') {
        console.log('failed.. begin to search');
        init();
      } else {
        console.log('success!');
        console.log(`found result is ${res}`);
        init();
        setExpiration(res);
      }
    }
  }, [resultArr]);

  useEffect(() => {
    if (!isFirstLoaded.current && expiration !== '') {
      console.log('success!');
      console.log(`Expiration Date is ${expiration}`);
      navigateTo('/expiration/result', { resDate: expiration });
    } else {
      isFirstLoaded.current = false;
    }
  }, [expiration]);

  return (
    <div>
      <Video videoRef={videoRef} />
      <Canvas ref={canvasRef} />
    </div>
  );
}

//get mode value(최빈값) of Array: arr
function getMode(arr: string[]) {
  interface ObjType {
    [key: string]: number;
  }

  let obj: ObjType = {};

  arr.forEach((res) => {
    obj[res] = obj[res] === undefined ? 1 : obj[res] + 1;
  });
  console.log(obj);

  let res = '';
  let resNum = 0;
  for (let key in obj) {
    if (resNum < obj[key]) {
      res = key;
      resNum = obj[key];
    }
  }
  return { res: res, repeatCnt: resNum };
}

export default Expiration;
