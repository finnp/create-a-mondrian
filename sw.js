!function(){var e=["552aa57c95c1a62d/bundle.js","597e41e01388abf0/bundle.css","assets/icon.png","manifest.json"];self.addEventListener("fetch",function(e){e.respondWith(self.caches.match(e.request).then(function(n){return n||self.fetch(e.request)}))}),self.addEventListener("install",function(n){n.waitUntil(self.caches.open("1.0.0").then(function(n){return n.addAll(e)}))}),self.addEventListener("activate",function(e){e.waitUntil(self.caches.keys().then(function(e){return Promise.all(e.map(function(n,t){if("1.0.0"!==e[t])return self.caches.delete(e[t])}))}))})}();
//# sourceMappingURL=bankai-service-worker.js.map