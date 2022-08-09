let _aryLine = [];

let _minWidth;

function setObject() {
  _minWidth = min(width, height) * 0.8;
  strokeWeight(_minWidth/40);
  stroke(255);
  noFill();
  let numLine = 1;
  for (let i = 0; i < numLine; i++) {
    _aryLine[i] = new BendLine();
  }
}

function setup() {
  w = 600;
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
  background(0);
  setObject();
}



class BendLine {
  constructor() {
    this.r = _minWidth / 3;
    this.numPoints = 10;
    this.aryXy = [];
    for (let i = 0; i < this.numPoints; i++) {
      let ang = 2*PI / this.numPoints * i;
      this.aryXy[i] = createVector(this.r/2 * cos(ang), this.r * sin(ang));
    }
    
    this.numBend = 20;
    this.aryRParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryRParameter[i] = [this.r / 10 * 1**i, random(8*PI), 2*PI / random(50, 200)];//[max, init, speed]
    }
    this.aryinitAngParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryinitAngParameter[i] = [PI, random(10*PI), 2*PI / random(100, 500)];//[max, init, speed]
    }
    this.aryAngStep = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryAngStep[i] = PI / this.numPoints * int(random(2, 4 + i));
    }
    this.numCycle = 2;
  }
  update() {
    this.updateR();
    this.updateInitAng();
    this.newAryXy = this.aryXy;
    for (let i = 0; i < this.numBend; i++) {
      this.newAryXy = bend(this.newAryXy, this.aryR[i], this.aryinitAng[i], this.aryAngStep[i], this.numCycle);
    }
  }
  updateR() {
    this.aryR = [];
    for (let i = 0; i < this.aryRParameter.length; i++) {
      this.aryR[i] = this.aryRParameter[i][0] * (sin(this.aryRParameter[i][1] + this.aryRParameter[i][2] * frameCount));
    }
  }
  updateInitAng() {
    this.aryinitAng = [];
    for (let i = 0; i < this.aryinitAngParameter.length; i++) {
      this.aryinitAng[i] = this.aryinitAngParameter[i][1] + this.aryinitAngParameter[i][0] * (cos(this.aryinitAngParameter[i][2] * frameCount));
    }
  }
  draw() {
    beginShape();
    for (let i = 0; i < this.newAryXy.length-1; i++) {
      noFill();
  strokeWeight(5)
      rect(this.newAryXy[i].x, this.newAryXy[i].y, 100, 100);
      rect(this.newAryXy[i].y, this.newAryXy[i].x, 100, 100);

        strokeWeight(2)

      line(this.newAryXy[i].x, this.newAryXy[i].y, this.newAryXy[i+1].x, this.newAryXy[i+1].y);
    }
    endShape(CLOSE);
  }
}

function bend(aryXy, r, initAng, angStep, numCycle) {
  let aryXy2 = aryXy;
  for (let j = 0; j < numCycle; j++) {
    let aryXyNew = [];
    for (let i = 0; i < aryXy2.length; i++) {
      let xy_1_2 = p5.Vector.sub(aryXy2[(i+1)%aryXy2.length], aryXy2[i]);
      let ang = initAng + angStep * i;
      xy_1_2.rotate(-PI).setMag(r * atan(ang));
      let xy = p5.Vector.add(aryXy2[i], xy_1_2);
      aryXyNew.push(xy);
    }
    aryXy2 = aryXyNew;
  }

  return aryXy2;
}

function draw() {
  background(0, 10);
  fill(50)
  stroke(255, 25)
  translate(width/2, height/2);
  for (let i = 0; i < _aryLine.length; i++) {
    _aryLine[i].update();
    _aryLine[i].draw();
  }
}