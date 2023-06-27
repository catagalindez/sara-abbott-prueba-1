let arreglo = [];
let cantidad = 14;
let arte = [];
var velCuadrados = 0;
var velRaton = 0;
var velRotacion = 0;
var angulo1 = 0;
var angulo2 = 0;
var angulo3 = 0;
let anguloPrincipal = 0;

//COLOR
let randoArte;
let randoArte2 = [];
let colores = [];
let variedad = 30;
let arteRandom;
let relleno;
var color1;
var color2;
var color2;
let colorPixelX1, colorPixelY1;
let colorPixelX2, colorPixelY2;
let colorPixelX3, colorPixelY3;
let reiniciarColor = true;

//FUSION
let imagenFusion = [];
let fusionForma = [];
let cantFormas = 30;
let cantFusion;
let fusionReset = true;

//LINEAS
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
  //FUSION
  for (let i = 0; i < cantFormas; i++) {
    let nombre = "data/forma" + nf(i, 2) + ".png";
    imagenFusion[i] = loadImage(nombre);
  }
  //ARTE
  // for (let i = 1; i < 3; i++){
  //   let nombre = "data/art" + i + ".png";
  //   arte[i] = loadImage(nombre);
  // }
  let arte1 = loadImage("data/art1.png");
  let arte2 = loadImage("data/art2.png");
  let arte3 = loadImage("data/art3.png");
  arte = [arte1, arte2, arte3];
  textura = loadImage("data/textura4.png");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  anguloPrincipal = random(0, 500);
  anguloFusionPrincipal = random(0, 360);

  //FUSION
  resetearFusion();
  for (let i = 0; i < cantFusion; i++) {
    fusionForma.push(new Fusion());
  }

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
  image(textura, 0, 0, width, height);

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
  //rotate(anguloFusionPrincipal);
  for (let i = 0; i < cantFusion; i++) {
    fusionForma[i].dibujar();
  }
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

//CUADRADOS PRINCIPALES
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

//CUADRADOS LINEAS
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

//FUSION
class Fusion {
  constructor() {
    let minPosX = -width / 2 + width / 8;
    let maxPosX = width / 2 - width / 7;
    let minPosY = -height / 2 + height / 8;
    let maxPosY = height / 2 - height / 7;
    this.x = round(random(minPosX, maxPosX));
    this.y = round(random(minPosY, maxPosY));
    this.anchoalto = round(random(100, 200));
    this.rotacion = random(0, 360);
    this.imgRandom = round(random(0, cantFormas));
    }

  dibujar() {
    push();
    tint(color2);
    blendMode(DIFFERENCE);
    translate(this.x, this.y);
    rotate(this.rotacion);
    image(imagenFusion[this.imgRandom], 0, 0, this.anchoalto, this.anchoalto);
    pop();
    //blend(imagenFusion[this.imgRandom], 0, 0, 300, 300, this.x, this.y, this.anchoalto, this.anchoalto,DIFFERENCE);
  }
}

function resetearFusion() {
  if (fusionReset == true) {
    cantFusion = round(random(10, 15));
    fusionReset = false;
  }
}

function girarFusion() {
  anguloFusionPrincipal = anguloFusionPrincipal - velRotacion / 15;
}

//COLOR
function seleccionDeColores() {
  //RANDOMIZADOR DE PIXEL
  if (reiniciarColor == true) {
    randoArte = random(arte);
    colorPixelX1 = int(random(0, width / 2));
    colorPixelY1 = int(random(0, height / 2));
    colorPixelX2 = int(random(0, width / 2));
    colorPixelY2 = int(random(0, height / 2));
    colorPixelX3 = int(random(0, width / 2));
    colorPixelY3 = int(random(0, height / 2));
    // for (let i; i < variedad; i++) {
    //     colorPixelX = int(random(0, width / 2));
    //     colorPixelY = int(random(0, height / 2));

    //     colores[i] = random(arte).get(
    //       colorPixelX,
    //       colorPixelY
    //       );      
    // }
    // relleno = random (colores);
    
    reiniciarColor = false;
  } else {
  }
  //SELECCIONA PIXEL DE IMAGENES
  color1 = randoArte.get(colorPixelX1, colorPixelY1);
  color2 = randoArte.get(colorPixelX2, colorPixelY2);
  color3 = randoArte.get(colorPixelX3, colorPixelY3);

  
}
