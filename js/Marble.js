const MARBLE_DIAMETER = 32;
const MARBLE_RADIUS = MARBLE_DIAMETER/2;


function Marble(position, color) {
  this.position = position;
  this.velocity = new Vector2();
  this.origin = CONSTANTS.marbleOrigin.copy();
  this.moving = false;
  this.sprite = getMarblesByColor(color);
  this.color = color;
  this.inside = true;
}

Marble.prototype.update = function(delta) {

  this.position.addTo(this.velocity.mult(delta));

  // Friction
  this.velocity = this.velocity.mult(0.95);

  if(this.velocity.length() < 5) {

    this.velocity = new Vector2();
    this.moving = false;
  }

}

Marble.prototype.draw = function() {
  Canvas.drawImage(this.sprite, this.position, CONSTANTS.marbleOrigin);
}

Marble.prototype.shoot = function(power, rotation){
  this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
  this.moving = true;
}

Marble.prototype.reposition = function(position){

  this.position = new Vector2(1084, 344);

}

Marble.prototype.collideWithMarble = function(marble){

    // find normal vector
    const n = this.position.subtract(marble.position);

    // find distance
    const dist = n.length();
    if(dist > MARBLE_DIAMETER){
      return;
    }

    // find minimum translation distance
    const mtd = n.mult((MARBLE_DIAMETER - dist) / dist);

    // push-pull marbles apart
    this.position = this.position.add(mtd.mult(1/2));
    marble.position = marble.position.subtract(mtd.mult(1/2));

    // find unit normal vector
    const un = n.mult(1/n.length());

    // find unit tangent vector
    const ut = new Vector2(-un.y, un.x);

    // project velocities
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(marble.velocity);
    const v2t = ut.dot(marble.velocity);

    // find new normal velocities
    let v1nTag = v2n;
    let v2nTag = v1n;

    // convert scalar normal and tangent velocities
    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    //update velocities
    this.velocity = v1nTag.add(v1tTag);
    marble.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    marble.moving = true;


}

Marble.prototype.marblesCircle = function(){

  let outsideCircle = CONSTANTS.circle.some(circle => {
    return this.position.distFrom(circle) < CONSTANTS.circleRadius;
  });

  if(!outsideCircle){
    this.inside = false;

  }

}

Marble.prototype.collideWithObstacle = function(obstacle){

  if(!this.moving){
    return;
  }

  let collided = false;
/*
  if(this.position.y <= obstacle.TopY + MARBLE_RADIUS){
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }

  if(this.position.x >= obstacle.RightX - MARBLE_RADIUS){
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }

  if(this.position.y >= obstacle.BottomY - MARBLE_RADIUS){
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }

  if(this.position.x <= obstacle.LeftX + MARBLE_RADIUS){
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }

  if(collided){
  this.velocity = this.velocity.mult(0.98);
  }
*/
}
