// Drops code by Daniel Shiffman
// Modified by Scott Nelson

//store sounds in a buffer in Tone and set the length (using setTimeout)

let socketName = 'default';
let socket = io();

// let gainNode

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

let pieceEnd = false;

let drops = [];

let bgBuffer;

let state = 0;
let prevMouseState = false; // Track previous mouse state
let currentMouseState = false; // Track current mouse state
let lastClickTime = 0; // Track the time of the last click
const clickCooldown = 500; // Set a cooldown time in milliseconds

let tigerImg;
let giraffeImg;
let donkeyImg;
let hippoImg;
let macawImg;
let siamangImg;
let nyalaImg;
let parrotImg;
let rhinoImg;
let tapirImg;
let chinchillaImg;


let rain1;
let rain2;

let tigerSound;
let giraffeSound;
let donkeySound;
let hippoSound;
let macawSound;
let siamangSound;
let nyalaSound;
let parrotSound;
let rhinoSound;
let tapirSound;
let chinchillaSound;

let tigerObj;
let giraffeObj;
let donkeyObj;
let hippoObj;
let macawObj;
let siamangObj;
let nyalaObj;
let parrotObj;
let rhinoObj;
let tapirObj;
let chinchillaObj;

let animalBoxes = [];

let audioStarted = false;

let rain1Start = false;
let rain2Start = false;
const soundDuration = 30;
const fadeDuration = 5;
const overlapStartTime = soundDuration - fadeDuration;

let transportStart = false;

let textSizeFactor = 0.09;

let state0 = true;
let state1 = false;
let state2 = false;
let state3 = false;

let lpf;

let rain3;

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

  rain3 = new Tone.Buffer("sounds/sample_rain.ogg");

  rain1 = new Tone.Player(rain3, () => {
    rain1.sync().start(0);
  });
  rain1.loop = true;
  rain1.connect(lpf);

  rain2 = new Tone.Player("sounds/sample_rain.ogg", () => {
    rain2.sync().start(overlapStartTime);
  });
  rain2.loop = true;
  rain2.connect(lpf);

  rain1.loopEnd = soundDuration;
  rain2.loopEnd = soundDuration;

  // const fadeDuration = 5; // Adjust this value based on the length of the fade
  // const overlapTime = player1.buffer.duration - fadeDuration;


  tigerSound = new Tone.Player(
    "https://cdn.freesound.org/previews/194/194943_1160789-lq.mp3"
  ).toDestination();

  giraffeSound = new Tone.Player(
    "https://cdn.freesound.org/previews/35/35143_328279-lq.mp3"
  ).toDestination();


  tigerImg = loadImage("images/tigerIcon.png");
  giraffeImg = loadImage("images/giraffeIcon.png");
  donkeyImg = loadImage("images/donkeyIcon.png");
  hippoImg = loadImage("images/hippoIcon.png");
  macawImg = loadImage("images/macawIcon.png");
  siamangImg = loadImage("images/monkeyIcon.png");
  nyalaImg = loadImage("images/nyalaIcon.png");
  parrotImg = loadImage("images/parrotIcon.png");
  rhinoImg = loadImage("images/rhinoIcon.png");
  tapirImg = loadImage("images/tapirIcon.png");
  chinchillaImg = loadImage("images/chinchillaIcon.png");
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
    // donkeyObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, donkeyImg, donkeySound, "donkey");
    // hippoObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, hippoImg, hippoSound, "hippo");
    // macawObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, macawImg, macawSound, "macaw");
    // siamangObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, siamangImg, siamangSound, "siamang");
    // nyalaObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, nyalaImg, nyalaSound, "nyala");
    // parrotObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, parrotImg, parrotSound, "parrot");
    // rhinoObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, rhinoImg, rhinoSound, "rhino");
    // tapirObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, tapirImg, tapirSound, "tapir");
    // chinchillaObj = new animalBox(centerX + windowWidth * 0.26, centerY, windowWidth * 0.4, windowWidth * 0.4, chinchillaImg, chinchillaSound, "chinchilla");
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

  socket.on("firstEmit", () => {
    if (pieceEnd === false) {
      //send all audio to a gain node first, and then:
      Tone.getDestination().volume.rampTo(-Infinity, 20);
      pieceEnd = true;
    }

  });

  print('rain1: ' + rain1.state, 'rain2: ' + rain2.state);

  // if (rain1.state === "started") {
  //   rain1.on('end', () => {
  //     rain2.start(overlapTime);
  //   });
  // }

  // print(state);
  if (state === 0) {
    intro();
  }

  //title state
  if (state === 1) {
    title();

    if (transportStart === false) {
      Tone.Transport.start();
      console.log(rain3.duration);
      transportStart = true;
    }

    // if (rain1Start === false) {
    //   rain1.start();
    //   rain1Start = true;
    // }
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
