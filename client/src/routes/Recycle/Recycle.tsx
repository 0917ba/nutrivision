import { useCallback, useEffect, useRef, useState } from "react";
import { textToSpeech } from "../../lib/tts";
import Video from "../../components/Global/Video";
import Canvas from "../../components/Global/Canvas";
import useNavigateTo from "../../hooks/useNavigateTo";

function Recycle() {
  const [recycle, setRecycle] = useState("");
  const [cycleCnt, setCycleCnt] = useState(0);

  const navigateTo = useNavigateTo();

  const isFirstLoaded = useRef<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current?.getContext("2d");
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
          .replace("data:image/png;base64,", "");
        let formData = new FormData();
        formData.append("imageInfo", image);

        const serverUrl = process.env.REACT_APP_SERVER_URL as string;
        fetch(serverUrl + "/recycle", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result !== "not found") {
              setRecycle(data.result);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let intervalId: null | NodeJS.Timer = null;

    const notFound = async () => {
      await textToSpeech("분리배출 마크가 감지되지 않았습니다.", 2);
      await textToSpeech("홈 화면으로 이동합니다.", 2);
      navigateTo("/home");
    };

    const init = async () => {
      let totalCycleCnt = 0;
      await textToSpeech("분리배출 마크 탐색을 시작합니다.", 2);
      await textToSpeech(
        "카메라를 식품에 가까이 대고, 분리배출 마크가 인식될 때까지 카메라를 천천히 이동시켜주세요.",
        2
      );
      const id = setInterval(() => {
        if (intervalId === null) intervalId = id;
        if (totalCycleCnt >= 300) {
          console.log("not found");
          clearInterval(id);
          notFound();
        }
        setCycleCnt((current) => current + 1);
        totalCycleCnt += 1;
        drawToCanvas();
        sendImage();
      }, 350);
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();
    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  useEffect(() => {
    if (cycleCnt >= 15) {
      textToSpeech("탐색중.", 0);
      setCycleCnt(0);
    }
  }, [cycleCnt]);

  useEffect(() => {
    if (!isFirstLoaded.current && recycle !== "") {
      console.log("success!");
      console.log(`found result is ${recycle}`);
      navigateTo("/recycle/result", { resRecycle: recycle });
    } else {
      isFirstLoaded.current = false;
    }
  }, [recycle]);

  return (
    <div>
      <Video videoRef={videoRef} />
      <Canvas ref={canvasRef} />
    </div>
  );
}

export default Recycle;
