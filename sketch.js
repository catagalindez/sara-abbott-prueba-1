let arreglo = [];
let cantidad = 8;
let arte1;
let arte2;
let arte3;
var velCuadrados = 0;
var velRaton = 0;
var velRotacion = 0;
var angulo1 = 0;
var angulo2 = 0;
var angulo3 = 0;
let anguloPrincipal = 0;
let startOnce = true;

var color1;
var color2;
var color2;

let lineasCual;
let lineasX;
let lineasY;
let lineasAncho;
let lineasAlto;
let lineasCual2;
let lineasX2;
let lineasY2;
let lineasAncho2;
let lineasAlto2;
let lineasCual3;
let lineasX3;
let lineasY3;
let lineasAncho3;
let lineasAlto3;

let colorPixelX1, colorPixelY1;
let colorPixelX2, colorPixelY2;
let colorPixelX3, colorPixelY3;

function preload() {
  for (let i = 0; i < cantidad; i++) {
    let nombre = "data/figura" + nf(i, 2) + ".png";
    //console.log( nombre );
    arreglo[i] = loadImage(nombre);
  }
  arte1 = loadImage('data/art1.png');
  arte2 = loadImage('data/art2.png');
  arte3 = loadImage('data/art3.png');
  textura1 = loadImage('data/textura1.png');
  textura2 = loadImage('data/textura2.png');
  textura3 = loadImage('data/textura3.png');
  textura4 = loadImage('data/textura4.png');
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  anguloPrincipal = random(0, 500);

  //LIMITES PARA LAS LINEAS
  lineasCual = int(random(0,cantidad));
  lineasX = int(random(width / 30, width-width/2));
  lineasY = int(random(height / 30, height / 2 - height / 7));
  lineasAlto = int( random(200, 300));
  lineasAncho = random(250, 200);
  lineasCual2 = int(random(0,cantidad));
  lineasX2 = int(random(width / 30, width-width/2));
  lineasY2 = int(random(height / 30, height / 2 - height / 7));
  lineasAlto2 = int( random(200, 400));
  lineasAncho2 =random(250, 500);
  lineasCual3 = int(random(0,cantidad));
  lineasX3 = int(random(width / 30, width-width/2));
  lineasY3 = int(random(height / 30, height / 2 - height / 7));
  lineasAlto3 = int( random(400, 500));
  lineasAncho3 = random(350, 400);
  
  seleccionDeColores();
  background (color2);
 // image(textura1,0,0,width,height);
 // image(textura2,0,0,width,height);
}

function draw() {
  //FONDO
  background(color2);
  tint(color3,10);
  image(textura4,0,0,width,height);
  
/*
  push();
  tint(0);
  image (arreglo[lineasCual],lineasX,lineasY,lineasAncho,lineasAlto);
  tint(255);
  image (arreglo[lineasCual2],lineasX2,lineasY2,lineasAncho2,lineasAlto2);
  tint(0);
  image (arreglo[lineasCual3],lineasX3,lineasY3,lineasAncho3,lineasAlto3);
  pop();
*/
  dibujarLineas();

  //LLAMA CUADRADOS RELLENOS
  push();
  translate(width / 2, height / 2);
  rotate(anguloPrincipal);
  dibujarCuadrado1();
  dibujarCuadrado2();
  dibujarCuadrado3();

  dibujarFusionColor1();
  pop();
  
  // MIDE VELOCIDADES
  var difX = abs(mouseX - pmouseX);
  var difY = abs(mouseY - pmouseY);
  var velRaton = floor(difX + difY);


  //MOVIMIENTO DE CUADRADOS
  if (velRaton >= 50) {
    velCuadrados++;
  } else {
    if (velCuadrados > 0) {
      velCuadrados--;
    }
  }

  //ROTACION DE CUADRADOS 
  if (velRaton >= 200) {
    velRotacion++;
  } else {
    if (velRotacion > 0) {
      velRotacion--;
    }
  }
  if(velRaton >=300) {
    seleccionDeColores();
  }
}

function dibujarCuadrado1() {
  push();
  translate(0, 0);
  rotate(angulo1);
  ancho = 200;
  alto = 350;
  posX = -ancho / 2 - velCuadrados;
  posY = -alto / 2 - velCuadrados;
  angulo1 = angulo1 + velRotacion / 10;
  minPosX = -width / 2 + ancho / 2 + ancho / 5;
  minPosY = -height / 2 + alto / 3;
  maxPosX = ancho - ancho / 3;
  maxPosY = 0 - alto / 5;

  if (posX > maxPosX) {
    posX = maxPosX - 1;
  }
  if (posY > maxPosY) {
    posY = maxPosY - 1;
  }
  if (posX < minPosX) {
    posX = minPosX + 1;
  }
  if (posY < minPosY) {
    posY = minPosY + 1;
  }

  
  beginShape();
  noStroke();
  fill(color1);
  vertex(posX, posY);
  //linea arriba
  bezierVertex(
    posX,
    posY,
    posX + ancho / 2,
    posY - alto / 8,
    posX + ancho,
    posY
  );
  //linea derecha
  bezierVertex(
    posX + ancho,
    posY,
    posX + ancho + ancho / 5,
    posY,
    posX + ancho,
    posY + alto
  );
  //linea abajo
  bezierVertex(
    posX + ancho,
    posY + alto,
    posX + ancho - ancho / 3,
    posY + alto + alto / 8,
    posX,
    posY + alto
  );
  //linea izquierda
  bezierVertex(
    posX,
    posY + alto,
    posX - ancho / 3,
    posY + alto - alto / 3,
    posX,
    posY
  );
  endShape();
  pop();
}

function dibujarCuadrado2() {
  push();
  translate(0, 0);
  rotate(angulo2);
  ancho = 120;
  alto = 250;
  posX = -ancho / 2 + velCuadrados;
  posY = -alto / 2 - velCuadrados;
  angulo2 = angulo2 + velRotacion / 5;
  maxPosX = width / 4 - ancho / 2;
  minPosX = -width / 2 + ancho / 2;
  minPosY = -height / 2 + alto / 3;
  maxPosY = height / 2 - alto - alto / 3;

  if (posX > maxPosX) {
    posX = maxPosX - 1;
  }
  if (posY > maxPosY) {
    posY = maxPosY - 1;
  }
  if (posX < minPosX) {
    posX = minPosX + 1;
  }
  if (posY < minPosY) {
    posY = minPosY + 1;
  }

  beginShape();
  noStroke();
  fill(color1);
  vertex(posX, posY);
  //linea arriba
  bezierVertex(
    posX,
    posY,
    posX + ancho / 2,
    posY - alto / 7,
    posX + ancho,
    posY
  );
  //linea derecha
  bezierVertex(
    posX + ancho,
    posY,
    posX + ancho + ancho / 5,
    posY + alto / 2,
    posX + ancho,
    posY + alto
  );
  //linea abajo
  bezierVertex(
    posX + ancho,
    posY + alto,
    posX + ancho - ancho / 10,
    posY + alto + alto / 10,
    posX,
    posY + alto
  );
  //linea izquierda
  bezierVertex(
    posX,
    posY + alto,
    posX - ancho / 3,
    posY + alto - alto / 3,
    posX,
    posY
  );
  endShape();
  pop();
}

function dibujarCuadrado3() {
  push();
  translate(0, 0);
  rotate(angulo3);
  ancho = 200;
  alto = 75;
  posX = -ancho / 2 + velCuadrados;
  posY = -alto / 2 + velCuadrados;
  maxPosX = width / 2 - ancho - ancho / 2;
  minPosX = -width / 2 + ancho / 2;
  maxPosY = height / 2 - alto * 3;
  minPosY = -height / 2 + alto;
  angulo3 = angulo3 + velRotacion / 7;

  if (posX > maxPosX) {
    posX = maxPosX - 1;
  }
  if (posY > maxPosY) {
    posY = maxPosY - 1;
  }
  if (posX < minPosX) {
    posX = minPosX + 1;
  }
  if (posY < minPosY) {
    posY = minPosY + 1;
  }

  beginShape();
  noStroke();
  fill(color1);
  vertex(posX, posY);
  //linea arriba
  bezierVertex(
    posX,
    posY,
    posX + ancho / 7,
    posY - alto / 2,
    posX + ancho,
    posY
  );
  //linea derecha
  bezierVertex(
    posX + ancho,
    posY,
    posX + ancho + ancho / 15,
    posY + alto / 10,
    posX + ancho,
    posY + alto
  );
  //linea abajo
  bezierVertex(
    posX + ancho,
    posY + alto,
    posX + ancho - ancho / 3,
    posY + alto + alto / 10,
    posX,
    posY + alto
  );
  //linea izquierda
  bezierVertex(
    posX,
    posY + alto,
    posX - ancho / 10,
    posY + alto - alto / 10,
    posX,
    posY
  );
  endShape();
  pop();
}

function dibujarFusionColor1() {
  
}
function dibujarLineas(){
  push();
  tint(0);
  image (arreglo[lineasCual],lineasX,lineasY,lineasAncho,lineasAlto);
  tint(255);
  image (arreglo[lineasCual2],lineasX2,lineasY2,lineasAncho2,lineasAlto2);
  tint(0);
  image (arreglo[lineasCual3],lineasX3,lineasY3,lineasAncho3,lineasAlto3);
  pop();
}

function seleccionDeColores(){
  

  color1 = arte1.get(lineasX,lineasY);
  color2= arte3.get(lineasX2,lineasY2);
  color3= arte3.get(lineasX3,lineasY3);
}
