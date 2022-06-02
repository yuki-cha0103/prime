let view = 0;//display 0 pre 1 game 2 phone 3 end
let select = 0;//hyouzi
let winx,winy;//windowSize
let adj = 0;
let times = 0;let level
let timemove = false;
let stage = 0;
let inp;
let qua = 0;
let redcol = 0;
let miss;
let misstext;
let prime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]
let pre = [[2,3,5],[7,11,13],[17,19,23],[29,31,37],[41,43,47]] 
let alpha = new Map()
alpha.set(1,[3,4])
alpha.set(2,[4,4])
alpha.set(3,[4,5])
alpha.set(4,[5,5])
alpha.set(5,[5,5])

function preload(){
  se1 = loadSound("https://yuki-cha0103.github.io/pi/files/o.mp3")
}

function setup() {
  createCanvas(200,200);
  frameRate(60)
}

function draw() {
  if(redcol > 0){
    redcol -= 1
  }
  if(view == 0){
    background(220);
    winx = windowWidth;
    winy = windowHeight;
    textSize(30)
    textAlign(CENTER)
    fill(0)
    text("click to start" , 100,100)
  }else if(view == 1){
    gamepc()
  }else if(view == 2){
    gamephone()
  }else if(view == 3){
    end()
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);//max size view
}

function mousePressed(){
  times = 0
  timemove = false
  inp = 0
  qua = 0
  
if(adj == 0){
  windowResized()
  adj = 1;
  //gamemode
  if(winx > winy){
    view = 1
    //modepc
  }else if(winx <= winy){
    view = 2
    //modephone
}
}
//button
}

function gamepc(){//pcmode
  background(20);
  if(timemove){
    times += 1
  }
  if(select == 0){//select
    squara(winx/2,winy/2,winx*0.8,winy*0.8,80)
    let l1,levtext;
    for(let i = 0;i<=5;i++){//i + 1 == level
      let x1,y1
      if((i % 2 ) != 0){
        x1 = 0.6
      }else{x1 = 0.2}
      y1 = (int(i/2)+1)*0.23
      //itityousei
      if(i != 5){
        levtext = "level "+(i + 1);
      }else if(i == 5){levtext = "ENDLESS"}
      buttonpc(l1,levtext,winx*x1,winy*y1,winx*0.2,winx*0.05,i + 1)
    }

  }else if(select == 1){//game
    timemove = true
    fail()
    squara(winx/2,winy*0.25,winx*0.75,winy*0.20,255);
    textall(qua,winy*0.1,winx/2,winy*0.33,CENTER,0)//quastion
    textall(inp,winy*0.15,winx/2,winy*0.5,CENTER,255)
    if(miss == 15){
      miss = 0
      misstext = "素数でない、もしくはこのゲームで使わない範囲の素数"
      inp = 0
      redcol = 255
    }
    //syuuryou
    if(stage == 6){
      select = 0
      level = 0
      view = 3
      adj = 0
      stage = 0
    }
    //createqua
    if(qua == 0){
      if(level <= 5){
        qua = 1
        stage += 1
        if(stage <= 4){
          let xx = alpha.get(level)[0]//kakerukazu
          for(let c=0;c < xx;c++){
          qua = qua * createPrime(level)
        }
        }else if(stage == 5){
          let xx = alpha.get(level)[1]//kakerukazu
          for(let c=0;c < xx;c++){
          qua = qua * createPrime(level)
          }
        }
    }else if(level == 6){
      if(!qua || qua == 0){
        qua = 1
        for(let c =0;c <= 5;c++){
          qua = qua * int(random(prime))
        }
      }
    } 
  }
}
}

function gamephone(){//phonemode
  background(20);
}

function end(){
  background(255)
  timemove = false
  textall("クリア\nおめでとう\n" + times/60 + "秒",winx*0.02,winx/2,winy/2,CENTER,0)
}

function inputs(num){
  if(!inp){
    inp = 0
  }
if(num != "Enter"){
  num = int(num)
  inp = inp * 10
  inp += num
}else if(num == "Enter"){
  miss = 0;
  for(let i =0;i < prime.length; i++){
    if(inp == prime[i]){
      if(qua/inp == int(qua/inp)){
        qua = qua / inp
        inp = 0
        se1.play()
        if(qua == 1){
          qua = 0
        }
      }else{misstext = "miss";redcol = 255;fail();inp = 0}
    }else{miss += 1}
  }
}
}

function keyTyped(){
  if(key + 1 > 0){
    inputs(key)
  }if(key == "Enter"){
    inputs("Enter")
  }
}

//functions-----------
function squara(x,y,w,h,col,strokeA){
fill(col)
stroke(0)
if(strokeA){
  stroke(strokeA)
}
rect(x-w/2,y-h/2,w,h)
}//createSquara

function textall(textA,sizeA,x,y,align,col){
textAlign(LEFT)
fill(0)
if(align){
  textAlign(align)
}
if(col){
  fill(col)
}
textSize(sizeA)
text(textA,x,y)
}//EZtext

function buttonpc(name,textA,x,y,w,h,fun){
name = new Clickable();
name.locate(x, y);
name.resize(w, h);
name.text = textA;  
name.cornerRadius = 2;  
name.draw();
name.onPress = function(){
  level = fun
  select = 1
}
}

function createPrime(l){
  return pre[int(random(0,l))][int(random(0,3))]
}

function fail(){
fill(redcol,0,0)
textSize(winx*0.02)
textAlign(CENTER)
text(misstext,winx/2,winy*0.7)
}