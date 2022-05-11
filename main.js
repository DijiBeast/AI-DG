scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
function preload()
{
     song = loadSound("music.mp3");
}


function setup()
{
    canvas = createCanvas(500, 500)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded!!!");
}



function draw()
{
    image(video, 0, 0, 500, 500);
    fill("#fcdf03");
    stroke("#4503fc");
    if(scoreLeftWrist > 0.2)
    {
    circle(leftwristX, leftwristY, 30);
    InNumberleftwristY = Number(leftwristY);
    removeDecimals = floor(InNumberleftwristY);
    Volume = removeDecimals/500;
    document.getElementById("volume").innerHTML = "Volume " + Volume;
    song.setVolume(Volume);
    }
}
                                                                 

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristX = results[0].pose.leftWrist.y;


        rightwristX = results[0].pose.rightWrist.x;
        rightwristX = results[0].pose.rightWrist.y;
        console.log("Left wrist x = " + leftwristX + " Left wrist y = " + leftwristY);
        console.log("Right wrist x = " + rightwristX + " Right wrist y = " + rightwristY);


        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left wrist score = " + scoreLeftWrist + " Right wrist score = " + scoreRightWrist);
    }
}