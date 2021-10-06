//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//Variáveis da Velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

//Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 10;
let altRaquete = 80;

//Variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Variáveis do Placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons no jogo
let raquetada;
let trilha;
let ponto;

let colidir = false;

function preload() {
  trilha = loadSound("trilha.wav");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostrarBolinha();
  movimentoBolinha();
  relColisaoBorda();
  //bolinhaPresa();
  
  mostrarRaquete(xRaquete, yRaquete);
  movimentoDaRaquete();
  relColisaoRaquete(xRaquete, yRaquete);
  
  relColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoOponente();
  
  placar();
  marcarPonto();
}

function mostrarBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function relColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x, y){
  rect(x, y, compRaquete, altRaquete);
}

function movimentoDaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function relColisaoRaquete(x, y){
   colidir = collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidir){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - compRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  }else {
    chanceDeErrar -= 1
    if (chanceDeErrar <=35){
      chanceDeErrar = 35
    }
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(124, 210, 252));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 27);
  fill(color(124, 210, 252));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 27);
}

function marcarPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

// function bolinhaPresa(){
//   if (xBolinha + raio < 0){
//     console.log("Bolinha ficou presa");
//     xBolinha = 300;
//   }
// }


