const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const size = 15;
const cell = 40;

let quantumMoves = [];

drawBoard();

canvas.addEventListener("click", e => {

 const rect = canvas.getBoundingClientRect();

 const x = Math.floor((e.clientX - rect.left) / cell);
 const y = Math.floor((e.clientY - rect.top) / cell);

 quantumMoves.push({x,y});

 drawStone(x,y);
});

function drawBoard(){

 for(let i=0;i<size;i++){

  ctx.beginPath();
  ctx.moveTo(cell/2, cell/2+i*cell);
  ctx.lineTo(cell/2+(size-1)*cell, cell/2+i*cell);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cell/2+i*cell, cell/2);
  ctx.lineTo(cell/2+i*cell, cell/2+(size-1)*cell);
  ctx.stroke();
 }
}

function drawStone(x,y){

 ctx.globalAlpha = 0.5;

 ctx.beginPath();
 ctx.arc(cell/2+x*cell, cell/2+y*cell, 15,0,Math.PI*2);
 ctx.fill();

 ctx.globalAlpha = 1;
}
