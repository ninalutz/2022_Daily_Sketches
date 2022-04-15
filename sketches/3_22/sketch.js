/* Forked from  kusakari 
Fork and modifications by Nina Lutz
*/
let _minWidth;

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
  canvas.background(0)

  colorMode(HSB, 360, 100, 100, 255);
  setObject();

}

let _aryLine = [];
function setObject() {
  _minWidth = min(width, height) * 0.5;
  noStroke();
noFill()
  strokeJoin(MITER);
  let numLine = 3;
  for (let i = 0; i < numLine; i++) {
    for (let j = 0; j < numLine; j++) {
      let col = color(random(200), random(200), 100);
      let step = _minWidth / numLine;
      let x = -_minWidth / 2 + step / 2 + step * i;
      let y = -_minWidth / 2 + step / 2 + step * j;
      let centXy = createVector(x, y);
      let r = _minWidth / 2;
      _aryLine[i + j * numLine] = new BendLine(centXy, r, col);
    }
  }
}

class BendLine {
  constructor(centXy, r, col) {
    this.centXy = centXy;
    this.r = r;
    this.col = col;
    this.numPoints = 10;
    this.aryXy = [];
    for (let i = 0; i < this.numPoints; i++) {
      let ang = 2*PI / this.numPoints * i;
      this.aryXy[i] = p5.Vector.add(this.centXy, createVector(this.r * cos(ang), this.r * sin(ang)));
    }
    this.numBend = 3;
    this.aryRParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryRParameter[i] = [this.r / 30 * 0.8**i, random(2*PI), 2*PI / random(100, 500)];//[max, init, speed]
    }
    this.aryinitAngParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryinitAngParameter[i] = [2*PI, random(2*PI), 2*PI / random(200, 1000)];//[max, init, speed]
    }
    this.aryAngStep = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryAngStep[i] = 2*PI / this.numPoints * int(random(3, 8 + i));
    }
    this.numCycle = 12;
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
      this.aryR[i] = this.aryRParameter[i][0] * (cos(this.aryRParameter[i][1] + this.aryRParameter[i][2] * frameCount));
    }
  }
  updateInitAng() {
    this.aryinitAng = [];
    for (let i = 0; i < this.aryinitAngParameter.length; i++) {
      // this.aryinitAng[i] += -0.05*0;
      this.aryinitAng[i] = this.aryinitAngParameter[i][1] + this.aryinitAngParameter[i][0] * (cos(this.aryinitAngParameter[i][2]*3 * frameCount));
    }
  }
  draw() {
    beginShape();
    for (let i = 0; i < this.newAryXy.length; i++) {
      ellipse(this.newAryXy[i].x, this.newAryXy[i].y, 50, 50);
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
      xy_1_2.rotate(PI).setMag(r * sin(ang));
      let xy = p5.Vector.add(aryXy2[i], xy_1_2);
      aryXyNew.push(xy);
    }
    aryXy2 = aryXyNew;
  }

  return aryXy2;
}

function draw() {
  // blendMode(DIFFERENCE);
  // clear();
  background(0, 5);
  translate(width/2, height/2);
  for (let i = 0; i < _aryLine.length; i++) {
    _aryLine[i].update();
    strokeWeight(5)
    // stroke(_aryLine[i].col);
    fill(_aryLine[i].col)
    _aryLine[i].draw();
  }
}