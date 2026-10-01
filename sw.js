const C='nl-v7',F=['./','index.html','style.css','app.js','data.js','data2.js','data3.js','data4.js','data5.js','data6.js','data7.js','extra.js','manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
