status="";
objects=[];
function preload(){
}
function setup(){
    //770,480
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded(){
    console.log("CocoSSD is initialized");
    status=true;
}
function gotResults(error,results){
    if(error){
console.error(error);
    }
    else{
console.log(results);
objects=results;
    }
}
function draw(){
    image(video,0,0,300,300);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        document.getElementById("num_of_obj").innerHTML="The number of objects detected are:"+objects.length;
        objectDetector.detect(video,gotResults);
      for (i= 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML="Staus:Object Detected!";
          percent= Math.floor(objects[i].confidence*100);
          fill(r,g,b)
          text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
    }
}