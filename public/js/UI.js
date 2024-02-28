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
  let videoStarted = false;
  if (!videoStarted) {
    document.querySelector('.video-container video').style.display = 'block';
  }

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
    rect(windowWidth / 2, windowHeight / 2.5, 500, 375);
  } else if (windowWidth > windowHeight) {
    rect(windowWidth / 2, windowHeight / 2 - 5, windowWidth * 0.5, windowWidth * 0.35);
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
      "On the next screen,\nselect the image\nof an animal\nyou'd like to feed",
      windowWidth / 2,
      windowHeight / 2.5
    ); push();
    fill(255, 255, 255, 180);
    textSize(windowWidth * 0.04);
    text("TOUCH SCREEN TO CONTINUE", windowWidth / 2, (windowHeight / 9) * 8);
    pop();
  } else if (windowWidth > windowHeight) {
    text(
      "On the next screen,\nselect the image\nof an animal\nyou'd like to feed",
      windowWidth / 2,
      windowHeight / 2
    ); push();
    fill(255, 255, 255, 180);
    textSize(windowWidth * 0.04);
    text("TOUCH SCREEN TO CONTINUE", windowWidth / 2, (windowHeight / 9) * 8.5);
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
    if (animalBoxes[i].buffer.loaded) {
      animalBoxes[i].display();
      animalBoxes[i].isInside();
    }

  }
  pop();
}

class animalBox {
  constructor(x, y, width, height, image, sound, name, buffer) {
    this.name = name;
    this.x = x; // x-coordinate of the object
    this.y = y; // y-coordinate of the object
    this.width = width; // width of the object
    this.height = height; // height of the object
    this.image = image; // image to display
    this.sound = sound; // sound to play when clicked
    this.clicked = false; // flag to track if the object is clicked
    this.buffer = buffer;
    // this.scale = scale;
  }

  // Function to check if a point (mouse) is inside the object's bounds
  isInside(mouseX, mouseY) {
    return (
      mouseX >= this.x - animalWidth / 2 &&
      mouseX <= this.x + this.width - animalWidth / 2 &&
      mouseY >= this.y - animalWidth / 2 &&
      mouseY <= this.y + this.height - animalWidth / 2
    );
  }

  // Function to display the object
  display() {
    // translate(windowWidth / 2, windowHeight / 2);
    if (this.sound.state === "started") {
      fill(50, 180, 100, 50);
      // print("green");
      push();
      // fill("black");
      // textSize(windowWidth * 0.03);
      // text(capitalizeFirstLetter(this.name) + " is feeding", this.x, this.y + ((this.height / 3) * 1.2));
      pop();
    } else {
      fill(60, 70, 80, tBoxAlpha);
    }
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height * 0.75);
    image(this.image, this.x, this.y, this.width / 1.5, this.height / 1.5);
    pop();
  }

  // Function to handle click event
  handleClick() {
    if (this.isInside(mouseX, mouseY) && !this.clicked && canClick) {
      // Check if the mouse is inside the object
      this.sound.start(); // Play the associated sound
      console.log(this.name + " buffer duration: " + this.buffer.duration);
      this.clicked = true; // Set the clicked flag to true
      canClick = false; // Prevent all boxes from being clicked

      // console.log(this.name + " clicked!");

      // Set global variables for overlay
      isFeeding = true;
      feedingAnimalName = this.name;
      feedingDuration = this.buffer.duration;
      feedingStartTime = millis();

      setTimeout(() => {
        this.clicked = false; // Reset this box's clicked state
        canClick = true; // Allow all boxes to be clicked again
        isFeeding = false; // Hide overlay once sound ends
      }, this.buffer.duration * 1000); // Convert seconds to milliseconds

    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawFeedingOverlay() {
  if (!isFeeding) return;

  let currentTime = millis();
  feedingProgress = (currentTime - feedingStartTime) / (feedingDuration * 1000);

  push();
  fill(0, 0, 0, 200); // Black background
  rectMode(CORNER);
  rect(0, 0, windowWidth, windowHeight);

  textSize(windowWidth * 0.09);
  fill("white");
  textFont("Oswald");
  textSize(windowWidth * 0.09);
  textAlign(CENTER, CENTER);
  if (windowWidth < windowHeight) {
    text(capitalizeFirstLetter(feedingAnimalName) + " is feeding", windowWidth / 2, windowHeight / 2.5);
  } else if (windowWidth > windowHeight) {
    text(capitalizeFirstLetter(feedingAnimalName) + " is feeding", windowWidth / 2, windowHeight / 2);
  }

  // Draw progress bar
  let progressBarWidth = width * 0.8;
  let progressBarHeight = 20;
  let progress = progressBarWidth * feedingProgress;
  fill(20, 20, 20);
  rect(width * 0.1, height / 2 + 50, progressBarWidth, progressBarHeight)
  noStroke();
  fill(255, 255, 255); // Red progress bar
  rect(width * 0.1, height / 2 + 50, progress, progressBarHeight);
  pop();
}