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

  layer.push();
  layer.translate(width/2, width/2);

  for (let i = 0; i < 20; i++) {
    let theta = random(PI/2);
    let v1 = p5.Vector.fromAngle(theta, r);
    layer.quad(v1.x, v1.y, -v1.x, v1.y, -v1.x, -v1.y, v1.x, -v1.y);
  }
  layer.pop();
  

    layer.strokeWeight(20)


  layer.push();
  layer.translate(width/2, width/2);
  for (let i = 0; i < 600; i++) {
    let theta = random(PI*2);
    let v1 = p5.Vector.fromAngle(theta/2, r*pow(random(), 2));
    layer.point(v1.x, v1.y,1, 1);
  }
  layer.pop();


layer.stroke(0)
  layer.push();
  layer.translate(width/2, width/2);
  for (let i = 0; i < 700; i++) {
    let theta = random(PI*2);
    let v1 = p5.Vector.fromAngle(-theta/4, r*pow(random(), 2));
    layer.point(v1.x, v1.y,1, 1);
  }
  layer.pop();

  layer.stroke(0)
  layer.push();
  layer.translate(width/2, width/2);
  for (let i = 0; i < 700; i++) {
    let theta = random(PI*2);
    let v1 = p5.Vector.fromAngle(theta, r*pow(random(), 2));
    layer.point(v1.x, v1.y,1, 1);
  }
  layer.pop();


}