from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import vision

import os
import base64
import re
import time


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./key/google_api_key.json"

client = vision.ImageAnnotatorClient()


app = Flask(__name__)
CORS(app)


@app.route("/")
def main():
    return "not here"


@app.route("/utong", methods=['POST'])
def hello():
    try:
        imagestring = request.form['imageInfo']
    except:
        return jsonify({"result": 'imagestring died'})
    try:
        content = base64.b64decode(imagestring)
    except:
        return jsonify({"result": 'base64 died'})
    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    p1 = re.compile(r'\d{4}[.]\d{2}[.]\d{2}')  # 2023-05-01
    p2 = re.compile(r'\d{2}[.]\d{2}[.]\d{2}')  # 23-05-01
    p3 = re.compile(r'\d{2}[.]\d{2}')  # 05-01

    dateType = 0  # 1 || 2 || 3,  0: pending
    time_array = []

    for text in texts:
        chunk = text.description
        # print(chunk)

        try:
            r1 = p1.findall(chunk)
            if len(r1) != 0 and (dateType == 0 or dateType == 1):
                dateType = 1
                for date in r1:
                    print(date)
                    time_array.append(time.strptime(date, "%Y.%m.%d"))

            r2 = p2.findall(chunk)
            if len(r2) != 0 and (dateType == 0 or dateType == 2):
                dateType = 2
                for date in r2:
                    print(date)
                    time_array.append(time.strptime(date, "%y.%m.%d"))

            r3 = p3.findall(chunk)
            if len(r3) != 0 and (dateType == 0 or dateType == 3):
                dateType = 3
                for date in r3:
                    date = "23." + date
                    time_product = time.strptime(date, "%y.%m.%d")
                    time_array.append(time_product)

        except:
            return jsonify({"result": "not found"})

    return return_value(time_array)


@app.route("/pummok", methods=['POST'])
def hi():
    try:
        imagestring = request.form['imageInfo']
    except:
        return jsonify({"result": 'imagestring died'})
    try:
        content = base64.b64decode(imagestring)
    except:
        return jsonify({"result": 'base64 died'})
    image = vision.Image(content= content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    for text in texts:
        chunk = text.description
        # print(chunk)

        p = re.compile(r'\d{8,20}-?\d{0,8}')
        m = p.match(chunk)

        if m:
            return jsonify({"result": m.group()})

    return jsonify({"result": "not found"})


@app.route("/recycle", methods=['POST'])
def recycle():
    recycle_list = ["무색페트", "플라스틱", "비닐류", "캔류", "종이팩", "일반팩", "멸균팩", "종이", "유리"]

    try:
        imagestring = request.form['imageInfo']
    except:
        return jsonify({"result": 'imagestring died'})
    try:
        content = base64.b64decode(imagestring)
    except:
        return jsonify({"result": 'base64 died'})
    image = vision.Image(content= content)

    response = client.text_detection(image=image)
    try:
        texts = response.text_annotations[0].description
    except:
        return jsonify({"result": "not found"})

    for item in recycle_list:
        if re.search(re.escape(item), texts):
            return jsonify({"result": item})

    return jsonify({"result": "not found"})


@app.route("/allergy", methods=['POST'])
def alergy():
    try:
        imagestring = request.form['imageInfo']
    except:
        return jsonify({"result": 'imagestring died'})
    
    try:
        content = base64.b64decode(imagestring)
    except:
        return jsonify({"result":'base64 died'})
    
    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    try:
        texts = response.text_annotations[0].description
    except:
        return jsonify({"result": "not found"})

    alergy_list = ["난류", "달걀", "우유", "메밀", "땅콩", "대두", "밀", "고등어", "게", "새우", "돼지고기", "복숭아", "토마토", "아황산류", "호두", "닭고기", "쇠고기", "오징어", "조개류", "아몬드", "피스타치오", "호박", "깨", "두릅", "셀러리"]
    including_alergy = set()


    for target_match in re.finditer('함유', texts):
        target_index = target_match.start()

        target_distance = 30
        target_start = max(0, target_index - target_distance)
        target_texts = texts[target_start:target_index]

        for item in alergy_list:
            if item in target_texts:
                including_alergy.add(item)

    if not including_alergy:
        return jsonify({"result": "not found"})
    return jsonify({"result": list(including_alergy)})


def return_value(time_array):
    if len(time_array) > 0:
        res_date = max(time_array)
        print("good!")
        res_date_string = time.strftime("%Y-%m-%d", res_date)
        return jsonify({"result": res_date_string})
    else:
        return jsonify({"result": "not found"})


if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)
