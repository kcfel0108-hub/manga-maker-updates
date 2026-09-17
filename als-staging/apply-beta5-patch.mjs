import fs from 'node:fs';

const appPath='public/app.js';
const cssPath='public/app.css';
let app=fs.readFileSync(appPath,'utf8');
let css=fs.readFileSync(cssPath,'utf8');

function mustReplace(oldText,newText,label){
  if(!app.includes(oldText)) throw new Error(`beta5 patch failed: ${label}`);
  app=app.replace(oldText,newText);
}

app=app.replaceAll('0.6.0-beta.2','0.6.0-beta.5').replaceAll('0.6.0-beta.4','0.6.0-beta.5');

mustReplace(
"storage:{lastSavedAt:initialMeta.lastSavedAt||'',lastBackupAt:initialMeta.lastBackupAt||'',error:'',persistent:null},\n  runtime:{publicWeb:likelyPublicWeb(),allowedProviders:null,healthOk:false,environment:likelyPublicWeb()?'production':'local'}, installPrompt:null",
"storage:{lastSavedAt:initialMeta.lastSavedAt||'',lastBackupAt:initialMeta.lastBackupAt||'',error:'',persistent:null},\n  runtime:{publicWeb:likelyPublicWeb(),allowedProviders:null,healthOk:false,environment:likelyPublicWeb()?'production':'local'}, installPrompt:null,\n  showWelcome:!initialMeta.betaSeen",
'state.showWelcome'
);

mustReplace(
'<button class="btn sm ${backupRecommended()?\'primary\':\'\'}" data-action="save-project">💾 バックアップ</button>',
'<a class="btn sm ghost hide-mobile" href="/start.html" target="_blank" rel="noopener">？ ガイド</a>\n          <button class="btn sm ${backupRecommended()?\'primary\':\'\'}" data-action="save-project">💾 バックアップ</button>',
'top guide'
);

mustReplace(
"  ${state.modal ? renderModal() : ''}`;",
"  ${state.modal ? renderModal() : ''}\n  ${state.showWelcome ? renderWelcome() : ''}`;",
'welcome render hook'
);

const modalMarker='function renderModal(){';
if(!app.includes(modalMarker)) throw new Error('beta5 patch failed: renderModal marker');
app=app.replace(modalMarker,`function renderWelcome(){
  return \`<div class="welcome-backdrop" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
    <section class="welcome-card">
      <button class="welcome-close" data-action="welcome-dismiss" aria-label="閉じる">×</button>
      <div class="welcome-eyebrow">ARTIST LIVE SHEET · PUBLIC BETA</div>
      <h2 id="welcome-title">最初のライブ資料を作りましょう。</h2>
      <p class="welcome-lead">登録なしで使えます。プロジェクト本体はこのブラウザに自動保存されます。重要な資料は <b>.alsproj</b> バックアップも残してください。</p>
      <div class="welcome-grid">
        <button class="welcome-option primary" data-action="welcome-empty">
          <span class="welcome-num">01</span><b>自分の資料を作る</b><small>空のプロジェクトから始めます。</small>
        </button>
        <button class="welcome-option" data-action="welcome-demo">
          <span class="welcome-num">02</span><b>サンプルで試す</b><small>セットリスト・ステージ図入りの例を読み込みます。</small>
        </button>
        <a class="welcome-option" href="/start.html" target="_blank" rel="noopener">
          <span class="welcome-num">03</span><b>使い方を見る</b><small>機能と基本の流れを別タブで確認します。</small>
        </a>
      </div>
      <div class="welcome-foot"><span>✓ 自動保存</span><span>✓ インストール不要</span><span>✓ 基本機能無料</span></div>
    </section>
  </div>\`;
}

${modalMarker}`);

const clickMarker='function handleClick(e){';
if(!app.includes(clickMarker)) throw new Error('beta5 patch failed: handleClick marker');
app=app.replace(clickMarker,`function loadDemoProject({confirmReplace=true}={}){
  if(confirmReplace && projectHasMeaningfulData() && !confirm('現在の内容をサンプルデータに置き換えますか？')) return false;
  const live=defaultLive();live.title='DEMO LIVE';live.eventName='Demo Event';live.venue='Demo Live House';live.date=new Date().toISOString().slice(0,10);live.startTime='19:30';live.durationSec=1800;
  const songs=[['Opening Signal','Demo EP',180],['Afterglow','Demo Album',235],['Paradox','Demo Album',250],['Last Scene','Demo Album',220]].map(([title,album,d])=>({id:uid('song'),title,album,catalogDurationSec:d,liveDurationSec:d,source:'Demo',genre:'Alternative',songType:inferSongType({title,album,liveDurationSec:d})}));
  live.setlist=[{id:uid('set'),type:'se',title:'SE',durationSec:60,note:'暗転スタート'},{id:uid('set'),type:'song',songId:songs[0].id,title:songs[0].title,durationSec:180,note:''},{id:uid('set'),type:'song',songId:songs[1].id,title:songs[1].title,durationSec:235,note:''},{id:uid('set'),type:'mc',title:'MC',durationSec:90,note:''},{id:uid('set'),type:'song',songId:songs[2].id,title:songs[2].title,durationSec:250,note:''}];
  state.project=normalizeProject({schema:'artist-live-sheet-project',schemaVersion:4,appVersion:APP_VERSION,id:uid('project'),name:'Demo Project',artist:{id:'demo',name:'DEMO ARTIST'},members:[{id:uid('member'),name:'VO',role:'Vocal'},{id:uid('member'),name:'GT',role:'Guitar'},{id:uid('member'),name:'BA',role:'Bass'},{id:uid('member'),name:'DR',role:'Drums'}],songs,customEquipment:[],lives:[live],currentLiveId:live.id,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  const positions=[['vocal','VO',50,66,1,'XLR','Mic'],['guitar','GT',24,58,0,'',''],['bass','BA',76,58,1,'XLR','DI'],['drums','DR',50,27,4,'XLR','Drum Mic'],['monitor','M1',25,82,0,'',''],['monitor','M2',50,82,0,'',''],['monitor','M3',75,82,0,'','']];
  for(const [type,label,x,y,n,connection,source] of positions){live.stage.items.push({id:uid('stage'),type,label,role:'',x,y,inputCount:n,connection,source,phantom:'OFF',note:''});}
  state.undo=[];state.redo=[];state.history=[];state.showWelcome=false;pushHistory('サンプル読込');persist();state.page='dashboard';toast('サンプルデータを読み込みました','good');render();return true;
}

${clickMarker}`);

mustReplace(
"  if(a==='protect-storage')return protectStorage();",
"  if(a==='protect-storage')return protectStorage();\n  if(a==='welcome-dismiss'||a==='welcome-empty'){state.showWelcome=false;saveAppMeta();render();return;}\n  if(a==='welcome-demo'){loadDemoProject({confirmReplace:false});return;}",
'welcome actions'
);

const loadDemoRe=/  if\(a==='load-demo'\)\{\n[\s\S]*?\n  \}\n  if\(a==='artist-search'\)/;
if(!loadDemoRe.test(app)) throw new Error('beta5 patch failed: load-demo block');
app=app.replace(loadDemoRe,"  if(a==='load-demo'){loadDemoProject({confirmReplace:true});return;}\n  if(a==='artist-search')");

const welcomeCss=`
/* v0.6.0-beta.5 first-run onboarding */
.welcome-backdrop{position:fixed;inset:0;z-index:1200;background:rgba(2,7,12,.82);backdrop-filter:blur(10px);display:grid;place-items:center;padding:22px}
.welcome-card{position:relative;width:min(760px,100%);background:linear-gradient(145deg,#111c25,#0b1219);border:1px solid #2b4253;border-radius:24px;padding:32px;box-shadow:0 30px 100px rgba(0,0,0,.55)}
.welcome-close{position:absolute;right:18px;top:14px;width:38px;height:38px;border:0;border-radius:999px;background:#172530;color:#d7e5ef;font-size:25px;cursor:pointer}
.welcome-eyebrow{font-size:11px;font-weight:900;letter-spacing:.16em;color:#83d9ff}.welcome-card h2{margin:12px 40px 10px 0;font-size:clamp(28px,5vw,44px);letter-spacing:-.035em}
.welcome-lead{margin:0;color:#aebfcb;line-height:1.8}.welcome-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:24px}
.welcome-option{appearance:none;text-align:left;text-decoration:none;color:#eef5fa;background:#101b24;border:1px solid #294052;border-radius:17px;padding:18px;min-height:154px;cursor:pointer;font:inherit;transition:.16s transform,.16s border-color,.16s background}
.welcome-option:hover{transform:translateY(-2px);border-color:#55768e;background:#13232e}.welcome-option.primary{border-color:#93dffb;background:linear-gradient(145deg,rgba(99,199,240,.16),rgba(105,243,169,.07))}
.welcome-option b{display:block;font-size:16px;margin:20px 0 7px}.welcome-option small{display:block;color:#8fa5b5;line-height:1.65}.welcome-num{font-size:11px;letter-spacing:.1em;color:#79cae9}
.welcome-foot{display:flex;gap:18px;flex-wrap:wrap;margin-top:22px;padding-top:18px;border-top:1px solid #243541;color:#91a6b5;font-size:12px}
@media(max-width:680px){.welcome-card{padding:26px 20px}.welcome-grid{grid-template-columns:1fr}.welcome-option{min-height:auto}.welcome-option b{margin-top:8px}.welcome-foot{gap:10px}.welcome-backdrop{align-items:start;overflow:auto}}
`;
css=css.replaceAll('0.6.0-beta.2','0.6.0-beta.5').replaceAll('0.6.0-beta.4','0.6.0-beta.5');
if(!css.includes('v0.6.0-beta.5 first-run onboarding')) css += welcomeCss;

fs.writeFileSync(appPath,app);
fs.writeFileSync(cssPath,css);
console.log('beta5 onboarding patch applied');
