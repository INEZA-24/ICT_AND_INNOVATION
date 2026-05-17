// Shared JavaScript for ICT and Innovation Club site
// Handles: mobile nav, hero slideshow, and reveal-on-scroll animations

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupRevealAnimation();
  setupHeroSlideshow();
});

function setupMobileMenu() {
  const button = document.querySelector("[data-menu-btn]");
  const links = document.querySelector("[data-nav-links]");

  if (!button || !links) return;

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupHeroSlideshow() {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  let current = 0;
  const changeInterval = 20000; // 20 seconds

  slides[current].classList.add("active");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, changeInterval);
}
