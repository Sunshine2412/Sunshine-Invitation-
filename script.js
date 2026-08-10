const WA="6282262522346";
const EVENT_DATE=new Date("2026-12-12T08:00:00+07:00").getTime();
const MAPS="https://www.google.com/maps/search/?api=1&query=Gedung+Sunshine+Jakarta";

window.addEventListener("load",()=>{
  const loader=document.querySelector(".loader");
  if(loader){loader.classList.add("hide");setTimeout(()=>loader.remove(),700);}
  document.body.classList.add("locked");
  const params=new URLSearchParams(location.search);
  const guest=params.get("to")||params.get("nama");
  if(guest){const el=document.getElementById("guestName");if(el)el.textContent=guest.replace(/\+/g," ");}
  const year=document.getElementById("year");
  if(year)year.textContent=new Date().getFullYear();
});

const openButton=document.getElementById("openInvitation"),cover=document.getElementById("cover"),music=document.getElementById("bgMusic"),musicBtn=document.getElementById("musicBtn");
function setMusicState(playing){if(musicBtn){musicBtn.classList.toggle("playing",playing);musicBtn.setAttribute("aria-pressed",String(playing));}}
openButton?.addEventListener("click",async()=>{cover?.classList.add("open");document.body.classList.remove("locked");window.scrollTo(0,0);try{await music?.play();setMusicState(true);}catch(e){}});
document.querySelector(".hamburger")?.addEventListener("click",()=>{const nav=document.querySelector(".navbar nav"),btn=document.querySelector(".hamburger"),open=nav?.classList.toggle("open");btn?.setAttribute("aria-expanded",String(!!open));});
document.querySelectorAll(".navbar nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".navbar nav")?.classList.remove("open");document.querySelector(".hamburger")?.setAttribute("aria-expanded","false");}));
document.querySelectorAll(".map-link").forEach(a=>a.href=MAPS);
musicBtn?.addEventListener("click",async()=>{if(!music)return;if(music.paused){try{await music.play();setMusicState(true);}catch(e){}}else{music.pause();setMusicState(false);}});

function pad(n){return String(Math.max(0,n)).padStart(2,"0")}
function countdown(){const diff=Math.max(0,EVENT_DATE-Date.now()),v=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];["days","hours","minutes","seconds"].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=pad(v[i]);});}
countdown();setInterval(countdown,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("rsvpForm")?.addEventListener("submit",e=>{
e.preventDefault();
const name=document.getElementById("rsvpName")?.value.trim()||"-",attendance=document.getElementById("attendance")?.value||"-",guests=document.getElementById("guests")?.value||"-",message=document.getElementById("message")?.value.trim()||"-";
const text=["Halo SUNSHINE INVITATION ☀️","","RSVP Undangan","",`Nama: ${name}`,`Kehadiran: ${attendance}`,`Jumlah tamu: ${guests}`,`Ucapan: ${message}`].join("\n");
window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`,"_blank","noopener");
});
document.querySelector(".gift-wa")?.addEventListener("click",()=>{const text="Halo SUNSHINE INVITATION ☀️ saya ingin informasi Wedding Gift.";window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`,"_blank","noopener");});
