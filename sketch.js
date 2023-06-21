let arreglo = [];
let cantidad = 14;
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
let fusionPos = true;

let fusion1;
let fusion2;
let fusion3;
let fusion4;
let canvasFusionAlto = 550;
let canvasFusionAncho = 550;

var color1;
var color2;
var color2;
let colorPixelX1, colorPixelY1;
let colorPixelX2, colorPixelY2;
let colorPixelX3, colorPixelY3;
let reiniciarColor = true;

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

function preload() {
  for (let i = 0; i < cantidad; i++) {
    let nombre = "data/figura" + nf(i, 2) + ".png";
    arreglo[i] = loadImage(nombre);
  }
  arte1 = loadImage("data/art1.png");
  arte2 = loadImage("data/art2.png");
  arte3 = loadImage("data/art3.png");
  textura1 = loadImage("data/textura1.png");
  textura2 = loadImage("data/textura2.png");
  textura3 = loadImage("data/textura3.png");
  textura4 = loadImage("data/textura4.png");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  anguloPrincipal = random(0, 500);
  anguloFusionPrincipal = random(0, 360);

  fusion1 = createGraphics(canvasFusionAlto, canvasFusionAncho);
  fusion2 = createGraphics(canvasFusionAlto, canvasFusionAncho);
  fusion3 = createGraphics(canvasFusionAlto, canvasFusionAncho);
  fusion4 = createGraphics(canvasFusionAlto, canvasFusionAncho);
  randomizadorFusion();

  //RANDOMIZADOR PARA LAS LINEAS
  lineasCual = int(random(0, cantidad));
  lineasX = int(random(width / 30, width - width / 2));
  lineasY = int(random(height / 30, height / 2 - height / 7));
  lineasAlto = int(random(250, 300));
  lineasAncho = random(250, 300);
  lineasCual2 = int(random(0, cantidad));
  lineasX2 = int(random(width / 30, width - width / 2));
  lineasY2 = int(random(height / 30, height / 2 - height / 7));
  lineasAlto2 = int(random(350, 400));
  lineasAncho2 = random(400, 500);
  lineasCual3 = int(random(0, cantidad));
  lineasX3 = int(random(width / 30, width - width / 2));
  lineasY3 = int(random(height / 30, height / 2 - height / 7));
  lineasAlto3 = int(random(400, 500));
  lineasAncho3 = random(350, 400);

  seleccionDeColores();
  background(color2);
}

function draw() {
  //FONDO
  seleccionDeColores();
  background(color2);
  tint(color3, 10);
  image(textura4, 0, 0, width, height);

  //DIBUJA LOS CUADRADOS VACIOS
  dibujarLineas();

  //LLAMA CUADRADOS RELLENOS
  push();
  translate(width / 2, height / 2);
  rotate(anguloPrincipal);
  dibujarCuadrado1();
  dibujarCuadrado2();
  dibujarCuadrado3();
  pop();

  //DIBUJA LA FUSION
  push();
  girarFusion();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  rotate(anguloFusionPrincipal);
  //dibujarFormaFusion1();
  //dibujarFormaFusion2();
  //dibujarFormaFusion3();
  //dibujarFormaFusion4();
  pop();

  // MIDE VELOCIDADES
  var difX = abs(mouseX - pmouseX);
  var difY = abs(mouseY - pmouseY);
  var velRaton = floor(difX + difY);

  //CALCULA EL MOVIMIENTO DE LOS CUADRADOS RELLENOS
  if (velRaton >= 50) {
    velCuadrados++;
  } else {
    if (velCuadrados > 0) {
      velCuadrados--;
    }
  }

  //CALCULA LA ROTACION DE LOS CUADRADOS RELLENOS
  if (velRaton >= 200) {
    velRotacion++;
  } else {
    if (velRotacion > 0) {
      velRotacion--;
    }
  }

  //CALCULA SI SE CAMBIAEL COLOR O NO
  if (velRaton >= 500) {
    reiniciarColor = true;
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
  angulo1 = angulo1 + velRotacion / 9;
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
  angulo2 = angulo2 + velRotacion / 8;
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
  angulo3 = angulo3 + velRotacion / 8;

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
/*
function dibujarFormaFusion1() {
  fusion1.beginShape(TESS);
  fusion1.noStroke();
  fusion1.fill(color2);
  fusion1.vertex(fusionPosX1, fusionPosY1);
  fusion1.bezierVertex(
    fusionPosX1,
    fusionPosY1,
    fusionPosX1 + 20,
    fusionPosY1 + 20,
    fusionPosX2,
    fusionPosY2
  );
  fusion1.bezierVertex(
    fusionPosX2,
    fusionPosY2,
    fusionPosX2 + 50,
    fusionPosY2 + 25,
    fusionPosX3,
    fusionPosY3
  );
  fusion1.bezierVertex(
    fusionPosX3,
    fusionPosY3,
    fusionPosX3 - 50,
    fusionPosY3 + 60,
    fusionPosX4,
    fusionPosY4
  );
  fusion1.bezierVertex(
    fusionPosX4,
    fusionPosY4,
    fusionPosX4 - 90,
    fusionPosY4 + 80,
    fusionPosX5,
    fusionPosY5
  );
  fusion1.bezierVertex(fusionPosX5, fusionPosY5);
  fusion1.vertex(fusionPosX6, fusionPosY6);
  fusion1.endShape();

  //image(fusion1, 0, 0, 500, 500);
  blend(
    fusion1,
    0,
    0,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto,
    canvasFusionAncho,
    DIFFERENCE
  );
  blend(
    fusion1,
    0,
    0,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto,
    canvasFusionAncho,
    HARD_LIGHT
  );
}

function dibujarFormaFusion2() {
  posX = fusionFijaPosX1;
  posY = fusionFijaPosY1;

  posRealX = posX - velCuadrados/2;
  posRealY = posY - velCuadrados/2;
  //fusion2.background(100);
  fusion2.noStroke();
  fusion2.fill(color3);
  fusion2.beginShape();
  fusion2.vertex(posX, posY);
  fusion2.bezierVertex(posX, posY, posX + 100, posY - 5, posX + 230, posY + 20);
  fusion2.bezierVertex(
    posX + 230,
    posY + 140,
    posX + 290,
    posY + 150,
    posX + 10,
    posY + 115
  );
  fusion2.vertex(posX + 10, posY + 115);
  fusion2.endShape();
  blend(
    fusion2,
    posRealX,
    posRealY,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto,
    canvasFusionAncho,
    DIFFERENCE
  );
  blend(
    fusion2,
    posRealX,
    posRealY,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto,
    canvasFusionAncho,
    HARD_LIGHT
  );
}

function dibujarFormaFusion3() {
  posX = fusionPosX2 - 50;
  posY = fusionPosY2 + 450;
  posRealX = 0 + velCuadrados/2;
  posRealY= 0 + velCuadrados/3;

  fusion3.noStroke();
  fusion3.fill(color3);
  fusion3.arc(posX, posY,  150 + velCuadrados/3, 150+velCuadrados/3, 0, PI + QUARTER_PI);
  blend(
    fusion3,
    posRealX,
    posRealY,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto,
    canvasFusionAncho,
    DIFFERENCE
  );
  blend(
    fusion3,
    posRealX,
    posRealY,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto,
    canvasFusionAncho,
    HARD_LIGHT
  );
}

function dibujarFormaFusion4() {
  fusion4.beginShape(TESS);
  fusion4.noStroke();
  fusion4.fill(color2);
  fusion4.vertex(fusionPosX1, fusionPosY1);
  fusion4.bezierVertex(
    fusionPosX5,
    fusionPosY5,
    fusionPosX5 + 20,
    fusionPosY5 + 20,
    fusionPosX2,
    fusionPosY2
  );
  fusion4.bezierVertex(
    fusionPosX2,
    fusionPosY2,
    fusionPosX2 + 50,
    fusionPosY2 + 25,
    fusionPosX4,
    fusionPosY3
  );
  fusion4.bezierVertex(
    fusionPosX4,
    fusionPosY3,
    fusionPosX4 - 50,
    fusionPosY3 + 60,
    fusionPosX3,
    fusionPosY4
  );
  fusion4.bezierVertex(
    fusionPosX4,
    fusionPosY3,
    fusionPosX3 - 90,
    fusionPosY4 + 80,
    fusionPosX6,
    fusionPosY6
  );
  fusion4.bezierVertex(fusionPosX6, fusionPosY6);
  fusion4.vertex(fusionPosX5, fusionPosY5);
  fusion4.endShape();
  blend(
    fusion4,
    0,
    0,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto + canvasFusionAlto / 15,
    canvasFusionAncho + canvasFusionAncho / 15,
    DIFFERENCE
  );
  blend(
    fusion4,
    0,
    0,
    canvasFusionAlto,
    canvasFusionAncho,
    -canvasFusionAncho / 2,
    -canvasFusionAlto / 2,
    canvasFusionAlto + canvasFusionAlto / 15,
    canvasFusionAncho + canvasFusionAncho / 15,
    HARD_LIGHT
  );
}*/

function randomizadorFusion() {
  fusionPosX1 = random(0, canvasFusionAncho / 2);
  fusionPosY1 = random(canvasFusionAlto / 2, canvasFusionAlto);
  fusionPosX2 = random(canvasFusionAlto / 2, canvasFusionAncho);
  fusionPosY2 = random(0, canvasFusionAlto / 4);
  fusionPosX3 = random(
    canvasFusionAncho - canvasFusionAncho / 2,
    canvasFusionAncho
  );
  fusionPosY3 = random(
    canvasFusionAlto - canvasFusionAlto / 3,
    canvasFusionAlto
  );
  fusionPosX4 = random(0, canvasFusionAncho / 2);
  fusionPosY4 = random(canvasFusionAlto / 2, canvasFusionAlto);
  fusionPosX5 = random(
    canvasFusionAncho - canvasFusionAncho / 3,
    canvasFusionAncho
  );
  fusionPosY5 = random(canvasFusionAlto / 5, canvasFusionAlto);
  fusionPosX6 = random(0, canvasFusionAncho);
  fusionPosY6 = random(0, canvasFusionAlto);

  fusionFijaPosX1 = random(
    canvasFusionAncho / 3,
    canvasFusionAncho - canvasFusionAncho / 3
  );
  fusionFijaPosY1 = random(
    canvasFusionAlto / 3,
    canvasFusionAncho - canvasFusionAncho / 3
  );
}

function girarFusion() {
  anguloFusionPrincipal = anguloFusionPrincipal - velRotacion / 15;
}

function dibujarLineas() {
  push();
  tint(0);
  image(arreglo[lineasCual], lineasX, lineasY, lineasAncho, lineasAlto);
  tint(255);
  image(arreglo[lineasCual2], lineasX2, lineasY2, lineasAncho2, lineasAlto2);
  tint(0);
  image(arreglo[lineasCual3], lineasX3, lineasY3, lineasAncho3, lineasAlto3);
  pop();
}

function seleccionDeColores() {
  //SELECCIONA PIXEL DE IMAGENES
  color1 = arte1.get(colorPixelX1, colorPixelY1);
  color2 = arte3.get(colorPixelX2, colorPixelY2);
  color3 = arte3.get(colorPixelX3, colorPixelY3);

  //RANDOMIZADOR DE COLOR
  if (reiniciarColor == true) {
    colorPixelX1 = int(random(0, width / 2));
    colorPixelY1 = int(random(0, height / 2));
    colorPixelX2 = int(random(0, width / 2));
    colorPixelY2 = int(random(0, height / 2));
    colorPixelX3 = int(random(0, width / 2));
    colorPixelY3 = int(random(0, height / 2));
    reiniciarColor = false;
  } else {
  }
}
