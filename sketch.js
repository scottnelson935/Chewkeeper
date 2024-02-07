// Drops code by Daniel Shiffman
// Modified by Scott Nelson

let clouds = [];
let cloudA = [];
let numClouds = 3;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
let cloudAlpha = 255;
let cloudAlpha2 = 0;
let cloudAlphaDirection = -1;

let tBoxAlpha = 120;
let tBoxAlphaDir = -1;

let drops = [];

let bgBuffer;

let state = 0;
let prevMouseState = false; // Track previous mouse state
let currentMouseState = false; // Track current mouse state
let lastClickTime = 0; // Track the time of the last click
const clickCooldown = 500; // Set a cooldown time in milliseconds

let tigerImg;
let giraffeImg;
let rain;
let tigerSound;
let giraffeSound;

let tigerObj;
let giraffeObj;

let animalBoxes = [];

let audioStarted = false;

let rainStart = false;

let textSizeFactor = 0.09;

let state0 = true;
let state1 = false;
let state2 = false;
let state3 = false;

let lpf;

function preload() {
  for (let i = 1; i <= numClouds; i++) {
    clouds.push(loadImage(`images/clouds${i}.jpeg`));
  }

  lpf = new Tone.Filter({
    frequency: 550, // Center frequency of the bandpass filter (in Hz)
    type: "bandpass", // Filter type (in this case, bandpass)
    rolloff: -24, // Roll-off rate of the filter (in dB per octave)
    Q: 1 // Quality factor of the filter (dimensionless)
  }).toDestination();

  rain = new Tone.Player("sounds/sample_rain.ogg");
  rain.loop = true;
  rain.connect(lpf);


  tigerSound = new Tone.Player(
    "https://cdn.freesound.org/previews/194/194943_1160789-lq.mp3"
  ).toDestination();

  giraffeSound = new Tone.Player(
    "https://cdn.freesound.org/previews/35/35143_328279-lq.mp3"
  ).toDestination();


  tigerImg = loadImage("images/tiger.png");
  giraffeImg = loadImage("images/giraffe.png");
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  centerX = canvasWidth / 2;
  centerY = canvasHeight / 2;

  if (windowWidth < windowHeight) {
    push();
    tigerObj = new animalBox(centerX - windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, tigerImg, tigerSound, "tiger");
    giraffeObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, giraffeImg, giraffeSound, "giraffe");
    pop();
  } else if (windowWidth > windowHeight) {
    push();
    tigerObj = new animalBox(centerX - windowWidth * 0.2, centerY, windowWidth * 0.2, windowWidth * 0.2, tigerImg, tigerSound, "tiger");
    giraffeObj = new animalBox(centerX + windowWidth * 0.2, centerY, windowWidth * 0.2, windowWidth * 0.2, giraffeImg, giraffeSound, "giraffe");
    pop();
  }

  animalBoxes.push(tigerObj);
  animalBoxes.push(giraffeObj);

  bgBuffer = createGraphics(canvasWidth, canvasHeight);

  // for (var i = 0; i < 1800; i++) {
    drops[0] = new Drop(bgBuffer);
  // }
}

function draw() {
  bg();

  // print(state);
  if (state === 0) {
    intro();
  }

  //title state
  if (state === 1) {
    title();
    if (rainStart === false) {
      rain.start();
      rainStart = true;
    }
    // print(rainStart);
  }

  //instructions state
  if (state === 2) {
    instructions();
  }

  //feeding state
  if (state === 3) {
    feeding();
    push();
    translate(0, 0);
    textSize(windowWidth * 0.09);
    fill("white");
    textAlign(RIGHT, BOTTOM);
    text("x: " + mouseX, windowWidth, windowHeight - 80);
    text("y: " + mouseY, windowWidth, windowHeight);
    pop();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    state += 1;
  }
}

function mousePressed() {
  currentMouseState = true; // Update current mouse state

  // Check if the mouse was not pressed in the previous frame
  if (!prevMouseState) {
    const currentTime = millis(); // Get current time

    // Check if the time since the last click is greater than the cooldown period
    if (currentTime - lastClickTime > clickCooldown) {
      if (state === 0) {
        startAudioContext();
      }

      // Add a condition to prevent state increment in the fourth state (state === 3)
      if (state !== 3) {
        state = (state + 1) % 4; // Cycle through states 0, 1, 2, and 3
      }
      lastClickTime = currentTime; // Update the last click time

      if (state === 3) {
        for (let i = 0; i < animalBoxes.length; i++) {
          animalBoxes[i].handleClick();
          if (animalBoxes[i].clicked) {
            animalBoxes[i].clicked = false;
            print(animalBoxes[i].name + "clicked!");
          }
        }
      }
    }
  }

  prevMouseState = currentMouseState; // Update previous mouse state
}


function mouseReleased() {
  currentMouseState = false; // Update current mouse state
  prevMouseState = currentMouseState; // Update previous mouse state
}

function startAudioContext() {
  if (!audioStarted) {
    Tone.start();
    audioStarted = true;
    print("Tone started!");
  }
}

function windowResized() {
  // Update the canvas size when the window is resized
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(canvasWidth, canvasHeight);

  bgBuffer = createGraphics(canvasWidth, canvasHeight);

  drops = [];
  for (var i = 0; i < 1800; i++) {
    drops.push(new Drop(bgBuffer)); // Pass the graphics buffer as an argument
  }
}
