---
title: Playing with MediaStream API
---

I recently purchased a new headset for use on video conference calls at work.  I wanted to test out the microphone to see how it sounded compared to my internal MacBook microphone.  I started fiddling around with using macOS Voice Memos and it worked but it wasn't long until I was looking on the web for "test microphone" site.  Sadly, the sites I found were full of ads and bloated with things I didn't want.

Since I'm a developer and can't help myself, I set out to build something to my own liking.  It was time to play with the [MediaStream API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API), something I really haven't developed for before.

The way I like to learn something new is to get the big picture first.  Then, dive into the details.  Here in this case, this meant getting a super simple script working that would start recording when the page is opened, stop after 5 seconds, and automatically play it back.  It ended up like this:

```js
// This script starts recording when the page is loaded, stops after 5 seconds
// and then automatically plays back what was recorded.
navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
  let chunks = [];
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function(e) {
    // Store data stream chunks for future playback
    chunks.push(e.data);
  };

  mediaRecorder.onstop = function(e) {
    // Playback recording
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    const audio = document.createElement("audio");
    audio.src = window.URL.createObjectURL(blob);
    document.body.appendChild(audio);
    audio.play();

    // Clear recording
    chunks = [];
  };

  // Start recording!
  mediaRecorder.start();

  // Record for 5 seconds then stop and playback
  setTimeout(()=>{
    mediaRecorder.stop();
  }, 5000);
});
```

If you drop the above code in a `<script>` tag you have a working recorder / playback.  Easy and simple!

For the record, [this MDN article](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API) and corresponding [demo](https://mdn.github.io/web-dictaphone/) were really helpful in understanding how the MediaStream API works.

Once I had that working, I iterated on the details and eventually landed with something I like and find useful: an app where you click 'Record', make some sound, click 'Stop' and then it automatically plays it back.  Simple, right?  Also, it shows a nice little realtime graph of the audio input.

It looks like this:

![Test Microphone Demo](/playing-with-mediastream-api/test-microphone-demo.gif)

You can see the working app here: https://bradymholt.github.io/test-microphone/ and view the source here: https://github.com/bradymholt/test-microphone.
