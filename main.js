var pre_1="";
var pre_2="";

Webcam.set({
width:350,
height:300,
image_format:"png",
png_quality:90
});

var cam=document.getElementById("cam");
Webcam.attach("#cam");

function take_snapshot(){

Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='image_n' src='"+data_uri+"'>";
});

}

console.log("ml5 version",ml5.version);

var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/b9iD_F-v2/model.json",modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}

function speak(){
var synth=window.sppechSynthesis;
var speak_data1="the first prediction is "+pre_1;
var speak_data2="the second prediction is "+pre_2;
var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis);
}

function check(){
    var img=document.getElementById("image_n");
    classifier.classify(img,gotResult);
}

function gotResult(error,results) {
  if(error)  {
      console.error(error);
  } 

  else{
   console.log(results);
   document.getElementById("result_name_1").innerHTML=results[0].label;
   document.getElementById("result_name_2").innerHTML=results[1].label;
   pre_1=results[0].label;
   pre_2=results[1].label;
   speak();
   if(results[0].label=="Happy"){
     document.getElementById("emoji1").innerHTML="&#128522;";
   }
   if(results[0].label=="Sad"){
    document.getElementById("emoji1").innerHTML="&#128532;";
  }
  if(results[0].label=="Angry"){
    document.getElementById("emoji1").innerHTML="&#128548;";
  }

  if(results[1].label=="Happy"){
    document.getElementById("emoji2").innerHTML="&#128522;";
  }
  if(results[1].label=="Sad"){
   document.getElementById("emoji2").innerHTML="&#128532;";
 }
 if(results[1].label=="Angry"){
   document.getElementById("emoji2").innerHTML="&#128548;";
 }

  }
}