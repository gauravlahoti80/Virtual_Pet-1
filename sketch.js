var  dog_img,dog,happyDog,database,foodS,foodStock;
foodstk = 20;
gameState  = "PLAY";
function preload(){
  dog_img = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup(){
    database = firebase.database();
    console.log(database);

    canvas = createCanvas(600,500);
    dog = createSprite(250,250,10,10);
    dog.addImage(dog_img);
    dog.scale = 0.2;

    var foodStock = database.ref('Food');
    foodStock.on("value",readStock);
}

function draw(){
    background(46,139,87);
    if (gameState === "PLAY"){
    if (keyWentDown(UP_ARROW)){
      foodstk = foodstk - 1;
      //writeStock(foodS);
      dog.addImage(happyDog);
    }
  }

    if (foodstk === 0){
      gameState = "END";
      textSize(18);
      strokeWeight(2.5)
      stroke("black")
      fill("white");
      text("No more Food to feed the pet.....",40,350);
    }

    if (gameState === "END"){
      foodstk = 0;
      dog.visible = false;
      textSize(18);
      strokeWeight(2.5)
      stroke("black")
      fill("white");
      text("GameEnd...your Dog has Died because of Hunger...",40,370);
    }
    drawSprites();
    textSize(18);
    strokeWeight(2.5)
    stroke("black")
    fill("white");
    text("FoodStocks Remaining:" + foodstk , 40,150);
    text("Press Up_Arrow to feed the dog and Press Down to come back",40,125);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x+1;
  }
    database.ref('/').update({
        Food : x
    })
}

function readStock(data){
    foodS = data.val();
}