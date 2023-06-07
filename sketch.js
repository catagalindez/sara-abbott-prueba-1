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
    createCanvas(800, 800);
}

function draw(){
    background(220,220,220)

    let cual = int( random(cantidad));
    let x = random( width );
    let y = random( height );
    
    image( arreglo[cual] , x, y);
}