const canvas=document.getElementById("board");
const ctx=canvas.getContext("2d");

const size=15;
const cell=40;

let board=[];
let backupBoard=[];

let mode="place";
let turn=1; //1黒 2白

for(let y=0;y<size;y++){
 board[y]=[];
 for(let x=0;x<size;x++){
  board[y][x]=0;
 }
}

updateStatus();
drawBoard();

canvas.addEventListener("click",e=>{

 if(mode!=="place")return;

 const rect=canvas.getBoundingClientRect();

 const x=Math.floor((e.clientX-rect.left)/cell);
 const y=Math.floor((e.clientY-rect.top)/cell);

 if(board[y][x]!==0)return;

 board[y][x]=3; //量子石

 turn=turn===1?2:1;

 drawBoard();
 updateStatus();
});

function setMode(m){
 mode=m;
 updateStatus();

 if(mode==="observe"){
  observe();
 }
}

function observe(){

 backupBoard=JSON.parse(JSON.stringify(board));

 animateObserve(0);
}

function animateObserve(step){

 if(step<10){
  drawBoard(true);
  setTimeout(()=>animateObserve(step+1),100);
  return;
 }

 for(let y=0;y<size;y++){
  for(let x=0;x<size;x++){

   if(board[y][x]===3){
    board[y][x]=Math.random()<0.5?1:2;
   }
  }
 }

 drawBoard();

 if(checkWin()){
  alert("勝利："+(turn===1?"白":"黒"));
 }else{
  board=backupBoard;
  drawBoard();
 }

 turn=turn===1?2:1;
 mode="place";
 updateStatus();
}

function drawBoard(flash=false){

 ctx.clearRect(0,0,600,600);

 for(let i=0;i<size;i++){

  ctx.beginPath();
  ctx.moveTo(cell/2,cell/2+i*cell);
  ctx.lineTo(cell/2+(size-1)*cell,cell/2+i*cell);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cell/2+i*cell,cell/2);
  ctx.lineTo(cell/2+i*cell,cell/2+(size-1)*cell);
  ctx.stroke();
 }

 for(let y=0;y<size;y++){
  for(let x=0;x<size;x++){

   if(board[y][x]===0)continue;

   ctx.beginPath();
   ctx.arc(cell/2+x*cell,cell/2+y*cell,15,0,Math.PI*2);

   if(board[y][x]===3){
    ctx.globalAlpha=0.5;
    ctx.fillStyle=flash
     ?(Math.random()<0.5?"black":"white")
     :(turn===1?"black":"white");
   }

   if(board[y][x]===1){
    ctx.fillStyle="black";
   }

   if(board[y][x]===2){
    ctx.fillStyle="white";
   }

   ctx.fill();
   ctx.globalAlpha=1;
   ctx.stroke();
  }
 }
}

function checkWin(){

 const dirs=[[1,0],[0,1],[1,1],[1,-1]];

 for(let y=0;y<size;y++){
  for(let x=0;x<size;x++){

   const c=board[y][x];
   if(c===0||c===3)continue;

   for(const d of dirs){

    let count=1;

    for(let i=1;i<5;i++){

     const nx=x+d[0]*i;
     const ny=y+d[1]*i;

     if(nx<0||ny<0||nx>=size||ny>=size)break;

     if(board[ny][nx]===c){
      count++;
     }else{
      break;
     }
    }

    if(count>=5)return true;
   }
  }
 }

 return false;
}

function updateStatus(){

 document.getElementById("status").innerText=
  "ターン:"+(turn===1?"黒":"白")+
  " | モード:"+mode+
  " | 量子石を置いて観測で確定";
}
