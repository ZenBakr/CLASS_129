song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreL = 0;
function preload()
{
    song = loadSound("music.mp3") 
}

function setup()
{
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose", gotPoses)
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " , leftWristY = " + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " , rightWristY = " + rightWristY);
        scoreL=results[0].pose.keypoints[9].score;
        console.log("Score of the left wrist = " + scoreL);
    }
}
function modelLoaded()
{
    console.log("PoseNet is initialized");
}
function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreL>0.2)
    {
    circle(leftWristX,leftWristY,20);
    a=Number(leftWristY);
    b=floor(a);
    c=b/500;
    document.getElementById("volume").innerHTML="Volume : " + c;
    song.setVolume(c);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}