let y_start
let pins = []

var pins_num = 40;
var complexity = 3;
var maximumHeight = 600;

parameterChanged = (variableName, value) => setup()

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

  strokeWeight(.5)
  y_start = 0
  pins.length = 0
  for (let i = 0; i < pins_num; i++) {
    pins[i] = createVector(random(width), random(height))
  }

}


function draw(){
  fill(0, 50)
  stroke(255, 10)
  strokeWeight(5)
  if (y_start < height) {
    beginShape()
    for (let x = 0; x < width; x++) {
      var angle = pins.reduce((sum, p) => sum + complexity * atan2(p.y - y_start, p.x - x), 0)
      var z = map(cos(angle), -1, 1, 0, maximumHeight)
      vertex(x, y_start + z)
    }
    vertex(width, height)
    vertex(0, height)
    endShape(CLOSE)
    y_start++
  }
}