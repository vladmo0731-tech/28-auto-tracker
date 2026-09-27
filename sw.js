const CACHE='28-auto-tracker-v17.1';
const STATIC=['./manifest.webmanifest','./icon-192.png','./icon-512.png','./design-v17.css'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  const url=new URL(req.url);

  // NEVER cache Supabase/CDN/API traffic.
  if(url.origin!==self.location.origin){
    event.respondWith(fetch(req,{cache:'no-store'}));
    return;
  }

  // Always get fresh HTML/navigation first.
  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req,{cache:'no-store'}).catch(()=>caches.match('./index.html'))
    );
    return;
  }

  // Cache only known same-origin static assets.
  const isStatic=STATIC.some(path=>{
    const target=new URL(path,self.location.href);
    return target.pathname===url.pathname;
  });

  if(isStatic){
    event.respondWith(
      caches.match(req).then(cached=>
        cached || fetch(req).then(resp=>{
          if(resp.ok){
            const copy=resp.clone();
            caches.open(CACHE).then(cache=>cache.put(req,copy));
          }
          return resp;
        })
      )
    );
    return;
  }

  // Everything else: network, no cache.
  event.respondWith(fetch(req,{cache:'no-store'}));
});
