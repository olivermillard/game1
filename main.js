var mainContainer = document.getElementById("mainContainer");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
        document.documentElement.clientHeight);
}
  window.addEventListener('resize', setup);

  function setup(){
    console.log("here");
    var pageWidth = getWidth();
    var pageHeight = getHeight();
    var gameContainer = document.createElement("div");
    gameContainer.setAttribute("gameContainer")
    var marginWidth = (pageWidth%20)/2 + 20;
    var containerWidth = pageWidth - pageWidth%20 - 40;
    gameContainer.style.marginLeft = marginWidth + "px";
    gameContainer.style.marginRight = marginWidth + "px";
    gameContainer.style.width = containerWidth + "px";

    var marginHeight = (pageHeight%20)/2 + 20;
    var containerHeight = pageHeight - pageHeight%20 - 40;
    gameContainer.style.marginTop = marginHeight + "px";
    gameContainer.style.marginBottom = marginHeight + "px";
    gameContainer.style.height = containerHeight + "px";

    var prevGameContainer = document.getElementById("gameContainer");
    gameContainer.style.backgroundColor = "blue";
    mainContainer.appendChild(gameContainer);
}