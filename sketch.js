var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed,feedTheDog;
var feedTime;
var time = null;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(760,95);
  addFood.mousePressed(addFoods);

  feedTheDog=createButton("Feed the  Dog");
  feedTheDog.position(850,95);
  feedTheDog.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

  //function to read food Stock

  //write code here to update food stock and last fed time

  //function to add food in stock
 
  fill(0);
  textSize(20);
if(lastFed>=12){
  text("Last Feed :"+ hour(),200,25);
 }
 else if(lastFed===0){
   text("Last Feed  : 12 AM",200,25);
}
else{
  text("Last Feed  :" + hour(),200,25);
}


drawSprites();
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedFoods(){
  foodS=foodS-1;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  
}


function feedDog(){
  dog.addImage(happyDog);
  feedTheDog.mousePressed(feedFoods);

  
 var foodStockVal=foodObj.getFoodStock();
 if(foodStockVal<=0){
   foodObj.updateFoodStock(foodStockVal*0);
 } 
 else{
  foodObj.updateFoodStock(foodStockVal-1);
 }

}