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

//
let tempData;

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
   

   
    if (!eraserSelected && e.target.tagName.toLowerCase() === "p") {
      // window.localStorage.setItem('modifiedPixels', JSON.stringify())
      e.target.style.backgroundColor = `${brushChoice}`;
      e.target.style.borderColor = `${brushChoice}`;
    
      //set to data obj and append to local storage
      dataObj[e.target.id] = `${e.target.style.backgroundColor}`;
      window.localStorage.setItem(`artwork`, JSON.stringify(dataObj));
    }

  
    if (eraserSelected && e.target.tagName.toLowerCase() === "p"){
       // window.localStorage.setItem('modifiedPixels', JSON.stringify())
       e.target.style.backgroundColor = "";
       e.target.style.borderColor = "";
     
       //TODO:// include eraser in local storage
      //  //set to data obj and append to local storage
       dataObj[e.target.id] = `${e.target.style.backgroundColor}`;
       window.localStorage.setItem('artwork', JSON.stringify(dataObj));
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
        return paintSelected = true;

      } else if (e.target.id === "pencil-option") {
        return pencilSelected = true;

      } else if (e.target.id === "eraser-option") {
        currentColorDisplay.style.backgroundColor = `#FFFFFF`;
        return eraserSelected = true;

      } else if (e.target.id === "clear-option") {
          fillCanvas("");
          // localStorage.clear();
      } else if (e.target.id === "save-option"){

        nameOfArt = prompt("What would you like to name your artwork?");

        if (nameOfArt != null) {

          console.log(`The name of the saved artwork is ${nameOfArt}`);
          //TODO:// check to make sure user dosent overwrite old saved art
          savedDataObj[nameOfArt] = JSON.parse(localStorage.getItem('artwork'));
          // console.log('inside of getselectedmenu',savedDataObj[nameOfArt])
          addSavedArtToList(nameOfArt);
          
        }

      } 
    });
  }
}

//TODO:// add real css reset.. dont reload
// console.log('before if check', resetSelected);


getSelectedMenuOption();

function pixelPaint() {
  pixel.addEventListener("mouseenter", (e) => {
    if (isMouseDown && !eraserSelected || paintSelected && !eraserSelected) {
      e.target.style.backgroundColor = `${brushChoice}`;
      e.target.style.borderColor = `${brushChoice}`;

      //set to data obj and append to local storage
      dataObj[e.target.id] = `${e.target.style.backgroundColor}`;
      window.localStorage.setItem(`artwork`, JSON.stringify(dataObj));

    } else if (isMouseDown && eraserSelected){
      e.target.style.backgroundColor = "";
      e.target.style.borderColor = "";

          //set to data obj and append to local storage
          // dataObj[e.target.id] = `${e.target.style.backgroundColor}`;
          // window.localStorage.setItem("artwork", JSON.stringify(dataObj));
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


//TODO: retrieve from local storage 
    
  // // retrieve from local storage
  //   let priorData = JSON.parse(localStorage.getItem('artwork'));

  //   console.log('users*******', priorData);
  
//TODO: hamburger menu with options [reset, eraser, paint, pencil]


//TODO: start with mario drawing

//TODO: add eraser / paint size via cursor square size?





// name lastsavedlocalstorage
let artwork = JSON.parse(localStorage.getItem('artwork'));

function pixelPersist(artwork) {
    for (const key in artwork) {
      if (artwork[key] !== ""){
        // console.log('key is:', key)
        let oldPixel = document.getElementById(key);
        oldPixel.style.backgroundColor = `${artwork[key]}`;
        oldPixel.style.borderColor = `${artwork[key]}`
      }
  }
}

pixelPersist(artwork);


// create a fillCanvas function that "fills the background"
function fillCanvas(color) {
  let allPixels = document.querySelectorAll(".pixel");

  for (let pixel of allPixels) {
    pixel.style.backgroundColor = `${color}`;
    pixel.style.borderColor = `${color}`;
  }
}


function addSavedArtToList(nameOfArt) {
  let savedList = document.getElementsByTagName('ul')[0];
  let savedItem = document.createElement("li");
  
  savedItem.textContent = `${nameOfArt}.art`;
  // savedItem.onclick = () =>  getArtworkFromSavedData(nameOfArt);
  savedItem.onclick = () =>  getArtworkFromLocalStorage(nameOfArt);
  
  savedList.appendChild(savedItem);
  
  // console.log("savedList", savedList)
  // console.log(nameOfArt, savedDataObj);



  // add this data load to onclick
}


// function getArtworkFromSavedData(art){

//   localStorage.clear();
  
//   console.log('inside of getArtworkFromSavedData, savedDataObj: ', savedDataObj)
//   console.log(`inside of getArtworkFromSavedData, art is: `, art);
//  let selectedArt = savedDataObj[art];
// console.log('savedDataObj[art]', selectedArt)


//   for (const key in selectedArt){
//     console.log('key from for loop', key)
//     let olderPixel = document.getElementById(key);
//     olderPixel.style.backgroundColor = `${selectedArt[key]}`;
//     olderPixel.style.borderColor = `${selectedArt[key]}`
 
//   }

// /*
//     for (const key in artwork) {
//       if (artwork[key] !== ""){
//         // console.log('key is:', key)
//         let oldPixel = document.getElementById(key);
//         oldPixel.style.backgroundColor = `${artwork[key]}`;
//         oldPixel.style.borderColor = `${artwork[key]}`
//       }
//   }
//   */



// }



function getArtworkFromLocalStorage(art){
  
  console.log('inside of getArtworkFromSavedData, localStorage: ', localStorage)
  // console.log(`inside of getArtworkFromSavedData, localStorage.art `, localStorage['artwork']);


//  let selectedArt = savedDataObj[art];
// console.log('savedDataObj[art]', selectedArt)


  // for (const key in selectedArt){
  //   console.log('key from for loop', key)
  //   let olderPixel = document.getElementById(key);
  //   olderPixel.style.backgroundColor = `${selectedArt[key]}`;
  //   olderPixel.style.borderColor = `${selectedArt[key]}`
 
  // }




}


// const localStorage = {artwork}

// console.log(artwork)



