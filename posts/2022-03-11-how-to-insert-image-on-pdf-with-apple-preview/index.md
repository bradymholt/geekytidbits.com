---
title: How to Paste an Image Into a PDF With Preview on macos
---

The [Preview app](https://support.apple.com/bg-bg/guide/preview/welcome/mac) on macOS is a handy way to edit and annotate PDFs. Unfortunately it is not easy or obvious how to insert an image _into an existing_ PDF page. I recently wanted to do this because I have a PNG image with my signature I wanted to insert into a PDF so I could "sign" it. Preview does have a [Signature](https://www.howtogeek.com/201519/use-your-mac%E2%80%99s-preview-app-to-merge-split-mark-up-and-sign-pdfs/) tool but it does not support using an existing signature image file.

It _is possible_ to paste an image into a PDF page from the clipboard but you must first convert the image to an "object image" first.

### Steps

1. Open the source image file and target PDF using Preview
1. Press the following key sequences:
   - **⌘+A** (select the entire image)
   - **⌘+C** (copy it to the clipboard)
   - **⌘+V** (paste the image on top of the original as an "object image")
1. Click on the object image you just pasted on top of the original image
1. Press **⌘+C** to copy the new object image to the clipboard
1. Click on to target page and press **⌘+V** to paste the image into it

### Demo
<video width="700" controls="controls" autoplay muted loop>
  <source src="paste-image-into-pdf-preview.mp4" type="video/mp4">
</video>


> Source: I learned how to do this from [this How-To Geek article](https://www.howtogeek.com/722971/how-to-add-an-image-to-a-pdf-with-preview-on-mac/).
