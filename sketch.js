const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];// matriz navio
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}
function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
}
function draw() {
  showBoats()
  background(189);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);
  ground.display();
showBoats();
   for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
  cannon.display();
  tower.display(); 
}
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}
//função para mostrar a bala
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}
 function showBoats() {// função de mostrar os barcos
  if (boats.length > 0) { //se o comprimento da matriz dos barcos for maior que 0
     if (boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300) 
      { //se o comprimento da matriz for menor que 4 barcos E o ultimo esteja a 300 px da largura da tela
          var positions = [-130, -100, -120, -80]; //seleciona uma dessas posição
          var position = random(positions); //sorteia uma das posições
          var boat = new Boat(width,height - 100, 200, 200, position); //cria um novo barco
          boats.push(boat); //adicionar um barco ao indice da matriz
        }
     for (var i = 0; i < boats.length; i++) { //loop ou laço de repetição
          Matter.Body.setVelocity(boats[i].body, {x: -0.9, y: 0 });//velocidade do navio no eixo x
          boats[i].display(); //mostra os barcos já criado
        }
      } else {
        var boat = new Boat(width, height - 100, 200, 200, -100); //cria um novo barco
        boats.push(boat); //adiciona o barco ao indice
      }
    }
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}
