document.addEventListener("DOMContentLoaded", () => {
  // ===== Language System =====
  let currentLang = "tr";

  const UI_STRINGS = {
    tr: {
      sending: "Gönderiliyor…",
      sent: "Mesajınız gönderildi. Teşekkür ederiz!",
      failed:
        "Mesaj gönderilemedi. Lütfen tekrar deneyin ya da WhatsApp/E-posta ile ulaşın.",
      invalidEmail: "Lütfen geçerli bir e-posta adresi girin.",
    },
    en: {
      sending: "Sending…",
      sent: "Your message has been sent. Thank you!",
      failed:
        "Message could not be sent. Please try again or contact us via WhatsApp/Email.",
      invalidEmail: "Please enter a valid email address.",
    },
  };

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Update hero title with gradient span
    const heroTitle = document.querySelector('[data-i18n="heroTitle"]');
    if (heroTitle) {
      if (lang === "tr") {
        heroTitle.innerHTML =
          'Dijital Denizlerde <span>Güçlü</span> Rotanız';
      } else {
        heroTitle.innerHTML =
          'Your <span>Powerful</span> Route in Digital Seas';
      }
    }

    // Update page title
    document.title =
      lang === "tr"
        ? "Poseidon | Yazılım Çözümleri"
        : "Poseidon | Software Solutions";
  }

  // Language button
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const newLang = currentLang === "tr" ? "en" : "tr";
      setLanguage(newLang);
    });
  }

  // Initialize language
  setLanguage("tr");

  // ===== Theme Switcher =====
  const themeSwitcher = document.getElementById("themeSwitcher");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeDropdown = document.getElementById("themeDropdown");
  const themeOptions = document.querySelectorAll(".theme-option");
  const activeThemeDot = document.getElementById("activeThemeDot");

  const THEME_DOT_COLORS = {
    ocean: "#2563eb",
    emerald: "#059669",
    slate: "#475569",
    amber: "#d97706",
    light: "#3b82f6",
  };

  const savedTheme = localStorage.getItem("poseidon_theme") || "ocean";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("poseidon_theme", theme);

    if (activeThemeDot && THEME_DOT_COLORS[theme]) {
      activeThemeDot.style.background = THEME_DOT_COLORS[theme];
    }

    themeOptions.forEach((opt) => {
      if (opt.getAttribute("data-theme") === theme) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });

    const wave1 = document.querySelector(".wave1 path");
    const wave2 = document.querySelector(".wave2 path");
    if (wave1 && wave2) {
      if (theme === "emerald") {
        wave1.setAttribute("fill", "#064e3b");
        wave2.setAttribute("fill", "#059669");
      } else if (theme === "slate") {
        wave1.setAttribute("fill", "#1e293b");
        wave2.setAttribute("fill", "#475569");
      } else if (theme === "amber") {
        wave1.setAttribute("fill", "#78350f");
        wave2.setAttribute("fill", "#d97706");
      } else if (theme === "light") {
        wave1.setAttribute("fill", "#cbd5e1");
        wave2.setAttribute("fill", "#93c5fd");
      } else {
        wave1.setAttribute("fill", "#1e3a8a");
        wave2.setAttribute("fill", "#0284c7");
      }
    }
  }

  if (themeToggleBtn && themeDropdown) {
    themeToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (themeSwitcher && !themeSwitcher.contains(e.target)) {
        themeDropdown.classList.remove("show");
      }
    });

    themeOptions.forEach((opt) => {
      opt.addEventListener("click", () => {
        const theme = opt.getAttribute("data-theme");
        applyTheme(theme);
        themeDropdown.classList.remove("show");
      });
    });
  }

  applyTheme(savedTheme);

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ===== Hamburger Menu =====
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });

  // ===== Scroll Animations =====
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // ===== Contact Form =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const statusEl = document.getElementById("formStatus");
    const whatsappBtn = document.getElementById("whatsappQuickBtn");
    const whatsappLink = document.getElementById("whatsappQuickLink");
    const emailQuickLink = document.getElementById("emailQuickLink");

    const formspreeEndpoint =
      (contactForm.getAttribute("data-formspree-endpoint") || "").trim();
    const contactEmail =
      (contactForm.getAttribute("data-contact-email") || "").trim();
    const whatsappNumberRaw =
      (contactForm.getAttribute("data-contact-whatsapp") || "").trim();
    const whatsappNumber = whatsappNumberRaw.replace(/[^\d]/g, "");

    function setStatus(text, variant) {
      if (!statusEl) return;
      statusEl.textContent = text || "";
      statusEl.classList.remove("is-success", "is-error", "is-loading");
      if (variant) statusEl.classList.add(variant);
    }

    function buildWhatsAppUrl({ name, email, message }) {
      if (!whatsappNumber) return "#";
      const lines = [
        "Poseidon web sitesi iletişim formu:",
        "",
        `Ad Soyad: ${name || "-"}`,
        `E-posta: ${email || "-"}`,
        "",
        `Mesaj: ${message || "-"}`,
      ];
      const text = encodeURIComponent(lines.join("\n"));
      return `https://wa.me/${whatsappNumber}?text=${text}`;
    }

    function syncQuickLinks() {
      const name =
        contactForm.querySelector('input[name="name"]')?.value || "";
      const email =
        contactForm.querySelector('input[name="email"]')?.value || "";
      const message =
        contactForm.querySelector('textarea[name="message"]')?.value || "";

      const waUrl = buildWhatsAppUrl({ name, email, message });
      if (whatsappBtn) whatsappBtn.href = waUrl;
      if (whatsappLink) whatsappLink.href = waUrl;

      if (emailQuickLink && contactEmail) {
        const subject =
          currentLang === "tr"
            ? "Poseidon - İletişim Formu"
            : "Poseidon - Contact Form";
        const bodyLines = [
          `${currentLang === "tr" ? "Ad Soyad" : "Name"}: ${name || "-"}`,
          `Email: ${email || "-"}`,
          "",
          `${currentLang === "tr" ? "Mesaj" : "Message"}:`,
          message || "-",
        ];
        emailQuickLink.href = `mailto:${encodeURIComponent(
          contactEmail
        )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          bodyLines.join("\n")
        )}`;
      }
    }

    // Initialize quick links once and keep them updated
    syncQuickLinks();
    contactForm.addEventListener("input", syncQuickLinks);

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm
        .querySelector('input[name="name"]')
        ?.value.trim();
      const email = contactForm
        .querySelector('input[name="email"]')
        ?.value.trim();
      const message = contactForm
        .querySelector('textarea[name="message"]')
        ?.value.trim();

      const t = UI_STRINGS[currentLang] || UI_STRINGS.tr;

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus(t.invalidEmail, "is-error");
        return;
      }

      setStatus(t.sending, "is-loading");

      const payload = { name, email, message, lang: currentLang };

      if (formspreeEndpoint) {
        fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(async (res) => {
            if (res.ok) return true;
            let json = null;
            try {
              json = await res.json();
            } catch (_) {}
            throw new Error(json?.error || `HTTP_${res.status}`);
          })
          .then(() => {
            setStatus(t.sent, "is-success");
            contactForm.reset();
            syncQuickLinks();
          })
          .catch(() => {
            setStatus(t.failed, "is-error");
          });
        return;
      }

      setStatus(t.failed, "is-error");
      syncQuickLinks();
    });
  }
});
