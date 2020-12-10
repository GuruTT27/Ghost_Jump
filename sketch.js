var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost, ghostJump, ghostIm;
var door, doorIm;
var climber, climberIm;
var tower, towerIm;
var doorGroup;
var climberGroup;
var invisibleBlockGroup, invisibleBlock;

function preload() {

  ghostIm = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");
  doorIm = loadImage("door.png");
  climberIm = loadImage("climber.png");
  towerIm = loadImage("tower.png");

}

function setup() {

  createCanvas(600, 600);

  tower = createSprite(300, 300, 20, 20);
  tower.addImage(towerIm);
  tower.velocityY = 1;

  ghost = createSprite(150, 300, 10, 10);
  ghost.addImage(ghostJump);
  ghost.addImage(ghostIm);
  ghost.scale = 0.3;

  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleBlockGroup = createGroup();

}

function draw() {

  background(0)

  if (gameState === PLAY) {

    if (keyDown("right_arrow")) {

      ghost.x = ghost.x + 4;

    }

    if (keyDown("left_arrow")) {

      ghost.x = ghost.x + -4;

    }

    if (keyDown("space")) {

      ghost.velocityY = -10;

    }

    if (tower.y > 300) {

      tower.y = tower.y / 2;

    }
    
    if(ghost.y < 0) {
      
      ghost.velocityY = 0;
      
    }
    
    if (ghost.y > 600){
      
      ghost.velocityY = -10;
      
    }

    if (ghost.isTouching(climberGroup)) {

      ghost.velocityY = 0;
           
    }
    
    if (ghost.isTouching(invisibleBlockGroup)) {

      ghost.velocityY = 0;
      ghost.velocityX = 0;       
      gameState = END;

    }

    spawnDoors();

    ghost.velocityY = ghost.velocityY + 0.8;

    drawSprites();
  }
  
  else if (gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}

function spawnDoors() {

  if (frameCount % 200 === 0) {

    door = createSprite(120, -50, 10, 10);
    door.addImage(doorIm);
    door.x = Math.round(random(150, 450))
    door.velocityY = 1;
    door.lifetime = 800;
    doorGroup.add(door);
    ghost.depth = door.depth + 1;

    climber = createSprite(120, 20, 20, 20);
    climber.addImage(climberIm);
    climber.velocityY = 1;
    climber.x = door.x;
    //climber.debug = true;
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

  }

}