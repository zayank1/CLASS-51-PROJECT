var  superman;
var supermanImg, supermanflyImg, superman2Img
var superman3Img
var coinImg
var points = 0
var laserGroup, coinsGroup
var resetBtnImg, resetBtn
var gameState = 0
var laser


function preload(){

supermanImg = loadImage("supermanstanding.png")
supermanflyImg = loadImage("superman.png")
superman2Img = loadImage("superman2.png")
superman3Img = loadImage("superman3.png")
laserImg = loadImage("laser.png")
laser2Img = loadImage("laser2.png")
coinImg = loadImage("coin.png")
resetBtnImg = loadImage("resetBtn.png")
}

function setup() {
  createCanvas(1600,800);
 
 
  superman = createSprite(80,680,20,20)
superman.addImage(supermanImg)
superman.scale = 0.2
superman.debug = true
superman.setCollider("rectangle",0,0,200,200)

laserGroup = new Group()
coinsGroup = new Group()

}

function draw() {
  background("blue");  
  drawSprites();
  if(gameState === 0){
    handlePlayerControls()
    HandlePlayerCollision()
     createLasers()
     createCoins()
  }
  
  if(gameState === 1){
    superman.visible = false
    resetBtn = createSprite(1500,100,20,20)
    resetBtn.addImage(resetBtnImg)
    resetBtn.scale = 0.3
    resetBtn.visible = true
    coinsGroup.lifetime = 0
    laserGroup.lifetime = 0

  
    if(mousePressedOver(resetBtn)){
   gameState = 0
   superman.x = 80
  superman.y = 680
  superman.visible =true
  resetBtn.visible = false
  points = 0
    }
  
  }


textSize(30)
fill("green")
text("POINT: "+points,700,50)

  console.log(points) 
}

function handlePlayerControls(){
if(keyDown("up")){
  superman.y-=5
  superman.addImage(supermanflyImg)
  superman.scale = 0.3
}

if(keyDown("left")){
  superman.x-=5
  superman.addImage(superman2Img)
  superman.scale = 0.3
}
  if(keyDown("right")){
    superman.x+=5
    superman.addImage(supermanflyImg)
    superman.scale = 0.3
  }
if(keyDown("down")){
  superman.y+=5
  superman.addImage(superman3Img)
  superman.scale = 0.3
}


}







function createLasers(){
if(frameCount%60 === 0){
  var x = Math.round(random(1700,2200))
  var y = Math.round((random(50,750)))
 laser = createSprite(x,y,300,10)
laser.debug = true

var rand = Math.round(random(1,2))
laser.velocityX = -5
laser.lifetime = 380



switch(rand){
case 1: laser.addImage(laserImg)
break;
case 2: laser.addImage(laser2Img)
break;
default: break;
}
if(rand === 1){
  laser.setCollider("rectangle",0,0,300,10)
}
else{
  laser.setCollider("rectangle",0,0,10,300)
}
  laserGroup.add(laser)
}




}

function createCoins(){
  if(frameCount%60 === 0){
  var x = Math.round(random(1700,2200))
  var y = Math.round(random(50,750))
    var coins = createSprite(x,y,10,10)
  coins.addImage(coinImg)
  coins.velocityX = -5
  coins.scale = 0.2
  coins.lifetime = 380
  
  coinsGroup.add(coins)
  
  }
  
  
  }
  
  function HandlePlayerCollision(){
    if(coinsGroup.isTouching(superman)){

      for(var i=0;i<coinsGroup.length;i++){     
           
       if(coinsGroup[i].isTouching(superman)){
            coinsGroup[i].destroy()
     
    points+=1
            } 
      
      }
     }

     if(laserGroup.isTouching(superman)){

      for(var i=0;i<laserGroup.length;i++){     
           
       if(laserGroup[i].isTouching(superman)){
        gameState = 1
    
            } 
      
      }
     }

  }


 

 



