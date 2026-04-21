let canvas;
let ctx;

let gatoX=0;
let gatoY=0;
let comidaX=0;
let comidaY=0;

let imgGato = new Image();
imgGato.src = "gato.png";

let imgRaton = new Image();
imgRaton.src = "raton.png";

let puntaje=0;
let tiempo=15;
let intervalo;

const ALTO_GATO=60;
const ANCHO_GATO=60;
const ALTO_COMIDA=30;
const ANCHO_COMIDA=30;

function detectarColision(){
    if(gatoX < comidaX + ANCHO_COMIDA &&
       gatoX + ANCHO_GATO > comidaX &&
       gatoY < comidaY + ALTO_COMIDA &&
       gatoY + ALTO_GATO > comidaY){

        puntaje++;
        actualizarTexto("lblPuntaje",puntaje);

        moverComida();
        dibujarTodo();

        if(puntaje>=6){
            alert("GANASTE 🎉");
            clearInterval(intervalo);
        }
    }
}

function iniciarJuego(){
    canvas = document.getElementById("areaJuego");
    ctx = canvas.getContext("2d");

    reiniciarVariables();

    let imagenesCargadas = 0;

    function verificarCarga(){
        imagenesCargadas++;
        if(imagenesCargadas === 2){
            dibujarTodo();
        }
    }

    imgGato.onload = verificarCarga;
    imgRaton.onload = verificarCarga;

    // Por si ya estaban en caché
    dibujarTodo();

    intervalo = setInterval(restarTiempo,1500);
}

function reiniciarVariables(){
    gatoX=(canvas.width/2)-(ANCHO_GATO/2);
    gatoY=(canvas.height/2)-(ALTO_GATO/2);

    moverComida();

    puntaje=0;
    tiempo=15;

    actualizarTexto("lblPuntaje",puntaje);
    actualizarTexto("lblTiempo",tiempo);
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,ancho,alto);
}

function graficarGato(){
    ctx.drawImage(imgGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida(){
    if(imgRaton.complete){
        ctx.drawImage(imgRaton, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
    }
}

function dibujarTodo(){
    limpiarCanvas();
    graficarGato();
    graficarComida();
}

function moverIzquierda(){
    gatoX-=10;
    actualizarJuego();
}

function moverDerecha(){
    gatoX+=10;
    actualizarJuego();
}

function moverArriba(){
    gatoY-=10;
    actualizarJuego();
}

function moverAbajo(){
    gatoY+=10;
    actualizarJuego();
}

function actualizarJuego(){
    dibujarTodo();
    detectarColision();
}



function moverComida(){
    comidaX=Math.random()*(canvas.width-ANCHO_COMIDA);
    comidaY=Math.random()*(canvas.height-ALTO_COMIDA);
}

function restarTiempo(){
    tiempo--;
    actualizarTexto("lblTiempo",tiempo);

    if(tiempo<=0){
        alert("GAME OVER 💀");
        clearInterval(intervalo);
    }
}

function actualizarTexto(id,valor){
    document.getElementById(id).innerText=valor;
}

function reiniciarJuego(){
    clearInterval(intervalo);
    reiniciarVariables();
    dibujarTodo();
    intervalo=setInterval(restarTiempo,1500);
}

function cambiarVelocidad(nuevaVelocidad){
    clearInterval(intervalo);
    velocidadCaida = nuevaVelocidad;
    intervalo = setInterval(bajarLimon, velocidadCaida);
}