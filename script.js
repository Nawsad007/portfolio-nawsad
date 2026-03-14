const revealElements = document.querySelectorAll(".section, .hero-card, .hero-text");

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));

const themeToggle = document.querySelector(".theme-toggle");
const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
const storedTheme = localStorage.getItem("theme");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav");
const siteHeader = document.querySelector(".site-header");
const brand = document.querySelector(".brand");
const heroPhoto = document.querySelector(".profile-photo");
const headerAvatar = document.querySelector(".header-avatar");

const applyTheme = (theme) => {
  const isLight = theme === "light";
  document.body.classList.toggle("light", isLight);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isLight));
  }
};

if (storedTheme) {
  applyTheme(storedTheme);
} else if (prefersLight) {
  applyTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (heroPhoto && headerAvatar) {
  let ticking = false;

  const updateAvatar = () => {
    const rect = heroPhoto.getBoundingClientRect();
    const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
    const shouldShow = rect.bottom <= headerHeight;
    headerAvatar.classList.toggle("visible", shouldShow);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateAvatar();
      ticking = false;
    });
  };

  updateAvatar();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateAvatar);
}
