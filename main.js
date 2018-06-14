function Pendulum() {
  this.pendA = {
    len: 200,
    radius: 20,
    mass: 15,
    angle: 0,
    angularVel: 0,
    angularAcc: 0,
    friction: 1,
  }
  this.pendB = {
    len: 200,
    radius: 20,
    mass: 15,
    angle: 0,
    angularVel: 0,
    angularAcc: 0,
    friction: 1,
  }
  this.reset = function() {
    this.pendA.angle = PI / 2;
    this.pendB.angle = PI / 2;
    this.pendA.angularVel = 0;
    this.pendB.angularVel = 0;
  }
  this.draw = function() {
    this.pendA.angularAcc = ((-gravity * (2 * this.pendA.mass + this.pendB.mass) * sin(this.pendA.angle)) + (-this.pendB.mass * gravity * sin(this.pendA.angle - 2 * this.pendB.angle)) + (-2 * sin(this.pendA.angle - this.pendB.angle) * this.pendB.mass) * (this.pendB.angularVel * this.pendB.angularVel * this.pendB.len + this.pendA.angularVel * this.pendA.angularVel * this.pendA.len * cos(this.pendA.angle - this.pendB.angle))) / (this.pendA.len * (2 * this.pendA.mass + this.pendB.mass - this.pendB.mass * cos(2 * this.pendA.angle - 2 * this.pendB.angle)));
    this.pendB.angularAcc = (2 * sin(this.pendA.angle - this.pendB.angle) * ((this.pendA.angularVel * this.pendA.angularVel * this.pendA.len * (this.pendA.mass + this.pendB.mass)) + gravity * (this.pendA.mass + this.pendB.mass) * cos(this.pendA.angle) + this.pendB.angularVel * this.pendB.angularVel * this.pendB.len * this.pendB.mass * cos(this.pendA.angle - this.pendB.angle))) / (this.pendB.len * (2 * this.pendA.mass + this.pendB.mass - this.pendB.mass * cos(2 * this.pendA.angle - 2 * this.pendB.angle)));
    
    var pendAx = this.pendA.len * sin(this.pendA.angle);
    var pendAy = this.pendA.len * cos(this.pendA.angle);
    var pendBx = pendAx + this.pendB.len * sin(this.pendB.angle);
    var pendBy = pendAy + this.pendB.len * cos(this.pendB.angle);
    
    fill("red");
    stroke("green");
    line(0, 0, pendAx, pendAy);
    stroke("white");
    ellipse(pendAx, pendAy, this.pendA.radius, this.pendA.radius);
    
    fill("blue");
    stroke("yellow");
    line(pendAx, pendAy, pendBx, pendBy);
    stroke("white")
    ellipse(pendBx, pendBy, this.pendB.radius, this.pendB.radius);
  
    this.pendA.angularVel += this.pendA.angularAcc;
    this.pendB.angularVel += this.pendB.angularAcc;
    this.pendA.angle += this.pendA.angularVel;
    this.pendB.angle += this.pendB.angularVel;
  
    this.pendA.angularVel *= this.pendA.friction;
    this.pendB.angularVel *= this.pendB.friction;
  }
}

num = 5
pendulums = []

for (i = 0; i < num; i++) {
  pendulums.push(new Pendulum())
}

var gravity = 1;

var startingX, startingY;

function keyPressed() {
  if (keyCode == 32) {
    dip();
  } else if (keyCode == 82) {
    background(0)
    for (i = 0; i < num; i++) {
      pendulums[i].reset();
    }
  } else if (keyCode == 65) {
    add();
  }
}

function dip() {
  for (i = 0; i < num; i++) {
    pendulums[i].pendA.angularVel += random(-0.03, 0.03)
    pendulums[i].pendB.angularVel += random(-0.03, 0.03)
  }
}

function add() {
  pendulums.push(new Pendulum());
  pendulums[pendulums.length-1].reset();
  num++;
}

function setup() {
  createCanvas(1000, 500);
  startingX = width / 2;
  startingY = 50;
  background(0)
  for (i = 0; i < num; i++) {
    pendulums[i].reset();
  }
}

function draw() {
  // background(0);
  background(0, 0, 0, 30);

  translate(startingX, startingY);
  strokeWeight(2);
  
  for (i = 0; i < num; i++) {
    pendulums[i].draw();
  }
}


$( document ).ready(function() {
  $("#lengthA").change(function() {
    $(".length").text("Length: "+$("#lengthA").val()+", "+$("#lengthB").val());
    for (i = 0; i < num; i++) {
      pendulums[i].pendA.len = Number($("#lengthA").val());
    }
  });
  $("#lengthB").change(function() {
    $(".length").text("Length: "+$("#lengthA").val()+", "+$("#lengthB").val());
    for (i = 0; i < num; i++) {
      pendulums[i].pendB.len = Number($("#lengthB").val());
    }
  });
  $("#massA").change(function() {
    $(".mass").text("Mass: "+$("#massA").val()+", "+$("#massB").val());
    for (i = 0; i < num; i++) {
      pendulums[i].pendA.mass = Number($("#massA").val());
    }
  });
  $("#massB").change(function() {
    $(".mass").text("Mass: "+$("#massA").val()+", "+$("#massB").val());
    for (i = 0; i < num; i++) {
      pendulums[i].pendB.mass = Number($("#massB").val());
    }
  });
  $("#gravity").change(function() {
    $(".gravity").text("Gravity: "+$("#gravity").val());
    gravity = Number($("#gravity").val());
  });
  $("#friction").change(function() {
    for (i = 0; i < num; i++) {
      $(".friction").text("Friction: "+$("#friction").val());
      pendulums[i].pendA.friction = Number($("#friction").val());
      pendulums[i].pendB.friction = Number($("#friction").val());
    }
  });
});