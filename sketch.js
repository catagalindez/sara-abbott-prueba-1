let arreglo = [];
let cantidad = 13;

function preload(){
    for( let i=0 ; i<cantidad ; i++){
      let nombre = "data/figura"+nf( i , 2 )+".png";
      //console.log( nombre );
      arreglo[i] = loadImage( nombre );
    }
  }

function setup () {
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(220,220,220)

    let cual = int( random(cantidad));
    let x = random( width/2 );
    let y = random( height/2 );

<<<<<<< HEAD
    tint( random(255),random(255),random(255), 50 );
    image( arreglo[cual] , x, y);
=======
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

>>>>>>> edf4a8823d0f75a9c4dcc62010516869fdf1cbe4
}
