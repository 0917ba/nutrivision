interface AudioType {
  audioSource: string;
  importantRate: number;
}

const audio = new Audio();
let textQueue: AudioType[] = [];
let TQlength = textQueue.length;

let speakRate = '1.4';

audio.addEventListener('ended', () => {
  if (textQueue.length > 0) {
    textQueue.shift();
    TQlength--;

    if (textQueue.length > 0) {
      audio.src = textQueue[0].audioSource;
      audio.play();
    }
  }
});

async function playAudio(audioSource: string, importantRate = 1) {
  if (textQueue.length === 0) {
    textQueue.push({ audioSource, importantRate });
    TQlength++;
    audio.src = textQueue[0].audioSource;
    audio.play();
  } else {
    textQueue.push({ audioSource, importantRate });
    TQlength++;

    while (
      TQlength >= 2 &&
      textQueue[TQlength - 1].importantRate >
        textQueue[TQlength - 2].importantRate
    ) {
      textQueue[TQlength - 2] = textQueue[TQlength - 1];
      textQueue.pop();
      TQlength--;
    }
    if (TQlength === 1) {
      stopTTS();
      audio.src = textQueue[0].audioSource;
      audio.play();
    }
  }

  return new Promise((resolve) => {
    audio.addEventListener(
      'ended',
      () => {
        console.log('tts end!');
        resolve(null);
      },
      { once: true }
    );
  });
}

async function textToSpeech(text: string, importantRate = 1) {
  const audioSource = await getAudioSource(text, speakRate);
  await playAudio(audioSource, importantRate);
}

async function getAudioSource(text: string, speakRate = '1.4') {
  const speed = Number(speakRate);
  const googleCloudKey = process.env.REACT_APP_GOOGLE_CLOUD_KEY;

  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleCloudKey}`;
  const audioData = {
    input: {
      text: text,
    },
    voice: {
      languageCode: 'ko-KR',
      name: 'ko-KR-Neural2-c',
      ssmlGender: 'MALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: speed,
    },
  };
  const otherparam = {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(audioData),
    method: 'POST',
  };

  let source = '';
  const fetchData = await fetch(url, otherparam);
  const res = await fetchData.json();
  source = `data:audio/mp3;base64,${res.audioContent}`;

  return source;
}

function stopTTS() {
  audio.pause();
  console.log('stop..');
  audio.src = '';
  audio.load();
}

function getDevice() {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('android') > -1) {
    return 'android';
  } else if (
    ua.indexOf('iphone') > -1 ||
    ua.indexOf('ipad') > -1 ||
    ua.indexOf('ipod') > -1
  ) {
    return 'ios';
  } else {
    return 'computer';
  }
}

function getSpeed() {
  let device = getDevice();
  if (device === 'ios') return 1.2;
  else if (device === 'android') return 1.5;
  else return 2;
}

function getSpeakRate() {
  return speakRate;
}

function setSpeakRate(rate: string) {
  speakRate = rate;
}

export {
  getSpeed,
  getDevice,
  textToSpeech,
  stopTTS,
  getSpeakRate,
  setSpeakRate,
  playAudio,
};
