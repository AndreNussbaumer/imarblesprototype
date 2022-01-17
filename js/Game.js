function Game() {

}

Game.prototype.init = function () {

  this.gameWorld = new GameWorld();

}

Game.prototype.start = function () {

  MarbleGame.init();
  MarbleGame.mainLoop();

}

Game.prototype.mainLoop = function () {

  Canvas.clear();
  MarbleGame.gameWorld.update();
  MarbleGame.gameWorld.draw();
  Mouse.reset();

  requestAnimationFrame(MarbleGame.mainLoop);

}

let MarbleGame = new Game();
