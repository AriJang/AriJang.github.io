import{x as A,s as rt,n as L,b as Z,r as yt,o as Rt}from"../chunks/scheduler.aZHIKDCl.js";import{S as ct,i as it,e as m,s as B,c as g,d as $,h as S,g as p,n as b,j as D,k as v,o as x,A as et,r as nt,p as st,b as at,f as ut,l as Ft,m as j,B as Q,C as kt,w as vt,x as _t,y as pt,t as bt,a as mt,z as gt}from"../chunks/index.Cfc2DBzb.js";import{w as X}from"../chunks/index.Haq8omwQ.js";function G(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}const E=21,jt=Array(E).fill().map(()=>Array(E).fill(null)),Lt=Array(E).fill().map(()=>Array(E).fill().map(()=>[])),Y=X(jt),lt=X("alternate"),U=X("black"),R=X(Lt),z=X(0),V=X([]),J=X([]),wt=X(!0),Ht=X([]);function Xt(){const n=A(V);Y.update(t=>{for(let e=0;e<E;e++)for(let l=0;l<E;l++)t[e][l]=null;return n.forEach(({x:e,y:l,stone:o})=>{t[e][l]=o}),t})}function Bt(n,t){Y.update(e=>{if(e[n][t]===null){e[n][t]=A(U),z.update(o=>o+1),R.update(o=>(o[n][t].push(A(z)),o));const l=Kt(n,t,e);V.update(o=>[...o,{x:n,y:t,stone:A(U),capturedStones:l,moveCount:A(z)}]),J.set([]),A(lt)==="alternate"&&U.set(A(U)==="black"?"white":"black")}else e[n][t]=null,R.update(l=>(l[n][t].pop(),l));return e})}function Kt(n,t,e){const l=A(U)==="black"?"white":"black",o=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}],s=[];for(let{dx:c,dy:d}of o){const _=n+c,h=t+d;if(_>0&&_<E&&h>0&&h<E&&e[_][h]===l){const f=Yt(_,h,l,e);Gt(f,e)&&(s.push(...f),Jt(f,e))}}return s}function Yt(n,t,e,l,o=new Set){const s=[],c=[{x:n,y:t}];o.add(`${n},${t}`);const d=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];for(;c.length>0;){const{x:_,y:h}=c.pop();s.push({x:_,y:h,stone:l[_][h]});for(let{dx:f,dy:a}of d){const r=_+f,u=h+a;r>0&&r<E&&u>0&&u<E&&l[r][u]===e&&!o.has(`${r},${u}`)&&(o.add(`${r},${u}`),c.push({x:r,y:u}))}}return s}function Gt(n,t){const e=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];for(let{x:l,y:o}of n)for(let{dx:s,dy:c}of e){const d=l+s,_=o+c;if(!(l===1&&s===-1)&&!(l===E-2&&s===1)&&!(o===1&&c===-1)&&!(o===E-2&&c===1)&&(d<=0||d>=E||_<=0||_>=E||t[d][_]===null))return!1}return!0}function Jt(n,t){n.forEach(({x:e,y:l})=>{t[e][l]=null})}function Ct(){if(A(V).length>0){const n=A(V).pop();J.update(o=>[n,...o]);const{x:t,y:e,capturedStones:l}=n;Y.update(o=>(o[t][e]=null,R.update(s=>(s[t][e].pop(),s)),l.forEach(({x:s,y:c,stone:d})=>{o[s][c]=d}),o)),U.set(n.stone),z.update(o=>o-1)}}function $t(){if(A(J).length>0){const n=A(J).shift(),{x:t,y:e,stone:l,moveCount:o}=n;Y.update(s=>{s[t][e]=l,R.update(d=>(d[t][e].push(o),d));const c=Kt(t,e,s);return V.update(d=>[...d,{x:t,y:e,stone:l,capturedStones:c,moveCount:o}]),s}),U.set(l==="black"?"white":"black"),z.update(s=>s+1)}}function qt(){const n=A(V);J.update(t=>[...n,...t]),Y.set(Array(E).fill().map(()=>Array(E).fill(null))),R.set(Array(E).fill().map(()=>Array(E).fill().map(()=>[]))),z.set(0),V.set([])}function Wt(){let n=Math.min(5,A(V).length);for(let t=0;t<n;t++)Ct()}function Qt(){let n=Math.min(5,A(J).length);for(let t=0;t<n;t++)$t()}function Zt(){for(;A(J).length>0;)$t()}function Pt(){Y.set(Array(E).fill().map(()=>Array(E).fill(null))),R.set(Array(E).fill().map(()=>Array(E).fill().map(()=>[]))),z.set(0),V.set([]),J.set([]),U.set("black")}function te(){wt.update(n=>!n)}function ee(){lt.set("white"),U.set("white")}function ne(){lt.set("black"),U.set("black")}function le(){lt.set("alternate"),U.set("black")}function oe(){const n=prompt("파일 이름을 입력하세요:","kibo.json");if(!n)return;const t={board:A(Y),history:A(V),moveHistoryStack:A(R),moveCount:A(z)},e=JSON.stringify(t),l=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(l),s=document.createElement("a");s.href=o,s.download=n,s.click(),URL.revokeObjectURL(o)}function se(n){const t=n.target.files[0];if(console.log("loadKiboFromLocal",t),!t)return;const e=new FileReader;e.onload=l=>{const o=JSON.parse(l.target.result);zt(o)},e.readAsText(t),n.target.value=""}function zt(n){Pt(),Y.set(n.board||jt),V.set(n.history||[]),R.set(n.moveHistoryStack||Lt),z.set(n.moveCount||0),Xt()}async function re(){try{const n=await fetch("/kibo/files.json");Ht.set(await n.json())}catch(n){console.error("Error fetching kibo files:",n)}}async function ce(n){const t=n.target.value;if(console.log("loadKiboFromAssets file=",t),t)try{const l=await(await fetch(`/kibo/${t}`)).json();zt(l)}catch(e){console.error("Error loading kibo file:",e)}}const ie=[{x:4,y:4},{x:4,y:10},{x:4,y:16},{x:10,y:4},{x:10,y:10},{x:10,y:16},{x:16,y:4},{x:16,y:10},{x:16,y:16}];function St(n,t,e){const l=n.slice();return l[7]=t[e],l[9]=e,l}function At(n,t,e){const l=n.slice();return l[10]=t[e],l[12]=e,l}function ae(n,t,e){const l=n.slice();return l[13]=t[e],l[15]=e,l}function ue(n,t,e){const l=n.slice();return l[13]=t[e],l[15]=e,l}function fe(n){let t;return{c(){t=m("div"),this.h()},l(e){t=g(e,"DIV",{class:!0,style:!0}),$(t).forEach(p),this.h()},h(){b(t,"class","line horizontal svelte-v10rnh"),nt(t,"top",n[15]*(1200/18)+"px")},m(e,l){D(e,t,l)},p:L,d(e){e&&p(t)}}}function de(n){let t;return{c(){t=m("div"),this.h()},l(e){t=g(e,"DIV",{class:!0,style:!0}),$(t).forEach(p),this.h()},h(){b(t,"class","line vertical svelte-v10rnh"),nt(t,"left",n[15]*(1200/18)+"px")},m(e,l){D(e,t,l)},p:L,d(e){e&&p(t)}}}function he(n){let t;return{c(){t=m("div"),this.h()},l(e){t=g(e,"DIV",{class:!0}),$(t).forEach(p),this.h()},h(){b(t,"class","star-point svelte-v10rnh")},m(e,l){D(e,t,l)},d(e){e&&p(t)}}}function ve(n){let t;return{c(){t=m("div"),this.h()},l(e){t=g(e,"DIV",{class:!0}),$(t).forEach(p),this.h()},h(){b(t,"class","stone white svelte-v10rnh")},m(e,l){D(e,t,l)},d(e){e&&p(t)}}}function _e(n){let t;return{c(){t=m("div"),this.h()},l(e){t=g(e,"DIV",{class:!0}),$(t).forEach(p),this.h()},h(){b(t,"class","stone black svelte-v10rnh")},m(e,l){D(e,t,l)},d(e){e&&p(t)}}}function Ot(n){let t,e,l=n[1]&&xt(n);return{c(){t=m("div"),l&&l.c(),this.h()},l(o){t=g(o,"DIV",{class:!0});var s=$(t);l&&l.l(s),s.forEach(p),this.h()},h(){b(t,"class",e="stone "+n[0][n[9]+1][n[12]+1]+" svelte-v10rnh")},m(o,s){D(o,t,s),l&&l.m(t,null)},p(o,s){o[1]?l?l.p(o,s):(l=xt(o),l.c(),l.m(t,null)):l&&(l.d(1),l=null),s&1&&e!==(e="stone "+o[0][o[9]+1][o[12]+1]+" svelte-v10rnh")&&b(t,"class",e)},d(o){o&&p(t),l&&l.d()}}}function xt(n){let t,e=n[2][n[9]+1][n[12]+1].length>0&&Dt(n);return{c(){e&&e.c(),t=st()},l(l){e&&e.l(l),t=st()},m(l,o){e&&e.m(l,o),D(l,t,o)},p(l,o){l[2][l[9]+1][l[12]+1].length>0?e?e.p(l,o):(e=Dt(l),e.c(),e.m(t.parentNode,t)):e&&(e.d(1),e=null)},d(l){l&&p(t),e&&e.d(l)}}}function Dt(n){let t,e=n[2][n[9]+1][n[12]+1][n[2][n[9]+1][n[12]+1].length-1]+"",l;return{c(){t=m("span"),l=at(e),this.h()},l(o){t=g(o,"SPAN",{class:!0});var s=$(t);l=ut(s,e),s.forEach(p),this.h()},h(){b(t,"class","move-number svelte-v10rnh")},m(o,s){D(o,t,s),v(t,l)},p(o,s){s&4&&e!==(e=o[2][o[9]+1][o[12]+1][o[2][o[9]+1][o[12]+1].length-1]+"")&&Ft(l,e)},d(o){o&&p(t)}}}function Mt(n){let t,e=ie.some(_),l,o,s,c,d;function _(...y){return n[4](n[9],n[12],...y)}let h=e&&he();function f(y,k){if(y[0][y[9]+1][y[12]+1]==="black")return _e;if(y[0][y[9]+1][y[12]+1]==="white")return ve}let a=f(n),r=a&&a(n),u=(n[0][n[9]+1][n[12]+1]==="black"||n[0][n[9]+1][n[12]+1]==="white")&&Ot(n);function i(){return n[5](n[9],n[12])}function M(...y){return n[6](n[9],n[12],...y)}return{c(){t=m("div"),h&&h.c(),l=B(),r&&r.c(),o=B(),u&&u.c(),s=B(),this.h()},l(y){t=g(y,"DIV",{class:!0,style:!0,role:!0,tabindex:!0});var k=$(t);h&&h.l(k),l=S(k),r&&r.l(k),o=S(k),u&&u.l(k),s=S(k),k.forEach(p),this.h()},h(){b(t,"class","cell svelte-v10rnh"),nt(t,"top",n[9]*(1200/18)-25+"px"),nt(t,"left",n[12]*(1200/18)-25+"px"),b(t,"role","button"),b(t,"tabindex","0")},m(y,k){D(y,t,k),h&&h.m(t,null),v(t,l),r&&r.m(t,null),v(t,o),u&&u.m(t,null),v(t,s),c||(d=[x(t,"click",i),x(t,"keydown",M)],c=!0)},p(y,k){n=y,a!==(a=f(n))&&(r&&r.d(1),r=a&&a(n),r&&(r.c(),r.m(t,o))),n[0][n[9]+1][n[12]+1]==="black"||n[0][n[9]+1][n[12]+1]==="white"?u?u.p(n,k):(u=Ot(n),u.c(),u.m(t,s)):u&&(u.d(1),u=null)},d(y){y&&p(t),h&&h.d(),r&&r.d(),u&&u.d(),c=!1,yt(d)}}}function It(n){let t,e=G(n[7].slice(1,20)),l=[];for(let o=0;o<e.length;o+=1)l[o]=Mt(At(n,e,o));return{c(){for(let o=0;o<l.length;o+=1)l[o].c();t=st()},l(o){for(let s=0;s<l.length;s+=1)l[s].l(o);t=st()},m(o,s){for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(o,s);D(o,t,s)},p(o,s){if(s&7){e=G(o[7].slice(1,20));let c;for(c=0;c<e.length;c+=1){const d=At(o,e,c);l[c]?l[c].p(d,s):(l[c]=Mt(d),l[c].c(),l[c].m(t.parentNode,t))}for(;c<l.length;c+=1)l[c].d(1);l.length=e.length}},d(o){o&&p(t),et(l,o)}}}function pe(n){let t,e,l,o,s,c=G(Array(19)),d=[];for(let r=0;r<c.length;r+=1)d[r]=fe(ue(n,c,r));let _=G(Array(19)),h=[];for(let r=0;r<_.length;r+=1)h[r]=de(ae(n,_,r));let f=G(n[0].slice(1,20)),a=[];for(let r=0;r<f.length;r+=1)a[r]=It(St(n,f,r));return{c(){t=m("div");for(let r=0;r<d.length;r+=1)d[r].c();e=B();for(let r=0;r<h.length;r+=1)h[r].c();l=B();for(let r=0;r<a.length;r+=1)a[r].c();this.h()},l(r){t=g(r,"DIV",{class:!0});var u=$(t);for(let i=0;i<d.length;i+=1)d[i].l(u);e=S(u);for(let i=0;i<h.length;i+=1)h[i].l(u);l=S(u);for(let i=0;i<a.length;i+=1)a[i].l(u);u.forEach(p),this.h()},h(){b(t,"class","board svelte-v10rnh")},m(r,u){D(r,t,u);for(let i=0;i<d.length;i+=1)d[i]&&d[i].m(t,null);v(t,e);for(let i=0;i<h.length;i+=1)h[i]&&h[i].m(t,null);v(t,l);for(let i=0;i<a.length;i+=1)a[i]&&a[i].m(t,null);o||(s=x(t,"contextmenu",n[3]),o=!0)},p(r,[u]){if(u&7){f=G(r[0].slice(1,20));let i;for(i=0;i<f.length;i+=1){const M=St(r,f,i);a[i]?a[i].p(M,u):(a[i]=It(M),a[i].c(),a[i].m(t,null))}for(;i<a.length;i+=1)a[i].d(1);a.length=f.length}},i:L,o:L,d(r){r&&p(t),et(d,r),et(h,r),et(a,r),o=!1,s()}}}function be(n,t,e){let l,o,s;Z(n,Y,f=>e(0,l=f)),Z(n,wt,f=>e(1,o=f)),Z(n,R,f=>e(2,s=f));function c(f){f.preventDefault(),Ct()}return[l,o,s,c,(f,a,r)=>r.x===f+1&&r.y===a+1,(f,a)=>{Bt(f+1,a+1)},(f,a,r)=>{r.key==="Enter"&&Bt(f+1,a+1)}]}class me extends ct{constructor(t){super(),it(this,t,be,pe,rt,{})}}function Ut(n,t,e){const l=n.slice();return l[3]=t[e],l}function ge(n){let t;return{c(){t=at("순서보이기")},l(e){t=ut(e,"순서보이기")},m(e,l){D(e,t,l)},d(e){e&&p(t)}}}function ke(n){let t;return{c(){t=at("순서숨기기")},l(e){t=ut(e,"순서숨기기")},m(e,l){D(e,t,l)},d(e){e&&p(t)}}}function Vt(n){let t,e=n[3]+"",l,o;return{c(){t=m("option"),l=at(e),this.h()},l(s){t=g(s,"OPTION",{});var c=$(t);l=ut(c,e),c.forEach(p),this.h()},h(){t.__value=o=n[3],kt(t,t.__value)},m(s,c){D(s,t,c),v(t,l)},p(s,c){c&4&&e!==(e=s[3]+"")&&Ft(l,e),c&4&&o!==(o=s[3])&&(t.__value=o,kt(t,t.__value))},d(s){s&&p(t)}}}function ye(n){let t,e,l,o,s,c,d,_,h,f,a="리셋",r,u,i,M="기보 저장",y,k,tt="기보 불러오기 (로컬)",q,F,H,C,K,Et="기보 선택 (assets)",ft,Tt;function Nt(w,T){return w[1]?ke:ge}let ot=Nt(n),P=ot(n),W=G(n[2]),O=[];for(let w=0;w<W.length;w+=1)O[w]=Vt(Ut(n,W,w));return{c(){t=m("div"),e=m("button"),l=B(),o=m("button"),s=B(),c=m("button"),d=B(),_=m("button"),P.c(),h=B(),f=m("button"),f.textContent=a,r=B(),u=m("div"),i=m("button"),i.textContent=M,y=B(),k=m("label"),k.textContent=tt,q=B(),F=m("input"),H=B(),C=m("select"),K=m("option"),K.textContent=Et;for(let w=0;w<O.length;w+=1)O[w].c();this.h()},l(w){t=g(w,"DIV",{class:!0});var T=$(t);e=g(T,"BUTTON",{class:!0}),$(e).forEach(p),l=S(T),o=g(T,"BUTTON",{class:!0}),$(o).forEach(p),s=S(T),c=g(T,"BUTTON",{class:!0}),$(c).forEach(p),d=S(T),_=g(T,"BUTTON",{class:!0});var N=$(_);P.l(N),N.forEach(p),h=S(T),f=g(T,"BUTTON",{class:!0,style:!0,"data-svelte-h":!0}),j(f)!=="svelte-1owoptx"&&(f.textContent=a),r=S(T),u=g(T,"DIV",{class:!0});var I=$(u);i=g(I,"BUTTON",{class:!0,"data-svelte-h":!0}),j(i)!=="svelte-5dzi3v"&&(i.textContent=M),y=S(I),k=g(I,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),j(k)!=="svelte-j9loce"&&(k.textContent=tt),q=S(I),F=g(I,"INPUT",{type:!0,id:!0,class:!0}),H=S(I),C=g(I,"SELECT",{class:!0});var dt=$(C);K=g(dt,"OPTION",{"data-svelte-h":!0}),j(K)!=="svelte-1tfg7ip"&&(K.textContent=Et);for(let ht=0;ht<O.length;ht+=1)O[ht].l(dt);dt.forEach(p),I.forEach(p),T.forEach(p),this.h()},h(){b(e,"class","button white-button svelte-fvvgdc"),Q(e,"selected",n[0]==="white"),b(o,"class","button black-button svelte-fvvgdc"),Q(o,"selected",n[0]==="black"),b(c,"class","button alternate-button svelte-fvvgdc"),Q(c,"selected",n[0]==="alternate"),b(_,"class","button number-button svelte-fvvgdc"),b(f,"class","button number-button svelte-fvvgdc"),nt(f,"background-color","red"),b(i,"class","kibo-button save svelte-fvvgdc"),b(k,"for","kibo-file"),b(k,"class","kibo-button load svelte-fvvgdc"),b(F,"type","file"),b(F,"id","kibo-file"),b(F,"class","file-input svelte-fvvgdc"),K.__value="",kt(K,K.__value),b(C,"class","kibo-button load svelte-fvvgdc"),b(u,"class","kibo-container svelte-fvvgdc"),b(t,"class","controls-side svelte-fvvgdc")},m(w,T){D(w,t,T),v(t,e),v(t,l),v(t,o),v(t,s),v(t,c),v(t,d),v(t,_),P.m(_,null),v(t,h),v(t,f),v(t,r),v(t,u),v(u,i),v(u,y),v(u,k),v(u,q),v(u,F),v(u,H),v(u,C),v(C,K);for(let N=0;N<O.length;N+=1)O[N]&&O[N].m(C,null);ft||(Tt=[x(e,"click",ee),x(o,"click",ne),x(c,"click",le),x(_,"click",te),x(f,"click",Pt),x(i,"click",oe),x(F,"change",se),x(C,"change",ce)],ft=!0)},p(w,[T]){if(T&1&&Q(e,"selected",w[0]==="white"),T&1&&Q(o,"selected",w[0]==="black"),T&1&&Q(c,"selected",w[0]==="alternate"),ot!==(ot=Nt(w))&&(P.d(1),P=ot(w),P&&(P.c(),P.m(_,null))),T&4){W=G(w[2]);let N;for(N=0;N<W.length;N+=1){const I=Ut(w,W,N);O[N]?O[N].p(I,T):(O[N]=Vt(I),O[N].c(),O[N].m(C,null))}for(;N<O.length;N+=1)O[N].d(1);O.length=W.length}},i:L,o:L,d(w){w&&p(t),P.d(),et(O,w),ft=!1,yt(Tt)}}}function we(n,t,e){let l,o,s;return Z(n,lt,c=>e(0,l=c)),Z(n,wt,c=>e(1,o=c)),Z(n,Ht,c=>e(2,s=c)),[l,o,s]}class Ce extends ct{constructor(t){super(),it(this,t,we,ye,rt,{})}}function $e(n){let t,e,l="처음으로",o,s,c="5수 뒤로",d,_,h="한 수 뒤로",f,a,r="한 수 앞으로",u,i,M="5수 앞으로",y,k,tt="마지막으로",q,F;return{c(){t=m("div"),e=m("button"),e.textContent=l,o=B(),s=m("button"),s.textContent=c,d=B(),_=m("button"),_.textContent=h,f=B(),a=m("button"),a.textContent=r,u=B(),i=m("button"),i.textContent=M,y=B(),k=m("button"),k.textContent=tt,this.h()},l(H){t=g(H,"DIV",{class:!0});var C=$(t);e=g(C,"BUTTON",{class:!0,"data-svelte-h":!0}),j(e)!=="svelte-rj5alg"&&(e.textContent=l),o=S(C),s=g(C,"BUTTON",{class:!0,"data-svelte-h":!0}),j(s)!=="svelte-1dbxhv5"&&(s.textContent=c),d=S(C),_=g(C,"BUTTON",{class:!0,"data-svelte-h":!0}),j(_)!=="svelte-12yj6zi"&&(_.textContent=h),f=S(C),a=g(C,"BUTTON",{class:!0,"data-svelte-h":!0}),j(a)!=="svelte-1wuysru"&&(a.textContent=r),u=S(C),i=g(C,"BUTTON",{class:!0,"data-svelte-h":!0}),j(i)!=="svelte-ww2olb"&&(i.textContent=M),y=S(C),k=g(C,"BUTTON",{class:!0,"data-svelte-h":!0}),j(k)!=="svelte-y1twzw"&&(k.textContent=tt),C.forEach(p),this.h()},h(){b(e,"class","button svelte-kbxydc"),b(s,"class","button svelte-kbxydc"),b(_,"class","button svelte-kbxydc"),b(a,"class","button svelte-kbxydc"),b(i,"class","button svelte-kbxydc"),b(k,"class","button svelte-kbxydc"),b(t,"class","media-buttons svelte-kbxydc")},m(H,C){D(H,t,C),v(t,e),v(t,o),v(t,s),v(t,d),v(t,_),v(t,f),v(t,a),v(t,u),v(t,i),v(t,y),v(t,k),q||(F=[x(e,"click",qt),x(s,"click",Wt),x(_,"click",Ct),x(a,"click",$t),x(i,"click",Qt),x(k,"click",Zt)],q=!0)},p:L,i:L,o:L,d(H){H&&p(t),q=!1,yt(F)}}}class Ee extends ct{constructor(t){super(),it(this,t,null,$e,rt,{})}}function Te(n){let t,e,l,o,s,c,d,_,h,f;return o=new me({}),d=new Ee({}),h=new Ce({}),{c(){t=m("div"),e=m("div"),l=m("div"),vt(o.$$.fragment),s=B(),c=m("div"),vt(d.$$.fragment),_=B(),vt(h.$$.fragment),this.h()},l(a){t=g(a,"DIV",{class:!0});var r=$(t);e=g(r,"DIV",{class:!0});var u=$(e);l=g(u,"DIV",{class:!0});var i=$(l);_t(o.$$.fragment,i),i.forEach(p),s=S(u),c=g(u,"DIV",{class:!0});var M=$(c);_t(d.$$.fragment,M),M.forEach(p),u.forEach(p),_=S(r),_t(h.$$.fragment,r),r.forEach(p),this.h()},h(){b(l,"class","board-container svelte-4ehnv5"),b(c,"class","media-buttons-container svelte-4ehnv5"),b(e,"class","board-side-container svelte-4ehnv5"),b(t,"class","container svelte-4ehnv5")},m(a,r){D(a,t,r),v(t,e),v(e,l),pt(o,l,null),v(e,s),v(e,c),pt(d,c,null),v(t,_),pt(h,t,null),f=!0},p:L,i(a){f||(bt(o.$$.fragment,a),bt(d.$$.fragment,a),bt(h.$$.fragment,a),f=!0)},o(a){mt(o.$$.fragment,a),mt(d.$$.fragment,a),mt(h.$$.fragment,a),f=!1},d(a){a&&p(t),gt(o),gt(d),gt(h)}}}function Ne(n){return Rt(async()=>{console.log("import.meta.env.DEV = ",!1),re()}),[]}class Oe extends ct{constructor(t){super(),it(this,t,Ne,Te,rt,{})}}export{Oe as component};
