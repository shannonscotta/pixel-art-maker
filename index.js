let body = document.querySelector("body");
let canvas = document.querySelector(".canvas");
let NUMBER_OF_PIXELS = 2046;

// we will need to access the pixel outside of the for loop
let pixel;

for (let i = 0; i < NUMBER_OF_PIXELS; i++) {
  pixel = document.createElement("p");
  pixel.classList.add("pixel");
  pixel.id = `pixel-${i}`;
  pixelDraw();
  pixelPaint();
  canvas.appendChild(pixel);
}

let paletteContainer = document.querySelector(".color-palette-container");

//color array for palette
let colors = [
  "#A6443B",
  "#EE6255",
  "#F07C74",
  "#DD9D4D",
  "#F6AF56",
  "#F1C78E",
  "#E5D866",
  "#FFF072",
  "#FFF5A3",
  "#7FBE5C",
  "#A0EE74",
  "#BCF2A7",
  "#3455A9",
  "#4A7AF3",
  "#94ABF6",
  "#554CAA",
  "#7B6DF3",
  "#AEA1F6",
  "#6A4693",
  "#B277F5",
  "#CDA5F8",
  "#000000",
  "#323232",
  "#666666",
  "#999999",
  "#CCCCCC",
  "#FFFFFF",
  "#34231C",
  "#493127",
  "#6A4739",
  "#866B5F",
  "#A48F87",
];

//iterate over colors array and append the hex at index to the container
for (let i = 0; i < colors.length; i++) {
  let colorChoice = document.createElement("div");
  colorChoice.classList.add("color-option");
  colorChoice.style.backgroundColor = `${colors[i]}`;
  paletteContainer.appendChild(colorChoice);
}

//create current color display container and append here
let currentColorDisplayContainer = document.createElement("div");

currentColorDisplayContainer.classList.add("current-color-display-container");
paletteContainer.appendChild(currentColorDisplayContainer);

let currentColorDisplay = document.createElement("div");

currentColorDisplay.classList.add("current-color-display");

let currentColorText = document.createElement("div");
currentColorText.classList.add("current-color-text");
currentColorText.innerHTML = "CURRENT COLOR  &nbsp;>";

let brushChoice;

let isMouseDown = false;
let isMouseUp = true;

monitorClicks();
getPaletteColor();


let dataObj = {};

function pixelDraw() {
  pixel.addEventListener("click", (e) => {
   
    if (e.target.tagName.toLowerCase() === "p") {
      // window.localStorage.setItem('modifiedPixels', JSON.stringify())
      e.target.style.backgroundColor = `${brushChoice}`;
      e.target.style.borderColor = `${brushChoice}`;
    
      //set to data obj 
      dataObj[e.target.id] = `${e.target.style.backgroundColor}`
    
      // set to local storage
      window.localStorage.setItem('artwork', JSON.stringify(dataObj))
    }
  });
}






// maybe delete
let artwork = JSON.parse(localStorage.getItem('artwork'));

if (artwork){
  console.log(artwork)
}

function pixelPaint() {
  pixel.addEventListener("mouseenter", (e) => {
    if (isMouseDown) {
      e.target.style.backgroundColor = `${brushChoice}`;
      e.target.style.borderColor = `${brushChoice}`;
    }
  });
}


function getPaletteColor() {
  paletteContainer.addEventListener("click", function (event) {
    //only color options can be selected.
    if (event.target.className === "color-option") {
      brushChoice = event.target.style.backgroundColor;
    }
    //set color display bar
    currentColorDisplay.style.backgroundColor = `${brushChoice}`;
    // body.style.backgroundColor = `${brushChoice}`
  });
}





function monitorClicks() {
  body.addEventListener("mousedown", function (event) {
    isMouseUp = false;
    isMouseDown = true;


  });


  body.addEventListener("mouseup", function () {
    isMouseUp = true;
    isMouseDown = false;
  });
}








//TODO:// bug work around below, needs a real fix though

//remove first index from creating css style in css...
let allColors = document.getElementsByClassName("color-option");
paletteContainer.removeChild(allColors[0]);

currentColorDisplayContainer.appendChild(currentColorText);
//potential bug, appending the display last... consider cleaning up
currentColorDisplayContainer.appendChild(currentColorDisplay);


if (typeof(Storage) !== "undefined"){
  console.log('This browser has local storage!:', window.localStorage)
} else {
  console.log('This browser has no local storage');
}





/*

    
  // retrieve from local storage
    // let users = JSON.parse(localStorage.getItem('users'));
    // console.log('users*******', users);
    */