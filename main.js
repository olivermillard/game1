/* eslint-disable no-unused-vars */

var mainContainer = document.getElementById("mainContainer");

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

function getRandomIndex(usedIndexs, maxIndex) {
  var result = 0;
  var min = 0;
  var max = maxIndex - 1;
  var index = Math.floor(Math.random() * (max - min + 1) + min);
  while (usedIndexs.indexOf(index) > -1) {
    if (index < max) {
      index++;
    } else {
      index = 0;
    }
  }
  return index;
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}
window.addEventListener("resize", setup);

var numCubesRow;
var numCubesCol;
var numCubes;

function setup() {
  var pageWidth = getWidth();
  var pageHeight = getHeight();

  var gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", "gameContainer");

  var marginWidth = (pageWidth % 20) / 2 + 20;
  var containerWidth = pageWidth - (pageWidth % 20) - 40;
  gameContainer.style.marginLeft = marginWidth + "px";
  gameContainer.style.marginRight = marginWidth + "px";
  gameContainer.style.width = containerWidth + "px";

  var marginHeight = (pageHeight % 20) / 2 + 20;
  var containerHeight = pageHeight - (pageHeight % 20) - 40;
  gameContainer.style.marginTop = marginHeight + "px";
  // gameContainer.style.marginBottom = marginHeight + "px";
  gameContainer.style.height = containerHeight + "px";

  var prevGameContainer = document.getElementById("gameContainer");
  if (prevGameContainer) {
    mainContainer.removeChild(prevGameContainer);
  }
  scoreLabel = document.getElementById("scoreID");
  if (scoreLabel) {
    mainContainer.removeChild(scoreLabel);
  }
  numCubesRow = containerWidth / 20;
  numCubesCol = containerHeight / 20;
  numCubes = numCubesRow * numCubesCol;

  var currRow = 0;
  for (var i = 0; i < numCubes; i++) {
    var x = i % numCubesRow;
    var y;
    if (i % numCubesRow == numCubesRow - 1) {
      y = currRow;
      currRow += 1;
    } else {
      y = currRow;
    }
    var newCube = document.createElement("div");
    newCube.className = "cube";
    newCube.setAttribute("id", x + "-" + y);
    gameContainer.appendChild(newCube);
  }
  gameContainer.style.border = "1px solid darkblue";
  mainContainer.appendChild(gameContainer);
  var makeScoreLabel = document.createElement("label");
  makeScoreLabel.setAttribute("id", "scoreID");
  makeScoreLabel.innerHTML = "Score: 1";
  var scoreMargins = marginHeight / 2;
  makeScoreLabel.style.marginTop = scoreMargins * 0.75 + "px";
  makeScoreLabel.style.marginBottom = marginHeight * 1.25 + "px";
  makeScoreLabel.style.fontWeight = "bold";
  makeScoreLabel.style.fontFamily = "Helvetica";
  mainContainer.appendChild(makeScoreLabel);
  placeCubes("setup");
}

var playerCube;
var playerCubeInit;
var diedLocation;
var playerIndicesX;
var playerIndicesY;
var playerIndices;
var playerLocation;
var score;
var targetID;
var scoreLabel;
var right;
var left;
var up;
var down;
var prevDirection = "";
var paused = false;
var direction = "";

function placeCubes(condition) {
  scoreLabel = document.getElementById("scoreID");
  score = 1;
  if (condition == "reset") {
    var cube = document.getElementsByClassName("cube");
    for (var n = 0; n < cube.length; n++) {
      cube[n].style.backgroundColor = "purple"; //"blue";
    }
  }
  score = 1;
  playerIndicesX = [];
  playerIndicesY = [];
  playerIndices = [];
  playerCubeInit = document.getElementById("1-1");
  playerCubeInit.style.backgroundColor = "yellow";
  playerLocation = [1, 1];
  makeTarget();
}

function makeTarget() {
  var targetX = getRandomIndex(playerIndicesX, numCubesRow);
  var targetY = getRandomIndex(playerIndicesY, numCubesCol);
  targetID = targetX + "-" + targetY;
  document.getElementById(targetID).style.backgroundColor = "red";
}

function clearDirections() {
  clearInterval(right);
  clearInterval(left);
  clearInterval(up);
  clearInterval(down);
}

function movePlayer(direction) {
  playerCubeInit.style.backgroundColor = "purple"; //"blue";
  if (direction == "left") {
    playerLocation[0]--;
    if (playerLocation[0] < 0) {
      died(direction);
      return;
    }
  }
  if (direction == "right") {
    playerLocation[0]++;
    if (playerLocation[0] > numCubesRow - 1) {
      died(direction);
      return;
    }
  }
  if (direction == "up") {
    playerLocation[1]--;
    if (playerLocation[1] < 0) {
      died(direction);
      return;
    }
  }
  if (direction == "down") {
    playerLocation[1]++;
    if (playerLocation[1] > numCubesCol - 1) {
      died(direction);
      return;
    }
  }
  var currLocation = playerLocation[0] + "-" + playerLocation[1];
  if (currLocation == targetID) {
    score += 5;
    scoreLabel.innerHTML = "Score: " + score;
    makeTarget();
  }

  playerIndicesX.push(playerLocation[0]);
  playerIndicesY.push(playerLocation[1]);
  if (playerIndices.includes(currLocation)) {
    died(direction);
    return;
  } else {
    playerIndices.push(currLocation);
  }
  playerCube = document.getElementById(currLocation);
  playerCube.style.backgroundColor = "yellow";
  if (playerIndicesX.length > score) {
    var removePointX = playerIndicesX.shift();
    var removePointY = playerIndicesY.shift();
    playerIndices.shift();
    var removePoint = removePointX + "-" + removePointY;
    document.getElementById(removePoint).style.backgroundColor = "blue";
  }
}

function died(direction) {
  alert("Game Over. Final Score: " + score);
  prevDirection = "";
  playerIndices.pop();
  if (direction == "left") {
    diedLocation = [playerLocation[0] + 1, playerLocation[1]];
    clearInterval(left);
  }
  if (direction == "right") {
    diedLocation = [playerLocation[0] - 1, playerLocation[1]];
    clearInterval(right);
  }
  if (direction == "up") {
    diedLocation = [playerLocation[0], playerLocation[1] + 1];
    clearInterval(up);
  }
  if (direction == "down") {
    diedLocation = [playerLocation[0], playerLocation[1] - 1];
    clearInterval(down);
  }
  direction = "";
  placeCubes("reset");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "a") {
    if (prevDirection != "left" && paused == false) {
      if (prevDirection == "right" && score > 1) {
        return;
      } else {
        leftFunc();
      }
    }
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    if (prevDirection != "right" && paused == false) {
      if (prevDirection == "left" && score > 1) {
        return;
      } else {
        rightFunc();
      }
    }
  }
  if (event.key === "ArrowUp" || event.key === "w") {
    if (prevDirection != "up" && paused == false) {
      if (prevDirection == "down" && score > 1) {
        return;
      } else {
        upFunc();
      }
    }
  }
  if (event.key === "ArrowDown" || event.key === "s") {
    if (prevDirection != "down" && paused == false) {
      if (prevDirection == "up" && score > 1) {
        return;
      } else {
        downFunc();
      }
    }
  }
});

function leftFunc() {
  direction = "left";
  prevDirection = "left";
  clearDirections();
  movePlayer(direction);
  left = setInterval(function() {
    movePlayer(direction);
  }, 75);
}
function rightFunc() {
  direction = "right";
  prevDirection = "right";
  clearDirections();
  movePlayer(direction);
  right = setInterval(function() {
    movePlayer(direction);
  }, 75);
}
function upFunc() {
  direction = "up";
  prevDirection = "up";
  clearDirections();
  movePlayer(direction);
  up = setInterval(function() {
    movePlayer(direction);
  }, 75);
}
function downFunc() {
  direction = "down";
  prevDirection = "down";
  clearDirections();
  movePlayer(direction);
  down = setInterval(function() {
    movePlayer(direction);
  }, 75);
}

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    if (paused == false) {
      clearDirections();
      paused = true;
    } else {
      if (direction == "left") {
        leftFunc();
      }
      if (direction == "right") {
        rightFunc();
      }
      if (direction == "up") {
        upFunc();
      }
      if (direction == "down") {
        downFunc();
      }
      if (direction == "") {
        console.log("no direction");
      }
      paused = false;
    }
  }
});

//playerLocation = "1-1".match(/\d+/g).map(Number);

// var diedLocationID = diedLocation[0] + "-" + diedLocation[1];
// for (var i = 0; i < playerIndices.length; i++) {
//   document.getElementById(playerIndices[i]).style.backgroundColor =
//     "purple"; //"blue";
// }
// document.getElementById(diedLocationID).style.backgroundColor = "purple"; //"blue";
// scoreLabel.innerHTML = "Score: 1";
// document.getElementById(targetID).style.backgroundColor = "purple"; //"blue";
