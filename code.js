let btnstart=document.querySelector(".start");

btnstart.addEventListener("click", () => {
    console.log("inicia el juegooooo");
});

//imagenes

const trexito=new Image();
trexito.src="trex1.webp";

const cactusImg=new Image();
cactusImg.src="cactus.webp";

console.log(trexito);


//seleccionar canvas

let lienzo= document.getElementById("lienzo");
let ctx= lienzo.getContext("2d");


//lista de enemigos otros elementos

const nopalitos=[];



//crear personaje

class Trex {
    constructor(x,y,w,h,color,vida,imagen){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color=color;
    this.vida=vida;
    this.imagen=imagen;
    this.saltando=false;
    }
    avanzar(){
        console.log("avanza", this.x);
        this.x +=10;
    }
    retroceder(){
        console.log("retroceder");
    }
    saltar(){
        console.log("saltar");
        this.saltando=true;
    }
    agacharse(){
        console.log("agacharse");
    }
    dibujarse(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);

        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
    }
    morirse(){

    }
}


//enemigo

class Cactus {
    constructor(x,y,w,h,imagen,nivel){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.imagen=imagen;
        this.nivel=nivel;
    }
    dibujarse(){
        ctx.fillStyle="green";
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
        if(this.nivel==="facil"){
            this.x -=1;

        } else {
            this.x -= 3
        }
    
        this.x -=1;
    }
}

//dibujar linea

function dibujarPiso(){
    ctx.beginPath();
    ctx.moveTo(0,170);
    ctx.lineTo(330,170);
    ctx.stroke();
    ctx.closePath();
}



dibujarPiso();



//mostrar nombre del juego

function mostrarDatos(distancia, score, vida){
    ctx.fillStyle="black";
    ctx.font="24px Arial"
    ctx.fillText("Trex", 140, 20);
    //distancia
    ctx.fillText(`${distancia}m`,20,20);
    //score
    ctx.fillText(`Score: ${score}`, 220,20);
    ctx.fillText(`Vida: ${vida}`, 235,50);
}



//escuche las teclas

function teclas(dinosaurio){
    document.addEventListener("keyup", (evento) => {
        console.log("tecla tocada", evento.code);
        switch(evento.code){
            case "Space":
            dinosaurio.saltar();
            break;
            case "ArrowDown":
             console.log("Abajo");
             break;
             case "ArrowUp":
             console.log("Arriba");
             break;
             case "ArrowRight":
             console.log("Adelante");
             dinosaurio.avanzar();
             break;
             case "ArrowUp":
             console.log("Atras");
             break;
        }
    });
}


function crearCactus(){
    const num=Math.floor(Math.random()*100);
    

    if (num===3){
        const cactus=new Cactus(300,130,30,60,cactusImg,"facil");
        nopalitos.push(cactus);
    }
}


function iniciarJuego(){
    let distancia=0;
    const dinosaurio=new Trex(20,130,30,60,"green",100,trexito);
    teclas(dinosaurio);
    dinosaurio.dibujarse();

   

    setInterval(() => {
        ctx.clearRect(0,0,330,210);
        //mostrar datos
        mostrarDatos(distancia,0,dinosaurio.vida);
        distancia +=1;


        dibujarPiso();
        dinosaurio.dibujarse();

        //esta saltando?

        if(dinosaurio.saltando===true){
    
            //altura maxima de salto
            if(dinosaurio.y > 50){
                dinosaurio.y -=5;
            } else {
                console.log("bajate");
                dinosaurio.saltando=false;
            }
            
        }

//no estas saltando

if(dinosaurio.saltando===false && dinosaurio.y<130){
    dinosaurio.y +=5;
}


        //dibujar enemigos

        nopalitos.forEach((cactus,index) => {
            cactus.dibujarse();
            if(cactus.x <= dinosaurio.x + dinosaurio.w ) {
                //alert("choco");
                //eliminar nopalitos
                nopalitos.splice(index,1);
                dinosaurio.vida -=25;
            }
        });
        

        crearCactus();
    },1000/30)
}


iniciarJuego();

//agregar la imagen del trex
//crear cactus

//brincar
//recibir daño
//contador de avace