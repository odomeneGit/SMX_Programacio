document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const menu = document.getElementById("menu-toggle");
  const theme = document.getElementById("toggle-theme");

  menu?.addEventListener("click", () => sidebar.classList.toggle("open"));

  document.querySelectorAll(".ra-toggle:not(.disabled)").forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".ra-group").classList.toggle("open"));
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => sidebar.classList.remove("open"));
  });

  theme?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("ra1-theme", body.classList.contains("dark") ? "dark" : "light");
  });
  if (localStorage.getItem("ra1-theme") === "dark") body.classList.add("dark");

  let fontScale = Number(localStorage.getItem("ra1-font-scale") || "1");
  const applyScale = () => {
    body.style.fontSize = `${fontScale}em`;
    localStorage.setItem("ra1-font-scale", fontScale.toFixed(2));
  };
  document.getElementById("font-smaller")?.addEventListener("click", () => {
    fontScale = Math.max(.9, fontScale - .05); applyScale();
  });
  document.getElementById("font-larger")?.addEventListener("click", () => {
    fontScale = Math.min(1.2, fontScale + .05); applyScale();
  });
  applyScale();

  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const pre = btn.closest(".code-box")?.querySelector("pre");
      if (!pre) return;
      try {
        await navigator.clipboard.writeText(pre.innerText);
        const old = btn.textContent;
        btn.textContent = "Copiat ✓";
        setTimeout(() => btn.textContent = old, 1200);
      } catch {
        btn.textContent = "Selecciona i copia";
        setTimeout(() => btn.textContent = "Copiar", 1200);
      }
    });
  });

  const sections = [...document.querySelectorAll("section[id], article.subsection[id]")];
  const links = [...document.querySelectorAll(".nav-link")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-110px 0px -65% 0px", threshold: 0 });
  sections.forEach(s => observer.observe(s));
});
