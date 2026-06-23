/* ===================================================================
   AVALON | TURNKEY — Interações
   =================================================================== */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader + hero entrance ---------- */
  window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    setTimeout(function () {
      if (loader) loader.classList.add("done");
      document.body.classList.add("loaded");
    }, reduce ? 0 : 650);
  });

  /* ---------- Header on scroll ---------- */
  const header = document.querySelector(".header");
  const waFloat = document.querySelector(".wa-float");
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    if (waFloat) waFloat.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.classList.toggle("active", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
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

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1500;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = val;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !reduce) {
    const cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* ---------- Cursor glow (desktop / fine pointer only) ---------- */
  const fine = window.matchMedia("(pointer:fine)").matches;
  if (fine && !reduce) {
    const glow = document.querySelector(".cursor-glow");
    if (glow) {
      let gx = 0, gy = 0, cx = 0, cy = 0;
      window.addEventListener("mousemove", function (e) { gx = e.clientX; gy = e.clientY; });
      (function loop() {
        cx += (gx - cx) * 0.12;
        cy += (gy - cy) * 0.12;
        glow.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ---------- Smooth anchor offset ---------- */
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

  /* ---------- Contact form (mailto compose, no backend) ---------- */
  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const nome = encodeURIComponent(data.get("nome") || "");
      const email = encodeURIComponent(data.get("email") || "");
      const msg = encodeURIComponent(data.get("mensagem") || "");
      const body =
        "Nome: " + decodeURIComponent(nome) +
        "%0D%0AEmail: " + decodeURIComponent(email) +
        "%0D%0A%0D%0A" + decodeURIComponent(msg);
      window.location.href =
        "mailto:contato@avalontech.com.br?subject=" +
        encodeURIComponent("Contato pelo site — " + decodeURIComponent(nome)) +
        "&body=" + body;
    });
  }

  /* ---------- Year ---------- */
  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
