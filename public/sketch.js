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
let rainBuff1;
let rainBuff2;

let tigerBuff;
let giraffeBuff;
let donkeyBuff;
let hippoBuff;
let macawBuff;
let siamangBuff;
let nyalaBuff;
let parrotBuff;
let rhinoBuff;
let tapirBuff;
let chinchillaBuff;

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

let animals = [];

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

let canClick = true;

let fontReady = false;

function preload() {

  WebFont.load({
    google: {
      families: ['Oswald:wght@200..700']
    },
    active: function () {
      // This function is called when the font has been loaded
      // Initialize your sketch or indicate that the font is ready
      fontReady = true; // You can use a global variable to track the font load status
    }
  });

  for (let i = 1; i <= numClouds; i++) {
    clouds.push(loadImage(`images/clouds${i}.jpeg`));
  }

  lpf = new Tone.Filter({
    frequency: 550, // Center frequency of the bandpass filter (in Hz)
    type: "bandpass", // Filter type (in this case, bandpass)
    rolloff: -24, // Roll-off rate of the filter (in dB per octave)
    Q: 1 // Quality factor of the filter (dimensionless)
  }).toDestination();

  rainBuff1 = new Tone.Buffer("sounds/sample_rain.ogg");
  rainBuff2 = new Tone.Buffer("sounds/sample_rain.ogg");

  rain1 = new Tone.Player(rainBuff1, () => {
    rain1.sync().start(0);
  });
  rain1.loop = true;
  rain1.connect(lpf);

  rain2 = new Tone.Player(rainBuff2, () => {
    rain2.sync().start(overlapStartTime);
  });
  rain2.loop = true;
  rain2.connect(lpf);

  rain1.loopEnd = soundDuration;
  rain2.loopEnd = soundDuration;

  tigerBuff = new Tone.Buffer("https://cdn.freesound.org/previews/194/194943_1160789-lq.mp3");
  giraffeBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  donkeyBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  hippoBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  macawBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  siamangBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  nyalaBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  parrotBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  rhinoBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  tapirBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");
  chinchillaBuff = new Tone.Buffer("https://cdn.freesound.org/previews/35/35143_328279-lq.mp3");

  tigerSound = new Tone.Player(
    tigerBuff
  ).toDestination();
  giraffeSound = new Tone.Player(
    giraffeBuff
  ).toDestination();
  donkeySound = new Tone.Player(
    donkeyBuff
  ).toDestination();
  hippoSound = new Tone.Player(
    hippoBuff
  ).toDestination();
  macawSound = new Tone.Player(
    macawBuff
  ).toDestination();
  siamangSound = new Tone.Player(
    siamangBuff
  ).toDestination();
  nyalaSound = new Tone.Player(
    nyalaBuff
  ).toDestination();
  parrotSound = new Tone.Player(
    parrotBuff
  ).toDestination();
  rhinoSound = new Tone.Player(
    rhinoBuff
  ).toDestination();
  tapirSound = new Tone.Player(
    tapirBuff
  ).toDestination();
  chinchillaSound = new Tone.Player(
    chinchillaBuff
  ).toDestination();


  tigerImg = loadImage("images/tigerIcon.png");
  giraffeImg = loadImage("images/giraffeIcon.png");
  donkeyImg = loadImage("images/donkeyIcon.png");
  hippoImg = loadImage("images/hippoIcon.png");
  macawImg = loadImage("images/macawIcon.png");
  siamangImg = loadImage("images/siamangIcon.png");
  nyalaImg = loadImage("images/nyalaIcon.png");
  parrotImg = loadImage("images/parrotIcon.png");
  rhinoImg = loadImage("images/rhinoIcon.png");
  tapirImg = loadImage("images/tapirIcon.png");
  chinchillaImg = loadImage("images/chinchillaIcon.png");

  animals = [
    { name: "tiger", img: tigerImg, sound: tigerSound, buffer: tigerBuff },
    { name: "giraffe", img: giraffeImg, sound: giraffeSound, buffer: giraffeBuff },
    { name: "donkey", img: donkeyImg, sound: donkeySound, buffer: donkeyBuff },
    { name: "hippo", img: hippoImg, sound: hippoSound, buffer: hippoBuff },
    { name: "macaw", img: macawImg, sound: macawSound, buffer: macawBuff },
    { name: "siamang", img: siamangImg, sound: siamangSound, buffer: siamangBuff },
    { name: "nyala", img: nyalaImg, sound: nyalaSound, buffer: nyalaBuff },
    { name: "parrot", img: parrotImg, sound: parrotSound, buffer: parrotBuff },
    { name: "rhino", img: rhinoImg, sound: rhinoSound, buffer: rhinoBuff },
    { name: "tapir", img: tapirImg, sound: tapirSound, buffer: tapirBuff },
    { name: "chinchilla", img: chinchillaImg, sound: chinchillaSound, buffer: chinchillaBuff },
  ];
}

let animalWidth, animalHeight;

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  centerX = canvasWidth / 2;
  centerY = canvasHeight / 2;

  // Clear the animalBoxes array to avoid duplicating boxes if setup is called more than once
  animalBoxes = [];

  

  if (windowWidth < windowHeight) {
    animalWidth = windowWidth * 0.3;
    animalHeight = animalWidth;
  } else if (windowWidth > windowHeight) {
    animalWidth = windowWidth / 7.5; // 6 animals per row
    animalHeight = animalWidth; // Two rows
  }

  // Loop through each animal and position them
  animals.forEach((animal, index) => {
    let x, y;
    if (windowWidth < windowHeight) {
      // Position for two columns of six
      let column = index % 2; // 0 or 1
      let row = Math.floor(index / 2);
      x = column * (windowWidth / 2) + animalWidth / 4 + (windowWidth * 0.17); // Centering adjustment
      y = (row * (windowHeight / 6.5)) + (animalHeight / 6.5) + (windowWidth * 0.17);
    } else {
      // Position for two rows of six
      let row = Math.floor(index / 6); // 0 or 1
      let column = index % 6;
      x = (column * (windowWidth / 6)) + (animalWidth / 6) + (windowWidth * 0.06);
      y = row * (windowHeight / 2) + animalHeight / 4 + (windowWidth * 0.06); // Centering adjustment
    }

    // Create a new animalBox at the calculated position
    let newBox = new animalBox(x, y, animalWidth, animalHeight, animal.img, animal.sound, animal.name, animal.buffer);
    animalBoxes.push(newBox); // Add the new animalBox to the array
  });

  bgBuffer = createGraphics(canvasWidth, canvasHeight);

  drops[0] = new Drop(bgBuffer);
}

function draw() {
  //Only display intro text if font is ready
  if (!fontReady) {
    return;
  }

  bg();

  socket.on("firstEmit", () => {
    if (pieceEnd === false) {
      //send all audio to a gain node first, and then:
      Tone.getDestination().volume.rampTo(-Infinity, 20);
      pieceEnd = true;
    }

  });

  // print('rain1: ' + rain1.state, 'rain2: ' + rain2.state);

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
      // console.log(rainBuff1.duration);
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
    // push();
    // translate(0, 0);
    // textSize(windowWidth * 0.09);
    // fill("white");
    // textAlign(RIGHT, BOTTOM);
    // text("x: " + mouseX, windowWidth, windowHeight - 80);
    // text("y: " + mouseY, windowWidth, windowHeight);
    // pop();
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
            // print(animalBoxes[i].name + "clicked!");
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
    setTimeout(() => {
      Tone.start();
    }, 50);
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
