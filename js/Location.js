
const LOCATION_ORIGIN = new Vector2(32, 32);
const MAX_POWER = 12000;

const bar = document.getElementById("power");

function Location(position, onShoot) {

  this.position = position;
  this.rotation = 0;
  this.origin = LOCATION_ORIGIN.copy();
  this.power = 0;
  this.onShoot = onShoot;
  this.shot = false;
  this.shots = 3;
  this.on_screen = false;
  this.bar = bar;
  this.level = 1;


}

Location.prototype.reset = function() {
  return;
}

Location.prototype.update = function() {

  if(this.shot){
    return;
  }

  if (this.on_screen){
  return;
  }

  this.throw();
  this.updateRotation();

}

Location.prototype.draw = function() {

  if(this.power > 0) {
    Canvas.drawImage(sprites.power, {x: 1035.1, y:294});

  }

  Canvas.drawImage(sprites.location, this.position, LOCATION_ORIGIN, this.rotation);

  if (this.shots === 3) {
    Canvas.drawImage(sprites.marble1, {x: 1110, y:50});
    Canvas.drawImage(sprites.marble1, {x: 1150, y:50});
    Canvas.drawImage(sprites.marble1, {x: 1190, y:50});
  } else if (this.shots  === 2) {
    Canvas.drawImage(sprites.marble1, {x: 1110, y:50});
    Canvas.drawImage(sprites.marble1, {x: 1150, y:50});
  } else if (this.shots === 1) {
    Canvas.drawImage(sprites.marble1, {x: 1110, y:50});
  }


}

Location.prototype.updateRotation = function() {
  let opposite = Mouse.position.y - this.position.y;
  let adjacent = Mouse.position.x - this.position.x;
  this.rotation = Math.atan2(opposite, adjacent);

}

Location.prototype.increasePower = function() {

  if(this.power > MAX_POWER){
    return;
  }
  this.power += 250;

}

Location.prototype.shoot = function() {

  if (this.on_screen) {
  return;
  } else {
  this.onShoot(this.power, this.rotation);
  this.power = 0;
  this.origin = LOCATION_ORIGIN.copy();
  this.shot = true;
  this.shots--;
  this.bar.style.display = "none";
  }
}

Location.prototype.throw = function() {

  if(Mouse.left.down){
    this.increasePower();
    this.bar.value = this.power;
    this.bar.style.display = "block";
  } else if(this.power > 0) {
    this.shoot();
  }

}
