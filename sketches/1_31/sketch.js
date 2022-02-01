/*
Inspired by 
Roni Kaufman

*/

function setup() {
  w = 600;
    var canvas;
    if(windowWidth>=600 && windowHeight >=600){
      canvas = createCanvas(600, 600, WEBGL);
    }
    else{
      canvas = createCanvas(windowWidth, windowHeight - 100, WEBGL);
    }

  background(0);

  blendMode(SCREEN)

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);

  let colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];
  
  let layer1 = createGraphics(width*2, height*2);
  layer1.stroke(colors[0]);
  drawComposition(layer1);
  
  let layer2 = createGraphics(width*2, height*2);
  layer2.stroke(colors[1]);
  drawComposition(layer2);

  let layer3 = createGraphics(width*2, height*2);
  layer3.stroke(colors[2]);
  drawComposition(layer3);

  image(layer3, -width/2 + 1, -height/2);
  image(layer2, -width/2, -height/2);
  image(layer1, -width/2, -height/2);
}

function drawComposition(layer) {
  layer.noFill();

  let r = 300;
  
    layer.strokeWeight(0.5)


  
    for (let i = 0; i < 80; i++) {
    let theta = random(PI);
    let v1 = p5.Vector.fromAngle(theta, r*2);
    layer.quad(v1.x, v1.y, -v1.x, v1.y, -v1.x, -v1.y, v1.x, -v1.y);
  }





}