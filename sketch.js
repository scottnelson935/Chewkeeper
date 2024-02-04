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

let drops = [];

let bgBuffer;

let state = 0;

let tigerImg;
let rain;
let tigerSound;

function preload() {
  for (let i = 1; i <= numClouds; i++) {
    clouds.push(loadImage(`images/clouds${i}.jpeg`));
  }

  rain = new Tone.Player("sounds/sample_rain.ogg").toDestination();

  tigerSound = new Tone.Player(
    "https://cdn.freesound.org/previews/194/194943_1160789-lq.mp3"
  ).toDestination();

  tigerImg = loadImage("images/tiger.png");
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  centerX = canvasWidth / 2;
  centerY = canvasHeight / 2;

  if (rain) {
    rain.start();
  }

  bgBuffer = createGraphics(canvasWidth, canvasHeight);

  for (var i = 0; i < 1800; i++) {
    drops[i] = new Drop(bgBuffer);
  }
}

function draw() {
  bg();

  //title state
  if (state === 0) {
    title();
  }

  //instructions state
  if (state === 1) {
    instructions();
  }

  //feeding state
  if (state === 2) {
    feeding();
  }
  // print(state);
}

function keyPressed() {
  if (keyCode === 32) {
    state += 1;
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
