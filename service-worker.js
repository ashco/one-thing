"use strict";var precacheConfig=[["/one-thing/index.html","92fe083eae2ba99721afebe7eab707f1"],["/one-thing/static/css/main.dee9389a.css","ac9f41929d63f5e6113bd0c45576667d"],["/one-thing/static/js/main.d2e5163e.js","c1d8478b71ee4eec0c07628844d72b75"],["/one-thing/static/media/01d.8689bc78.svg","8689bc78d726139508c59db6d1ed0952"],["/one-thing/static/media/01n.5ff097f1.svg","5ff097f118aae04951bb3ed142898370"],["/one-thing/static/media/02d.0ba334a4.svg","0ba334a4f503ec6dba6d40e701b79aa3"],["/one-thing/static/media/02n.e63e091c.svg","e63e091c1628647996d70fabdf2c7ec5"],["/one-thing/static/media/03d.9e913e8e.svg","9e913e8ea5b1860d7532f209f0f2f692"],["/one-thing/static/media/03n.0ade6623.svg","0ade66235bd2f6ed2bab267cb9aacc4a"],["/one-thing/static/media/04d.dd6c268a.svg","dd6c268a83a3f29ed967f7223c480876"],["/one-thing/static/media/04n.0ade6623.svg","0ade66235bd2f6ed2bab267cb9aacc4a"],["/one-thing/static/media/09d.f2e05eef.svg","f2e05eef2a8c468bee1fed281ec97db0"],["/one-thing/static/media/09n.14f99a8a.svg","14f99a8a038bd999cfad451689397927"],["/one-thing/static/media/10d.034a8efa.svg","034a8efa52d8d35502e475b1e317f68b"],["/one-thing/static/media/10n.0e6b62c7.svg","0e6b62c7ed7b1fdedfdfef8df8abcc68"],["/one-thing/static/media/11d.60a7296c.svg","60a7296caf0438ad69e8aa40035a6006"],["/one-thing/static/media/11n.b4e4d569.svg","b4e4d569c04ae7d6deb79382ea66b300"],["/one-thing/static/media/13d.24e3679a.svg","24e3679a4d5fbfcd24027c9f5e4747c5"],["/one-thing/static/media/13n.50bd85bd.svg","50bd85bdfe3f70ad2e3b2ce50c0e7325"],["/one-thing/static/media/50d.9d55c181.svg","9d55c1810c7d76ce2108f9c43b144e42"],["/one-thing/static/media/50n.8504cfcd.svg","8504cfcd8ee2ae1c2b1741b2c24ba323"],["/one-thing/static/media/menu_icon.00e3c75e.svg","00e3c75e509d9cb4abdd1c241951679d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),c=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var c="/one-thing/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});