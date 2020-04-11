

var bgImg;
var x1 = 0;
var x2;
var scrollSpeed = 1;
var foodsGroup,food1,food2,food3;
var fishpos 
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var fish,fishani,fisheat2;
var foodSprites = [];
var obstacleSprites = [];
var bubbles = [];
var health = 50;
var gameState  = 0;
function preload(){
  fishani =  loadAnimation("fishflapp.png","fishidle.png");
  
  fish_eat = loadImage("fisheat.png");
  bubble = loadImage("bubble.png");
  bgImg = loadImage("background.png");
 fishimg = loadImage("fisheat.png");
   plasticbottle = loadImage("bottle.png");
   plasticbag = loadImage("bag.png");
   plasticstraw = loadImage("straw.png");
    worm = loadImage("worm.png");
    octopus = loadImage("octopus.png");
    corn = loadImage("corn.png");
   
    
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
 fishpos = windowHeight/2;
  foodsGroup = new Group();
  obstaclesGroup = new Group();
  x2 = width;
   fish = createSprite(100,100,100,100);
   fish.addAnimation("v",fishani);
   
    fish.depth = bgImg.depth+1;
    
    fish.scale = 0.2;
} 
function draw() { 
   
   image(bgImg, x1, 0, width, height);
   image(bgImg, x2, 0, width, height);
  
  console.log(health);
   
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  if(keyIsDown(UP_ARROW)&&fishpos>5 && gameState === 0){
      fishpos -= 7;
  }
  if(keyIsDown(DOWN_ARROW)&&fishpos<windowHeight*3/3 && gameState === 0){
      fishpos += 7;
  }
  fish.position.y = fishpos;
  
  for( i = 0 ; i < foodSprites.length; i++){
  if(fish.isTouching(foodSprites[i])){
   health +=5;
    fish.addImage(fish_eat);
    foodSprites[i].remove();
    foodSprites.splice(i,1);
    i = i-1;
    
    
  }
  else if(foodSprites[i].x < fish.x - 100){
    foodSprites[i].remove();
    foodSprites.splice(i,1);
    i = i - 1;
  }
}


for( i = 0 ; i < obstacleSprites.length; i++){
  if(fish.isTouching(obstacleSprites[i])){
   health -= 5;

    obstacleSprites[i].remove();
    obstacleSprites.splice(i,1);
    i = i-1;
    
    
  }
  else if(obstacleSprites[i].x < fish.x - 100){
    obstacleSprites[i].remove();
    obstacleSprites.splice(i,1);
    i = i - 1;
  }
}
 
if(health < 1){
 
 gameState  = 1;
 textSize(50);
 fill("red");
 text("The fish is dead", windowWidth/2, windowHeight/2);
 text ( "press 'r' to restart",windowWidth/2, windowHeight/2 +70);
 fish.mirrorY( -1);
fish.addImage(fish_eat);
}
  if(health > 1){
textSize(35);
fill("purple");
    text(health,windowWidth/2 + 400,windowHeight/2 - 300);
  }
spawnFood();
spawnObstacles();
drawSprites();
if(frameCount % 40 === 0 && health > -1) {
health -= 2;
}
if(gameState  === 1 && keyDown(82)){
  gameState = 0;
 health = 50;
 fish.mirrorY( 1);
 fish.addAnimation(fishani);
spawnFood();
spawnObstacles();
spawnBubble();
drawSprites();

}
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
    obstacle.velocityX = -2;
    if(frameCount%60===0){
      obstacle.velocityX = obstacle.velocityX - 0.5;
    }
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(plasticbag);
              break;
      case 2: obstacle.addImage(plasticbottle);
              break;
      case 3: obstacle.addImage(plasticstraw);
              break;
              default: break;
    }
  
           
    obstacle.scale = 0.2;
    obstacle.lifetime = 1000;
  
    obstacleSprites.push(obstacle);
  }
}
function spawnFood() {
  if(frameCount % 200 === 0) {
    var food = createSprite(random(windowWidth/2,windowWidth),random(0,windowHeight),10,40);
    food.velocityX = -2;
    if(frameCount%200===0){
      food.velocityX = food.velocityX - 0.5;
    }
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: food.addImage(worm);
              break;
      case 2: food.addImage(octopus);
              break;
      case 3: food.addImage(worm);
        
              break;
            default: break;
    }
    
       
    food.scale = 0.2;
    food.lifetime = 1000;
    
    foodSprites.push(food);
  }
}
function spawnBubble() {
  if(frameCount % 200 === 0) {
    var bubble = createSprite(random(windowWidth/2,windowWidth),random(0,windowHeight),10,40);
    bubble.velocityY = -2;
    if(frameCount%100===0){
      bubble.velocityX = bubble.velocityX - 0.5;
    }
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: bubble.addImage(bubble);
              break;
      case 2: bubble.addImage(bubble);
              break;
     default: break;
    }
    
       
    bubble.scale = 0.2;
    bubble.lifetime = 1000;
    
   bubbles.push(bubble);
  }
}
