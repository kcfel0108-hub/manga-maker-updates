const CACHE='artist-live-sheet-v0.6.0-beta.4';
const CORE=['/','/index.html','/app.css','/equipment-catalog.js','/app.js','/manifest.webmanifest','/icons/artist-live-sheet.svg','/start.html','/privacy.html','/terms.html','/feedback.html','/feedback.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
  if(req.mode==='navigate'){
    const key=url.pathname==='/'?'/index.html':url.pathname;
    event.respondWith(fetch(req).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(key,copy));}return res;}).catch(async()=>{
      const cached=await caches.match(key);if(cached)return cached;
      if(url.pathname==='/'||url.pathname==='/index.html')return caches.match('/index.html');
      return new Response('<!doctype html><meta charset="utf-8"><title>Offline</title><body style="font-family:system-ui;background:#090f15;color:#fff;padding:32px"><h1>オフラインです</h1><p>このページはまだ端末に保存されていません。接続後に再度お試しください。</p><p><a href="/" style="color:#90e0ff">ARTIST LIVE SHEETへ戻る</a></p></body>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
    }));return;
  }
  event.respondWith(caches.match(req).then(cached=>{const network=fetch(req).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>cached);return cached||network;}));
});
