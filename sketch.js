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
let colores = [];
let variedad = 30;
let arteRandom;
let relleno;
let _relleno;
var color1, color2, color3, color4, color5, color6, color7, color8, color9;
let colorPixelX1, colorPixelY1;
let colorPixelX2, colorPixelY2;
let colorPixelX3, colorPixelY3;
let colorPixelX, colorPixelY;
let reiniciarColor = true;
let coloresOverlay = [];
let overlayExtra;
let cuadradosRelleno;
let cuadradosRellenoRandom;
let idkbg;

//FUSION
let imagenFusion = [];
let fusionForma1 = [];
let fusionForma2 = [];
let fusionForma3 = [];
let fusionForma4 = [];
let fusionForma5 = [];
let fusionForma6 = [];
let cantFormas = 30;
let cantFusion;
let minRotacion, maxRotacion, _minRotacion, _maxRotacion;
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

//TEXTURAS
let texturas = [];
let cantTexturas = 11;
let resetTextura = true;

// //SONIDO
let mic;
let vol;
let velConVol;
let pitch;
let tono = 0;
let audioContext;

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
  arte1 = loadImage("data/art1.png");
  arte2 = loadImage("data/art2.png");
  arte3 = loadImage("data/art3.png");
  
  //TEXTURAS
  for (let i = 0; i < cantTexturas; i++) {
    let nombre = "data/textura" + i + ".png";
    texturas[i] = loadImage(nombre);
  }

  idkbg = loadImage("data/idkbg.png");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  anguloPrincipal = random(0, 500);
  anguloFusionPrincipal = random(0, 360);

  //COLOR
  //colorMode(HSB, 360, 100, 100);

  //SONIDO
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();

  //FUSION
  resetearFusion();
  for (let i = 0; i < cantFusion; i++) {
    fusionForma1.push(new Fusion());
    fusionForma2.push(new Fusion());
    fusionForma3.push(new Fusion());
    fusionForma4.push(new Fusion());
    fusionForma5.push(new Fusion());
    fusionForma6.push(new Fusion());
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
  resetearTextura();
  background(color2);
}

function draw() {
  //SONIDO
  sonido();

  //FONDO
  resetearTextura();
  resetearFusion();
  seleccionDeColores();  
  background(overlayExtra);
  fondo();

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
  // rotate(anguloFusionPrincipal);
  for (let i = 0; i < cantFusion; i++) {
    fusionForma1[i].rotar(0, 5);
    fusionForma2[i].rotar(0, 2);
    fusionForma3[i].rotar(0, -3);
    fusionForma4[i].rotar(0, -6);
    fusionForma5[i].rotar(0, 5);
    fusionForma6[i].rotar(0, 4);
    fusionForma1[i].dibujar(color4);
    fusionForma2[i].dibujar(color5);
    fusionForma3[i].dibujar(color6);
    fusionForma4[i].dibujar(color7);
    fusionForma5[i].dibujar(color8);
    fusionForma6[i].dibujar(color9);
  }
  pop();

  // MIDE VELOCIDADES
  var difX = abs(mouseX - pmouseX);
  var difY = abs(mouseY - pmouseY);
  var velRaton = floor(difX + difY);

  //CALCULA EL MOVIMIENTO DE LOS CUADRADOS RELLENOS
  if (velConVol >= 50) {
    velCuadrados++;
  } else {
    if (velCuadrados > 0) {
      velCuadrados--;
    }
  }

  //CALCULA LA ROTACION DE LOS CUADRADOS RELLENOS
  if (velConVol >= 200) {
    velRotacion++;
  } else {
    if (velRotacion > 0) {
      velRotacion--;
    }
  }

  //CALCULA SI SE CAMBIAEL COLOR O NO
  if (velConVol >= 500) {
    reiniciarColor = true;
    resetTextura = true;
  }

  // push();
  // fill(20);
  // textSize(50);
  // text("volumen: " + velConVol, 70, 70);
  // text("tono: " + tono, 70, 120);
  // pop();


  overlayPorEncima();
  
}

//AUDIO
function sonido() {
  vol = mic.getLevel();
  velConVol = map(vol, 0, 1, 0, 4000);
}

function startPitch() {
  pitch = ml5.pitchDetection("./model/", audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  reiniciarColor = true;
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      tono = frequency;
    } else {
    }
    getPitch();
  });
}

//TEXTURAS
function resetearTextura() {
  if (resetTextura == true) {
    textura = random(texturas);
    resetTextura = false;
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
  angulo1 = angulo1 + velRotacion / 15;
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
  fill(cuadradosRelleno);
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
  angulo2 = angulo2 + velRotacion / 15;
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
  fill(cuadradosRelleno);
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
  angulo3 = angulo3 + velRotacion / 15;

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
  fill(cuadradosRelleno);
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
    let minPosX = -width / 2 + width / 6;
    let maxPosX = width / 2 - width / 6;
    let minPosY = -height / 2 + height / 6;
    let maxPosY = height / 2 - height / 6;
    this.x = round(random(minPosX, maxPosX));
    this.y = round(random(minPosY, maxPosY));
    this.anchoalto = round(random(100, 200));
    this.rotacion = random(0, 360);
    this.frequencia;
    this.imgRandom = round(random(0, cantFormas));
  }

  rotar(minRotacion, maxRotacion) {
    _minRotacion = minRotacion;
    _maxRotacion = maxRotacion;
    this.frequencia = map(tono, 55, 1000, _minRotacion, _maxRotacion);
    if (tono > 55) {
      this.rotacion += this.frequencia;
    } else {
      this.rotacion = this.rotacion;
    }
  }

  dibujar(relleno) {
    _relleno = relleno;
    push();
    tint(_relleno);
    blendMode(DIFFERENCE);
    translate(this.x, this.y);
    rotate(this.rotacion);
    image(imagenFusion[this.imgRandom], 0, 0, this.anchoalto, this.anchoalto);
    tint(255,255,255,50);
    blendMode(LIGHTEST);
    image(imagenFusion[this.imgRandom], 0, 0, this.anchoalto, this.anchoalto);
    //blend(imagenFusion[this.imgRandom], 0, 0, 300, 300, this.x, this.y, this.anchoalto, this.anchoalto,DIFFERENCE);
    pop();
  }
}

function resetearFusion() {
  if (fusionReset == true) {
    cantFusion = round(random(1, 2));
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
    colorPixelX2 = int(random(0, width  / 2));
    colorPixelY2 = int(random(0, height / 2));
    colorPixelX3 = int(random(0, width / 2));
    colorPixelY3 = int(random(0, height / 2));    
    overlayRandom = floor(random(0,2));
    reiniciarColor = false;
  } else {
  }
  // //SELECCIONA PIXEL DE IMAGENES
  color1 = arte1.get(colorPixelX1, colorPixelY1);
  color2 = arte2.get(colorPixelX1, colorPixelY1);
  color3 = arte3.get(colorPixelX1, colorPixelY1);
  color4 = color(197,45,42);
  color5 = color(116,154,128);
  color6 = color(110,126,198);
  color7 = color(120,128,117);
  color8 = color(255,255,255);
  color9 = color(105,156,118);

  colores = [
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
    color9,
  ];
  coloresOverlay = [
    color1, color2, color3
  ];
  overlayExtra = coloresOverlay[overlayRandom];
  
  if (overlayExtra != 2){
    cuadradosRellenoRandom = overlayRandom+1;
  } else {
    cuadradosRellenoRandom = 0;
  }
  cuadradosRelleno = coloresOverlay[cuadradosRellenoRandom];
}

function fondo() {  
  tint(overlayExtra);
  blend(idkbg,0,0,idkbg.width,idkbg.height,0,0,width,height, MULTIPLY);
  tint(overlayExtra);
  blend(textura, 0, 0, textura.width, textura.height, 0, 0, width, height, DIFFERENCE);
  overlayPorEncima();
}

function overlayPorEncima(){
  push(); 
  noStroke();
  fill(overlayExtra,50);
  blendMode(HARD_LIGHT);
  rect(0, 0, width, height);
  pop();
};
