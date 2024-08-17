// Variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function setup() {
  createCanvas(600, 400);
  resetBolinha();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponenteEasy();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width) {
    meusPontos++;
    resetBolinha();
  }
  if (xBolinha - raio < 0) {
    pontosDoOponente++;
    resetBolinha();
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 5;
  }
}

function movimentaRaqueteOponenteEasy() {
  let fatorErro = 0.6; // Chance maior de errar
  let velocidadeMovimento = 0.1;

  if (random(1) > fatorErro) {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteAltura / 2;
    yRaqueteOponente += velocidadeYOponente * velocidadeMovimento;
  }
}

function verificaColisaoRaquete(x, y) {
  if (
    xBolinha - raio < x + raqueteComprimento &&
    xBolinha + raio > x &&
    yBolinha + raio > y &&
    yBolinha - raio < y + raqueteAltura
  ) {
    velocidadeXBolinha *= -1;
  }
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(16);
  fill(255);
  text(meusPontos, 150, 26);
  text(pontosDoOponente, 450, 26);
}

function marcaPonto() {
  // Função já implementada dentro de verificaColisaoBorda
}

function resetBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  velocidadeXBolinha *= -1; // Inverte a direção da bolinha após marcar ponto
  velocidadeYBolinha = 6;   // Garante que a bolinha não fique "bugada"
}
