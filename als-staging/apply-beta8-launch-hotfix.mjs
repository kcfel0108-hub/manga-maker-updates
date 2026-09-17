import fs from 'node:fs';
import path from 'node:path';
const ROOT='public';
const BASE='https://artist-live-sheet-staging-production.up.railway.app';
function rw(p,fn){if(!fs.existsSync(p))return;const t=fs.readFileSync(p,'utf8');fs.writeFileSync(p,fn(t));}
for(const p of ['server.mjs','package.json',path.join(ROOT,'app.js'),path.join(ROOT,'app.css'),path.join(ROOT,'service-worker.js'),path.join(ROOT,'manifest.webmanifest')])rw(p,t=>t.replaceAll('0.6.0-beta.7','0.6.0-beta.8'));
for(const name of fs.readdirSync(ROOT).filter(n=>n.endsWith('.html'))){
  const p=path.join(ROOT,name);
  rw(p,t=>{
    t=t.replaceAll('0.6.0-beta.7','0.6.0-beta.8');
    if(!t.includes('als-file-protocol-guard')){
      const guard=`<script id="als-file-protocol-guard">(function(){if(location.protocol==='file:'){var n=(location.pathname.split('/').pop()||'index.html');location.replace('${BASE}/'+n);}})();</script>`;
      t=t.includes('<head>')?t.replace('<head>','<head>'+guard):guard+t;
    }
    if(name==='start.html'){
      t=t.replaceAll('href="/" data-growth="seo_app_cta"',`href="${BASE}/" data-growth="seo_app_cta"`)
         .replaceAll('href="/" data-growth="seo_bottom_app_cta"',`href="${BASE}/" data-growth="seo_bottom_app_cta"`)
         .replace('<a href="/">アプリ</a>',`<a href="${BASE}/">アプリ</a>`);
    }
    return t;
  });
}
console.log('beta8 free-launch hotfix applied');
