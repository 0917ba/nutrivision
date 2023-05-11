(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{26:function(e,t,n){e.exports={video:"Video_video__1byDN"}},27:function(e,t,n){e.exports={canvas:"Canvas_canvas__3J25t"}},37:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(25),a=n.n(c),o=n(9),s=n(3),u=n(2);var i=function(e){var t=e.text,n=e.onClick;return Object(u.jsx)("button",{onClick:n,children:t})};var l=function(){var e=Object(s.n)(),t=function(t){e(t),console.log("Redirecting...")};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"\uc571 \uc774\ub984"}),Object(u.jsx)(i,{text:"\uc601\uc591\uc131\ubd84",onClick:function(){return t("/nutrients")}}),Object(u.jsx)(i,{text:"\uc720\ud1b5\uae30\ud55c",onClick:function(){return t("/expiration")}}),Object(u.jsx)(i,{text:"\uc74c\uc2dd\uc810",onClick:function(){return t("/restaurant")}}),Object(u.jsx)(i,{text:"\ub3c4\uc6c0\ub9d0",onClick:function(){return t("/help")}})]})},f=n(4),j=n(6),d=n(7),b=n(5);var O=new Audio,p=!1,h=!1;function v(e){return x.apply(this,arguments)}function x(){return x=Object(j.a)(Object(f.a)().mark((function e(t){var n,r,c,a,o,s=arguments;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]&&s[1],"https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0",r={input:{text:t},voice:{languageCode:"ko-KR",name:"ko-KR-Neural2-c",ssmlGender:"MALE"},audioConfig:{audioEncoding:"MP3"}},c={headers:{"content-type":"application/json; charset=UTF-8"},body:JSON.stringify(r),method:"POST"},O.addEventListener("ended",(function(){console.log("audio ended!"),h=!0})),e.prev=5,e.next=8,fetch("https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0",c);case 8:return a=e.sent,e.next=11,a.json();case 11:o=e.sent,console.log(p),p&&O.pause(),O.src="data:audio/mp3;base64,".concat(o.audioContent),p=n,O.play(),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(5),console.log(e.t0);case 22:return e.abrupt("return",new Promise((function(e){var t=setInterval((function(){h&&(clearInterval(t),h=!1,e())}),100)})));case 23:case"end":return e.stop()}}),e,null,[[5,19]])}))),x.apply(this,arguments)}function g(){var e=navigator.userAgent.toLowerCase();return e.indexOf("android")>-1?"android":e.indexOf("iphone")>-1||e.indexOf("ipad")>-1||e.indexOf("ipod")>-1?"ios":"computer"}var m=n(26),w=n.n(m);var R=function(e){var t=e.videoRef;return Object(r.useEffect)((function(){(function(){var e=g();return"android"===e||"ios"===e?navigator.mediaDevices.getUserMedia({video:{width:300,height:400,facingMode:{exact:"environment"}},audio:!1}):navigator.mediaDevices.getUserMedia({video:{width:300,height:400},audio:!1})})().then((function(e){t.current.srcObject=e}))}),[]),Object(u.jsx)("video",{ref:t,className:w.a.video,autoPlay:!0})},N=n(27),y=n.n(N),k=Object(r.forwardRef)((function(e,t){return Object(u.jsx)("canvas",{ref:t,className:y.a.canvas,width:"720",height:"960"})}));var T=function(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(!1),o=Object(b.a)(a,2),i=o[0],l=o[1],O=Object(r.useState)([]),p=Object(b.a)(O,2),h=p[0],x=p[1],g=Object(r.useRef)(!0),m=Object(r.useRef)(!0),w=Object(r.useRef)(null),N=Object(r.useRef)(null),y=Object(s.n)(),T=function(){var e=Object(j.a)(Object(f.a)().mark((function e(t){var n,r,c;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="http://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I1250/json/1/1/PRDLST_REPORT_NO=".concat(t),e.next=3,fetch(n);case 3:return r=e.sent,e.next=6,r.json();case 6:if("0"===(c=e.sent).I1250.total_count){e.next=10;break}return console.log(c),e.abrupt("return",c.I1250.row[0].PRDLST_NM);case 10:return console.log("not found first"),n="http://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I1310/json/1/1/PRDLST_REPORT_NO=".concat(t),e.next=14,fetch(n);case 14:return r=e.sent,e.next=17,r.json();case 17:if("0"===(c=e.sent).I1310.total_count){e.next=21;break}return console.log(c),e.abrupt("return",c.I1310.row[0].PRDLST_NM);case 21:throw new Error("productNumber not found");case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(j.a)(Object(f.a)().mark((function e(t){var n,r,c,a,o,s,u,i,l,j,d,b,O,p,h,v;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.replaceAll(" ","_"),r="https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/1/DESC_KOR=".concat(n),e.next=4,fetch(r);case 4:return c=e.sent,e.next=7,c.json();case 7:if("0"!==(a=e.sent).I2790.total_count){e.next=10;break}throw new Error("\ud488\ubaa9\ubcf4\uace0\ubc88\ud638\uc5d0 \uc77c\uce58\ud558\ub294 \uc81c\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.");case 10:for(v in console.log(a),o=a.I2790.row[0].NUTR_CONT1,s=a.I2790.row[0].NUTR_CONT2,u=a.I2790.row[0].NUTR_CONT3,i=a.I2790.row[0].NUTR_CONT4,l=a.I2790.row[0].NUTR_CONT5,j=a.I2790.row[0].NUTR_CONT6,d=a.I2790.row[0].NUTR_CONT7,b=a.I2790.row[0].NUTR_CONT8,O=a.I2790.row[0].NUTR_CONT9,p={},(h={name:t,calories:o,nutrients:{carbohydrate:s,protein:u,fat:i,sugar:l,sodium:j,cholesterol:d,saturatedFat:b,transFat:O}}).nutrients)""===h.nutrients[v]&&(h.nutrients[v]="0");return p.nuts=h,e.abrupt("return",p);case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){window.speechSynthesis.getVoices(),v("\ud488\ubaa9\ubcf4\uace0\ubc88\ud638 \ud0d0\uc0c9\uc744 \uc2dc\uc791\ud569\ub2c8\ub2e4.",!0);var e=setInterval((function(){m.current&&(function(){try{var e=N.current.getContext("2d");null!==e&&w.current&&e.drawImage(w.current,0,0,300,400)}catch(t){console.log(t)}}(),function(){try{if(N.current){var e=N.current.toDataURL().replace("data:image/png;base64,",""),t=new FormData;t.append("imageInfo",e),fetch("https://0917ba2.pythonanywhere.com/pummok",{method:"POST",body:t}).then((function(e){return e.json()})).then((function(e){"not found"===e.result||i||l(!0),x((function(t){return[].concat(Object(d.a)(t),[e.result])}))}))}}catch(n){console.log(n)}}())}),250);return function(){return clearInterval(e)}}),[]),Object(r.useEffect)((function(){i&&(console.log("number detected!"),v("\ud488\ubaa9\ubcf4\uace0\ubc88\ud638\uac00 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",!1))}),[i]),Object(r.useEffect)((function(){if(h.length>=10){m.current=!1;var e=function(e){var t={};e.forEach((function(e){t[e]=void 0===t[e]?1:t[e]+1}));var n="",r=0;for(var c in t)r<t[c]&&(n=c,r=t[c]);return{res:n,repeatCnt:r}}(h),t=e.res;e.repeatCnt;"not found"===t?(console.log("failed.. begin to search"),v("\ud0d0\uc0c9\uc911.",!0),m.current=!0):(console.log("success!"),console.log("found result is ".concat(t)),c(t)),l(!1),x([])}}),[h]),Object(r.useEffect)((function(){g.current||""===n?g.current=!1:T(n).then((function(e){return _(e)})).then((function(e){console.log(e),c(""),y("/nutrients/result",{state:{resNutrients:e}}),console.log("Redirecting...")})).catch((function(e){console.log(e),console.log("product not found. begin to search."),v("\uc77c\uce58\ud558\ub294 \uc0c1\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \uc7ac\ud0d0\uc0c9\ud569\ub2c8\ub2e4.",!1),m.current=!0}))}),[n]),Object(u.jsxs)("div",{children:[Object(u.jsx)(R,{videoRef:w}),Object(u.jsx)(k,{ref:N})]})};var _=function(){var e=Object(s.l)().state.resNutrients.nuts,t=e.nutrients;return Object(r.useEffect)((function(){v("\ucc3e\uc558\uc2b5\ub2c8\ub2e4.")}),[]),Object(u.jsxs)("div",{children:[Object(u.jsxs)("h1",{children:["\uc0c1\ud488\uba85: ",e.name]}),Object(u.jsxs)("ul",{children:[Object(u.jsxs)("li",{children:["\uce7c\ub85c\ub9ac: ",e.calories,"kcal"]}),Object(u.jsxs)("li",{children:["\ud0c4\uc218\ud654\ubb3c: ",t.carbohydrate,"g"]}),Object(u.jsxs)("li",{children:["\ub2e8\ubc31\uc9c8: ",t.protein,"g"]}),Object(u.jsxs)("li",{children:["\uc9c0\ubc29: ",t.fat,"g"]}),Object(u.jsxs)("li",{children:["\ub2f9\ub958: ",t.sugar,"g"]}),Object(u.jsxs)("li",{children:["\ub098\ud2b8\ub968: ",t.sodium,"mg"]}),Object(u.jsxs)("li",{children:["\ucf5c\ub808\uc2a4\ud14c\ub864: ",t.cholesterol,"mg"]}),Object(u.jsxs)("li",{children:["\ud3ec\ud654\uc9c0\ubc29: ",t.saturatedFat,"g"]}),Object(u.jsxs)("li",{children:["\ud2b8\ub79c\uc2a4\uc9c0\ubc29: ",t.transFat,"g"]})]})]})};var C=function(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(!1),o=Object(b.a)(a,2),i=o[0],l=o[1],f=Object(r.useState)([]),j=Object(b.a)(f,2),O=j[0],p=j[1],h=Object(r.useRef)(!0),x=Object(r.useRef)(!0),g=Object(r.useRef)(null),m=Object(r.useRef)(null),w=Object(s.n)();return Object(r.useEffect)((function(){window.speechSynthesis.getVoices(),v("\uc720\ud1b5\uae30\ud55c \ud0d0\uc0c9\uc744 \uc2dc\uc791\ud569\ub2c8\ub2e4.",!0);var e=setInterval((function(){!function(){try{var e=m.current.getContext("2d");null!==e&&g.current&&e.drawImage(g.current,0,0,300,400)}catch(t){console.log(t)}}(),function(){try{if(m.current){var e=m.current.toDataURL().replace("data:image/png;base64,",""),t=new FormData;t.append("imageInfo",e),fetch("https://0917ba2.pythonanywhere.com/utong",{method:"POST",body:t}).then((function(e){return e.json()})).then((function(e){"not found"===e.result||i||l(!0),p((function(t){return[].concat(Object(d.a)(t),[e.result])}))}))}}catch(n){console.log(n)}}()}),250);return function(){return clearInterval(e)}}),[]),Object(r.useEffect)((function(){i&&(console.log("date detected!"),v("\uc720\ud1b5\uae30\ud55c\uc774 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",!1))}),[i]),Object(r.useEffect)((function(){if(O.length>=10){x.current=!1;var e=function(e){var t={};e.forEach((function(e){t[e]=void 0===t[e]?1:t[e]+1})),console.log(t);var n="",r=0;for(var c in t)r<t[c]&&(n=c,r=t[c]);return{res:n,repeatCnt:r}}(O),t=e.res;e.repeatCnt;"not found"===t?(console.log("failed.. begin to search"),v("\ud0d0\uc0c9\uc911.",!0),x.current=!0):(console.log("success!"),console.log("found result is ".concat(t)),c(t)),l(!1),p([])}}),[O]),Object(r.useEffect)((function(){h.current||""===n?h.current=!1:(console.log("Expiration Date is ".concat(n)),w("/expiration/result",{state:{resDate:n}}),console.log("Redirecting..."))}),[n]),Object(u.jsxs)("div",{children:[Object(u.jsx)(R,{videoRef:g}),Object(u.jsx)(k,{ref:m})]})};var I=function(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],c=t[1],a=Object(s.l)();return Object(r.useEffect)((function(){var e=a.state.resDate;e=(e=e.replace("-","\ub144 ")).replace("-","\uc6d4 "),e+="\uc77c",console.log(e);var t="\uc0c1\ud488\uc758 \uc720\ud1b5\uae30\ud55c\uc740 ".concat(e," \uc785\ub2c8\ub2e4.");c(t),v(t,!1)}),[]),Object(u.jsx)("div",{children:Object(u.jsx)("h1",{children:n})})},S=n(8),E="",D=!1;function U(){return A.apply(this,arguments)}function A(){return A=Object(j.a)(Object(f.a)().mark((function e(){var t,n,r,c,a=arguments;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:3e3,n=function(){var e=Object(j.a)(Object(f.a)().mark((function e(t){var n,r,c;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0",n={config:{encoding:"WEBM_OPUS",languageCode:"ko-KR",audio_channel_count:1},audio:{content:t}},e.next=4,fetch("https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0",{method:"POST",headers:{"content-type":"application/json; charset=UTF-8"},body:JSON.stringify(n)});case 4:return r=e.sent,e.next=7,r.json();case 7:return c=e.sent,e.prev=8,e.abrupt("return",c.results[0].alternatives[0].transcript);case 12:e.prev=12,e.t0=e.catch(8),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[8,12]])})));return function(t){return e.apply(this,arguments)}}(),e.next=4,navigator.mediaDevices.getUserMedia({audio:!0,video:!1});case 4:return r=e.sent,(c=new MediaRecorder(r)).addEventListener("dataavailable",(function(e){var t=new FileReader;t.readAsDataURL(e.data),t.onloadend=Object(j.a)(Object(f.a)().mark((function e(){var r;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.result.replace("data:audio/webm;codecs=opus;base64,",""),e.next=3,n(r);case 3:E=e.sent,D=!0;case 5:case"end":return e.stop()}}),e)})))})),e.abrupt("return",new Promise((function(e){console.log("recording start!"),c.start(),setTimeout((function(){c.stop(),console.log("recording stop!");var t=setInterval((function(){D&&(clearInterval(t),D=!1,e(E))}),100)}),t)})));case 8:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}var F=function(){var e=Object(s.n)(),t="",n="",c=function(e){if(""!==e){var t=e.NUTR_CONT1,n=e.NUTR_CONT2,r=e.NUTR_CONT3,c=e.NUTR_CONT4,a=e.NUTR_CONT5,o=e.NUTR_CONT6,s=e.NUTR_CONT7,u=e.NUTR_CONT8,i=e.NUTR_CONT9,l={},f={name:e.DESC_KOR,maker:e.MAKER_NAME,calories:t,nutrients:{carbohydrate:n,protein:r,fat:c,sugar:a,sodium:o,cholesterol:s,saturatedFat:u,transFat:i}};for(var j in f.nutrients)""===f.nutrients[j]&&(f.nutrients[j]="0");return l.nuts=f,console.log(l),l}},a=function(){var r=Object(j.a)(Object(f.a)().mark((function r(){var a,o,s;return Object(f.a)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=function(){var e=Object(j.a)(Object(f.a)().mark((function e(){var r,c,a;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://openapi.foodsafetykorea.go.kr/api/8afc960ac75f4a4e9426/I2790/json/1/100/DESC_KOR=".concat(n,"&MAKER_NAME=").concat(t),e.next=3,fetch(r);case 3:return c=e.sent,e.next=6,c.json();case 6:if("0"!==(a=e.sent).I2790.total_count){e.next=9;break}throw new Error("\uc77c\uce58\ud558\ub294 \uc81c\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.");case 9:return e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var t=Object(j.a)(Object(f.a)().mark((function t(){var n,r,a,o,u;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=!1,r=null,a=Object(S.a)(s.I2790.row),t.prev=3,a.s();case 5:if((o=a.n()).done){t.next=20;break}return u=o.value,console.log("\ucc3e\uc73c\uc2dc\ub294 \uc81c\ud488\uc774 ".concat(u.DESC_KOR," \uc778\uac00\uc694?")),t.next=10,v("\ucc3e\uc73c\uc2dc\ub294 \uc81c\ud488\uc774 ".concat(u.DESC_KOR," \uc778\uac00\uc694?"));case 10:return t.next=12,U(2500);case 12:if("\ub124"!==t.sent){t.next=18;break}return r=c(u),console.log(r),n=!0,t.abrupt("break",20);case 18:t.next=5;break;case 20:t.next=25;break;case 22:t.prev=22,t.t0=t.catch(3),a.e(t.t0);case 25:return t.prev=25,a.f(),t.finish(25);case 28:if(!n){t.next=32;break}e("/restaurant/result",{state:{resNutrients:r}}),console.log("Redirecting..."),t.next=35;break;case 32:return t.next=34,v("\ucc3e\uc73c\uc2dc\ub294 \uc81c\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4...\u3160\u3160");case 34:console.log("\ucc3e\uc73c\uc2dc\ub294 \uc81c\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4...\u3160\u3160");case 35:case"end":return t.stop()}}),t,null,[[3,22,25,28]])})));return function(){return t.apply(this,arguments)}}(),r.next=4,a();case 4:s=r.sent,o();case 6:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return Object(r.useEffect)((function(){var e=function(){var e=Object(j.a)(Object(f.a)().mark((function e(){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("I'm started!"),e.next=3,v("\ubc29\ubb38\ud558\uc2e0 \ub9e4\uc7a5\uc758 \uc774\ub984\uc744 \ub9d0\uc500\ud574\uc8fc\uc138\uc694.");case 3:return e.next=5,U(3e3);case 5:return t=e.sent,e.next=8,v("\uc8fc\ubb38\ud558\uc2e4 \uba54\ub274\uc758 \uc774\ub984\uc744 \ub9d0\uc500\ud574\uc8fc\uc138\uc694.");case 8:return e.next=10,U(3e3);case 10:n=e.sent,console.log(t,n);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),r=function(){var t=Object(j.a)(Object(f.a)().mark((function t(){return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:console.log("init end!"),a();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();r()}),[]),Object(u.jsx)("div",{})};var P=function(){var e=Object(s.l)().state.resNutrients.nuts,t=e.nutrients;return Object(r.useEffect)((function(){v("\ucc3e\uc558\uc2b5\ub2c8\ub2e4.")}),[]),Object(u.jsxs)("div",{children:[Object(u.jsxs)("h1",{children:["\uc0c1\ud488\uba85: ",e.name]}),Object(u.jsxs)("ul",{children:[Object(u.jsxs)("li",{children:["\uce7c\ub85c\ub9ac: ",e.calories,"kcal"]}),Object(u.jsxs)("li",{children:["\ud0c4\uc218\ud654\ubb3c: ",t.carbohydrate,"g"]}),Object(u.jsxs)("li",{children:["\ub2e8\ubc31\uc9c8: ",t.protein,"g"]}),Object(u.jsxs)("li",{children:["\uc9c0\ubc29: ",t.fat,"g"]}),Object(u.jsxs)("li",{children:["\ub2f9\ub958: ",t.sugar,"g"]}),Object(u.jsxs)("li",{children:["\ub098\ud2b8\ub968: ",t.sodium,"mg"]}),Object(u.jsxs)("li",{children:["\ucf5c\ub808\uc2a4\ud14c\ub864: ",t.cholesterol,"mg"]}),Object(u.jsxs)("li",{children:["\ud3ec\ud654\uc9c0\ubc29: ",t.saturatedFat,"g"]}),Object(u.jsxs)("li",{children:["\ud2b8\ub79c\uc2a4\uc9c0\ubc29: ",t.transFat,"g"]})]})]})};var M=function(){return null};var L=function(){return Object(u.jsx)(o.a,{children:Object(u.jsxs)(s.c,{children:[Object(u.jsx)(s.a,{path:"/nutrients/result",element:Object(u.jsx)(_,{})}),Object(u.jsx)(s.a,{path:"/nutrients",element:Object(u.jsx)(T,{})}),Object(u.jsx)(s.a,{path:"/expiration/result",element:Object(u.jsx)(I,{})}),Object(u.jsx)(s.a,{path:"/expiration",element:Object(u.jsx)(C,{})}),Object(u.jsx)(s.a,{path:"/restaurant",element:Object(u.jsx)(F,{})}),Object(u.jsx)(s.a,{path:"/restaurant/result",element:Object(u.jsx)(P,{})}),Object(u.jsx)(s.a,{path:"/help",element:Object(u.jsx)(M,{})}),Object(u.jsx)(s.a,{path:"".concat("/2023-ISHS-JRH","/"),element:Object(u.jsx)(l,{})})]})})};a.a.createRoot(document.getElementById("root")).render(Object(u.jsx)(L,{}))}},[[37,1,2]]]);
//# sourceMappingURL=main.e1eab46e.chunk.js.map