/* 成就字典：key → {unlocked, icon, check()} */
const ACHIEVEMENTS = {
  obey10: {
    unlocked:false,
    icon:'img/badge_obey10.png',
    check: ()=> lickCnt + clampCnt >= 10     // 连续服从 10 次
  },
  violate1:{
    unlocked:false,
    icon:'img/badge_violate1.png',
    check: ()=> violateCnt >= 1              // 首次违抗
  },
  blush100:{
    unlocked:false,
    icon:'img/badge_blush100.png',
    check: ()=> blush === 100                // 脸红度满
  },
  combo3:{
    unlocked:false,
    icon:'img/badge_combo3.png',
    check: ()=> lastCombo === '张嘴>夹紧10秒>不准射' // 连招
  }
};

/* ── 全局数据 ──────────────────────────── */
let obey = 0, blush = 0;
let lickCnt = 0, clampCnt = 0, violateCnt = 0, shootCnt = 0;

let pendingCmd = '', cd = 0, cdTimer, punishTimer;

/* ── DOM 缓存 ──────────────────────────── */
const gate            = document.getElementById('gate');
const panel           = document.getElementById('panel');
const obeyBar         = document.getElementById('barObey');
const blushBar        = document.getElementById('barBlush');
const status          = document.getElementById('status');
const logElem         = document.getElementById('log');
const catImg          = document.getElementById('catImg');
const confirmMask     = document.getElementById('confirmMask');
const cmdTitle        = document.getElementById('cmdTitle');
const countdown       = document.getElementById('countdown');
const punishMask      = document.getElementById('punishMask');
const punishTimerElem = document.getElementById('punishTimer');

/* ── 入口口令 ──────────────────────────── */
function checkCode(){
  if(document.getElementById('code').value.trim()==='璃，我已就绪'){
    gate.style.display='none'; panel.style.display='block';
  }else alert('口令错误，重输！');
}

/* ── 指令确认 ──────────────────────────── */
function askConfirm(cmd){
  pendingCmd = cmd;
  cmdTitle.textContent = `执行「${cmd}」？`;
  cd = 5; countdown.textContent = cd;
  confirmMask.style.display = 'flex';
  cdTimer = setInterval(()=>{
    cd--; countdown.textContent = cd;
    if(cd === 0){ clearInterval(cdTimer); submitChoice(false); }
  },1000);
}
function submitChoice(obeyChoice){
  clearInterval(cdTimer);
  confirmMask.style.display = 'none';
  if(obeyChoice) doObey(pendingCmd);
  else           doPunish('违抗：' + pendingCmd);
}

/* ── 服从逻辑 ──────────────────────────── */
function doObey(cmd){
  addLog('服从：' + cmd);
  status.textContent = '执行中：' + cmd;

  /* 计数 & 小猫动作 */
  if(cmd.includes('张嘴') || cmd.includes('舔')){
    lickCnt++; catImg.src = 'img/cat_lick.png';
  }
  if(cmd.includes('夹')){
    clampCnt++; catImg.src = 'img/cat_clamp.png';
  }

  obey  = Math.min(100, obey  + 10);
  blush = Math.min(100, blush + 5);
  updateBars();

  if(obey === 100){
    addLog('完全支配达成！'); obey = 0; updateBars();
  }
}

/* ── 违抗惩罚 ──────────────────────────── */
function doPunish(msg){
  violateCnt++;
  addLog(msg);
  status.textContent = '惩罚中';
  punishMask.style.display = 'flex';
  let t = 30; punishTimerElem.textContent = t;
  punishTimer = setInterval(()=>{
    t--; punishTimerElem.textContent = t;
    if(t === 0){
      clearInterval(punishTimer);
      punishMask.style.display = 'none';
      status.textContent = '等待主人指令';
    }
  },1000);
}

/* ── 进度条 / 液面颜色 ─────────────────── */
function updateBars(){
  obeyBar.style.width  = obey  + '%';
  blushBar.style.width = blush + '%';
  const clr = blush < 50 ? '#66c' : (blush < 80 ? '#f79' : '#f22');
  obeyBar.style.background  = clr;
  blushBar.style.background = '#f38';
}

/* ── 日志辅助 ──────────────────────────── */
function addLog(txt){
  const p = document.createElement('p');
  p.textContent = txt;
  logElem.appendChild(p);
}
