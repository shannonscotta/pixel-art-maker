let body = document.querySelector("body");
let html = document.querySelector("html");
let canvas = document.querySelector(".canvas");
let NUMBER_OF_PIXELS = 2046;

// add event listener to menu options
let paintSelected = false;
let pencilSelected = false;
let eraserSelected = false;
let clearSelected = false;

// store all saved artwork here
let savedDataObj = {};

// used to save artwork
let nameOfArt;
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

function pixelDraw() {
  pixel.addEventListener("click", (e) => {
    if (!eraserSelected && e.target.tagName.toLowerCase() === "p") {
      e.target.style.backgroundColor = `${brushChoice}`;
      e.target.style.borderColor = `${brushChoice}`;
    }

    if (eraserSelected && e.target.tagName.toLowerCase() === "p") {
      e.target.style.backgroundColor = "";
      e.target.style.borderColor = "";
    }
  });
}

function getSelectedMenuOption() {
  let menuItem = document.querySelectorAll(".menu-item");

  for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("click", (e) => {
      paintSelected = false;
      pencilSelected = false;
      eraserSelected = false;

      if (e.target.id === "paint-option") {
        return (paintSelected = true);
      } else if (e.target.id === "pencil-option") {
        return (pencilSelected = true);
      } else if (e.target.id === "eraser-option") {
        currentColorDisplay.style.backgroundColor = `#FFFFFF`;
        return (eraserSelected = true);
      } else if (e.target.id === "clear-option") {
        fillCanvas("");
      } else if (e.target.id === "save-option") {
        nameOfArt = prompt("What would you like to name your artwork?");

        if (nameOfArt != null) {
          pixelSnapShot(nameOfArt);
          addSavedArtToList(nameOfArt);
        }
      }
    });
  }
}

getSelectedMenuOption();

function pixelPaint() {
  pixel.addEventListener("mouseenter", (e) => {
    if (
      (isMouseDown && !eraserSelected) ||
      (paintSelected && !eraserSelected)
    ) {
      e.target.style.backgroundColor = `${brushChoice}`;
      e.target.style.borderColor = `${brushChoice}`;

      dataObj[e.target.id] = `${e.target.style.backgroundColor}`;
    } else if (isMouseDown && eraserSelected) {
      e.target.style.backgroundColor = "";
      e.target.style.borderColor = "";
    }
  });
}

function getPaletteColor() {
  paletteContainer.addEventListener("click", function (event) {
    if (event.target.className === "color-option") {
      brushChoice = event.target.style.backgroundColor;
    }

    if (!eraserSelected) {
      currentColorDisplay.style.backgroundColor = `${brushChoice}`;
    }
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

function toggleHamburger(x) {
  x.classList.toggle("open");
}

let allColors = document.getElementsByClassName("color-option");
paletteContainer.removeChild(allColors[0]);

currentColorDisplayContainer.appendChild(currentColorText);
currentColorDisplayContainer.appendChild(currentColorDisplay);



// create a fillCanvas function that "fills the background"
function fillCanvas(color) {
  let allPixels = document.querySelectorAll(".pixel");

  for (let pixel of allPixels) {
    pixel.style.backgroundColor = `${color}`;
    pixel.style.borderColor = `${color}`;
  }
}

function pixelSnapShot(nameOfArt) {
  let allPixels = document.getElementsByClassName("pixel");

  let snapshotArr = [];

  for (let i = 0; i < allPixels.length; i++) {
    if (allPixels[i].style.backgroundColor != "") {
      let pixelID = allPixels[i].id;
      let pixelColor = allPixels[i].style.backgroundColor;
      snapshotArr.push(pixelID, pixelColor);
    }
  }
  window.localStorage.setItem(`${nameOfArt}`, JSON.stringify(snapshotArr));
}

function addSavedArtToList(nameOfArt) {
  let savedList = document.getElementsByTagName("ul")[0];
  let savedItem = document.createElement("li");

  savedItem.textContent = `${nameOfArt}`;

  savedList.appendChild(savedItem);
  window.localStorage.setItem(`savedList`, savedList);

  savedItem.onclick = () => startPaintingSelectedArtwork(nameOfArt);
}


function startPaintingSelectedArtwork(nameOfArt) {
  let objToPaint = window.localStorage.getItem(`${nameOfArt}`);
  let arrToPaint = JSON.parse(objToPaint);

  fillCanvas("");

  let allPixels = document.querySelectorAll(".pixel");

  for (let pixel of allPixels) {
    let pixelIdMatch = arrToPaint.indexOf(pixel.id);

    if (pixelIdMatch !== -1) {
      pixel.style.backgroundColor = arrToPaint[pixelIdMatch + 1];
      pixel.style.borderColor = arrToPaint[pixelIdMatch + 1];
    }
  }
}

//TODO:// refactor this, better if check or different loop
function listItemsfromLocalStorage() {
  for (let key in localStorage) {
    // some of the localStorage props are keys..
    if (typeof localStorage[key] === 'string' && key !== 'savedList'){
      addSavedArtToList(key);
    }
  }
}

listItemsfromLocalStorage();
