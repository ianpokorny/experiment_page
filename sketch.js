let arm;
let lines = [];
lines.length = 100;
let radius = 250;
let count = 0;
let rate = 0.0002;
let rateMod = 0.0005;
let rateMax = 50;
let rateMin = 0.0001;

function setup() 
{
  createCanvas(600, 600);

  for (let i = 0; i < lines.length; i++)
  {
    let angle = map (i, 0, lines.length, 0, TWO_PI);
    lines[i] = new Line(width/2 + radius * cos(angle), height/2 + radius * sin(angle), width/2, height/2);
    lines[i].opacity = 127;
    lines[i].stroke = 255;
  }

  arm = new Line(width/2 + radius * cos(0), height/2 + radius * sin(0), width/2, height/2);
  arm.strokeWeight = 2;
  arm.stroke = 0;
}

function draw() 
{
  background(64, 1);

  let angle = map(count, 0, 1000, 0, TWO_PI);

  for(let i = 0; i < lines.length; i++)
  {
    if(!keyIsPressed)
    {
      lines[i].display();
    }
    lines[i].rotate(angle);
  }


  arm.x1 = width/2 + radius * cos(angle);
  arm.y1 = height/2 + radius * sin(angle);

  if(!keyIsPressed)
  {
    arm.display();
  }

  count += rate;
  if (count > 1000)
  {
    count =  0;
  }

  rate += rateMod;
  if (rate >= rateMax || rate <= rateMin)
  {
    rateMod = -rateMod;
  }
}

class Line
{
  constructor(_x1, _y1, _x2, _y2)
  {
    this.x1 = _x1;
    this.y1 = _y1;
    this.x2 = _x2;
    this.y2 = _y2;
    this.stroke = 0;
    this.strokeWeight = 1;
    this.opacity = 255;
  }

  display()
  {
    strokeWeight(this.strokeWeight);
    stroke(this.stroke, this.opacity);
    line(this.x1, this.y1, this.x2, this.y2);
  }

  rotate(_angle)
  {
    this.x1 = width/2 + radius * cos(_angle);
    this.y1 = height/2 + radius * sin(_angle);
  }
}