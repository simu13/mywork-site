/* MyWork — landing site behaviour */

(function () {
  "use strict";

  /* Opt in to scroll animations — without this class the CSS shows
     everything, so a script failure can never blank the page. */
  document.documentElement.classList.add("js");

  /* Sticky header: hairline once scrolled, plus the red reading-progress
     line along the header's bottom edge */
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress span");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* Mobile navigation */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* Reveal on scroll (skipped for users who prefer reduced motion) */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealables = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    revealables.forEach((el) => observer.observe(el));
  }

  /* Referral code: weave it into the prefilled WhatsApp message so the
     10% off / 10% commission can be applied to the right person */
  const waCta = document.getElementById("wa-cta");
  const refInput = document.getElementById("ref-code");
  if (waCta && refInput) {
    const baseHref = waCta.getAttribute("href");
    refInput.addEventListener("input", () => {
      const code = refInput.value.trim();
      waCta.setAttribute(
        "href",
        code
          ? `${baseHref}%20...%0A%0AReferral%20code%3A%20${encodeURIComponent(code)}`
          : baseHref
      );
    });
  }

  /* Footer year */
  document.getElementById("year").textContent = String(
    new Date().getFullYear()
  );
})();
