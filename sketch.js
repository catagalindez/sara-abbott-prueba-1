function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255,188,188);
  width=50;
  height=50;
  rectMode(CENTER);

  strokeWeight(5);
  noFill();
  stroke(93,71,71);
  rect(200,210,240,300,2,2,2,2);
  stroke(240,130,17);
  rect(120,240,200,270,2,2,2,2);
  stroke(255);
  rect(270,220,220,180,2,2,2,2);

  //chikitos
  noStroke();
  fill(250, 207, 63, 150);
  rect(mouseX/3+100, mouseY/2+100, 180, 300,5,1,1,10);
  fill(250, 160, 63, 150);
  rect(mouseX, mouseY/4, 50, 50,15,15,15,15);
  fill(250, 151, 183, 150);
  rect(100, 200, mouseX-100, mouseY-200);
  fill(250, 79, 63, 300);
  rect(mouseX+30, 300, 90, 50,20,10,50,1);
  fill(250, 63, 154, 150);
  rect(mouseX*2-60,mouseY+30, 100,240,1,1,100,100);
  fill(209, 74, 63, 500);
  rect(200,mouseY-100, 23, 80,10,10,10,10);

}
