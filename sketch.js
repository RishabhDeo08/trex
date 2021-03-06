var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var gameState="start"
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOverImg,restartImg,gameOver,restart;
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided)
  trex.scale = 0.5;
  gameOver=createSprite(250,50,10,10)
  restart=createSprite(250,100,10,10)
  gameOver.addImage(gameOverImg)
  restart.addImage(restartImg)
  restart.scale=0.5
  restart.visible=false
  gameOver.visible=false
  
  ground = createSprite(width/2,height-80,width,2);
  
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  if (gameState=="start") {
    ground.velocityX=-(4+3*score/100)
      
  score = score + Math.round(getFrameRate()/60);
  
  
  if(touches.length>0 ||keyDown("space")&& trex.y>225) {
    trex.velocityY = -15;
    touches=[]
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (trex.isTouching(obstaclesGroup)){
    trex.changeAnimation("trex_collided",trex_collided)
    gameState="end"
  }
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  }
  if (gameState=="end"){
      ground.velocityX=0
      trex.velocityY=0
      obstaclesGroup.destroyEach()
      cloudsGroup.destroyEach()
      obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    score=0
     restart.visible=true
  gameOver.visible=true
    if (touches.length>0||mousePressedOver(restart)){
      restart.visible=false
      gameOver.visible=false
      gameState="start"
      trex.changeAnimation("running",trex_running)
      touches=[]
      }}
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(3+3*score/100)
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,10,40);
    obstacle.velocityX = -(4+4*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}