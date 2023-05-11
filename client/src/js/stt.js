//final return value
let sttResult = "";
let isSttFinished = false;

async function speechToText(interval = 3000) {
  //audioBase64: plain b64 string
  const b64AudioToString = async (audioBase64) => {
    const url =
      "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0";

    // POST data
    const data = {
      config: {
        encoding: "WEBM_OPUS",
        languageCode: "ko-KR",
        audio_channel_count: 1,
      },
      audio: {
        content: audioBase64,
      },
    };

    // POST request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const results = await response.json();

    //return text
    try {
      return results.results[0].alternatives[0].transcript;
    } catch (err) {
      console.log(err);
    }
  };

  // input stream
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  //input recorder
  const recorder = new MediaRecorder(stream);

  recorder.addEventListener("dataavailable", (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.data);
    reader.onloadend = async () => {
      const base64String = reader.result.replace(
        "data:audio/webm;codecs=opus;base64,",
        ""
      );
      sttResult = await b64AudioToString(base64String);
      isSttFinished = true;
    };
  });

  //start & stop recording
  return new Promise((resolve) => {
    console.log("recording start!");
    recorder.start();
    setTimeout(() => {
      recorder.stop();
      console.log("recording stop!");
      let loop = setInterval(() => {
        if (isSttFinished) {
          clearInterval(loop);
          isSttFinished = false;
          resolve(sttResult);
        }
      }, 100);
    }, interval);
  });
}

export { speechToText };
