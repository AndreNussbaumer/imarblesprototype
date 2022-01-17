
function Canvas2D() {
  this._canvas = document.getElementById('myCanvas');
  this._canvasContext = this._canvas.getContext('2d');
}

Canvas2D.prototype.clear = function() {
  this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0) {

  if(!position){
    position = new Vector2();
  }

  if(!origin){
    origin = new Vector2();
  }

  this._canvasContext.save();
  this._canvasContext.translate(position.x, position.y);
  this._canvasContext.rotate(rotation);
  this._canvasContext.drawImage(image, -origin.x, -origin.y);
  this._canvasContext.restore();
}


Canvas2D.prototype.drawText = function (text, position, textAlign, fontname, fontsize) {
    position = typeof position !== 'undefined' ? position : 640, 320;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = "green";
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};

let Canvas = new Canvas2D();

