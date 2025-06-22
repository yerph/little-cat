let obey = 0, blush = 0;          // 进度条数据
let cd = 0, cdTimer, punishTimer; // 倒计时 & 惩罚计时器
let pendingCmd = '';
const obeyBar = document.getElementById('barObey');
const blushBar = document.getElementById('barBlush');

function checkCode(){
  if(document.getElementById('code').value.trim() === '璃，我已就绪'){
    gate.style.display = 'none';
    panel.style.display = 'block';
    scheduleRandom();             // 启动随机事件
  }else alert('姿势不对，重输。');
}

/* ------------- 指令确认 ------------- */
function askConfirm(cmd){
  pendingCmd = cmd;
  confirmMask.style.display = 'flex';
  cmdTitle.textContent = `执行「${cmd}」？`;
  cd = 5; updateCd();
  cdTimer = setInterval(()=>{ cd--; updateCd();
    if(cd === 0){ clearInterval(cdTimer); submitChoice(false); }
  },1000);
}
function updateCd(){ countdown.textContent = cd; }
function submitChoice(obeyChoice){
  clearInterval(cdTimer);
  confirmMask.style.display = 'none';
  if(obeyChoice){ doObey(pendingCmd); }
  else          { doPunish('违抗：'+pendingCmd); }
}

/* ------------- 服从 & 违抗 ------------- */
function doObey(cmd){
  log(`服从：${cmd}`);
  status.textContent = `执行中：${cmd}`;
  obey = Math.min(100, obey + 10);
  blush = Math.min(100, blush + 5);
  updateBars();
  if(obey === 100){ log('完全支配达成'); obey = 0; updateBars(); }
}
function doPunish(msg){
  log(msg); status.textContent = '惩罚中';
  punishMask.style.display = 'flex';
  let t = 30; punishTimer = setInterval(()=>{
    t--; punishTimerElem.textContent = t;
    if(t === 0){ clearInterval(punishTimer);
      punishMask.style.display = 'none';
      status.textContent = '等待主人指令';
    }
  },1000);
}

/* ------------- 进度条 & 液面联动 ------------- */
function updateBars(){
  obeyBar.style.width = obey + '%';
  blushBar.style.width = blush + '%';
  const clr = blush < 50 ? '#66c' : (blush < 80 ? '#f79' : '#f22');
  obeyBar.style.background = clr;
  blushBar.style.background = '#f38';
}

/* ------------- 随机主人事件 ------------- */
function scheduleRandom(){
  setTimeout(()=>{ triggerRandom(); scheduleRandom(); }, 180000);
}
function triggerRandom(){
  const cmds = ['张嘴','夹紧10秒','舔脚趾','不准射'];
  const cmd  = cmds[Math.floor(Math.random()*cmds.length)];
  eventBanner.textContent = '主人随机命令：' + cmd;
  eventBanner.style.display = 'block';
  askConfirm(cmd);
  setTimeout(()=>{ eventBanner.style.display='none'; }, 4000);
}

/* ------------- 日志 & PDF 占位 ------------- */
function log(msg){
  const p = document.createElement('p');
  p.textContent = msg;
  logElem.appendChild(p);
}
function downloadPDF(){
  alert('PDF 生成器占位：完整版会嵌入 jsPDF。');
}

/* DOM 缓存 */
const gate = document.getElementById('gate');
const panel = document.getElementById('panel');
const confirmMask = document.getElementById('confirmMask');
const cmdTitle = document.getElementById('cmdTitle');
const countdown = document.getElementById('countdown');
const punishMask = document.getElementById('punishMask');
const punishTimerElem = document.getElementById('punishTimer');
const logElem = document.getElementById('log');
const status = document.getElementById('status');
