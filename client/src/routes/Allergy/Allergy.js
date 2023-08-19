import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { textToSpeech } from '../../js/tts';
import axios from 'axios';
import Video from '../../components/Global/Video';
import Canvas from '../../components/Global/Canvas';

function Allergy() {
  const [allergy, setAllergy] = useState('');
  const [isDateDetected, setIsDateDetected] = useState(false);
  const [resultArr, setResultArr] = useState([]);

  const isFirstLoaded = useRef(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log('Redirecting...');
  };

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx !== null && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, 300, 400);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendImage = () => {
    try {
      if (canvasRef.current) {
        const image = canvasRef.current
          .toDataURL()
          .replace('data:image/png;base64,', '');

        let formData = new FormData();
        formData.append('imageInfo', image);

        fetch('http://211.226.145.31:5000/alergy', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data.result);
            if (data.result !== 'not found' && !isDateDetected) {
              setIsDateDetected(true);
            }
            setResultArr((current) => [...current, data.result]);
          });
      }
    } catch (err) {
      console.log(err);
    }

    //console.log(image);
  };

  useEffect(() => {
    let intervalId = 0;

    const notFound = async () => {
      await textToSpeech('알레르기 유발성분이 감지되지 않았습니다.', 2);
      await textToSpeech('홈 화면으로 이동합니다.', 2);
      navigateTo('/home');
    };

    const init = async () => {
      let cycleCount = 0;
      await textToSpeech('알레르기 유발 성분을 탐색합니다.', 2);
      await textToSpeech(
        '카메라를 식품에 가까이 대고, 표시된 알레르기 유발 성분이 인식될 때까지 식품을 천천히 이동시켜주세요.',
        2
      );
      const id = setInterval(() => {
        if (intervalId === 0) intervalId = id;
        if (cycleCount >= 300) {
          console.log('not found');
          clearInterval(intervalId);
          notFound();
        }
        drawToCanvas();
        sendImage();
        cycleCount += 1;
      }, 350);
    };

    const preventGoBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    init();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  useEffect(() => {
    const dateDetected = async () => {
      if (isDateDetected) {
        console.log('data detected!');
        await textToSpeech('알레르기 유발 성분이 감지되었습니다.', 1);
      }
    };

    dateDetected();
  }, [isDateDetected]);

  useEffect(() => {
    const cycleEnded = async () => {
      const init = () => {
        setIsDateDetected(false);
        setResultArr([]);
      };

      if (resultArr.length >= 15) {
        let { res } = getModeArr(resultArr);
        if (res === '"not found"') {
          console.log('failed.. begin to search');
          init();
          await textToSpeech('탐색중.', 0);
        } else {
          console.log('success!');
          const allergyList = JSON.parse(res);
          console.log(`found result is ${res}`);
          init();
          setAllergy(allergyList);
        }
      }
    };

    cycleEnded();
  }, [resultArr]);

  useEffect(() => {
    if (!isFirstLoaded.current && allergy) {
      console.log('success!');
      console.log(`Allergy Data is ${allergy}`);
      navigateTo('/allergy/result', { allergyList: allergy });
    } else {
      isFirstLoaded.current = false;
    }
  }, [allergy]);

  return (
    <div>
      <Video videoRef={videoRef} />
      <Canvas ref={canvasRef} />
    </div>
  );
}

//get mode value of Array: arr
function getModeArr(arr) {
  let obj = {};
  arr.forEach((resArr) => {
    const resArrString = JSON.stringify(resArr);
    obj[resArrString] = obj[resArrString] ? obj[resArrString] + 1 : 1;
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

export default Allergy;
