/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

let width = 0;
let height = 0;

let streaming = false;

let video = document.getElementById("v");
closeVideo();
let canvas = document.getElementById("qr-canvas");

// Put variables in global scope to make them available to the browser console.
let constraints = window.constraints = {
  audio: false,
  video: {
    facingMode: {
      exact: "environment"
    }
  }
};

video.addEventListener('canplay', function () {
  width = video.videoWidth;
  height = video.videoHeight;

  // Firefox currently has a bug where the height can't be read from
  // the video, so we will make assumptions if this happens.

  if (isNaN(height)) {
    height = width / (4 / 3);
  }

  video.setAttribute('width', width);
  video.setAttribute('height', height);
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  streaming = true;
}, false);

function read(a) {
  alert(a);
  stopStream()
}

function capture() {
  canvas.width = width;
  canvas.height = height;
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, width, height);
  qrcode.decode(context, width, height);
}

function handleSuccess(stream) {
  let videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);

  window.stream = stream;
  video.srcObject = stream;

  qrcode.callback = read;

  window.captureIntervalId = setInterval(function () {
    capture();
  }, 200);
}

function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
      constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg(error.name);
  } else if (error.name === 'NotFoundError') {
    errorMsg('We were not able to find a Camera :(')
  } else {
    errorMsg(error)
  }
  closeVideo();
  streaming = false;
}

function errorMsg(msg, error) {
  alignStartSnackbar.show(
    {
      message: msg,
      timeout: 2000
    }
  );
  console.error(msg);
}

document.querySelector("#start-button")
  .addEventListener("click", function () {
    startStream()
  });

document.querySelector("#stop-button")
  .addEventListener("click", function () {
    stopStream()
  });

function startStream() {
  if (!streaming) {
    console.log("Starting Stream!");
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
    openVideo();
    streaming = true;
  }
}

function stopStream() {
  if (streaming) {
    console.log("Stopping Stream!");
    clearInterval(captureIntervalId);
    let stream = video.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });
    video.srcObject = null;
    closeVideo();
    streaming = false;
  }
}

function openVideo() {
  video.style.height = 'auto';
}

function closeVideo() {
  video.style.height = '0px';
}
