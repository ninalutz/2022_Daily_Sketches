/* Forked from  Roni Kaufman
 inspired by https://twitter.com/dmitricherniak/status/1214888292421951488?s=09
Fork and modifications by Nina Lutz
*/

let particles = [];
let circles = [];
let squiggliness = 1/500;
let interval;
let margin = 20;
let theEnd = false;
let r = 150;
let noiseFactor = 10;
let baseHue;

function setup() {

  var canvas;
  if(windowWidth>=600 && windowHeight >=600){
    canvas = createCanvas(600, 600);
  }
  else{
    canvas = createCanvas(windowWidth, windowHeight - 100);
  }

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);

  noStroke();
  
  updateParticles();
    background(0)


  interval = setInterval(updateParticles, 5000);
}

function draw() {
  background(0, 20)
  if (theEnd) {
    noLoop();
  } else {
    for (let p of particles) {
      p.draw();
      p.move();
    }
  }
}

function updateParticles() {
  particles = [];
  let xCenter = width/2;
  let yCenter = height/2;
  let n = r*10;
  for (let i = 0; i < n; i++) {
    let theta = map(i, 0, n, -PI, PI);
    let x_ = xCenter + r*cos(theta);
    let y_ = yCenter + r*sin(theta);
    let s_ = 2;
    let sat_ = random(noiseFactor/100, 200);
    let val_ = random(0, noiseFactor*20);
    particles.push(new Particle(x_, y_, s_, sat_, val_));
  }
  r -= 14;
  noiseFactor += 10;
  baseHue += 0;
  if (r < 20) {
    clearInterval(interval);
    theEnd = true;
  }
}

function Particle(x_, y_, s_, sat_, val_) {
  this.x = x_; // x
  this.y = y_; // y
  this.size = s_; // size
  this.sat = sat_; // saturation
  this.val = val_; // value
  
  this.alpha = 100;
  this.dist = 1.2;
  
  this.move = function() {
    let theta = noise(this.x * squiggliness, this.y * squiggliness)*PI*noiseFactor;
    fill(baseHue%20, this.sat, this.val, this.alpha);
    let v = p5.Vector.fromAngle(theta, this.dist);
    this.x += v.x;
    this.y += v.y;
    //this.dist *= 0.999;
    this.alpha *= 0.985;
    this.size *= 0.985;
  }
  
  this.draw = function() {
    //fill(100, this.alpha);
    fill(0, this.alpha)
    strokeWeight(10)
    fill(244, this.alpha)
    ellipse(this.x + random(-2, 100), this.y + random(-20, 20), 70, 60);

    stroke(244, this.alpha)

    strokeWeight(1)
    ellipse(this.x + random(-210, 200), this.y + random(-2, 2), 70, 20);
    stroke(0, this.alpha)
  }
}

function intersectsWithOtherCircles(x_, y_, r_) {
  for (let c of circles) {
    if (dist(c.x, c.y, x_, y_) < c.r + r_ + margin) {
      return true;
    }
  }
  circles.push({x: x_, y: y_, r: r_});
  return false;
}