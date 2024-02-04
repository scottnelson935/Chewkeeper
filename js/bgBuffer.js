function bg() {
  bgBuffer.clear();
  bgBuffer.blendMode(ADD);

  cloudAlpha += cloudAlphaDirection * 0.15;
  cloudAlpha2 += cloudAlphaDirection * 0.15 * -1;

  if (cloudAlpha <= 0) {
    cloudAlphaDirection = 1; // Reverse the direction when reaching 0
  } else if (cloudAlpha >= 255) {
    cloudAlphaDirection = -1; // Reverse the direction when reaching 255
  }

  // print(round(cloudAlpha), round(cloudAlpha2));

  let imageWidth = clouds[0].width;
  let imageHeight = clouds[0].height;

  // Calculate the scaling factor for each image based on the longest side of the canvas
  let scaleFactor = max(canvasWidth / imageWidth, canvasHeight / imageHeight);

  // Calculate the scaled image dimensions while maintaining the aspect ratio
  let scaledWidth = imageWidth * scaleFactor;
  let scaledHeight = imageHeight * scaleFactor;

  // Calculate the position to center the image on the canvas
  let x = centerX - scaledWidth / 2;
  let y = centerY - scaledHeight / 2;

  bgBuffer.image(clouds[0], x, y, scaledWidth, scaledHeight);

  bgBuffer.push();
  bgBuffer.tint(140, cloudAlpha);
  bgBuffer.image(clouds[1], x, y, scaledWidth, scaledHeight);
  bgBuffer.pop();

  bgBuffer.push();
  bgBuffer.tint(255, cloudAlpha2);
  bgBuffer.image(clouds[2], x, y, scaledWidth, scaledHeight);
  bgBuffer.pop();

  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show(bgBuffer);

    // Remove the drop if it's below the canvas
    if (drops[i].y > canvasHeight) {
      drops.splice(i, 1);
    }
  }

  // Add new raindrops if needed
  if (random(1) < 0.2) {
    drops.push(new Drop(bgBuffer));
  }

  image(bgBuffer, 0, 0);
}
