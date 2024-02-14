function intro() {
  background(0);
  push();
  textFont("Oswald");
  textSize(windowWidth * 0.09);
  fill(10, 40, 50, 200);
  fill("white");
  if (windowWidth < windowHeight) {
    text("Touch to begin", windowWidth / 2, windowHeight / 2.5);
  } else if (windowWidth > windowHeight) {
    text("Touch to begin", windowWidth / 2, windowHeight / 2);
  }
  pop();
}

function title() {
  //title rect
  fill(80, 90, 100, 80);
  if (windowWidth < windowHeight) {
    rect(windowWidth / 2, windowHeight / 2.5 - 5, windowWidth * 0.5, windowWidth * 0.15);
  } else if (windowWidth > windowHeight) {
    rect(windowWidth / 2, windowHeight / 2 - 5, windowWidth * 0.5, windowWidth * 0.15);
  }

  //title text
  push();
  textFont("Oswald");
  textSize(windowWidth * 0.09);
  fill(10, 40, 50, 165);

  if (windowWidth < windowHeight) {
    text("CHEWKEEPER", windowWidth / 2, windowHeight / 2.5);
    push();
    fill(255, 255, 255, 180);
    textSize(windowWidth * 0.04);
    text("TOUCH SCREEN TO CONTINUE", windowWidth / 2, (windowHeight / 9) * 8);
    pop();
  } else if (windowWidth > windowHeight) {
    text("CHEWKEEPER", windowWidth / 2, windowHeight / 2);
    push();
    fill(255, 255, 255, 180);
    textSize(windowWidth * 0.04);
    text("TOUCH SCREEN TO CONTINUE", windowWidth / 2, (windowHeight / 9) * 8);
    pop();
  }
  pop();
}

function instructions() {
  //title rect
  fill(80, 90, 100, 80);
  if (windowWidth < windowHeight) {
    rect(windowWidth / 2, windowHeight / 2.5, 475, 300);
  } else if (windowWidth > windowHeight) {
    rect(windowWidth / 2, windowHeight / 2 - 5, windowWidth * 0.5, windowWidth * 0.27);
  }
  // rect(windowWidth / 2, windowHeight / 2.5, 475, 300);

  //instructions text
  push();
  textFont("Oswald");
  textAlign(CENTER, CENTER);
  textSize(windowWidth * 0.07);
  fill(10, 40, 50, 165);
  if (windowWidth < windowHeight) {
    text(
      "Select the image\nof an animal\nyou'd like to feed",
      windowWidth / 2,
      windowHeight / 2.5
    ); push();
    fill(255, 255, 255, 180);
    textSize(windowWidth * 0.04);
    text("TOUCH SCREEN TO CONTINUE", windowWidth / 2, (windowHeight / 9) * 8);
    pop();
  } else if (windowWidth > windowHeight) {
    text(
      "Select the image\nof an animal\nyou'd like to feed",
      windowWidth / 2,
      windowHeight / 2
    ); push();
    fill(255, 255, 255, 180);
    textSize(windowWidth * 0.04);
    text("TOUCH SCREEN TO CONTINUE", windowWidth / 2, (windowHeight / 9) * 8);
    pop();
  }
  pop();
}

function feeding() {
  tBoxAlpha += tBoxAlphaDir * 0.2;

  if (tBoxAlpha <= 80 || tBoxAlpha >= 200) {
    tBoxAlphaDir *= -1;
  }
  push();
  // imageMode(CENTER);
  for (let i = 0; i < animalBoxes.length; i++) {
    animalBoxes[i].display();
    animalBoxes[i].isInside();
  }
  pop();
}

class animalBox {
  constructor(x, y, width, height, image, sound, name) {
    this.name = name;
    this.x = x; // x-coordinate of the object
    this.y = y; // y-coordinate of the object
    this.width = width; // width of the object
    this.height = height; // height of the object
    this.image = image; // image to display
    this.sound = sound; // sound to play when clicked
    this.clicked = false; // flag to track if the object is clicked
    // this.scale = scale;
  }

  // Function to check if a point (mouse) is inside the object's bounds
  isInside(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width  &&
      mouseY >= this.y  &&
      mouseY <= this.y + this.height
    );
  }

  // Function to display the object
  display() {
    // translate(windowWidth / 2, windowHeight / 2);
    if (this.isInside(mouseX, mouseY)) {
      fill(50, 180, 100, 50);
    } else {
      fill(80, 90, 100, tBoxAlpha);
    }
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }

  // Function to handle click event
  handleClick() {
    if (this.isInside(mouseX, mouseY) && this.clicked === false) {
      // Check if the mouse is inside the object
      this.sound.start(); // Play the associated sound
      this.clicked = true; // Set the clicked flag to true
    }
  }
}