
const DELTA = 1/177;

const LIVES_ORIGIN = new Vector2(900, 50);

winning = false;
losing = false;

function GameWorld() {

  this.firstLevel();

}

GameWorld.prototype.firstLevel = function () {

  this.marbles = CONSTANTS.marblesParams.map(params => new Marble(params[0], params[1]));

  this.marble = this.marbles.find(marble => marble.color === COLOR.WB);
  this.marble1 = this.marbles.find(marble => marble.color === COLOR.GREEN);
  this.marble2 = this.marbles.find(marble => marble.color === COLOR.BLUE);

  this.location = new Location(new Vector2(1100, 360), this.marble.shoot.bind(this.marble));

}


GameWorld.prototype.handleCollisions = function () {

  for(let i = 0 ; i < this.marbles.length ; i++) {


    this.marbles[i].collideWithObstacle(this.obstacle);

    for(let j = i + 1 ; j < this.marbles.length ; j++) {
      const firstMarble = this.marbles[i];
      const secondMarble = this.marbles[j];
      this.marbles[i].marblesCircle();

      firstMarble.collideWithMarble(secondMarble);
    }
  }
}

GameWorld.prototype.update = function () {

  if (this.location.on_screen || winning) {
  return;
  }

  this.handleCollisions();
  this.location.update();

  for(let i = 0 ; i < this.marbles.length ; i++) {
    this.marbles[i].update(DELTA);
  }

  if(!this.marblesMoving() && this.location.shot){

    this.reset();
    this.location.throw();
    this.location.updateRotation();

  }

}

GameWorld.prototype.draw = function (delta) {

  Canvas.drawImage(sprites.background, {x: 0, y:0});

  this.location.draw();

  for(let i = 0 ; i < this.marbles.length ; i++) {
    this.marbles[i].draw();
  }

  if(this.location.shots <= 0 && (this.marble1.inside || this.marble2.inside) && !this.marble.moving){
    this.location.on_screen = true;
    Canvas.drawImage(sprites.youlost, {x: 0, y:0});
    winning = true;
    if (Mouse.left.down){
      this.gameover();
    }

  }

  if(!this.marble1.inside && !this.marble2.inside && !this.marble.moving){
    this.location.on_screen = true;
    Canvas.drawImage(sprites.youwon, {x: 0, y:0});
    winning = true;
    if (Mouse.left.down){
      this.secondLevel();
    }
  }

};

GameWorld.prototype.marblesMoving = function () {

  let marblesMoving = false;

  for(let i = 0 ; i < this.marbles.length ; i++) {
    if(this.marbles[i].moving){
      marblesMoving = true;
      break;
    }
  }
  return marblesMoving;
}

GameWorld.prototype.reset = function () {

  this.marble.position = new Vector2(1084,345);

}

GameWorld.prototype.gameover = function () {

    this.marbles = CONSTANTS.marblesParams.map(params => new Marble(params[0], params[1]));
    this.location.shots = 3;
    this.marble = this.marbles.find(marble => marble.color === COLOR.WB);
    this.marble1 = this.marbles.find(marble => marble.color === COLOR.GREEN);
    this.marble2 = this.marbles.find(marble => marble.color === COLOR.BLUE);
    this.location = new Location(new Vector2(1100, 360), this.marble.shoot.bind(this.marble));
    this.marble.position = new Vector2(1084,345);
    this.marble1.inside = true;
    this.marble2.inside = true;
    setTimeout(() => {
    this.location.on_screen = false;
    winning = false;
    }, 250);

}

GameWorld.prototype.secondLevel = function () {

  this.marbles = CONSTANTS.secondLevel.map(params => new Marble(params[0], params[1]));
  this.location.shots = 3;
  this.location.level = 2;
  this.marble = this.marbles.find(marble => marble.color === COLOR.WB);
  this.marble1 = this.marbles.find(marble => marble.color === COLOR.GRAY);
  this.marble2 = this.marbles.find(marble => marble.color === COLOR.YELLOW);
  this.marble3 = this.marbles.find(marble => marble.color === COLOR.GREEN);
  this.location = new Location(new Vector2(1100, 360), this.marble.shoot.bind(this.marble));
  this.marble.position = new Vector2(1084,345);
  this.marble1.inside = true;
  this.marble2.inside = true;
  this.marble3.inside = true;
  setTimeout(() => {
  this.location.on_screen = false;
  winning = false;
  }, 250);

}
