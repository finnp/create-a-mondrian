!function(){var t={};function e(t){if(!(this instanceof e))return new e(t);"number"==typeof t&&(t={max:t}),t||(t={}),this.cache={},this.head=this.tail=null,this.length=0,this.max=t.max||1e3,this.maxAge=t.maxAge||0}t=e,Object.defineProperty(e.prototype,"keys",{get:function(){return Object.keys(this.cache)}}),e.prototype.clear=function(){this.cache={},this.head=this.tail=null,this.length=0},e.prototype.remove=function(t){if("string"!=typeof t&&(t=""+t),this.cache.hasOwnProperty(t)){var e=this.cache[t];return delete this.cache[t],this._unlink(t,e.prev,e.next),e.value}},e.prototype._unlink=function(t,e,n){this.length--,0===this.length?this.head=this.tail=null:this.head===t?(this.head=e,this.cache[this.head].next=null):this.tail===t?(this.tail=n,this.cache[this.tail].prev=null):(this.cache[e].next=n,this.cache[n].prev=e)},e.prototype.peek=function(t){if(this.cache.hasOwnProperty(t)){var e=this.cache[t];if(this._checkAge(t,e))return e.value}},e.prototype.set=function(t,e){var n;if("string"!=typeof t&&(t=""+t),this.cache.hasOwnProperty(t)){if((n=this.cache[t]).value=e,this.maxAge&&(n.modified=Date.now()),t===this.head)return e;this._unlink(t,n.prev,n.next)}else n={value:e,modified:0,next:null,prev:null},this.maxAge&&(n.modified=Date.now()),this.cache[t]=n,this.length===this.max&&this.evict();return this.length++,n.next=null,n.prev=this.head,this.head&&(this.cache[this.head].next=t),this.head=t,this.tail||(this.tail=t),e},e.prototype._checkAge=function(t,e){return!(this.maxAge&&Date.now()-e.modified>this.maxAge&&(this.remove(t),1))},e.prototype.get=function(t){if("string"!=typeof t&&(t=""+t),this.cache.hasOwnProperty(t)){var e=this.cache[t];if(this._checkAge(t,e))return this.head!==t&&(t===this.tail?(this.tail=e.next,this.cache[this.tail].prev=null):this.cache[e.prev].next=e.next,this.cache[e.next].prev=e.prev,this.cache[this.head].next=t,e.prev=this.head,e.next=null,this.head=t),e.value}},e.prototype.evict=function(){this.tail&&this.remove(this.tail)};var n={};function r(e,n,r){this.cache="number"==typeof r?new t(r):r||new t(100),this.state=e,this.emit=n}function i(t){return new(t.bind.apply(t,arguments))}"function"==typeof Symbol&&Symbol.iterator,n=r,r.prototype.render=function(t,e){var n=this.cache.get(e);if(!n){for(var r=[],o=2,s=arguments.length;o<s;o++)r.push(arguments[o]);r.unshift(t,e,this.state,this.emit),n=i.apply(i,r),this.cache.set(e,n)}return n},"function"==typeof Symbol&&Symbol.iterator;var o,s=function(t){var e=document.readyState;if("complete"===e||"interactive"===e)return setTimeout(t,0);document.addEventListener("DOMContentLoaded",function(){t()})};"function"==typeof Symbol&&Symbol.iterator;var a="undefined"!=typeof window;function u(t){this.hasWindow=t,this.hasIdle=this.hasWindow&&window.requestIdleCallback,this.method=this.hasIdle?window.requestIdleCallback.bind(window):this.setTimeout,this.scheduled=!1,this.queue=[]}u.prototype.push=function(t){this.queue.push(t),this.schedule()},u.prototype.schedule=function(){if(!this.scheduled){this.scheduled=!0;var t=this;this.method(function(e){for(;t.queue.length&&e.timeRemaining()>0;)t.queue.shift()(e);t.scheduled=!1,t.queue.length&&t.schedule()})}},u.prototype.setTimeout=function(t){setTimeout(t,0,{timeRemaining:function(){return 1}})},o=function(){var t;return a?(window._nanoScheduler||(window._nanoScheduler=new u(!0)),t=window._nanoScheduler):t=new u,t},"function"==typeof Symbol&&Symbol.iterator;var l,c=o();h.disabled=!0;try{l=window.performance,h.disabled="true"===window.localStorage.DISABLE_NANOTIMING||!l.mark}catch(ut){}function h(t){if(h.disabled)return d;var e=(1e4*l.now()).toFixed()%Number.MAX_SAFE_INTEGER,n="start-"+e+"-"+t;function r(r){var i="end-"+e+"-"+t;l.mark(i),c.push(function(){var o=null;try{var s=t+" ["+e+"]";l.measure(s,n,i),l.clearMarks(n),l.clearMarks(i)}catch(ut){o=ut}r&&r(o,t)})}return l.mark(n),r.uuid=e,r}function d(t){t&&c.push(function(){t(new Error("nanotiming: performance API unavailable"))})}var f=h,p=function(t,e,n){var r,i=t.length;if(!(e>=i||0===n)){var o=i-(n=e+n>i?i-e:n);for(r=e;r<o;++r)t[r]=t[r+n];t.length=o}},m={};function v(t){if(!(this instanceof v))return new v(t);this._name=t||"nanobus",this._starListeners=[],this._listeners={}}"function"==typeof Symbol&&Symbol.iterator,m=v,v.prototype.emit=function(t){for(var e=[],n=1,r=arguments.length;n<r;n++)e.push(arguments[n]);var i=f(this._name+"('"+t+"')"),o=this._listeners[t];return o&&o.length>0&&this._emit(this._listeners[t],e),this._starListeners.length>0&&this._emit(this._starListeners,t,e,i.uuid),i(),this},v.prototype.on=v.prototype.addListener=function(t,e){return"*"===t?this._starListeners.push(e):(this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)),this},v.prototype.prependListener=function(t,e){return"*"===t?this._starListeners.unshift(e):(this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].unshift(e)),this},v.prototype.once=function(t,e){var n=this;return this.on(t,function r(){e.apply(n,arguments),n.removeListener(t,r)}),this},v.prototype.prependOnceListener=function(t,e){var n=this;return this.prependListener(t,function r(){e.apply(n,arguments),n.removeListener(t,r)}),this},v.prototype.removeListener=function(t,e){return"*"===t?(this._starListeners=this._starListeners.slice(),n(this._starListeners,e)):(void 0!==this._listeners[t]&&(this._listeners[t]=this._listeners[t].slice()),n(this._listeners[t],e));function n(t,e){if(t){var n=t.indexOf(e);return-1!==n?(p(t,n,1),!0):void 0}}},v.prototype.removeAllListeners=function(t){return t?"*"===t?this._starListeners=[]:this._listeners[t]=[]:(this._starListeners=[],this._listeners={}),this},v.prototype.listeners=function(t){var e="*"!==t?this._listeners[t]:this._starListeners,n=[];if(e)for(var r=e.length,i=0;i<r;i++)n.push(e[i]);return n},v.prototype._emit=function(t,e,n,r){if(void 0!==t&&0!==t.length){void 0===n&&(n=e,e=null),e&&(n=void 0!==r?[e].concat(n,r):[e].concat(n));for(var i=t.length,o=0;o<i;o++){var s=t[o];s.apply(s,n)}}},"function"==typeof Symbol&&Symbol.iterator;var y=/(noopener|noreferrer) (noopener|noreferrer)/,w=/^[\w-_]+:/,b=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onmouseenter","onmouseleave","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"],g=b.length;function S(t,e,n){t[n]!==e[n]&&(e[n]=t[n],t[n]?e.setAttribute(n,""):e.removeAttribute(n))}var _=function(t,e){var n=t.nodeType,r=t.nodeName;1===n&&function(t,e){for(var n=e.attributes,r=t.attributes,i=null,o=null,s=null,a=null,u=r.length-1;u>=0;--u)s=(a=r[u]).name,i=a.namespaceURI,o=a.value,i?(s=a.localName||s,e.getAttributeNS(i,s)!==o&&e.setAttributeNS(i,s,o)):e.hasAttribute(s)?e.getAttribute(s)!==o&&("null"===o||"undefined"===o?e.removeAttribute(s):e.setAttribute(s,o)):e.setAttribute(s,o);for(var l=n.length-1;l>=0;--l)!1!==(a=n[l]).specified&&(s=a.name,(i=a.namespaceURI)?(s=a.localName||s,t.hasAttributeNS(i,s)||e.removeAttributeNS(i,s)):t.hasAttributeNS(null,s)||e.removeAttribute(s))}(t,e),3!==n&&8!==n||e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),"INPUT"===r?function(t,e){var n=t.value,r=e.value;S(t,e,"checked"),S(t,e,"disabled"),n!==r&&(e.setAttribute("value",n),e.value=n),"null"===n&&(e.value="",e.removeAttribute("value")),t.hasAttributeNS(null,"value")?"range"===e.type&&(e.value=n):e.removeAttribute("value")}(t,e):"OPTION"===r?function(t,e){S(t,e,"selected")}(t,e):"TEXTAREA"===r&&function(t,e){var n=t.value;if(n!==e.value&&(e.value=n),e.firstChild&&e.firstChild.nodeValue!==n){if(""===n&&e.firstChild.nodeValue===e.placeholder)return;e.firstChild.nodeValue=n}}(t,e),function(t,e){for(var n=0;n<g;n++){var r=b[n];t[r]?e[r]=t[r]:e[r]&&(e[r]=void 0)}}(t,e)};"function"==typeof Symbol&&Symbol.iterator;var A=3;function N(t,e){return t.id?t.id===e.id:t.isSameNode?t.isSameNode(e):t.tagName===e.tagName&&t.type===A&&t.nodeValue===e.nodeValue}var x=function(t,e){return function t(e,n){return n?e?e.isSameNode&&e.isSameNode(n)?n:e.tagName!==n.tagName?e:(_(e,n),function(e,n){for(var r,i,o,s,a=0,u=0;r=n.childNodes[u],i=e.childNodes[u-a],r||i;u++)if(i)if(r)if(N(i,r))(o=t(i,r))!==r&&(n.replaceChild(o,r),a++);else{s=null;for(var l=u;l<n.childNodes.length;l++)if(N(n.childNodes[l],i)){s=n.childNodes[l];break}s?((o=t(i,s))!==s&&a++,n.insertBefore(o,r)):i.id||r.id?(n.insertBefore(i,r),a++):(o=t(i,r))!==r&&(n.replaceChild(o,r),a++)}else n.appendChild(i),a++;else n.removeChild(r),u--}(e,n),n):null:e}(e,t)};"function"==typeof Symbol&&Symbol.iterator;var E=/([^?=&]+)(=([^&]*))?/g;"function"==typeof Symbol&&Symbol.iterator;var R=function(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var r in n)k.call(n,r)&&(t[r]=n[r])}return t},k=Object.prototype.hasOwnProperty,T=function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)O.call(n,r)&&(t[r]=n[r])}return t},O=Object.prototype.hasOwnProperty,L={};function C(){if(!(this instanceof C))return new C;this.trie={nodes:{}}}"function"==typeof Symbol&&Symbol.iterator,L=C,C.prototype.create=function(t){var e=t.replace(/^\//,"").split("/");return function t(n,r){var i=e.hasOwnProperty(n)&&e[n];if(!1===i)return r;var o=null;return/^:|^\*/.test(i)?(r.nodes.hasOwnProperty("$$")?o=r.nodes.$$:(o={nodes:{}},r.nodes.$$=o),"*"===i[0]&&(r.wildcard=!0),r.name=i.replace(/^:|^\*/,"")):r.nodes.hasOwnProperty(i)?o=r.nodes[i]:(o={nodes:{}},r.nodes[i]=o),t(n+1,o)}(0,this.trie)},C.prototype.match=function(t){var e=t.replace(/^\//,"").split("/"),n={},r=function t(r,i){if(void 0!==i){var o=e[r];if(void 0===o)return i;if(i.nodes.hasOwnProperty(o))return t(r+1,i.nodes[o]);if(i.name){try{n[i.name]=decodeURIComponent(o)}catch(ut){return t(r,void 0)}return t(r+1,i.nodes.$$)}if(i.wildcard){try{n.wildcard=decodeURIComponent(e.slice(r).join("/"))}catch(ut){return t(r,void 0)}return i.nodes.$$}return t(r+1)}}(0,this.trie);if(r)return(r=R(r)).params=n,r},C.prototype.mount=function(t,e){var n=t.replace(/^\//,"").split("/"),r=null,i=null;if(1===n.length)i=n[0],r=this.create(i);else{var o=n.join("/");i=n[0],r=this.create(o)}T(r.nodes,e.nodes),e.name&&(r.name=e.name),r.nodes[""]&&(Object.keys(r.nodes[""]).forEach(function(t){"nodes"!==t&&(r[t]=r.nodes[""][t])}),T(r.nodes,r.nodes[""].nodes),delete r.nodes[""].nodes)},"function"==typeof Symbol&&Symbol.iterator;var V=function t(e){if(!(this instanceof t))return new t(e);var n=(e||"").replace(/^\//,""),r=L();return i._trie=r,i.on=function(t,e){var n=e._wayfarer&&e._trie?e:function(){return e.apply(this,Array.prototype.slice.call(arguments))};(t=t||"/",n.route=t,n._wayfarer&&n._trie)?r.mount(t,n._trie.trie):r.create(t).cb=n;return i},i.emit=i,i.match=o,i._wayfarer=!0,i;function i(t){var e=o(t),n=new Array(arguments.length);n[0]=e.params;for(var r=1;r<n.length;r++)n[r]=arguments[r];return e.cb.apply(e.cb,n)}function o(t){var e=r.match(t);if(e&&e.cb)return new s(e);var i=r.match(n);if(i&&i.cb)return new s(i);throw new Error("route '"+t+"' did not match")}function s(t){this.cb=t.cb,this.route=t.cb.route,this.params=t.params}},D={},P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I=/file:\/\//.test("object"===("undefined"==typeof window?"undefined":P(window))&&window.location&&window.location.origin),$=new RegExp("^(file://|/)(.*.html?/?)?"),M=new RegExp("^(http(s)?(://))?(www.)?[a-zA-Z0-9-_.]+(:[0-9]{1,5})?(/{1})?"),W=new RegExp("#"),q=new RegExp("[?].*$");function H(t){if(!(this instanceof H))return new H(t);t=t||{},this.router=V(t.default||"/404")}function U(t,e){return t=e?t.replace($,""):t.replace(M,""),decodeURI(t.replace(q,"").replace(W,"/"))}D=H,H.prototype.on=function(t,e){t=t.replace(/^[#\/]/,""),this.router.on(t,e)},H.prototype.emit=function(t){return t=U(t,I),this.router.emit(t)},H.prototype.match=function(t){return t=U(t,I),this.router.match(t)};var G=function(t,e){if(t)try{var n=document.querySelector(t);n&&n.scrollIntoView(e)}catch(ut){}},j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},z=B,K={};function B(t){if(!(this instanceof B))return new B(t);t=t||{};var e=this;this._events={DOMCONTENTLOADED:"DOMContentLoaded",DOMTITLECHANGE:"DOMTitleChange",REPLACESTATE:"replaceState",PUSHSTATE:"pushState",NAVIGATE:"navigate",POPSTATE:"popState",RENDER:"render"},this._historyEnabled=void 0===t.history||t.history,this._hrefEnabled=void 0===t.href||t.href,this._hashEnabled=void 0===t.hash||t.hash,this._hasWindow="undefined"!=typeof window,this._cache=t.cache,this._loaded=!1,this._stores=[],this._tree=null;var n={events:this._events,components:{}};this._hasWindow?(this.state=window.initialState?R(window.initialState,n):n,delete window.initialState):this.state=n,this.router=D({curry:!0}),this.emitter=m("choo.emit"),this.emit=this.emitter.emit.bind(this.emitter),this._hasWindow&&(this.state.title=document.title),this.emitter.prependListener(this._events.DOMTITLECHANGE,function(t){e.state.title=t,e._hasWindow&&(document.title=t)})}function F(t){return t.map(function(t){return[{x:t.x,y:t.y,length:t.height},{x:t.x+t.width,y:t.y,length:t.height}]}).reduce(function(t,e){return t.concat(e)})}function X(t){return t.map(function(t){return[{x:t.x,y:t.y,length:t.width},{x:t.x,y:t.y+t.height,length:t.width}]}).reduce(function(t,e){return t.concat(e)})}B.prototype.route=function(t,e){this.router.on(t,e)},B.prototype.use=function(t){var e=this;this._stores.push(function(n){var r="choo.use";r=t.storeName?r+"("+t.storeName+")":r;var i=f(r);t(n,e.emitter,e),i()})},B.prototype.start=function(){var t,e,n=this;return this._historyEnabled&&(this.emitter.prependListener(this._events.NAVIGATE,function(){n._matchRoute(),n._loaded&&(n.emitter.emit(n._events.RENDER),setTimeout(G.bind(null,window.location.hash),0))}),this.emitter.prependListener(this._events.POPSTATE,function(){n.emitter.emit(n._events.NAVIGATE)}),this.emitter.prependListener(this._events.PUSHSTATE,function(t){window.history.pushState(K,null,t),n.emitter.emit(n._events.NAVIGATE)}),this.emitter.prependListener(this._events.REPLACESTATE,function(t){window.history.replaceState(K,null,t),n.emitter.emit(n._events.NAVIGATE)}),window.onpopstate=function(){n.emitter.emit(n._events.POPSTATE)},n._hrefEnabled&&(t=function(t){var e=t.href,r=t.hash;e!==window.location.href?n.emitter.emit(n._events.PUSHSTATE,e):!n._hashEnabled&&r&&G(r)},e=e||window.document,window.addEventListener("click",function(n){if(!(n.button&&0!==n.button||n.ctrlKey||n.metaKey||n.altKey||n.shiftKey||n.defaultPrevented)){var r=function t(n){if(n&&n!==e)return"a"!==n.localName||void 0===n.href?t(n.parentNode):n}(n.target);r&&(window.location.protocol!==r.protocol||window.location.hostname!==r.hostname||window.location.port!==r.port||r.hasAttribute("data-nanohref-ignore")||r.hasAttribute("download")||"_blank"===r.getAttribute("target")&&y.test(r.getAttribute("rel"))||w.test(r.getAttribute("href"))||(n.preventDefault(),t(r)))}}))),this._setCache(this.state),this._stores.forEach(function(t){t(n.state)}),this._matchRoute(),this._tree=this._prerender(this.state),this.emitter.prependListener(n._events.RENDER,function(t,e){e||(e=window.requestAnimationFrame);var n=!1,r=null;return function(){null!==r||n||(n=!0,e(function(){n=!1;for(var e=r.length,i=new Array(e),o=0;o<e;o++)i[o]=r[o];t.apply(t,i),r=null})),r=arguments}}(function(){var t=f("choo.render"),e=n._prerender(n.state),r=f("choo.morph");x(n._tree,e),r(),t()})),s(function(){n.emitter.emit(n._events.DOMCONTENTLOADED),n._loaded=!0}),this._tree},B.prototype.mount=function(t){if("object"!==("undefined"==typeof window?"undefined":j(window)))return this.selector=t,this;var e=this;s(function(){var n=f("choo.render"),r=e.start();e._tree="string"==typeof t?document.querySelector(t):t;var i=f("choo.morph");x(e._tree,r),i(),n()})},B.prototype.toString=function(t,e){this.state=R(this.state,e||{});var n=this;this._setCache(this.state),this._stores.forEach(function(t){t(n.state)}),this._matchRoute(t);var r=this._prerender(this.state);return"string"==typeof r.outerHTML?r.outerHTML:r.toString()},B.prototype._matchRoute=function(t){var e,n;t?(e=t.replace(/\?.+$/,"").replace(/\/$/,""),this._hashEnabled||(e=e.replace(/#.+$/,"")),n=t):(e=window.location.pathname.replace(/\/$/,""),this._hashEnabled&&(e+=window.location.hash.replace(/^#/,"/")),n=window.location.search);var r,i=this.router.match(e);return this._handler=i.cb,this.state.href=e,this.state.query=(r={},n.replace(/^.*\?/,"").replace(E,function(t,e,n,i){r[decodeURIComponent(e)]=decodeURIComponent(i)}),r),this.state.route=i.route,this.state.params=i.params,this.state},B.prototype._prerender=function(t){var e=f("choo.prerender('"+t.route+"')"),n=this._handler(t,this.emit);return e(),n},B.prototype._setCache=function(t){var e=new n(t,this.emitter.emit.bind(this.emitter),this._cache);function r(t,n){for(var r=[],i=0,o=arguments.length;i<o;i++)r.push(arguments[i]);return e.render.apply(e,r)}t.cache=r,r.toJSON=function(){return null}};var Y=/\n[\s]+$/,J=/^\n[\s]+/,Z=/[\s]+$/,Q=/^[\s]+/,tt=/[\n\s]+/g,et=["a","abbr","b","bdi","bdo","br","cite","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","amp","small","span","strong","sub","sup","time","u","var","wbr"],nt=["code","pre","textarea"],rt=function t(e,n){if(Array.isArray(n))for(var r,i,o=e.nodeName.toLowerCase(),s=!1,a=0,u=n.length;a<u;a++){var l=n[a];if(Array.isArray(l))t(e,l);else{("number"==typeof l||"boolean"==typeof l||"function"==typeof l||l instanceof Date||l instanceof RegExp)&&(l=l.toString());var c=e.childNodes[e.childNodes.length-1];if("string"==typeof l)s=!0,c&&"#text"===c.nodeName?c.nodeValue+=l:(l=document.createTextNode(l),e.appendChild(l),c=l),a===u-1&&(s=!1,-1===et.indexOf(o)&&-1===nt.indexOf(o)?""===(r=c.nodeValue.replace(J,"").replace(Z,"").replace(Y,"").replace(tt," "))?e.removeChild(c):c.nodeValue=r:-1===nt.indexOf(o)&&(i=0===a?"":" ",r=c.nodeValue.replace(J,i).replace(Q," ").replace(Z,"").replace(Y,"").replace(tt," "),c.nodeValue=r));else if(l&&l.nodeType){s&&(s=!1,-1===et.indexOf(o)&&-1===nt.indexOf(o)?""===(r=c.nodeValue.replace(J,"").replace(Y,"").replace(tt," "))?e.removeChild(c):c.nodeValue=r:-1===nt.indexOf(o)&&(r=c.nodeValue.replace(Q," ").replace(J,"").replace(Y,"").replace(tt," "),c.nodeValue=r));var h=l.nodeName;h&&(o=h.toLowerCase()),e.appendChild(l)}}}},it="create a mondrian",ot=function(t,e){return t.title!==it&&e(t.events.DOMTITLECHANGE,it),function(){var t=document.createElement("body");t.setAttribute("class","code lh-copy");var e=document.createElement("div");e.setAttribute("style","width:700px"),e.setAttribute("class","center");var n=document.createElement("h1");n.setAttribute("class","f1 mt0 mb0"),rt(n,["create a mondrian"]);var r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttributeNS(null,"style","border: 10px solid black;"),r.setAttributeNS(null,"version","1.1"),r.setAttributeNS(null,"baseProfile","full"),r.setAttributeNS(null,"width",arguments[0]),r.setAttributeNS(null,"height",arguments[1]),rt(r,["\n\n   ",arguments[2],"\n\n   ",arguments[3],"\n\n  ",arguments[4],"\n\n   ",arguments[5],"\n\n   "]),rt(e,["\n    ",n,"\n    ",r,"\n   "]),rt(t,["\n    ",e,"\n    "]),t}(t.width,t.height,t.rects.map(function(n){return n===t.currentRect?function(n){var r=n.width-t.lineWidth,o=n.height-t.lineWidth,s=n.x+t.lineWidth/2,a=n.y+t.lineWidth/2,u=n.height>n.width;return function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g");return rt(t,["\n      ",arguments[0],"\n     "]),t}(st.map(function(n,l){return function(){var t=document.createElementNS("http://www.w3.org/2000/svg","rect");return t.setAttributeNS(null,"style","cursor:pointer;"),t.onmousemove=arguments[0],t.onclick=arguments[1],t.setAttributeNS(null,"x",arguments[2]),t.setAttributeNS(null,"y",arguments[3]),t.setAttributeNS(null,"height",arguments[4]),t.setAttributeNS(null,"width",arguments[5]),t.setAttributeNS(null,"fill",arguments[6]),t}(function(t){e("rect:colorHover",t)}.bind(null,n),function(t){e("rect:colorPick",t)}.bind(null,n),s+(u?0:l*r/st.length),a+(u?l*o/st.length:0),u?o/5:o,u?r:r/5,i(n,t.currentColor===n?1:.5))}))}(n):function(){var t=document.createElementNS("http://www.w3.org/2000/svg","rect");return t.onmousemove=arguments[0],t.setAttributeNS(null,"x",arguments[1]),t.setAttributeNS(null,"y",arguments[2]),t.setAttributeNS(null,"height",arguments[3]),t.setAttributeNS(null,"width",arguments[4]),t.setAttributeNS(null,"fill",arguments[5]),t}(function(t){e("rect:hover",t)}.bind(null,n),n.x,n.y,n.height,n.width,i(n.color))}),t.visible&&function(){var t=document.createElementNS("http://www.w3.org/2000/svg","line");return t.setAttributeNS(null,"x1",arguments[0]),t.setAttributeNS(null,"y1",arguments[1]),t.setAttributeNS(null,"x2",arguments[2]),t.setAttributeNS(null,"y2",arguments[3]),t.setAttributeNS(null,"style","stroke:rgba(122,122,122,0.5);stroke-width:"+arguments[4]+";"),t}(t.isVertical?t.start:t.pos,t.isVertical?t.pos:t.start,t.isVertical?t.start+t.length:t.pos,t.isVertical?t.pos:t.start+t.length,t.lineWidth),t.horizontals.map(function(i){var o=i.x,s=i.y,a=i.length;return function(){var t=document.createElementNS("http://www.w3.org/2000/svg","line");return t.onclick=arguments[0],t.onmouseout=arguments[1],t.onmousemove=arguments[2],t.setAttributeNS(null,"x1",arguments[3]),t.setAttributeNS(null,"y1",arguments[4]),t.setAttributeNS(null,"x2",arguments[5]),t.setAttributeNS(null,"y2",arguments[6]),t.setAttributeNS(null,"style","stroke:black;stroke-width:"+arguments[7]+";cursor: pointer;"),t}(n,r,function(t,n){var r=n.offsetX;e("line:hoverHorizontal",{x:r,y:t})}.bind(null,s),o,s,o+a,s,t.lineWidth)}),t.verticals.map(function(i){var o=i.x,s=i.y,a=i.length;return function(){var t=document.createElementNS("http://www.w3.org/2000/svg","line");return t.onclick=arguments[0],t.onmouseout=arguments[1],t.onmousemove=arguments[2],t.setAttributeNS(null,"x1",arguments[3]),t.setAttributeNS(null,"y1",arguments[4]),t.setAttributeNS(null,"x2",arguments[5]),t.setAttributeNS(null,"y2",arguments[6]),t.setAttributeNS(null,"style","stroke:black;stroke-width:"+arguments[7]+";cursor: pointer;"),t}(n,r,function(t,n){var r=n.offsetY;e("line:hoverVertical",{x:t,y:r})}.bind(null,o),o,s,o,s+a,t.lineWidth)}));function n(){e("line:click")}function r(t){e("line:out")}function i(t,e){var n=void 0,r=void 0,i=0;return"red"===t&&(n=238,r=21,i=31),"yellow"===t&&(n=255,r=243,i=0),"blue"===t&&(n=0,r=102,i=181),"black"===t&&(n=0,r=0,i=0),"white"===t&&(n=255,r=255,i=255),"rgba("+n+", "+r+", "+i+", "+(e=e||1)+")"}},st=["red","yellow","blue","white","black"],at=z({href:!1});at.use(function(t,e){var n=t.width=700,r=t.height=700;t.lineWidth=20,t.rects=[{x:0,y:0,height:r,width:n,color:"white"}],t.verticals=F(t.rects),t.horizontals=X(t.rects),t.visible=!1,t.posY=0,t.length=700,e.on("DOMContentLoaded",function(){e.on("rect:hover",function(n){n!==t.pauseRect&&(t.currentRect=n,t.pauseRect=null,e.emit(t.events.RENDER))}),e.on("rect:colorPick",function(n){t.currentRect.color=n,t.pauseRect=t.currentRect,t.currentRect=null,e.emit(t.events.RENDER)}),e.on("rect:colorHover",function(n){t.currentColor=n,e.emit(t.events.RENDER)}),e.on("line:click",function(){if(t.isVertical){var n=t.pos,r=t.start,i=t.rects.filter(function(t){return t.x===r}),o=t.rects.filter(function(t){return t.x!==r}),s=i.filter(function(t){return t.y<=n}),a=i.filter(function(t){return t.y>n}),u=s.sort(function(t,e){return t.y-e.y}).pop();t.rects=o.concat(s).concat(a).concat(function(e,n){var r=t.pos-e.y;return[{x:e.x,y:e.y,height:r,width:e.width,color:e.color},{x:e.x,y:e.y+r,height:e.height-r,width:e.width,color:"black"===e.color?"white":e.color}]}(u)),t.horizontals=X(t.rects)}else{var l=t.pos,c=t.start,h=t.rects.filter(function(t){return t.y===c}),d=t.rects.filter(function(t){return t.y!==c}),f=h.filter(function(t){return t.x<=l}),p=h.filter(function(t){return t.x>l}),m=f.sort(function(t,e){return t.x-e.x}).pop();t.rects=d.concat(f).concat(p).concat(function(e,n){var r=t.pos-e.x;return[{x:e.x,y:e.y,width:r,height:e.height,color:e.color},{x:e.x+r,y:e.y,width:e.width-r,height:e.height,color:"black"===e.color?"white":e.color}]}(m)),t.verticals=F(t.rects)}t.visible=!1,e.emit(t.events.RENDER)}),e.on("line:hoverVertical",function(n){var r=n.x,i=n.y;t.isVertical=!0,t.currentRect=null,t.pos=i,t.start=r,t.length=t.verticals.filter(function(t){return t.y<=i&&i<=t.y+t.length&&t.x>r}).sort(function(t,e){return t.x-e.x})[0].x-r,t.visible=!0,e.emit(t.events.RENDER)}),e.on("line:hoverHorizontal",function(n){var r=n.x,i=n.y;t.isVertical=!1,t.currentRect=null,t.pos=r,t.start=i;var o=t.horizontals.filter(function(t){return t.x<=r&&r<=t.x+t.length&&t.y>i}).sort(function(t,e){return t.y-e.y})[0].y-i;t.length=o,t.visible=!0,e.emit(t.events.RENDER)}),e.on("line:out",function(){t.visible=!1,e.emit(t.events.RENDER)})})}),at.route("/",ot),at.route("/*",ot),at.mount("body")}();
//# sourceMappingURL=bundle.js.map