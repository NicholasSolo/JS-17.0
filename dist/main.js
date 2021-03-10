(()=>{"use strict";(e=>{const t=document.getElementById("timer-hours"),o=document.getElementById("timer-minutes"),n=document.getElementById("timer-seconds"),c=e=>e<10?e="0"+e:e,a=setInterval((()=>{const e=(()=>{const e=(new Date("27 march 2021").getTime()-(new Date).getTime())/1e3,t=Math.floor(e%60),o=Math.floor(e/60%60);return{timeRemaining:e,hours:Math.floor(e/60/60)%24,minutes:o,seconds:t}})();e.timeRemaining>0?(t.textContent=c(e.hours),o.textContent=c(e.minutes),n.textContent=c(e.seconds)):e.timeRemaining<0?(t.textContent="00",o.textContent="00",n.textContent="00"):clearInterval(a)}),1e3)})(),(()=>{const e=document.querySelector("menu");document.addEventListener("click",(t=>{const o=t.target,n=o==e||e.contains(o),c=o==document.querySelector(".close-btn"),a=e.classList.contains("active-menu");(o.classList.contains("close-btn")||o.closest(".menu")||o.matches("menu>ul>li>a")||!n&&!c&&a)&&e.classList.toggle("active-menu")}))})(),(()=>{const e=document.querySelector(".popup");document.querySelector(".service").addEventListener("click",(t=>{if(t.target.classList.contains("popup-btn"))if(document.documentElement.clientWidth>768){e.style.display="block",e.style.opacity="0%";let t=0;const o=setInterval((()=>{t<100?(++t,e.style.opacity=t+"%"):clearInterval(o)}),7)}else e.style.display="block"})),e.addEventListener("click",(t=>{let o=t.target;o.classList.contains("popup-close")?e.style.display="none":(o=o.closest(".popup-content"),o||(e.style.display="none"))}))})(),(()=>{const e=document.querySelectorAll('menu a[href*="#"], a[href="#service-block"]');for(const t of e)t.classList.contains("close-btn")||t.addEventListener("click",(e=>{e.preventDefault();const o=t.getAttribute("href");document.querySelector(o).scrollIntoView({behavior:"smooth",block:"start"})}))})(),(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{const n=e.target.closest(".service-header-tab");n.classList.contains("service-header-tab")&&t.forEach(((e,c)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(c)}))}))})(),(()=>{const e=document.querySelector(".portfolio-content"),t=document.querySelectorAll(".portfolio-item"),o=[];let n,c=0;(()=>{const e=document.querySelector(".portfolio-dots");for(let n=0;n<t.length;n++){const t=document.createElement("li");t.classList.add("dot"),0===n&&t.classList.add("dot-active"),o.push(t),e.appendChild(t)}})();const a=(e,t,o)=>{e[t].classList.remove(o)},r=(e,t,o)=>{e[t].classList.add(o)},l=()=>{a(t,c,"portfolio-item-active"),a(o,c,"dot-active"),c++,c>=t.length&&(c=0),r(t,c,"portfolio-item-active"),r(o,c,"dot-active")},s=(e=2e3)=>{n=setInterval(l,e)};e.addEventListener("click",(e=>{e.preventDefault();const n=e.target;n.matches(".portfolio-btn, .dot")&&(a(t,c,"portfolio-item-active"),a(o,c,"dot-active"),n.matches("#arrow-right")?c++:n.matches("#arrow-left")?c--:n.matches(".dot")&&o.forEach(((e,t)=>{e===n&&(c=t)})),c>=t.length&&(c=0),c<0&&(c=t.length-1),r(t,c,"portfolio-item-active"),r(o,c,"dot-active"))})),e.addEventListener("mouseover",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(n)})),e.addEventListener("mouseout",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&s(5e3)})),s(5e3)})(),(()=>{const e=document.querySelector(".command");let t="",o="";e.addEventListener("mouseover",(e=>{e.target.matches(".command__photo")&&(t=e.target.src,o=e.target.dataset.img,e.target.src=e.target.dataset.img)})),e.addEventListener("mouseout",(e=>{e.target.matches(".command__photo")&&(e.target.src=t,e.target.dataset.img=o)}))})(),(()=>{const e=document.querySelectorAll(".calc-item"),t=document.querySelectorAll(".form-phone"),o=document.querySelectorAll(".form-email"),n=document.querySelectorAll("input[name='user_name']"),c=document.querySelector(".mess");e.forEach(((e,t)=>{e.addEventListener("input",(()=>{0!==t&&(e.value=e.value.replace(/[^\d]/g,""))}))})),t.forEach((e=>{e.addEventListener("input",(()=>{e.value=e.value.replace(/[^+\d-()]/g,"").replace(/-+/g,"-").replace(/^-|-$/g,""),e.value.length>16&&(e.value=e.value.slice(0,15))}))})),o.forEach((e=>{e.addEventListener("input",(()=>{e.value=e.value.replace(/[^a-z@\-_.!~*']/gi,"").replace(/-+/g,"-").replace(/^-|-$/g,"")}))})),c.addEventListener("input",(()=>{c.value=c.value.replace(/[^-а-я\s0-9.,?!]/gi,"").replace(/-+/g,"-")})),n.forEach((e=>{e.addEventListener("input",(()=>{e.value=e.value.replace(/[^а-я\s]/gi,"").replace(/\s+/g," ")}))}))})(),((e=100)=>{const t=document.querySelector(".calc-block"),o=document.getElementById("total"),n=document.querySelector(".calc-type"),c=document.querySelector(".calc-day"),a=document.querySelector(".calc-count"),r=document.querySelector(".calc-square"),l=e=>{const t=.1*e;let n=0;const c=Math.round(500/(e/t));if(0===e)return;const a=setInterval((()=>{n+=t,n===e&&clearInterval(a),o.textContent=n}),c)};t.addEventListener("change",(t=>{const o=t.target;o!==n&&o!==c&&o!==a&&o!==r||(t=>{let o=0,l=1,s=1;const i=n.value,d=+r.value;a.value>1&&(l+=(a.value-1)/10),c.value&&c.value<5?s*=2:c.value&&c.value<10&&(s*=1.5),i&&0!==d&&(o=Math.round(e*i*d*l*s)),t(o)})(l)}))})(100),(()=>{const e="Что-то пошло не так...",t="Спасибо! Мы скоро с Вами свяжемся.",o=document.querySelector(".preloader"),n=document.getElementById("form1"),c=document.getElementById("form3"),a=document.getElementById("form2"),r=document.createElement("div");r.style.cssText="font-size: 2rem";const l=e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});n.addEventListener("submit",(c=>{c.preventDefault(),n.append(r),r.append(o),o.style.display="block";const a=new FormData(n),s={};for(const e of a.entries())s[e[0]]=e[1];l(s).then((e=>{if(200!==e.status)throw new Error("network failed");r.textContent=t,setTimeout((()=>{r.textContent=""}),5e3)})).catch((t=>{r.textContent=e,console.log(t),setTimeout((()=>{r.textContent=""}),5e3)})),n.querySelectorAll("input").forEach((e=>{e.value=""}))})),c.addEventListener("submit",(n=>{n.preventDefault(),c.append(r),o.style.display="block",r.append(o);const a=new FormData(c),s={};for(const e of a.entries())s[e[0]]=e[1];l(s).then((e=>{if(200!==e.status)throw new Error("network failed");r.style.color="white",r.textContent=t,setTimeout((()=>{r.textContent=""}),5e3)})).catch((t=>{console.log(t),r.textContent=e,setTimeout((()=>{r.textContent=""}),5e3)})),c.querySelectorAll("input").forEach((e=>{e.value=""}))})),a.addEventListener("submit",(n=>{n.preventDefault(),a.append(r),o.style.display="block",r.append(o);const c=new FormData(a),s={};for(const e of c.entries())s[e[0]]=e[1];l(s).then((e=>{if(200!==e.status)throw new Error("network failed");r.textContent=t,setTimeout((()=>{r.textContent=""}),5e3)})).catch((t=>{console.log(t),r.textContent=e,setTimeout((()=>{r.textContent=""}),5e3)})),a.querySelectorAll("input").forEach((e=>{e.value=""}))}))})()})();