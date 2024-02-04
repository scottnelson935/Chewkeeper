function title() {
  //title rect
  fill(80, 90, 100, 80);
  rect(windowWidth / 2, windowHeight / 2, 300, 60);

  //title text
  push();
  textFont("Oswald");
  textSize(38);
  fill(10, 40, 50, 200);
  text("CHEWKEEPER", windowWidth / 2, windowHeight / 2 + 3);
  pop();
}

function instructions() {
  //title rect
  fill(80, 90, 100, 80);
  rect(windowWidth / 2, windowHeight / 2, 300, 120);

  //instructions text
  push();
  textFont("Oswald");
  textSize(24);
  fill(10, 40, 50, 200);
  text(
    "Select the image\nof an animal\nyou'd like to feed",
    windowWidth / 2,
    windowHeight / 2
  );
  pop();
}

function feeding() {
  let tBoxAlpha = 120;
  let tBoxAlphaDir = -1;

  tBoxAlpha += tBoxAlphaDir;
  
  if (tBoxAlpha <= 80) {
    tBoxAlphaDir = 1;
  } else if (tBoxAlpha >= 200) {
    tBoxAlphaDir = -1;
  }

  print(tBoxAlpha);

  //tiger image
  push();
  translate(windowWidth / 2, windowHeight / 2);
  //tiger rect
  fill(80, 90, 100, 80);
  rect(0, 0, 210, 120);
  imageMode(CENTER);
  scale(0.05);
  image(tigerImg, 0, 0);
  pop();
}
