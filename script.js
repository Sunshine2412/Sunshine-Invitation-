const WA="6282262522346";
const EVENT_DATE=new Date("2026-12-12T08:00:00+07:00").getTime();
const MAPS="https://www.google.com/maps/search/?api=1&query=Gedung+Sunshine+Jakarta";

window.addEventListener("load",()=>{
  document.querySelector(".loader").classList.add("hide");
  setTimeout(()=>document.querySelector(".loader").remove(),700);
  document.body.classList.add("locked");
  const params=new URLSearchParams(location.search);
  const guest=params.get("to")||params.get("nama");
  if(guest) document.getElementById("guestName").textContent=decodeURIComponent(guest.replace(/\+/g," "));
});

document.getElementById("openInvitation").addEventListener("click",()=>{
  document.getElementById("cover").classList.add("open");
  document.body.classList.remove("locked");
  window.scrollTo(0,0);
  const music=document.getElementById("bgMusic");
  music.play().then(()=>document.getElementById("musicBtn").classList.add("playing")).catch(()=>{});
});

document.querySelector(".hamburger").addEventListener("click",()=>document.querySelector(".navbar nav").classList.toggle("open"));
document.querySelectorAll(".navbar nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".navbar nav").classList.remove("open")));

document.querySelectorAll(".map-link").forEach(a=>a.href=MAPS);

document.getElementById("musicBtn").addEventListener("click",()=>{
  const m=document.getElementById("bgMusic");
  if(m.paused){m.play().catch(()=>{});document.getElementById("musicBtn").classList.add("playing")}
  else{m.pause();document.getElementById("musicBtn").classList.remove("playing")}
});

function pad(n){return String(Math.max(0,n)).padStart(2,"0")}
function countdown(){
  const diff=Math.max(0,EVENT_DATE-Date.now());
  document.getElementById("days").textContent=pad(Math.floor(diff/86400000));
  document.getElementById("hours").textContent=pad(Math.floor(diff/3600000)%24);
  document.getElementById("minutes").textContent=pad(Math.floor(diff/60000)%60);
  document.getElementById("seconds").textContent=pad(Math.floor(diff/1000)%60);
}
countdown();setInterval(countdown,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("rsvpForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("rsvpName").value.trim();
  const attendance=document.getElementById("attendance").value;
  const guests=document.getElementById("guests").value;
  const message=document.getElementById("message").value.trim()||"-";
  const text=`Halo SUNSHINE INVITATION ☀️%0A%0ARSVP Undangan%0A%0ANama: ${encodeURIComponent(name)}%0AKehadiran: ${encodeURIComponent(attendance)}%0AJumlah tamu: ${guests}%0AUcapan: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/${WA}?text=${text}`,"_blank");
});
document.querySelector(".gift-wa").addEventListener("click",()=>{
  window.open(`https://wa.me/${WA}?text=Halo%20SUNSHINE%20INVITATION%20%E2%98%80%EF%B8%8F%20saya%20ingin%20informasi%20Wedding%20Gift.`,"_blank");
});
document.getElementById("year").textContent=new Date().getFullYear();
