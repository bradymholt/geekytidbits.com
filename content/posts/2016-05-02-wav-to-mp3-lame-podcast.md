---
title: Converting WAV to MP3 for a Podcast
author: Brady
layout: post
permalink: /wav-to-mp3-lame-podcast/
---

I maintain a podcast and frequently have to convert WAV files to MP3 before publishing a new episode. I use the [LAME MP3 Encoder](http://lame.sourceforge.net/) for conversion and and have tried quite a few options to get the size/quality balance just right and have found a set of options that I am quite happy with.

Here is what I use:

```shell
lame -V6 --vbr-new --resample 22 -m m recording.wav
```

This will cause the output to be Mono, encoded using VBR (Variable Bit Rate) encoding, at a 22k sampling frequency. For an hour of audio the resulting MP3 will be about 20MB.
