const CACHE='28-auto-tracker-dashboard-v6';
const STATIC=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.mode==='navigate'){
    // Network first for HTML so GitHub updates don't get stuck behind an old index.html.
    event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(
    caches.match(req).then(cached=>{
      const fresh=fetch(req).then(resp=>{
        if(resp.ok){
          const copy=resp.clone();
          caches.open(CACHE).then(cache=>cache.put(req,copy));
        }
        return resp;
      }).catch(()=>cached);
      return cached||fresh;
    })
  );
});
