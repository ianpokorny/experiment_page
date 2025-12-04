let particles = [];
particles.length = 2000;
let zMax = 10;
let zMin = 0.2;


function setup() 
{
  createCanvas(1000, 600);
  for (let i = 0; i < particles.length; i++)
  {
    particles[i] = new Particle(random(width/16, width - width/16), random(height/4, height - height/4), random(zMin, zMax));
  }
}

function draw() 
{
  background(0, 64);

  particles.sort(function(a, b)
  {
    return a.z - b.z;
  });

  for (let i = 0; i < particles.length; i++)
  {
    particles[i].display();
    //particles[i].mouseMove();
    particles[i].autoMove();
  }
}


class Particle
{
  constructor(_x, _y, _z)
  {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.rateY = 0.5;
    this.rateX = 0.05;
    this.r = 255;
    this.g = 0;
    this.b = 0;
  }

  display()
  {
    noStroke();
    //stroke(0);
    let alpha = map(this.z, 0, zMax, 8, 255);

    if (this.rateY > 0)
    {
      this.r = 255;
      this.b = 220;
    }
    else
    {
      this.r = 220;
      this.b = 255;
    }

    if (this.rateX < 0)
    {
      this.g = 255;
    }
    else
    {
      this.g = 220;
    }

    fill(this.r, this.g, this.b, alpha);
    circle(this.x, this.y, this.z);
    //square(this.x, this.y, this.z);
  }

  mouseMove()
  {
    let xOff = map(mouseX, 0, width, -2, 2);
    let yOff = map(mouseY, 0, height, -2, 2);
    let zScale = map(this.z, zMin, zMax, 0.01, 1);
    this.x += xOff * zScale;
    this.y += yOff * zScale;
  }

  autoMove()
  {
    let zScale = map(this.z, zMin, zMax, 0.01, 1);
    this.y += this.rateY * zScale;
    this.x += this.rateX * zScale;

    if (this.y - this.z/2 < height/8 || this.y + this.z/2 > height - height/8)
    {
      this.rateY = -this.rateY;
    }

    if (this.x - this.z/2 < width/32 || this.x + this.z/2 > width - width/32)
    {
      this.rateX = -this.rateX;
    }
  }
}