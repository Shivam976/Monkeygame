var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var survivalTime;
var invisibleGround;
var score;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {

  ground = createSprite(200, 350, 500, 10)
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)

  monkey = createSprite(150, 290, 20, 20)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.2
  obstacleGroup = createGroup();
  foodGroup = createGroup();

  invisibleGround = createSprite(200, 360, 500, 10)
  invisibleGround.visible = false;
  
  
  
  score=0;
  
}


function draw() {
  background(225);
  monkey.collide(invisibleGround);
  text("Score: " + score, 300, 50);
  if (ground.x < 200) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -8

  }
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score=score+1;
  }

  if (monkey.isTouching(obstacleGroup)) {
  obstacleGroup.destroyEach();
  score=score-1;
  

  }


  monkey.velocityY = monkey.velocityY + 0.8
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50)
  Bananas();
  Obstacles();

  drawSprites();

}

function Bananas() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400, Math.round(random(150, 20)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.setLifetime = 200
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function Obstacles() {
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(400, 310, 10, 10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.setLifetime = 200
    obstacleGroup.add(obstacle);

  }
}