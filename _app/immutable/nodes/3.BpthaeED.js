import{x as y,s as pe,n as x,b as J,r as Be,o as xe}from"../chunks/scheduler.aZHIKDCl.js";import{S as be,i as me,e as g,s as C,c as k,d as T,h as B,g as h,n as p,j as O,k as d,o as I,A as de,r as he,p as ce,b as z,f as X,l as Oe,m as fe,B as ie,C as Se,w as we,x as Ee,y as Te,t as Me,a as Ne,z as $e}from"../chunks/index.Cfc2DBzb.js";import{w as H}from"../chunks/index.Haq8omwQ.js";function te(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}const D=21,Ae=Array(D).fill().map(()=>Array(D).fill(null)),De=Array(D).fill().map(()=>Array(D).fill().map(()=>[])),Y=H(Ae),ve=H("alternate"),F=H("black"),Q=H(De),W=H(0),j=H([]),ne=H([]),Ue=H(!0),Ge=H([]),ge=H(!1),q=H(!1),le=H([]),_e=H([]),ae=H(0);function et(){const n=y(j);Y.update(e=>{for(let t=0;t<D;t++)for(let l=0;l<D;l++)e[t][l]=null;return n.forEach(({x:t,y:l,stone:o})=>{e[t][l]=o}),e})}function Fe(n,e){if(y(ge)&&!y(q)){alert("놓아보기 모드를 활성화해야 착수할 수 있습니다.");return}Y.update(t=>{if(y(q)){if(t[n][e]===null){t[n][e]=y(F);const l=y(ae)+1,o=Ce(n,e,t);le.update(s=>[...s,{x:n,y:e,stone:y(F),capturedStones:o,moveCount:l,isTryModeMove:!0}]),_e.update(s=>(s[n][e].push(l),s)),ae.set(l),F.set(y(F)==="black"?"white":"black")}}else if(t[n][e]===null){t[n][e]=y(F),W.update(o=>o+1),Q.update(o=>(o[n][e].push(y(W)),o));const l=Ce(n,e,t);j.update(o=>[...o,{x:n,y:e,stone:y(F),capturedStones:l,moveCount:y(W)}]),ne.set([]),y(ve)==="alternate"&&F.set(y(F)==="black"?"white":"black")}else t[n][e]=null,Q.update(l=>(l[n][e].pop(),l));return t})}function Ce(n,e,t){const l=y(F)==="black"?"white":"black",o=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}],s=[];for(let{dx:r,dy:a}of o){const _=n+r,v=e+a;if(_>0&&_<D&&v>0&&v<D&&t[_][v]===l){const b=tt(_,v,l,t);nt(b,t)&&(s.push(...b),lt(b,t))}}return s}function tt(n,e,t,l,o=new Set){const s=[],r=[{x:n,y:e}];o.add(`${n},${e}`);const a=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];for(;r.length>0;){const{x:_,y:v}=r.pop();s.push({x:_,y:v,stone:l[_][v]});for(let{dx:b,dy:f}of a){const c=_+b,u=v+f;c>0&&c<D&&u>0&&u<D&&l[c][u]===t&&!o.has(`${c},${u}`)&&(o.add(`${c},${u}`),r.push({x:c,y:u}))}}return s}function nt(n,e){const t=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];for(let{x:l,y:o}of n)for(let{dx:s,dy:r}of t){const a=l+s,_=o+r;if(!(l===1&&s===-1)&&!(l===D-2&&s===1)&&!(o===1&&r===-1)&&!(o===D-2&&r===1)&&(a<=0||a>=D||_<=0||_>=D||e[a][_]===null))return!1}return!0}function lt(n,e){n.forEach(({x:t,y:l})=>{e[t][l]=null})}function Ie(){if(y(j).length>0){const n=y(j).pop();ne.update(o=>[n,...o]);const{x:e,y:t,capturedStones:l}=n;Y.update(o=>(o[e][t]=null,Q.update(s=>(s[e][t].pop(),s)),l.forEach(({x:s,y:r,stone:a})=>{o[s][r]=a}),o)),F.set(n.stone),W.update(o=>o-1)}}function Ve(){if(y(ne).length>0){const n=y(ne).shift(),{x:e,y:t,stone:l,moveCount:o}=n;Y.update(s=>{s[e][t]=l,Q.update(a=>(a[e][t].push(o),a));const r=Ce(e,t,s);return j.update(a=>[...a,{x:e,y:t,stone:l,capturedStones:r,moveCount:o}]),s}),F.set(l==="black"?"white":"black"),W.update(s=>s+1)}}function Je(){const n=y(j);ne.update(e=>[...n,...e]),Y.set(Array(D).fill().map(()=>Array(D).fill(null))),Q.set(Array(D).fill().map(()=>Array(D).fill().map(()=>[]))),W.set(0),j.set([])}function ot(){let n=Math.min(5,y(j).length);for(let e=0;e<n;e++)Ie()}function st(){let n=Math.min(5,y(ne).length);for(let e=0;e<n;e++)Ve()}function qe(){for(;y(ne).length>0;)Ve()}function We(){if(y(q)&&y(le).length>0){const n=y(le).pop();Y.update(e=>(e[n.x][n.y]=null,e)),_e.update(e=>(e[n.x][n.y].pop(),e)),n.capturedStones.forEach(({x:e,y:t,stone:l})=>{Y.update(o=>(o[e][t]=l,o))}),ae.update(e=>e-1)}else alert("더 이상 되돌릴 수 없습니다.")}function rt(){q.update(n=>!n),y(q)?it():ct()}function it(){le.set([]),_e.set(y(Q)),q.set(!0),ae.set(0)}function ct(){q.set(!1),le.set([]),_e.set([]),ae.set(0),Y.update(n=>{for(let e=0;e<D;e++)for(let t=0;t<D;t++)n[e][t]=null;return y(j).forEach(e=>{n[e.x][e.y]=e.stone}),n}),W.set(y(j).length)}function Qe(){Y.set(Ae),Q.set(De),W.set(0),j.set([]),ne.set([]),ge.set(!1),q.set(!1),le.set([]),ae.set(0),F.set("black"),et()}function at(){Ue.update(n=>!n)}function ut(){ve.set("white"),F.set("white")}function ft(){ve.set("black"),F.set("black")}function dt(){ve.set("alternate"),F.set("black")}function ht(){const n=prompt("파일 이름을 입력하세요:","kibo.json");if(!n)return;const e={board:y(Y),history:y(j),moveHistoryStack:y(Q),moveCount:y(W)},t=JSON.stringify(e),l=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(l),s=document.createElement("a");s.href=o,s.download=n,s.click(),URL.revokeObjectURL(o)}function vt(n){const e=n.target.files[0];if(console.log("loadKiboFromLocal",e),!e)return;const t=new FileReader;t.onload=l=>{const o=JSON.parse(l.target.result);Ze(o)},t.readAsText(e),n.target.value=""}function Ze(n){Qe(),Y.set(n.board||Ae),j.set(n.history||[]),Q.set(n.moveHistoryStack||De),W.set(n.moveCount||0),ge.set(!0),q.set(!1),le.set([]),_t()}function _t(){Je(),qe()}async function pt(){try{const n=await fetch("/kibo/files.json");Ge.set(await n.json())}catch(n){console.error("Error fetching kibo files:",n)}}async function bt(n){const e=n.target.value;if(console.log("loadKiboFromAssets file=",e),e)try{const l=await(await fetch(`/kibo/${e}`)).json();Ze(l)}catch(t){console.error("Error loading kibo file:",t)}}const mt=[{x:4,y:4},{x:4,y:10},{x:4,y:16},{x:10,y:4},{x:10,y:10},{x:10,y:16},{x:16,y:4},{x:16,y:10},{x:16,y:16}];function He(n,e,t){const l=n.slice();return l[11]=e[t],l[13]=t,l}function Le(n,e,t){const l=n.slice();return l[14]=e[t],l[16]=t,l}function gt(n,e,t){const l=n.slice();return l[17]=e[t],l[19]=t,l}function kt(n,e,t){const l=n.slice();return l[17]=e[t],l[19]=t,l}function yt(n){let e;return{c(){e=g("div"),this.h()},l(t){e=k(t,"DIV",{class:!0,style:!0}),T(e).forEach(h),this.h()},h(){p(e,"class","line horizontal svelte-v10rnh"),he(e,"top",n[19]*(1200/18)+"px")},m(t,l){O(t,e,l)},p:x,d(t){t&&h(e)}}}function wt(n){let e;return{c(){e=g("div"),this.h()},l(t){e=k(t,"DIV",{class:!0,style:!0}),T(e).forEach(h),this.h()},h(){p(e,"class","line vertical svelte-v10rnh"),he(e,"left",n[19]*(1200/18)+"px")},m(t,l){O(t,e,l)},p:x,d(t){t&&h(e)}}}function Et(n){let e;return{c(){e=g("div"),this.h()},l(t){e=k(t,"DIV",{class:!0}),T(e).forEach(h),this.h()},h(){p(e,"class","star-point svelte-v10rnh")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function Tt(n){let e;return{c(){e=g("div"),this.h()},l(t){e=k(t,"DIV",{class:!0}),T(e).forEach(h),this.h()},h(){p(e,"class","stone white svelte-v10rnh")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function Mt(n){let e;return{c(){e=g("div"),this.h()},l(t){e=k(t,"DIV",{class:!0}),T(e).forEach(h),this.h()},h(){p(e,"class","stone black svelte-v10rnh")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function je(n){let e,t;function l(r,a){if(r[0])return $t;if(r[4])return Nt}let o=l(n),s=o&&o(n);return{c(){e=g("div"),s&&s.c(),this.h()},l(r){e=k(r,"DIV",{class:!0});var a=T(e);s&&s.l(a),a.forEach(h),this.h()},h(){p(e,"class",t="stone "+n[1][n[13]+1][n[16]+1]+" svelte-v10rnh")},m(r,a){O(r,e,a),s&&s.m(e,null)},p(r,a){o===(o=l(r))&&s?s.p(r,a):(s&&s.d(1),s=o&&o(r),s&&(s.c(),s.m(e,null))),a&2&&t!==(t="stone "+r[1][r[13]+1][r[16]+1]+" svelte-v10rnh")&&p(e,"class",t)},d(r){r&&h(e),s&&s.d()}}}function Nt(n){let e,t=n[5][n[13]+1][n[16]+1].length>0&&Ke(n);return{c(){t&&t.c(),e=ce()},l(l){t&&t.l(l),e=ce()},m(l,o){t&&t.m(l,o),O(l,e,o)},p(l,o){l[5][l[13]+1][l[16]+1].length>0?t?t.p(l,o):(t=Ke(l),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(l){l&&h(e),t&&t.d(l)}}}function $t(n){let e=n[2].find(l),t;function l(...s){return n[7](n[13],n[16],...s)}let o=e&&Pe(n);return{c(){o&&o.c(),t=ce()},l(s){o&&o.l(s),t=ce()},m(s,r){o&&o.m(s,r),O(s,t,r)},p(s,r){n=s,r&4&&(e=n[2].find(l)),e?o?o.p(n,r):(o=Pe(n),o.c(),o.m(t.parentNode,t)):o&&(o.d(1),o=null)},d(s){s&&h(t),o&&o.d(s)}}}function Ke(n){let e,t=n[5][n[13]+1][n[16]+1][n[5][n[13]+1][n[16]+1].length-1]+"",l;return{c(){e=g("span"),l=z(t),this.h()},l(o){e=k(o,"SPAN",{class:!0});var s=T(e);l=X(s,t),s.forEach(h),this.h()},h(){p(e,"class","move-number svelte-v10rnh")},m(o,s){O(o,e,s),d(e,l)},p(o,s){s&32&&t!==(t=o[5][o[13]+1][o[16]+1][o[5][o[13]+1][o[16]+1].length-1]+"")&&Oe(l,t)},d(o){o&&h(e)}}}function Pe(n){let e,t=n[3][n[13]+1][n[16]+1][n[3][n[13]+1][n[16]+1].length-1]+"",l;return{c(){e=g("span"),l=z(t),this.h()},l(o){e=k(o,"SPAN",{class:!0});var s=T(e);l=X(s,t),s.forEach(h),this.h()},h(){p(e,"class","move-number svelte-v10rnh")},m(o,s){O(o,e,s),d(e,l)},p(o,s){s&8&&t!==(t=o[3][o[13]+1][o[16]+1][o[3][o[13]+1][o[16]+1].length-1]+"")&&Oe(l,t)},d(o){o&&h(e)}}}function Re(n){let e,t=mt.some(_),l,o,s,r,a;function _(...m){return n[8](n[13],n[16],...m)}let v=t&&Et();function b(m,w){if(m[1][m[13]+1][m[16]+1]==="black")return Mt;if(m[1][m[13]+1][m[16]+1]==="white")return Tt}let f=b(n),c=f&&f(n),u=(n[1][n[13]+1][n[16]+1]==="black"||n[1][n[13]+1][n[16]+1]==="white")&&je(n);function i(){return n[9](n[13],n[16])}function S(...m){return n[10](n[13],n[16],...m)}return{c(){e=g("div"),v&&v.c(),l=C(),c&&c.c(),o=C(),u&&u.c(),s=C(),this.h()},l(m){e=k(m,"DIV",{class:!0,style:!0,role:!0,tabindex:!0});var w=T(e);v&&v.l(w),l=B(w),c&&c.l(w),o=B(w),u&&u.l(w),s=B(w),w.forEach(h),this.h()},h(){p(e,"class","cell svelte-v10rnh"),he(e,"top",n[13]*(1200/18)-25+"px"),he(e,"left",n[16]*(1200/18)-25+"px"),p(e,"role","button"),p(e,"tabindex","0")},m(m,w){O(m,e,w),v&&v.m(e,null),d(e,l),c&&c.m(e,null),d(e,o),u&&u.m(e,null),d(e,s),r||(a=[I(e,"click",i),I(e,"keydown",S)],r=!0)},p(m,w){n=m,f!==(f=b(n))&&(c&&c.d(1),c=f&&f(n),c&&(c.c(),c.m(e,o))),n[1][n[13]+1][n[16]+1]==="black"||n[1][n[13]+1][n[16]+1]==="white"?u?u.p(n,w):(u=je(n),u.c(),u.m(e,s)):u&&(u.d(1),u=null)},d(m){m&&h(e),v&&v.d(),c&&c.d(),u&&u.d(),r=!1,Be(a)}}}function ze(n){let e,t=te(n[11].slice(1,20)),l=[];for(let o=0;o<t.length;o+=1)l[o]=Re(Le(n,t,o));return{c(){for(let o=0;o<l.length;o+=1)l[o].c();e=ce()},l(o){for(let s=0;s<l.length;s+=1)l[s].l(o);e=ce()},m(o,s){for(let r=0;r<l.length;r+=1)l[r]&&l[r].m(o,s);O(o,e,s)},p(o,s){if(s&63){t=te(o[11].slice(1,20));let r;for(r=0;r<t.length;r+=1){const a=Le(o,t,r);l[r]?l[r].p(a,s):(l[r]=Re(a),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=t.length}},d(o){o&&h(e),de(l,o)}}}function St(n){let e,t,l,o,s,r=te(Array(19)),a=[];for(let c=0;c<r.length;c+=1)a[c]=yt(kt(n,r,c));let _=te(Array(19)),v=[];for(let c=0;c<_.length;c+=1)v[c]=wt(gt(n,_,c));let b=te(n[1].slice(1,20)),f=[];for(let c=0;c<b.length;c+=1)f[c]=ze(He(n,b,c));return{c(){e=g("div");for(let c=0;c<a.length;c+=1)a[c].c();t=C();for(let c=0;c<v.length;c+=1)v[c].c();l=C();for(let c=0;c<f.length;c+=1)f[c].c();this.h()},l(c){e=k(c,"DIV",{class:!0});var u=T(e);for(let i=0;i<a.length;i+=1)a[i].l(u);t=B(u);for(let i=0;i<v.length;i+=1)v[i].l(u);l=B(u);for(let i=0;i<f.length;i+=1)f[i].l(u);u.forEach(h),this.h()},h(){p(e,"class","board svelte-v10rnh")},m(c,u){O(c,e,u);for(let i=0;i<a.length;i+=1)a[i]&&a[i].m(e,null);d(e,t);for(let i=0;i<v.length;i+=1)v[i]&&v[i].m(e,null);d(e,l);for(let i=0;i<f.length;i+=1)f[i]&&f[i].m(e,null);o||(s=I(e,"contextmenu",n[6]),o=!0)},p(c,[u]){if(u&63){b=te(c[1].slice(1,20));let i;for(i=0;i<b.length;i+=1){const S=He(c,b,i);f[i]?f[i].p(S,u):(f[i]=ze(S),f[i].c(),f[i].m(e,null))}for(;i<f.length;i+=1)f[i].d(1);f.length=b.length}},i:x,o:x,d(c){c&&h(e),de(a,c),de(v,c),de(f,c),o=!1,s()}}}function Ct(n,e,t){let l,o,s,r,a,_;J(n,q,i=>t(0,l=i)),J(n,Y,i=>t(1,o=i)),J(n,le,i=>t(2,s=i)),J(n,_e,i=>t(3,r=i)),J(n,Ue,i=>t(4,a=i)),J(n,Q,i=>t(5,_=i));function v(i){i.preventDefault(),l?We():Ie()}return[l,o,s,r,a,_,v,(i,S,m)=>m.x===i+1&&m.y===S+1&&m.isTryModeMove,(i,S,m)=>m.x===i+1&&m.y===S+1,(i,S)=>{Fe(i+1,S+1)},(i,S,m)=>{m.key==="Enter"&&Fe(i+1,S+1)}]}class Bt extends be{constructor(e){super(),me(this,e,Ct,St,pe,{})}}function Xe(n,e,t){const l=n.slice();return l[3]=e[t],l}function Ot(n){let e;return{c(){e=z("순서보이기")},l(t){e=X(t,"순서보이기")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function At(n){let e;return{c(){e=z("순서숨기기")},l(t){e=X(t,"순서숨기기")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function Ye(n){let e,t=n[3]+"",l,o;return{c(){e=g("option"),l=z(t),this.h()},l(s){e=k(s,"OPTION",{});var r=T(e);l=X(r,t),r.forEach(h),this.h()},h(){e.__value=o=n[3],Se(e,e.__value)},m(s,r){O(s,e,r),d(e,l)},p(s,r){r&4&&t!==(t=s[3]+"")&&Oe(l,t),r&4&&o!==(o=s[3])&&(e.__value=o,Se(e,e.__value))},d(s){s&&h(e)}}}function Dt(n){let e,t,l,o,s,r,a,_,v,b,f="리셋",c,u,i,S="기보 저장",m,w,re="기보 불러오기 (로컬)",oe,V,se,L,K,ue="기보 선택 (assets)",ee,P;function U(M,N){return M[1]?At:Ot}let E=U(n),R=E(n),Z=te(n[2]),A=[];for(let M=0;M<Z.length;M+=1)A[M]=Ye(Xe(n,Z,M));return{c(){e=g("div"),t=g("button"),l=C(),o=g("button"),s=C(),r=g("button"),a=C(),_=g("button"),R.c(),v=C(),b=g("button"),b.textContent=f,c=C(),u=g("div"),i=g("button"),i.textContent=S,m=C(),w=g("label"),w.textContent=re,oe=C(),V=g("input"),se=C(),L=g("select"),K=g("option"),K.textContent=ue;for(let M=0;M<A.length;M+=1)A[M].c();this.h()},l(M){e=k(M,"DIV",{class:!0});var N=T(e);t=k(N,"BUTTON",{class:!0}),T(t).forEach(h),l=B(N),o=k(N,"BUTTON",{class:!0}),T(o).forEach(h),s=B(N),r=k(N,"BUTTON",{class:!0}),T(r).forEach(h),a=B(N),_=k(N,"BUTTON",{class:!0});var $=T(_);R.l($),$.forEach(h),v=B(N),b=k(N,"BUTTON",{class:!0,style:!0,"data-svelte-h":!0}),fe(b)!=="svelte-1owoptx"&&(b.textContent=f),c=B(N),u=k(N,"DIV",{class:!0});var G=T(u);i=k(G,"BUTTON",{class:!0,"data-svelte-h":!0}),fe(i)!=="svelte-5dzi3v"&&(i.textContent=S),m=B(G),w=k(G,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),fe(w)!=="svelte-j9loce"&&(w.textContent=re),oe=B(G),V=k(G,"INPUT",{type:!0,id:!0,class:!0}),se=B(G),L=k(G,"SELECT",{class:!0});var ke=T(L);K=k(ke,"OPTION",{"data-svelte-h":!0}),fe(K)!=="svelte-1tfg7ip"&&(K.textContent=ue);for(let ye=0;ye<A.length;ye+=1)A[ye].l(ke);ke.forEach(h),G.forEach(h),N.forEach(h),this.h()},h(){p(t,"class","button white-button svelte-fvvgdc"),ie(t,"selected",n[0]==="white"),p(o,"class","button black-button svelte-fvvgdc"),ie(o,"selected",n[0]==="black"),p(r,"class","button alternate-button svelte-fvvgdc"),ie(r,"selected",n[0]==="alternate"),p(_,"class","button number-button svelte-fvvgdc"),p(b,"class","button number-button svelte-fvvgdc"),he(b,"background-color","red"),p(i,"class","kibo-button save svelte-fvvgdc"),p(w,"for","kibo-file"),p(w,"class","kibo-button load svelte-fvvgdc"),p(V,"type","file"),p(V,"id","kibo-file"),p(V,"class","file-input svelte-fvvgdc"),K.__value="",Se(K,K.__value),p(L,"class","kibo-button load svelte-fvvgdc"),p(u,"class","kibo-container svelte-fvvgdc"),p(e,"class","controls-side svelte-fvvgdc")},m(M,N){O(M,e,N),d(e,t),d(e,l),d(e,o),d(e,s),d(e,r),d(e,a),d(e,_),R.m(_,null),d(e,v),d(e,b),d(e,c),d(e,u),d(u,i),d(u,m),d(u,w),d(u,oe),d(u,V),d(u,se),d(u,L),d(L,K);for(let $=0;$<A.length;$+=1)A[$]&&A[$].m(L,null);ee||(P=[I(t,"click",ut),I(o,"click",ft),I(r,"click",dt),I(_,"click",at),I(b,"click",Qe),I(i,"click",ht),I(V,"change",vt),I(L,"change",bt)],ee=!0)},p(M,[N]){if(N&1&&ie(t,"selected",M[0]==="white"),N&1&&ie(o,"selected",M[0]==="black"),N&1&&ie(r,"selected",M[0]==="alternate"),E!==(E=U(M))&&(R.d(1),R=E(M),R&&(R.c(),R.m(_,null))),N&4){Z=te(M[2]);let $;for($=0;$<Z.length;$+=1){const G=Xe(M,Z,$);A[$]?A[$].p(G,N):(A[$]=Ye(G),A[$].c(),A[$].m(L,null))}for(;$<A.length;$+=1)A[$].d(1);A.length=Z.length}},i:x,o:x,d(M){M&&h(e),R.d(),de(A,M),ee=!1,Be(P)}}}function Ut(n,e,t){let l,o,s;return J(n,ve,r=>t(0,l=r)),J(n,Ue,r=>t(1,o=r)),J(n,Ge,r=>t(2,s=r)),[l,o,s]}class It extends be{constructor(e){super(),me(this,e,Ut,Dt,pe,{})}}function Vt(n){let e;return{c(){e=z("놓아보기 시작")},l(t){e=X(t,"놓아보기 시작")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function Ft(n){let e;return{c(){e=z("놓아보기 종료")},l(t){e=X(t,"놓아보기 종료")},m(t,l){O(t,e,l)},d(t){t&&h(e)}}}function Ht(n){let e,t,l,o,s,r,a,_,v,b,f,c="한 수 뒤로",u,i,S,m,w,re,oe,V,se,L,K;function ue(U,E){return U[0]?Ft:Vt}let ee=ue(n),P=ee(n);return{c(){e=g("div"),t=g("button"),P.c(),o=C(),s=g("button"),r=z("처음으로"),a=C(),_=g("button"),v=z("5수 뒤로"),b=C(),f=g("button"),f.textContent=c,u=C(),i=g("button"),S=z("한 수 앞으로"),m=C(),w=g("button"),re=z("5수 앞으로"),oe=C(),V=g("button"),se=z("마지막으로"),this.h()},l(U){e=k(U,"DIV",{class:!0});var E=T(e);t=k(E,"BUTTON",{class:!0});var R=T(t);P.l(R),R.forEach(h),o=B(E),s=k(E,"BUTTON",{class:!0});var Z=T(s);r=X(Z,"처음으로"),Z.forEach(h),a=B(E),_=k(E,"BUTTON",{class:!0});var A=T(_);v=X(A,"5수 뒤로"),A.forEach(h),b=B(E),f=k(E,"BUTTON",{class:!0,"data-svelte-h":!0}),fe(f)!=="svelte-sopxef"&&(f.textContent=c),u=B(E),i=k(E,"BUTTON",{class:!0});var M=T(i);S=X(M,"한 수 앞으로"),M.forEach(h),m=B(E),w=k(E,"BUTTON",{class:!0});var N=T(w);re=X(N,"5수 앞으로"),N.forEach(h),oe=B(E),V=k(E,"BUTTON",{class:!0});var $=T(V);se=X($,"마지막으로"),$.forEach(h),E.forEach(h),this.h()},h(){p(t,"class","button svelte-18ghowh"),t.disabled=l=!n[1],p(s,"class","button svelte-18ghowh"),s.disabled=n[0],p(_,"class","button svelte-18ghowh"),_.disabled=n[0],p(f,"class","button svelte-18ghowh"),p(i,"class","button svelte-18ghowh"),i.disabled=n[0],p(w,"class","button svelte-18ghowh"),w.disabled=n[0],p(V,"class","button svelte-18ghowh"),V.disabled=n[0],p(e,"class","media-buttons svelte-18ghowh")},m(U,E){O(U,e,E),d(e,t),P.m(t,null),d(e,o),d(e,s),d(s,r),d(e,a),d(e,_),d(_,v),d(e,b),d(e,f),d(e,u),d(e,i),d(i,S),d(e,m),d(e,w),d(w,re),d(e,oe),d(e,V),d(V,se),L||(K=[I(t,"click",rt),I(s,"click",Je),I(_,"click",ot),I(f,"click",n[2]),I(i,"click",Ve),I(w,"click",st),I(V,"click",qe)],L=!0)},p(U,[E]){ee!==(ee=ue(U))&&(P.d(1),P=ee(U),P&&(P.c(),P.m(t,null))),E&2&&l!==(l=!U[1])&&(t.disabled=l),E&1&&(s.disabled=U[0]),E&1&&(_.disabled=U[0]),E&1&&(i.disabled=U[0]),E&1&&(w.disabled=U[0]),E&1&&(V.disabled=U[0])},i:x,o:x,d(U){U&&h(e),P.d(),L=!1,Be(K)}}}function Lt(n,e,t){let l,o;J(n,q,r=>t(0,l=r)),J(n,ge,r=>t(1,o=r));function s(r){r.preventDefault(),l?We():Ie()}return[l,o,s]}class jt extends be{constructor(e){super(),me(this,e,Lt,Ht,pe,{})}}function Kt(n){let e,t,l,o,s,r,a,_,v,b;return o=new Bt({}),a=new jt({}),v=new It({}),{c(){e=g("div"),t=g("div"),l=g("div"),we(o.$$.fragment),s=C(),r=g("div"),we(a.$$.fragment),_=C(),we(v.$$.fragment),this.h()},l(f){e=k(f,"DIV",{class:!0});var c=T(e);t=k(c,"DIV",{class:!0});var u=T(t);l=k(u,"DIV",{class:!0});var i=T(l);Ee(o.$$.fragment,i),i.forEach(h),s=B(u),r=k(u,"DIV",{class:!0});var S=T(r);Ee(a.$$.fragment,S),S.forEach(h),u.forEach(h),_=B(c),Ee(v.$$.fragment,c),c.forEach(h),this.h()},h(){p(l,"class","board-container svelte-4ehnv5"),p(r,"class","media-buttons-container svelte-4ehnv5"),p(t,"class","board-side-container svelte-4ehnv5"),p(e,"class","container svelte-4ehnv5")},m(f,c){O(f,e,c),d(e,t),d(t,l),Te(o,l,null),d(t,s),d(t,r),Te(a,r,null),d(e,_),Te(v,e,null),b=!0},p:x,i(f){b||(Me(o.$$.fragment,f),Me(a.$$.fragment,f),Me(v.$$.fragment,f),b=!0)},o(f){Ne(o.$$.fragment,f),Ne(a.$$.fragment,f),Ne(v.$$.fragment,f),b=!1},d(f){f&&h(e),$e(o),$e(a),$e(v)}}}function Pt(n){return xe(async()=>{console.log("import.meta.env.DEV = ",!1),pt()}),[]}class Yt extends be{constructor(e){super(),me(this,e,Pt,Kt,pe,{})}}export{Yt as component};
