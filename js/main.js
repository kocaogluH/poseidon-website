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

    // Update hero titles in both Ocean Hero and 3D Scrollytelling Hero
    const heroOceanTitle = document.querySelector(
      '#heroOcean [data-i18n="heroTitle"]'
    );
    if (heroOceanTitle) {
      heroOceanTitle.innerHTML =
        lang === "tr"
          ? 'Dijital Denizlerde <span>Güçlü</span> Rotanız'
          : 'Your <span>Powerful</span> Route in Digital Seas';
    }

    const heroScrollyTitle = document.querySelector(
      '#hero .scrolly-title[data-i18n="heroTitle"]'
    );
    if (heroScrollyTitle) {
      heroScrollyTitle.innerHTML =
        lang === "tr"
          ? 'Dijital Dönüşümün <span>Çekirdek</span> Mimarisi'
          : 'Core <span>Software</span> Architecture';
    }

    const scrollyStep2Title = document.querySelector(
      '[data-i18n="scrollyStep2Title"]'
    );
    if (scrollyStep2Title) {
      scrollyStep2Title.innerHTML =
        lang === "tr"
          ? 'Yazılım Modülleri <span>Tek Gövdede</span> Birleşir'
          : 'Software Modules Unite in <span>One Body</span>';
    }

    const scrollyStep3Title = document.querySelector(
      '[data-i18n="scrollyStep3Title"]'
    );
    if (scrollyStep3Title) {
      scrollyStep3Title.innerHTML =
        lang === "tr"
          ? 'İşletmenize Özel <span>Tam Entegre</span> Ekosistem'
          : 'Custom <span>Fully Integrated</span> Ecosystem';
    }

    // Update page title
    document.title =
      lang === "tr"
        ? "Poseidon | Yazılım Çözümleri"
        : "Poseidon | Software Solutions";

    document.dispatchEvent(
      new CustomEvent("poseidon:langchange", { detail: { lang } })
    );
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

  // ===== Theme & Live Concept Switcher =====
  const themeSwitcher = document.getElementById("themeSwitcher");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeDropdown = document.getElementById("themeDropdown");
  const themeOptions = document.querySelectorAll(".theme-option");
  const activeThemeDot = document.getElementById("activeThemeDot");
  const conceptDock = document.getElementById("conceptDock");
  const conceptDockBtns = document.querySelectorAll(".concept-dock-btn");
  const conceptDockToggle = document.getElementById("conceptDockToggle");

  const oceanWrap = document.getElementById("oceanWrap");
  const oceanVideo = document.getElementById("oceanBgVideo");
  const videoSceneSwitcher = document.getElementById("videoSceneSwitcher");
  const sceneBtns = document.querySelectorAll(".scene-btn");

  const OCEAN_VIDEOS = {
    turquoise: {
      poster:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_sand_beach._Top_view_sea_waves._Drone_footage.webm?width=1280",
      sources: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_sand_beach._Top_view_sea_waves._Drone_footage.webm",
        "https://upload.wikimedia.org/wikipedia/commons/9/91/Mesa_del_Mar_waves_2.webm",
      ],
    },
    drone: {
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mesa_del_Mar_waves_2.webm/1280px--Mesa_del_Mar_waves_2.webm.jpg",
      sources: [
        "https://upload.wikimedia.org/wikipedia/commons/9/91/Mesa_del_Mar_waves_2.webm",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mesa_del_Mar_waves_2.webm",
      ],
    },
    "open-sea": {
      poster:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Waves_of_the_sea_(Video).webm?width=1280",
      sources: [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Waves_of_the_sea_(Video).webm",
      ],
    },
  };

  let currentScene =
    localStorage.getItem("poseidon_ocean_scene_v2") || "turquoise";
  if (!OCEAN_VIDEOS[currentScene]) currentScene = "turquoise";

  function setOceanScene(sceneKey, reloadVideo = true) {
    const scene = OCEAN_VIDEOS[sceneKey] || OCEAN_VIDEOS.turquoise;
    currentScene = sceneKey in OCEAN_VIDEOS ? sceneKey : "turquoise";
    localStorage.setItem("poseidon_ocean_scene_v2", currentScene);

    sceneBtns.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-scene") === currentScene
      );
    });

    if (oceanWrap) {
      oceanWrap.style.backgroundImage = `url("${scene.poster}")`;
    }

    if (oceanVideo && reloadVideo) {
      oceanVideo.poster = scene.poster;
      oceanVideo.innerHTML = scene.sources
        .map((src) => `<source src="${src}" type="video/webm" />`)
        .join("");
      oceanVideo.load();
      oceanVideo.defaultPlaybackRate = 0.85;
      oceanVideo.playbackRate = 0.85;
      oceanVideo.play().catch(() => {});
    }
  }

  sceneBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const scene = btn.getAttribute("data-scene");
      if (scene) setOceanScene(scene, true);
    });
  });

  if (oceanVideo) {
    oceanVideo.defaultPlaybackRate = 0.85;
    oceanVideo.playbackRate = 0.85;
  }

  const VALID_THEMES = [
    "ocean-video",
    "studio-light",
    "studio-dark",
    "ocean-light",
  ];

  const THEME_DOT_COLORS = {
    "ocean-video": "#06b6d4",
    "studio-light": "#2563eb",
    "studio-dark": "#38bdf8",
    "ocean-light": "#22d3ee",
  };

  const storedTheme = localStorage.getItem("poseidon_theme");
  const savedTheme = VALID_THEMES.includes(storedTheme)
    ? storedTheme
    : "studio-light";

  function applyTheme(theme) {
    const nextTheme = VALID_THEMES.includes(theme) ? theme : "studio-light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("poseidon_theme", nextTheme);

    const isVideoTheme =
      nextTheme === "ocean-video" || nextTheme === "ocean-light";
    if (videoSceneSwitcher) {
      videoSceneSwitcher.classList.toggle("visible", isVideoTheme);
    }

    if (isVideoTheme) {
      setOceanScene(currentScene, false);
      if (oceanVideo) {
        oceanVideo.playbackRate = 0.85;
        oceanVideo.play().catch(() => {});
      }
    } else if (oceanVideo) {
      oceanVideo.pause();
    }

    if (activeThemeDot && THEME_DOT_COLORS[nextTheme]) {
      activeThemeDot.style.background = THEME_DOT_COLORS[nextTheme];
    }

    themeOptions.forEach((opt) => {
      opt.classList.toggle(
        "active",
        opt.getAttribute("data-theme") === nextTheme
      );
    });

    conceptDockBtns.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-concept") === nextTheme
      );
    });

    if (nextTheme === "studio-light" || nextTheme === "studio-dark") {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
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

  conceptDockBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-concept");
      if (theme) applyTheme(theme);
    });
  });

  if (conceptDockToggle && conceptDock) {
    conceptDockToggle.addEventListener("click", () => {
      conceptDock.classList.toggle("collapsed");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (e.key === "1") applyTheme("ocean-video");
    else if (e.key === "2") applyTheme("studio-light");
    else if (e.key === "3") applyTheme("studio-dark");
    else if (e.key === "4") applyTheme("ocean-light");
  });

  // ===== Card Mouse-Tracking Spotlight =====
  const spotlightCards = document.querySelectorAll(
    ".about-card, .service-card, .telemetry-card, .contact-info, .win-mockup"
  );
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  if (currentScene !== "turquoise") {
    setOceanScene(currentScene, true);
  }
  applyTheme(savedTheme);

  // ===== 3-Stage Scrollytelling Engine (Exploded PC -> Flowing Icons -> Workstation) =====
  function initScrollytelling() {
    const scrollySection = document.getElementById("hero");
    const scrollySticky = document.getElementById("scrollySticky");
    const streamCanvas = document.getElementById("streamCanvas");
    const techNodes = document.querySelectorAll(".tech-node");
    const copyPanels = document.querySelectorAll(".scrolly-copy-panel");
    const stepBtns = document.querySelectorAll(".scrolly-step-btn");
    const progressFill = document.getElementById("scrollyProgressFill");
    const bigNumEl = document.getElementById("scrollyBigNum");
    const statusValEl = document.getElementById("scrollyStatusVal");
    const modulesValEl = document.getElementById("scrollyModulesVal");
    const scrollHintEl = document.getElementById("scrollyScrollHint");

    if (!scrollySection || !scrollySticky) return;

    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
    let manualMobileStep = 1;
    let currentProgress = 0;

    const STEP_COPY = {
      tr: {
        1: {
          num: "01",
          status: "KASA KATMANLARI AYRILDI",
          modules: "8 ÇEKİRDEK İKON AKTİF",
        },
        2: {
          num: "02",
          status: "VERİ HATTI LAPTOPA AKIYOR",
          modules: "ARAYÜZ MODÜLLERİ DERLENİYOR",
        },
        3: {
          num: "03",
          status: "KURUMSAL SİSTEM HAZIR",
          modules: "5 MODÜL TAM ENTEGRE",
        },
      },
      en: {
        1: {
          num: "01",
          status: "CHASSIS LAYERS EXPLODED",
          modules: "8 CORE ICONS ACTIVE",
        },
        2: {
          num: "02",
          status: "DATA STREAMING TO LAPTOP",
          modules: "UI MODULES COMPILING",
        },
        3: {
          num: "03",
          status: "ENTERPRISE SYSTEM READY",
          modules: "5 MODULES INTEGRATED",
        },
      },
    };

    const updateTechNodes = (s1, s2, s3) => {
      const total = techNodes.length;
      techNodes.forEach((node, idx) => {
        const angle = (idx / total) * Math.PI * 2 - Math.PI / 2;
        const radius = 148 + s1 * 42;
        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * (radius * 0.88);

        // Stage 2: flow downward along curved lanes into laptop screen
        const laneOffset = (idx - (total - 1) / 2) * 32;
        const x2 = laneOffset * (1 - s2 * 0.45);
        const y2 = -135 + s2 * 168 + Math.sin(s2 * Math.PI + idx) * 14;

        const x = x1 * (1 - s2) + x2 * s2;
        const y = y1 * (1 - s2) + y2 * s2;
        const scale = (0.85 + s1 * 0.18) * (1 - s3 * 0.45);
        const opacity = clamp(1 - (s3 - 0.18) * 1.8, 0, 1);

        node.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px)) scale(${scale.toFixed(2)})`;
        node.style.opacity = opacity.toFixed(2);
      });
    };

    const applyProgress = (p) => {
      currentProgress = p;
      const s1 = clamp(0.32 + (p / 0.34) * 0.68, 0.32, 1);
      const s2 = clamp((p - 0.27) / 0.37, 0, 1);
      const s3 = clamp((p - 0.65) / 0.3, 0, 1);

      scrollySticky.style.setProperty("--s1", s1.toFixed(3));
      scrollySticky.style.setProperty("--s2", s2.toFixed(3));
      scrollySticky.style.setProperty("--s3", s3.toFixed(3));

      const pcOp = 1 - clamp((s2 - 0.15) * 1.4, 0, 1);
      const laptopOp =
        clamp((s2 - 0.1) * 1.6, 0, 1) * (1 - clamp((s3 - 0.05) * 1.8, 0, 1));
      const wsOp = clamp((s3 - 0.08) * 1.5, 0, 1);
      const tagsOp = clamp((s3 - 0.3) * 2, 0, 1);

      scrollySticky.style.setProperty("--pc-op", pcOp.toFixed(3));
      scrollySticky.style.setProperty("--laptop-op", laptopOp.toFixed(3));
      scrollySticky.style.setProperty("--ws-op", wsOp.toFixed(3));
      scrollySticky.style.setProperty("--tags-op", tagsOp.toFixed(3));

      updateTechNodes(s1, s2, s3);

      const activeStep = p < 0.34 ? 1 : p < 0.68 ? 2 : 3;
      scrollySection.setAttribute("data-active-step", String(activeStep));

      copyPanels.forEach((panel) => {
        panel.classList.toggle(
          "is-active",
          Number(panel.getAttribute("data-step")) === activeStep
        );
      });

      stepBtns.forEach((btn) => {
        btn.classList.toggle(
          "is-active",
          Number(btn.getAttribute("data-target-step")) === activeStep
        );
      });

      if (progressFill) {
        progressFill.style.width = `${(p * 100).toFixed(1)}%`;
      }

      const langSteps = STEP_COPY[currentLang] || STEP_COPY.tr;
      const info = langSteps[activeStep];
      if (bigNumEl) bigNumEl.textContent = info.num;
      if (statusValEl) statusValEl.textContent = info.status;
      if (modulesValEl) modulesValEl.textContent = info.modules;
      if (scrollHintEl) {
        scrollHintEl.style.opacity = p > 0.8 ? "0.25" : "1";
      }
    };

    const handleScroll = () => {
      if (window.innerWidth <= 968) {
        const mobileProgressMap = { 1: 0.14, 2: 0.52, 3: 0.94 };
        applyProgress(mobileProgressMap[manualMobileStep] || 0.14);
        return;
      }

      const rect = scrollySection.getBoundingClientRect();
      const scrollable = Math.max(
        1,
        scrollySection.offsetHeight - window.innerHeight
      );
      const p = clamp(-rect.top / scrollable, 0, 1);
      applyProgress(p);
    };

    stepBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = Number(btn.getAttribute("data-target-step")) || 1;
        if (window.innerWidth <= 968) {
          manualMobileStep = step;
          handleScroll();
          return;
        }
        const scrollable = Math.max(
          1,
          scrollySection.offsetHeight - window.innerHeight
        );
        const ratio = step === 1 ? 0.08 : step === 2 ? 0.5 : 0.92;
        const targetY = scrollySection.offsetTop + scrollable * ratio;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      });
    });

    scrollySticky.addEventListener("mousemove", (e) => {
      const rect = scrollySticky.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      scrollySticky.style.setProperty("--rig-ry", `${(nx * 12).toFixed(2)}deg`);
      scrollySticky.style.setProperty("--rig-rx", `${(-ny * 8).toFixed(2)}deg`);
    });

    // Lightweight animated data stream canvas behind 3D hardware rig
    if (streamCanvas) {
      const ctx = streamCanvas.getContext("2d");
      let tick = 0;

      const resizeCanvas = () => {
        streamCanvas.width = scrollySticky.clientWidth || window.innerWidth;
        streamCanvas.height = scrollySticky.clientHeight || window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const drawStreams = () => {
        if (ctx) {
          const w = streamCanvas.width;
          const h = streamCanvas.height;
          ctx.clearRect(0, 0, w, h);

          const cx = w * 0.5;
          const cy = h * 0.48;
          const activeTheme =
            document.documentElement.getAttribute("data-theme") || "";
          if (activeTheme !== "studio-light" && activeTheme !== "studio-dark") {
            requestAnimationFrame(drawStreams);
            return;
          }
          const isDark = activeTheme === "studio-dark";
          const strokeRgb = isDark ? "56, 189, 248" : "37, 99, 235";

          tick += 0.025;

          // Subtle concentric circuit ring around Stage 1
          const ringAlpha = clamp(1 - (currentProgress - 0.25) * 2.5, 0, 1);
          if (ringAlpha > 0.02) {
            ctx.save();
            ctx.strokeStyle = `rgba(${strokeRgb}, ${(isDark ? 0.16 : 0.11) * ringAlpha})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 8]);
            ctx.beginPath();
            ctx.arc(cx, cy, 185, tick * 0.4, tick * 0.4 + Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }

          // Flowing curved data splines during Stage 2
          const streamAlpha =
            clamp((currentProgress - 0.22) * 3, 0, 1) *
            clamp(1 - (currentProgress - 0.65) * 3, 0, 1);
          if (streamAlpha > 0.02) {
            for (let i = -3; i <= 3; i++) {
              const startX = cx + i * 44;
              const endX = cx + i * 24;
              const startY = cy - 175;
              const endY = cy + 95;

              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.bezierCurveTo(
                startX,
                cy - 40,
                endX,
                cy - 20,
                endX,
                endY
              );
              ctx.strokeStyle = `rgba(${strokeRgb}, ${(isDark ? 0.22 : 0.16) * streamAlpha})`;
              ctx.lineWidth = 1.4;
              ctx.stroke();

              // Moving data pulse dot along curve
              const t = (tick * 0.5 + (i + 3) * 0.14) % 1;
              const px = startX * (1 - t) + endX * t;
              const py = startY * (1 - t) + endY * t;
              ctx.beginPath();
              ctx.arc(px, py, 2.6, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${strokeRgb}, ${0.65 * streamAlpha})`;
              ctx.fill();
            }
          }
        }
        requestAnimationFrame(drawStreams);
      };

      requestAnimationFrame(drawStreams);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    document.addEventListener("poseidon:langchange", handleScroll);
    handleScroll();
  }

  initScrollytelling();

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById("navbar");
  const updateScrollEffects = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", updateScrollEffects, { passive: true });
  updateScrollEffects();

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
