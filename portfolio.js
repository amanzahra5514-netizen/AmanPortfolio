


// ===== Typing animation =====
const roles = [
  "Web Developer",
  "Frontend Designer",
  "Content Creator",
  "YouTuber",
  "Instagrammer",
];
let ri = 0, cj = 0, del = false;
const typingEl = document.querySelector('.typing');
const cursorEl = document.querySelector('.cursor');
function typeLoop(){
  const word = roles[ri];
  if(!del){
    typingEl.textContent = word.slice(0, ++cj);
    if(cj === word.length){ del = true; setTimeout(typeLoop, 900); return; }
  }else{
    typingEl.textContent = word.slice(0, --cj);
    if(cj === 0){ del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, del ? 40 : 80);
}
setTimeout(typeLoop, 500);

// ===== Active link on scroll =====
const links = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('section')];
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
    }
  })
},{rootMargin:'-40% 0px -55% 0px', threshold: [0, 0.2]});
sections.forEach(s => obs.observe(s));

// Smooth scroll (native behavior in CSS could also be used)
document.documentElement.style.scrollBehavior = 'smooth';

// ===== Theme palette =====
const palette = document.getElementById('palette');
const paletteBtn = document.getElementById('paletteBtn');
paletteBtn.addEventListener('click', () => palette.classList.toggle('open'));
document.querySelectorAll('.swatch').forEach(b => {
  b.addEventListener('click', () => {
    const c = b.dataset.color;
    document.documentElement.style.setProperty('--accent', c);
  });
});

// ===== Light/Dark toggle =====
const themeToggler = document.getElementById('themeToggler');
const rootHtml = document.documentElement; // <html>
function currentTheme(){ return rootHtml.getAttribute('data-theme') || 'dark'; }
function toggleTheme(){
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  rootHtml.setAttribute('data-theme', next);
  // persist
  localStorage.setItem('pref-theme', next);
}
themeToggler.addEventListener('click', toggleTheme);
// restore on load
const saved = localStorage.getItem('pref-theme');
if(saved){ rootHtml.setAttribute('data-theme', saved); }

// ===== Mobile sidebar toggle =====
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
hamburger.addEventListener('click', ()=> sidebar.classList.toggle('open'));
// close menu when clicking a link (on mobile)
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme color switcher
document.querySelectorAll(".color-switcher span").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    let color = btn.getAttribute("data-color");
    document.documentElement.style.setProperty("--main-color", color);
  });
});

// Dark/Light mode toggle
document.getElementById("theme-toggle").addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
});

