// Modified by Scott Nelson

function Drop(buffer) {
  this.buffer = buffer;
  this.x = random(-75, canvasWidth + 75); // Start the drop within canvas width
  this.y = random(-1000, -50);
  this.z = random(0, 2);
  this.len = map(this.z, 0, 2, 10, 20);

  this.xspeed = random(1, 2);
  this.yspeed = map(this.z, 0, 2, 8, 12);

  this.fall = function () {
    this.y = this.y + this.yspeed;
    this.x = this.x + this.xspeed;
    var grav = map(this.z, 0, 2, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    // Reset the drop when it goes off the screen
    if (this.y > canvasHeight || this.x < -75 || this.x > canvasWidth + 75) {
      this.y = random(-200, -100);
      this.x = random(0, canvasWidth + 300);
      this.yspeed = map(this.z, 0, 2, 8, 12);
    }
  };

  this.show = function () {
    var thick = map(this.z, 0, 2, 0.4, 2);
    var alpha = map(this.z, 0, 2, 75, 100);

    // var angle = atan2(this.yspeed, this.xspeed);
    // var x2 = this.x + this.len * cos(angle);
    // var y2 = this.y + this.len * sin(angle);

    this.buffer.strokeWeight(thick);
    this.buffer.stroke(180, 180, 180, alpha);
    this.buffer.line(this.x, this.y, this.x, this.y + 10);
  };
}
