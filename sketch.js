var PLAY = 1;
var END = 0;
var gameState = PLAY;

//adding variables
var climber, climberImg;
var ghost, ghostImg;
var door,doorImg;
var tower, towerImg;
var spooky;
var invisibleBlock;
var climberGroup;
var doorGroup;
var invisibleBlockGroup;

function preload(){
    //inserting images and sounds
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostImg = loadImage("ghost-jumping.png");
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  spooky = loadSound("spooky.wav");
}

function setup(){
    //creating the sprites
  createCanvas(600,600);
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImg);
   
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  climberGroup = createGroup()
  doorGroup = createGroup()
  invisibleBlockGroup = createGroup()
}

function draw(){
  
  if(gameState===PLAY){
    
    //making the tower move downwards
  tower.velocityY=1;
  if(tower.y>600){
  tower.y = 300;
  }
  
  if(keyDown("left")){
  ghost.x = ghost.x-3;
  }
   
  if(keyDown("right")){
  ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
  ghost.velocityY = -2;
  }
  
  ghost.velocityY = ghost.velocityY+0.5;
  
    //calling the functions
  spawnDoors()
    
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
   
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState = END;
      ghost.destroy();
    }
  drawSprites()
  } 
   if(gameState===END){
     textSize(50);
     text("GAME OVER",100,300);
     }
  }

function spawnDoors(){
  
  if(frameCount%250===0){
  doors = createSprite(200,10,10,10);
  doors.addImage(doorImg);
  doors.velocityY = 2;
  doors.x = Math.round(random(100,500));
    
  climber = createSprite(200,60,10,10);
  climber.addImage(climberImg);
  climber.velocityY = 2;
  climber.x = doors.x;
    
  invisibleBlock =  createSprite(200,70,10,10);
  invisibleBlock.velocityY = 2;
  invisibleBlock.x = doors.x;
  invisibleBlock.width = climber.width;
  invisibleBlock.visible = false;
    
  doorGroup.add(doors);
  climberGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
    
  climber.lifetime = 400;
  doors.lifetime = 400;
  invisibleBlock.lifetime = 400;
  }
}








