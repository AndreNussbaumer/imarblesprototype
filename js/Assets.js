let sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback) {

  if(assetsStillLoading) {
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    callback();
  }
}

function loadAssets(callback) {
  function loadSprite(fileName) {
    assetsStillLoading++;

    let spriteImage = new Image();
    spriteImage.src = "images/" + fileName;

    spriteImage.onload = function() {
      assetsStillLoading--;
    }
    return spriteImage;
  }
  sprites.background = loadSprite("background.png");
  sprites.power = loadSprite('power.png');
  sprites.marble1 = loadSprite('marble1.png');
  sprites.location = loadSprite('location.png');
  sprites.marble = loadSprite('marblehero.png');
  sprites.marble2 = loadSprite('marble2.png');
  sprites.marble3 = loadSprite('marble3.png');
  sprites.marble4 = loadSprite('marble4.png');
  sprites.marble5 = loadSprite('marble5.png');
  sprites.youwon = loadSprite('youwon.png');
  sprites.youlost = loadSprite('youlost.png');
  sprites.restart = loadSprite('restart.png');
  sprites.power = loadSprite('power.png');

  assetsLoadingLoop(callback);

}

function getMarblesByColor(color){
  switch(color){
    case COLOR.WB:
      return sprites.marble1;
    case COLOR.GRAY:
      return sprites.marble2;
    case COLOR.BLUE:
      return sprites.marble3;
    case COLOR.HERO:
      return sprites.marble;
    case COLOR.GREEN:
      return sprites.marble4;
    case COLOR.YELLOW:
      return sprites.marble5;
  }
}

