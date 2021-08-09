var balloon;
var database, balloonPosition;

function preload(){
    database = firebase.database();
    backgroundImg = loadImage("bg.png");
    hotairballoon = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")

}

function setup() {
  createCanvas(1000,640);
  balloon = createSprite(500,300, 50, 50);
  balloon.addAnimation("hotairballoon", hotairballoon);   
  balloon.scale = 0.2;


  var balloonPosition = database.ref("Balloon/Position");
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
    balloon.position.x+=-10
  writePosition(-10, 0);
  }

  if(keyDown(RIGHT_ARROW)){
    balloon.position.x+=10
    writePosition(10, 0);
                                                              
  }

  if(keyDown(UP_ARROW)){
    if (balloon.scale <1){ writePosition(0, -10); }
    if (balloon.scale >0.2){ balloon.scale = balloon.scale-0.05;}
    balloon.position.y+=-10
  } 

  if(keyDown(DOWN_ARROW)){ writePosition(0, 10);
    if (balloon.scale <0.5){ balloon.scale = balloon.scale+0.05; }
    balloon.position.y+=10
  }

  drawSprites();
}

function readPosition(data){
position = data.val();
}

function writePosition(x, y){
database.ref('Balloon/Position').set({
  'x': balloon.position.x + x,
  'y': balloon.position.y + y,
})
}

function showError(){
  console.log("error");
}