let arreglo = [];
let cantidad = 8;

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
    
    image( arreglo[cual] , x, y);
}