/* ===================================================================
   AVALON TECH | CONECTA+ — Interações
   =================================================================== */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    setTimeout(function () {
      if (loader) loader.classList.add("done");
      document.body.classList.add("loaded");
    }, reduce ? 0 : 600);
  });

  const header = document.querySelector(".header");
  const waFloat = document.querySelector(".wa-float");
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (waFloat) waFloat.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 74;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const nome = data.get("nome") || "";
      const email = data.get("email") || "";
      const empresa = data.get("empresa") || "";
      const msg = data.get("mensagem") || "";
      const body =
        "Nome: " + nome +
        "%0D%0AEmpresa: " + empresa +
        "%0D%0AEmail: " + email +
        "%0D%0A%0D%0A" + encodeURIComponent(msg);
      window.location.href =
        "mailto:contato@avalontech.com.br?subject=" +
        encodeURIComponent("Contato pelo site Conecta+: " + nome) +
        "&body=" + body;
    });
  }

  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
