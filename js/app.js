const body = document.body;
const sidebar = document.getElementById("sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const themeButton = document.getElementById("toggle-theme");
const fontSmaller = document.getElementById("font-smaller");
const fontLarger = document.getElementById("font-larger");

menuToggle?.addEventListener("click", () => sidebar.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => sidebar.classList.remove("open"));
});

themeButton?.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("techBlueDark", body.classList.contains("dark"));
});
if(localStorage.getItem("techBlueDark") === "true") body.classList.add("dark");

fontLarger?.addEventListener("click", () => body.classList.add("font-lg"));
fontSmaller?.addEventListener("click", () => body.classList.remove("font-lg"));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-link")];
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible) return;
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${visible.target.id}`));
}, {rootMargin:"-20% 0px -65% 0px", threshold:[0,.2,.5]});
sections.forEach(s => observer.observe(s));

document.getElementById("demo-form")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Exemple didàctic: el formulari ha estat enviat.");
});

document.getElementById("boto")?.addEventListener("click", () => {
  document.getElementById("missatge").textContent = "Has fet clic!";
});
