var bgImg;
var x1 = 0;
var x2;
var scrollSpeed = 1;
var foodsGroup,food1,food2,food3;
var fishpos 
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var fish;
var foodSprites = [];
var obstacleSprites = [];
var health = 50;
function preload(){
	bgImg = loadImage("background.png");
   fishImg =  loadImage("fish.png");
   plasticbottle = loadImage("bottle.png");
   plasticbag = loadImage("bag.png");
   plasticstraw = loadImage("straw.png");
    worm = loadImage("worm.png");
    octopus = loadImage("octopus2.png");
    corn = loadImage("corn.png");
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
 fishpos = windowHeight/2;
  foodsGroup = new Group();
  obstaclesGroup = new Group();
  x2 = width;
   fish = createSprite(100,100,100,100);
    fish.addImage(fishImg);
    fish.depth = bgImg.depth+1;
    
    fish.scale = 0.2;
} 
function draw() { 
   
   image(bgImg, x1, 0, width, height);
   image(bgImg, x2, 0, width, height);
   //image(fishImg,50,fishpos,100,100);
  console.log(health);
   
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  if(keyIsDown(UP_ARROW)&&fishpos>7){
      fishpos -= 7;
  }
  if(keyIsDown(DOWN_ARROW)&&fishpos<windowHeight*3/4){
      fishpos += 7;
  }
  fish.position.y = fishpos;

  for( i = 0 ; i < foodSprites.length; i++){
  if(fish.isTouching(foodSprites[i])){
   health +=5;
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

////////////////
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
  
spawnFood();
spawnObstacles();
drawSprites();
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
      case 3: food.addImage(corn);
              break;
    
     // case 5: food.addImage(burst);
              default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    food.scale = 0.2;
    food.lifetime = 1000;
    //add each obstacle to the group
    foodSprites.push(food);
  }
}