/*
   Copyright 2011 Lazar Laszlo (lazarsoft@gmail.com, www.lazarsoft.info)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


let qrcode = {};
qrcode.imagedata = null;
qrcode.width = 0;
qrcode.height = 0;
qrcode.qrCodeSymbol = null;
qrcode.debug = false;
qrcode.maxImgSize = 1024 * 1024;

qrcode.sizeOfDataLengthInfo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];

qrcode.callback = null;

qrcode.decode = function (context, width, height) {
  if (width > 0 && height > 0) {
    qrcode.imagedata = context.getImageData(0, 0, width, height);
    qrcode.width = width;
    qrcode.height = height;

    try {
      qrcode.result = qrcode.process();
      if (qrcode.callback) {
        console.log(qrcode.result);
        qrcode.callback(qrcode.result);
      }
    } catch (e) {
      // No QR Code detected yet
      // console.log(e);
    }
  }
};

qrcode.isUrl = function (s) {
  let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
};

qrcode.decode_url = function (s) {
  let escaped = "";
  try {
    escaped = escape(s);
  }
  catch (e) {
    console.log(e);
    escaped = s;
  }
  let ret = "";
  try {
    ret = decodeURIComponent(escaped);
  }
  catch (e) {
    console.log(e);
    ret = escaped;
  }
  return ret;
};

qrcode.decode_utf8 = function (s) {
  if (qrcode.isUrl(s))
    return qrcode.decode_url(s);
  else
    return s;
};

qrcode.process = function () {
  let image = qrcode.grayScaleToBitmap(qrcode.grayscale());
  let detector = new Detector(image);

  let qRCodeMatrix = detector.detect();

  let reader = Decoder.decode(qRCodeMatrix.bits);
  let data = reader.DataByte;
  let str = "";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++)
      str += String.fromCharCode(data[i][j]);
  }

  return qrcode.decode_utf8(str);
};

qrcode.getPixel = function (x, y) {
  if (qrcode.width < x) {
    throw "point error";
  }
  if (qrcode.height < y) {
    throw "point error";
  }
  let point = (x * 4) + (y * qrcode.width * 4);
  return (qrcode.imagedata.data[point] * 33 + qrcode.imagedata.data[point + 1] * 34 + qrcode.imagedata.data[point + 2] * 33) / 100;
};

qrcode.binarize = function (th) {
  let ret = new Array(qrcode.width * qrcode.height);
  for (let y = 0; y < qrcode.height; y++) {
    for (let x = 0; x < qrcode.width; x++) {
      let gray = qrcode.getPixel(x, y);

      ret[x + y * qrcode.width] = gray <= th;
    }
  }
  return ret;
};

qrcode.getMiddleBrightnessPerArea = function (image) {
  let numSqrtArea = 4;
  //obtain middle brightness((min + max) / 2) per area
  let areaWidth = Math.floor(qrcode.width / numSqrtArea);
  let areaHeight = Math.floor(qrcode.height / numSqrtArea);
  let minmax = new Array(numSqrtArea);
  for (let i = 0; i < numSqrtArea; i++) {
    minmax[i] = new Array(numSqrtArea);
    for (let i2 = 0; i2 < numSqrtArea; i2++) {
      minmax[i][i2] = new Array(0, 0);
    }
  }
  for (let ay = 0; ay < numSqrtArea; ay++) {
    for (let ax = 0; ax < numSqrtArea; ax++) {
      minmax[ax][ay][0] = 0xFF;
      for (let dy = 0; dy < areaHeight; dy++) {
        for (let dx = 0; dx < areaWidth; dx++) {
          let target = image[areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width];
          if (target < minmax[ax][ay][0])
            minmax[ax][ay][0] = target;
          if (target > minmax[ax][ay][1])
            minmax[ax][ay][1] = target;
        }
      }
    }
  }
  let middle = new Array(numSqrtArea);
  for (let i3 = 0; i3 < numSqrtArea; i3++) {
    middle[i3] = new Array(numSqrtArea);
  }
  for (let ay = 0; ay < numSqrtArea; ay++) {
    for (let ax = 0; ax < numSqrtArea; ax++) {
      middle[ax][ay] = Math.floor((minmax[ax][ay][0] + minmax[ax][ay][1]) / 2);
    }
  }
  return middle;
};

qrcode.grayScaleToBitmap = function (grayScale) {
  let middle = qrcode.getMiddleBrightnessPerArea(grayScale);
  let sqrtNumArea = middle.length;
  let areaWidth = Math.floor(qrcode.width / sqrtNumArea);
  let areaHeight = Math.floor(qrcode.height / sqrtNumArea);

  let buff = new ArrayBuffer(qrcode.width * qrcode.height);
  let bitmap = new Uint8Array(buff);

  for (let ay = 0; ay < sqrtNumArea; ay++) {
    for (let ax = 0; ax < sqrtNumArea; ax++) {
      for (let dy = 0; dy < areaHeight; dy++) {
        for (let dx = 0; dx < areaWidth; dx++) {
          bitmap[areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width] = (grayScale[areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width] < middle[ax][ay]) ? true : false;
        }
      }
    }
  }
  return bitmap;
};

qrcode.grayscale = function () {
  let buff = new ArrayBuffer(qrcode.width * qrcode.height);
  let ret = new Uint8Array(buff);

  for (let y = 0; y < qrcode.height; y++) {
    for (let x = 0; x < qrcode.width; x++) {
      let gray = qrcode.getPixel(x, y);

      ret[x + y * qrcode.width] = gray;
    }
  }
  return ret;
};


function URShift(number, bits) {
  if (number >= 0)
    return number >> bits;
  else
    return (number >> bits) + (2 << ~bits);
}
