// Drops code by Daniel Shiffman
// Modified by Scott Nelson

//store sounds in a buffer in Tone and set the length (using setTimeout)

let socketName = 'default';
let socket = io();

// let timeToEnd1;
// let timeToEnd2;

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
let opossumImg;
let hippoImg;
let macawImg;
let siamangImg;
let nyalaImg;
let bearImg;
let rhinoImg;
let tapirImg;
let chinchillaImg;
let jaguarImg;

let rain1;
let rain2;
let rainBuff1;
let rainBuff2;

let tigerBuff;
let giraffeBuff;
let opossumBuff;
let hippoBuff;
let macawBuff;
let siamangBuff;
let nyalaBuff;
let bearBuff;
let rhinoBuff;
let tapirBuff;
let chinchillaBuff;
let jaguarBuff;

let buffersLoaded = false;
let boxesMade = false;

let tigerSound;
let giraffeSound;
let opossumSound;
let hippoSound;
let macawSound;
let siamangSound;
let nyalaSound;
let bearSound;
let rhinoSound;
let tapirSound;
let chinchillaSound;
let jaguarSound;

let tigerObj;
let giraffeObj;
let opossumObj;
let hippoObj;
let macawObj;
let siamangObj;
let nyalaObj;
let bearObj;
let rhinoObj;
let tapirObj;
let chinchillaObj;
let jaguarObj;

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

let isFeeding = false;
let feedingAnimalName = '';
let feedingProgress = 0;
let feedingDuration = 0; // Duration of the current feeding sound
let feedingStartTime = 0;

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

  rainBuff1 = new Tone.Buffer("sounds/sample_rain.mp3");
  rainBuff2 = new Tone.Buffer("sounds/sample_rain.mp3");

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

  // tigerBuff = new Tone.Buffer("sounds/MalayanTiger1.ogg");
  // giraffeBuff = new Tone.Buffer("sounds/Giraffe.ogg");
  // opossumBuff = new Tone.Buffer("sounds/Opossum.ogg");
  // hippoBuff = new Tone.Buffer("sounds/Hippo1.ogg");
  // macawBuff = new Tone.Buffer("sounds/Macaw.ogg");
  // siamangBuff = new Tone.Buffer("sounds/Siamang.ogg");
  // nyalaBuff = new Tone.Buffer("sounds/Nyala.ogg");
  // bearBuff = new Tone.Buffer("sounds/Bear.ogg");
  // rhinoBuff = new Tone.Buffer("sounds/BlackRhino2.ogg");
  // tapirBuff = new Tone.Buffer("sounds/Tapir.ogg");
  // chinchillaBuff = new Tone.Buffer("sounds/Nutria.ogg");
  // jaguarBuff = new Tone.Buffer("sounds/Jaguar2.ogg");
  // console.log("buffers loaded!");


  // tigerSound = new Tone.Player(
  //   tigerBuff
  // ).toDestination();
  // giraffeSound = new Tone.Player(
  //   giraffeBuff
  // ).toDestination();
  // opossumSound = new Tone.Player(
  //   opossumBuff
  // ).toDestination();
  // hippoSound = new Tone.Player(
  //   hippoBuff
  // ).toDestination();
  // macawSound = new Tone.Player(
  //   macawBuff
  // ).toDestination();
  // siamangSound = new Tone.Player(
  //   siamangBuff
  // ).toDestination();
  // nyalaSound = new Tone.Player(
  //   nyalaBuff
  // ).toDestination();
  // bearSound = new Tone.Player(
  //   bearBuff
  // ).toDestination();
  // rhinoSound = new Tone.Player(
  //   rhinoBuff
  // ).toDestination();
  // tapirSound = new Tone.Player(
  //   tapirBuff
  // ).toDestination();
  // chinchillaSound = new Tone.Player(
  //   chinchillaBuff
  // ).toDestination();
  // jaguarSound = new Tone.Player(
  //   jaguarBuff
  // ).toDestination();

  // tigerImg = loadImage("images/tigerIcon.png");
  // giraffeImg = loadImage("images/giraffeIcon.png");
  // opossumImg = loadImage("images/opossumIcon.png");
  // hippoImg = loadImage("images/hippoIcon.png");
  // macawImg = loadImage("images/macawIcon.png");
  // siamangImg = loadImage("images/siamangIcon.png");
  // nyalaImg = loadImage("images/nyalaIcon.png");
  // bearImg = loadImage("images/bearIcon.png");
  // rhinoImg = loadImage("images/rhinoIcon.png");
  // tapirImg = loadImage("images/tapirIcon.png");
  // chinchillaImg = loadImage("images/chinchillaIcon.png");
  // jaguarImg = loadImage("images/jaguarIcon.png");

  // animals = [
  //   { name: "tiger", img: tigerImg, sound: tigerSound, buffer: tigerBuff },
  //   { name: "giraffe", img: giraffeImg, sound: giraffeSound, buffer: giraffeBuff },
  //   { name: "opossum", img: opossumImg, sound: opossumSound, buffer: opossumBuff },
  //   { name: "hippo", img: hippoImg, sound: hippoSound, buffer: hippoBuff },
  //   { name: "macaw", img: macawImg, sound: macawSound, buffer: macawBuff },
  //   { name: "siamang", img: siamangImg, sound: siamangSound, buffer: siamangBuff },
  //   { name: "nyala", img: nyalaImg, sound: nyalaSound, buffer: nyalaBuff },
  //   { name: "bear", img: bearImg, sound: bearSound, buffer: bearBuff },
  //   { name: "rhino", img: rhinoImg, sound: rhinoSound, buffer: rhinoBuff },
  //   { name: "tapir", img: tapirImg, sound: tapirSound, buffer: tapirBuff },
  //   { name: "nutria", img: chinchillaImg, sound: chinchillaSound, buffer: chinchillaBuff },
  //   { name: "jaguar", img: jaguarImg, sound: jaguarSound, buffer: jaguarBuff },

  // ];
}

let animalWidth, animalHeight;

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('p5cnv');
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

  // // Loop through each animal and position them
  // animals.forEach((animal, index) => {
  //   let x, y;
  //   if (windowWidth < windowHeight) {
  //     // Position for two columns of six
  //     let column = index % 2; // 0 or 1
  //     let row = Math.floor(index / 2);
  //     x = column * (windowWidth / 2) + animalWidth / 4 + (windowWidth * 0.17); // Centering adjustment
  //     y = (row * (windowHeight / 6.5)) + (animalHeight / 6.5) + (windowWidth * 0.17);
  //   } else {
  //     // Position for two rows of six
  //     let row = Math.floor(index / 6); // 0 or 1
  //     let column = index % 6;
  //     x = (column * (windowWidth / 6)) + (animalWidth / 6) + (windowWidth * 0.06);
  //     y = row * (windowHeight / 2) + animalHeight / 4 + (windowWidth * 0.06); // Centering adjustment
  //   }

  //   // Create a new animalBox at the calculated position
  //   let newBox = new animalBox(x, y, animalWidth, animalHeight, animal.img, animal.sound, animal.name, animal.buffer);
  //   animalBoxes.push(newBox); // Add the new animalBox to the array
  // });

  // bgBuffer = createGraphics(canvasWidth, canvasHeight);

  // drops[0] = new Drop(bgBuffer);
}

function draw() {
  //Only display intro text if font is ready
  if (!fontReady) {
    return;
  }

  clear();

  socket.on("firstEmit", () => {
    if (pieceEnd === false) {
      //send all audio to a gain node first, and then:
      Tone.getDestination().volume.rampTo(-Infinity, 20);
      pieceEnd = true;
    }

  });

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


  }

  //instructions state
  if (state === 2) {
    instructions();
  }

  //feeding state
  if (state === 3) {
    feeding();
    drawFeedingOverlay();
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
        if (!audioStarted) {
          setTimeout(() => {
            Tone.start();
          }, 300);
          audioStarted = true;
          print("Tone started!");
        }
        state = (state + 1) % 4; // This will transition state from 0 to 1
        if (!isVideoPlaying()) {
          playVideo(); // Play video only if it's not already playing
        }

        if (!buffersLoaded) {
          toneBuffers();
          buffersLoaded = true;
        }

        if (!boxesMade) {
          makeBoxes();
          boxesMade = true;
        }

      } else if (state !== 3) {
        state = (state + 1) % 4; // Cycle through states 1, 2, and avoid resetting video in state 3
      }

      lastClickTime = currentTime; // Update the last click time

      if (state === 3) {
        // Handling for the feeding state
        for (let i = 0; i < animalBoxes.length; i++) {
          animalBoxes[i].handleClick();
          if (animalBoxes[i].clicked) {
            animalBoxes[i].clicked = false;
            // Logic for when an animal box is clicked
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

function playVideo() {
  // This function is responsible for playing the video when called
  var video = document.getElementById('video1');
  video.play()
    .then(() => {
      // Video playback started successfully
    })
    .catch(error => {
      console.error("Error attempting to play video: ", error);
    });
}

function isVideoPlaying() {
  var video = document.getElementById('video1');
  return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
}

function toneBuffers() {
  tigerBuff = new Tone.Buffer("sounds/MalayanTiger1.mp3");
  giraffeBuff = new Tone.Buffer("sounds/Giraffe.mp3");
  opossumBuff = new Tone.Buffer("sounds/Opossum.mp3");
  hippoBuff = new Tone.Buffer("sounds/Hippo1.mp3");
  macawBuff = new Tone.Buffer("sounds/Macaw.mp3");
  siamangBuff = new Tone.Buffer("sounds/Siamang.mp3");
  nyalaBuff = new Tone.Buffer("sounds/Nyala.mp3");
  bearBuff = new Tone.Buffer("sounds/Bear.mp3");
  rhinoBuff = new Tone.Buffer("sounds/BlackRhino2.mp3");
  tapirBuff = new Tone.Buffer("sounds/Tapir.mp3");
  chinchillaBuff = new Tone.Buffer("sounds/Nutria.mp3");
  jaguarBuff = new Tone.Buffer("sounds/Jaguar2.mp3");
  console.log("buffers loaded!");

  tigerSound = new Tone.Player(
    tigerBuff
  ).toDestination();
  giraffeSound = new Tone.Player(
    giraffeBuff
  ).toDestination();
  opossumSound = new Tone.Player(
    opossumBuff
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
  bearSound = new Tone.Player(
    bearBuff
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
  jaguarSound = new Tone.Player(
    jaguarBuff
  ).toDestination();

  tigerImg = loadImage("images/tigerIcon.png");
  giraffeImg = loadImage("images/giraffeIcon.png");
  opossumImg = loadImage("images/opossumIcon.png");
  hippoImg = loadImage("images/hippoIcon.png");
  macawImg = loadImage("images/macawIcon.png");
  siamangImg = loadImage("images/siamangIcon.png");
  nyalaImg = loadImage("images/nyalaIcon.png");
  bearImg = loadImage("images/bearIcon.png");
  rhinoImg = loadImage("images/rhinoIcon.png");
  tapirImg = loadImage("images/tapirIcon.png");
  chinchillaImg = loadImage("images/chinchillaIcon.png");
  jaguarImg = loadImage("images/jaguarIcon.png");

  animals = [
    { name: "tiger", img: tigerImg, sound: tigerSound, buffer: tigerBuff },
    { name: "giraffe", img: giraffeImg, sound: giraffeSound, buffer: giraffeBuff },
    { name: "opossum", img: opossumImg, sound: opossumSound, buffer: opossumBuff },
    { name: "hippo", img: hippoImg, sound: hippoSound, buffer: hippoBuff },
    { name: "macaw", img: macawImg, sound: macawSound, buffer: macawBuff },
    { name: "siamang", img: siamangImg, sound: siamangSound, buffer: siamangBuff },
    { name: "nyala", img: nyalaImg, sound: nyalaSound, buffer: nyalaBuff },
    { name: "bear", img: bearImg, sound: bearSound, buffer: bearBuff },
    { name: "rhino", img: rhinoImg, sound: rhinoSound, buffer: rhinoBuff },
    { name: "tapir", img: tapirImg, sound: tapirSound, buffer: tapirBuff },
    { name: "nutria", img: chinchillaImg, sound: chinchillaSound, buffer: chinchillaBuff },
    { name: "jaguar", img: jaguarImg, sound: jaguarSound, buffer: jaguarBuff },

  ];
}

function makeBoxes() {
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
}

// document.addEventListener('DOMContentLoaded', () => {
//   const video1 = document.getElementById('video1');
//   const video2 = document.getElementById('video2');
//   let fadingOut = null; // Track which video is currently fading out

//   video1.style.opacity = 1; // Start with video1 fully visible
//   video2.style.opacity = 0; // Ensure video2 starts hidden
//   video1.play();

//   let crossfadeDuration = 10; // Duration of the crossfade in seconds
//   let checkInterval = 500; // How often to check the video time in milliseconds

//   function setupCrossfade() {
//     function fade(fromVideo, toVideo) {
//       if (fadingOut === fromVideo) return; // Prevent double fading
//       fadingOut = fromVideo; // Mark this video as fading out

//       let fadeEffect = setInterval(() => {
//         let step = 1 / (crossfadeDuration * 1000 / checkInterval);
//         let fromOpacity = parseFloat(fromVideo.style.opacity) || 1;
//         let toOpacity = parseFloat(toVideo.style.opacity) || 0;

//         fromVideo.style.opacity = Math.max(0, fromOpacity - step);
//         toVideo.style.opacity = Math.min(1, toOpacity + step);

//         if (fromVideo.style.opacity <= 0) {
//           clearInterval(fadeEffect); // End the interval when fully transparent
//           fadingOut = null; // Reset fading out flag
//         }
//       }, checkInterval);
//     }

//     setInterval(() => {
//       let timeToEnd1 = video1.duration - video1.currentTime;

//       if (timeToEnd1 <= crossfadeDuration && video1.style.opacity == 1 && video2.style.opacity == 0 && !fadingOut) {
//         fade(video1, video2);
//       }

//       if (video2.played.length) {
//         let timeToEnd2 = video2.duration - video2.currentTime;

//         if (timeToEnd2 <= crossfadeDuration && video2.style.opacity == 1 && video1.style.opacity == 0 && !fadingOut) {
//           fade(video2, video1);
//         }
//       }
//     }, checkInterval);
//   }

//   setupCrossfade();
// });