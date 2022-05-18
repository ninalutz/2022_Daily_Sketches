//forked from  kyami 

let moverSystems = [];
let num = 10;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let bg;
let graphics;


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
  noStroke();
}


function draw() {
  let t = frameCount * 0.003;
  randomSeed(3);
  background(0, 40);
  for (let i=0; i < 500; i++) {
    let x = random(width); let y = random(width);
    let r = width/2 - max(abs(x-width/2),abs(y-width/2));

    for (let j=0; j < 12; j++) {
      let sx = width/2+245*tan(-j+t);
      let sy = width/2+245*cos(-j*20+t);
      let s = 50;
          r = min(r, min(abs(sy-s-y),abs(sy+s-y))-20);
    }

    
    r = min(r, abs(width/2-x));
    
    let c = color(255)
    c.setAlpha(8*exp(-r));
    stroke(244, 40)
    noFill();
    strokeWeight(5)
    rect(y,x,r*2,r*2);

    stroke(0)
    strokeWeight(3)
    if(i%2 == 0){
      fill(255, 10)
    ellipse(y,x,r*4, r*4);
  }
  }
}