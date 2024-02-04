function intro() {
  background(0);
  textFont("Oswald");
  textSize(windowWidth * 0.09);
  fill(10, 40, 50, 200);
  fill("white");
  if (windowWidth < windowHeight) {
    text("Touch to begin", windowWidth / 2, windowHeight / 2.5);
  } else if (windowWidth > windowHeight) {
    text("Touch to begin", windowWidth / 2, windowHeight / 2);
  }
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
  fill(10, 40, 50, 200);

  if (windowWidth < windowHeight) {
    text("CHEWKEEPER", windowWidth / 2, windowHeight / 2.5);
  } else if (windowWidth > windowHeight) {
    text("CHEWKEEPER", windowWidth / 2, windowHeight / 2);
  }
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
  tBoxAlpha += tBoxAlphaDir * 0.2;

  if (tBoxAlpha <= 80 || tBoxAlpha >= 200) {
    tBoxAlphaDir *= -1;
  }
  push();
  translate(windowWidth / 2, windowHeight / 2);
  imageMode(CENTER);
  for (let i = 0; i < animalBoxes.length; i++) {
    animalBoxes[i].display();
    animalBoxes[i].isInside();
  }
  pop();
}

class animalBox {
  constructor(x, y, width, height, image, sound, scale, name) {
    this.name = name;
    this.x = x; // x-coordinate of the object
    this.y = y; // y-coordinate of the object
    this.width = width; // width of the object
    this.height = height; // height of the object
    this.image = image; // image to display
    this.sound = sound; // sound to play when clicked
    this.clicked = false; // flag to track if the object is clicked
    this.scale = scale;
  }

  // Function to check if a point (mouse) is inside the object's bounds
  isInside(mouseX, mouseY) {
    fill("black");
    text(mouseX + mouseY, windowWidth - 200, windowHeight = 100);
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }

  // Function to display the object
  display() {
    fill(80, 90, 100, tBoxAlpha);
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y, this.width, this.height);
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