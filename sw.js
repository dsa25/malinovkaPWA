if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const d=e=>n(e,r),a={module:{uri:r},exports:o,require:d};i[r]=Promise.all(c.map((e=>a[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-0709ad10.css",revision:null},{url:"assets/index-0b13bf52.js",revision:null},{url:"index.html",revision:"76a9ccf9af5becf1150e4ca1621ee460"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./icons/android-chrome-192x192.png",revision:"396557cea4cc1ca1b39af25c3f7d0eb3"},{url:"./icons/android-chrome-512x512.png",revision:"f8ccf79ed21b218d4c388902f13b6dbc"},{url:"./icons/android-48-48.png",revision:"6c4e4c388e214d62796091046569a990"},{url:"./icons/android-72-72.png",revision:"4fd3839ee4092834924f63ffb86e6be9"},{url:"./icons/android-96-96.png",revision:"11ad97222efc540e62c7614d36c0e527"},{url:"./icons/android-144-144.png",revision:"ecd114955e9e4aec5d88a90e4ee9a8ae"},{url:"./icons/32.png",revision:"3fdd5692697be595e469444ca733b8ac"},{url:"./icons/64.png",revision:"6ddd86106df351a030add38367048c9d"},{url:"./icons/120.png",revision:"61cb7c3721399b9a46df4759c9e1fc8c"},{url:"./icons/256.png",revision:"a7b4da1374d97710e32c5729a1b117ec"},{url:"./favicon.ico",revision:"1b1a3b9ef9c6d69705001e28ca775cb1"},{url:"./assets/logo-07148493.png",revision:"61cb7c3721399b9a46df4759c9e1fc8c"},{url:"./assets/sprite-bab663ec.svg",revision:"e6fdaacc5be9aa0e0ae8dec3a89a4620"},{url:"./assets/spinner-047aa345.svg",revision:"84d8514528636c6f1ad6aa6f8b2a4678"},{url:"manifest.webmanifest",revision:"8259cc6fe6f4af78e02460852c3366c6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
