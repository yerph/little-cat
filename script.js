/* 统计用计数器 */
let lickCnt = 0;     // 舔的次数
let clampCnt = 0;    // 夹的次数
let violateCnt = 0;  // 违令次数
let shootCnt = 0;    // 射出的次数（如果你以后加）

let obey=0, blush=0, pendingCmd='', cd, cdTimer, punishTimer;

const gate=document.getElementById('gate');
const panel=document.getElementById('panel');
const obeyBar=document.getElementById('barObey');
const blushBar=document.getElementById('barBlush');
const status=document.getElementById('status');
const logElem=document.getElementById('log');
const confirmMask=document.getElementById('confirmMask');
const cmdTitle=document.getElementById('cmdTitle');
const countdown=document.getElementById('countdown');
const punishMask=document.getElementById('punishMask');
const punishTimerElem=document.getElementById('punishTimer');

function checkCode(){
  if(document.getElementById('code').value.trim()==='璃，我已就绪'){
    gate.style.display='none';panel.style.display='block';
  }else alert('口令错误，重输。');
}

function askConfirm(cmd){
  pendingCmd=cmd;
  cmdTitle.textContent='执行「'+cmd+'」？';
  cd=5; countdown.textContent=cd;
  confirmMask.style.display='flex';
  cdTimer=setInterval(()=>{ cd--; countdown.textContent=cd;
    if(cd===0){clearInterval(cdTimer);submitChoice(false);} },1000);
}

function submitChoice(obeyChoice){
  clearInterval(cdTimer);
  confirmMask.style.display='none';
  if(obeyChoice){ doObey(pendingCmd); }
  else          { doPunish('违抗：'+pendingCmd); }
}

function doObey(cmd){
  addLog('服从：'+cmd);
  status.textContent='执行中：'+cmd;
  obey=Math.min(100,obey+10);
  blush=Math.min(100,blush+5);
  updateBars();
}

function doPunish(msg){
  addLog(msg);
  status.textContent='惩罚中';
  punishMask.style.display='flex';
  let t=30; punishTimerElem.textContent=t;
  punishTimer=setInterval(()=>{ t--; punishTimerElem.textContent=t;
    if(t===0){clearInterval(punishTimer);punishMask.style.display='none';status.textContent='等待主人指令';}
  },1000);
}

function updateBars(){
  obeyBar.style.width=obey+'%';
  blushBar.style.width=blush+'%';
  const clr=blush<50?'#66c':(blush<80?'#f79':'#f22');
  obeyBar.style.background=clr;
  blushBar.style.background='#f38';
}

function addLog(txt){
  const p=document.createElement('p');p.textContent=txt;logElem.appendChild(p);
}
const catImg = document.getElementById('catImg');
