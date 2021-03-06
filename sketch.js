var dog;
var database;
var happyDog;
var foodStock;
var dogIMG;
var foodS;
var lastFed;

function preload()
{
dogIMG=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(800, 700);
  food=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)


  dog=createSprite(800,200,150,150)
  dog.addImage(dogIMG);
  dog.scale=0.15;

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  
  textSize(20);
}


function draw() {  
background(46,139,87)

food.display()
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed=data.val();
})
fill(255,255,254)
textSize(15)
if(lastFed>=12){
text("Last Feed:"+lastFed%12+"PM",350,30)
}
else if(lastFed==0){
text("Last Feed:12:00 AM",350,30)
}
else{
text("Last Feed:"+lastFed+"AM",350,30)
}
}

function readStock(data){
foodS=data.val();
food.updateFoodStock(foodS)
}

function feedDog(){
dog.addImage(happyDog)
if(food.getFoodStock()<=0){
food.updateFoodStock(food.getFoodStock()*0)
}
else{
food.updateFoodStock(food.getFoodStock()-1)
}
database.ref('/').update({
Food:food.getFoodStock(),
FeedTime:hour()
})
}

function addFoods(){
foodS++
database.ref('/').update({
Food:foodS
})
}