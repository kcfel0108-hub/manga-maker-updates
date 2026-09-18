import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OLD = '0.6.0-beta.11';
const NEXT = '0.6.0-beta.12';

for(const file of [
  'server.mjs','package.json','VERSION.txt',
  'public/app.js','public/app.css','public/service-worker.js','public/manifest.webmanifest',
  'public/index.html','public/start.html','public/stage-plot.html','public/setlist-maker.html',
  'public/input-list.html','public/technical-rider.html','public/live-documents.html',
  'public/pa-sheet.html','public/lighting-cue.html','public/privacy.html','public/terms.html',
  'public/feedback.html','public/venue-beta.html','public/sitemap.xml'
]){
  const p=path.join(ROOT,file);
  if(!fs.existsSync(p)) continue;
  let s=fs.readFileSync(p,'utf8');
  s=s.split(OLD).join(NEXT).split(`v${OLD}`).join(`v${NEXT}`);
  fs.writeFileSync(p,s);
}
fs.writeFileSync(path.join(ROOT,'VERSION.txt'),`v${NEXT}\n`);

let s=fs.readFileSync(path.join(ROOT,'server.mjs'),'utf8');
const maxOld="const MAX_Q=Number(process.env.ALS_MAX_SEARCH_LENGTH||180); const MAX_URL=Number(process.env.ALS_MAX_URL_LENGTH||2048);";
const maxNew="const MAX_Q=Number(process.env.ALS_MAX_SEARCH_LENGTH||180); const MAX_URL=Number(process.env.ALS_MAX_URL_LENGTH||2048); const UPSTREAM_TIMEOUT_MS=Number(process.env.ALS_UPSTREAM_TIMEOUT_MS||6500);";
if(!s.includes(maxOld)) throw new Error('MAX limit anchor missing');
s=s.replace(maxOld,maxNew);

const cleanOld="function clean(v=''){return String(v).trim().slice(0,MAX_Q);} function norm";
const cleanNew="function rawText(v=''){return String(v??'').trim();} function clean(v=''){return rawText(v).slice(0,MAX_Q);} function tooLong(v=''){return rawText(v).length>MAX_Q;} function norm";
if(!s.includes(cleanOld)) throw new Error('clean anchor missing');
s=s.replace(cleanOld,cleanNew);

const fetchOld="async function ijson(endpoint,params,countries=['JP','US']){let last={results:[]};for(const country of countries){const u=new URL(`https://itunes.apple.com${endpoint}`);for(const [k,v] of Object.entries({...params,country}))u.searchParams.set(k,v);const r=await fetch(u,{headers:{'User-Agent':`ARTIST-LIVE-SHEET/${APP_VERSION}`}});if(!r.ok)continue;last=await r.json();if((last.results||[]).length)return {d:last,country};}return {d:last,country:countries[0]};}";
const fetchNew="async function ijson(endpoint,params,countries=['JP','US']){let last={results:[]};for(const country of countries){const u=new URL(`https://itunes.apple.com${endpoint}`);for(const [k,v] of Object.entries({...params,country}))u.searchParams.set(k,v);try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),UPSTREAM_TIMEOUT_MS);let r;try{r=await fetch(u,{headers:{'User-Agent':`ARTIST-LIVE-SHEET/${APP_VERSION}`},signal:controller.signal});}finally{clearTimeout(timer);}if(!r.ok)continue;last=await r.json();if((last.results||[]).length)return {d:last,country};}catch(e){console.warn(`[ALS_UPSTREAM] ${country} ${endpoint}: ${e?.name||'Error'} ${e?.message||''}`);}}return {d:last,country:countries[0]};}";
if(!s.includes(fetchOld)) throw new Error('upstream fetch anchor missing');
s=s.replace(fetchOld,fetchNew);

const apiOld="const q=clean(u.searchParams.get('q')),artist=clean(u.searchParams.get('artist'));if(u.pathname==='/api/health')";
const apiNew="const rawQ=u.searchParams.get('q')||'',rawArtist=u.searchParams.get('artist')||'';if(tooLong(rawQ)||tooLong(rawArtist))return json(res,400,{error:`Search text too long (max ${MAX_Q})`});const q=clean(rawQ),artist=clean(rawArtist);if(u.pathname==='/api/health')";
if(!s.includes(apiOld)) throw new Error('api search anchor missing');
s=s.replace(apiOld,apiNew);
fs.writeFileSync(path.join(ROOT,'server.mjs'),s);

console.log('ARTIST LIVE SHEET beta12 hardening applied');
