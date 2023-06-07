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
    background(220,220,220,220)

    let xoff = frameCount * 0.01;
      for( let i=0 ; i<width ; i++ ){
        let yoff = 0.0;
        xoff += 0.01;    

      for( let j=0 ; j<height ; j++ ){
        yoff += 0.01;
    //let valor = random(0 , height );
        let valor = noise( xoff, yoff );

        let elColor = lerpColor( color(255,0,0) , color(0,0,255), valor);

        stroke( elColor );
        point(i,j);
       }
    }

    let cual = int( random(cantidad));
    let x = random( width );
    let y = random( height );
    
    image( arreglo[cual] , x, y);

    
}