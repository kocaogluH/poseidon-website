document.addEventListener("DOMContentLoaded", () => {
  // ===== Language System (TR / EN / RU / AR) =====
  const VALID_LANGS = ["tr", "en", "ru", "ar"];
  const storedLang = localStorage.getItem("poseidon_lang");
  let currentLang = VALID_LANGS.includes(storedLang) ? storedLang : "tr";

  const langSwitcher = document.getElementById("langSwitcher");
  const langBtn = document.getElementById("langBtn");
  const langDropdown = document.getElementById("langDropdown");
  const langOptions = document.querySelectorAll(".lang-option");
  const currentLangCodeEl = document.getElementById("currentLangCode");

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
    ru: {
      sending: "Отправка…",
      sent: "Ваше сообщение отправлено. Спасибо!",
      failed:
        "Не удалось отправить сообщение. Попробуйте снова или свяжитесь через WhatsApp/E-mail.",
      invalidEmail: "Пожалуйста, введите корректный адрес электронной почты.",
    },
    ar: {
      sending: "جارٍ الإرسال…",
      sent: "تم إرسال رسالتك بنجاح. شكراً لك!",
      failed:
        "تعذّر إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب/البريد.",
      invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
    },
  };

  const HERO_HTML = {
    tr: {
      oceanTitle: 'Dijital Denizlerde <span>Güçlü</span> Rotanız',
      scrollyTitle: 'Dijital Dönüşümün <span>Çekirdek</span> Mimarisi',
      step2Title: 'Yazılım Modülleri <span>Tek Sistemde</span> Birleşir',
      step3Title: 'İşletmenize Özel <span>Tam Entegre</span> Ekosistem',
      pageTitle: "Poseidon | Yazılım Çözümleri",
    },
    en: {
      oceanTitle: 'Your <span>Powerful</span> Route in Digital Seas',
      scrollyTitle: 'Core <span>Software</span> Architecture',
      step2Title: 'Software Modules Unite into <span>One System</span>',
      step3Title: 'Custom <span>Fully Integrated</span> Ecosystem',
      pageTitle: "Poseidon | Software Solutions",
    },
    ru: {
      oceanTitle: 'Ваш <span>надёжный</span> курс в цифровых морях',
      scrollyTitle: '<span>Ключевая</span> архитектура цифровой трансформации',
      step2Title: 'Программные модули в <span>единой системе</span>',
      step3Title: '<span>Полностью интегрированная</span> экосистема для бизнеса',
      pageTitle: "Poseidon | Программные решения",
    },
    ar: {
      oceanTitle: 'مسارك <span>القوي</span> في البحار الرقمية',
      scrollyTitle: 'البنية <span>الأساسية</span> للتحول الرقمي',
      step2Title: 'وحدات البرمجيات تتكامل في <span>نظام واحد</span>',
      step3Title: 'منظومة <span>متكاملة</span> مخصصة لأعمالك',
      pageTitle: "Poseidon | حلول برمجية",
    },
  };

  function setLanguage(lang) {
    const nextLang = VALID_LANGS.includes(lang) ? lang : "tr";
    currentLang = nextLang;
    localStorage.setItem("poseidon_lang", nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("translate", "no");

    if (currentLangCodeEl) {
      currentLangCodeEl.textContent = nextLang.toUpperCase();
    }

    langOptions.forEach((opt) => {
      opt.classList.toggle(
        "active",
        opt.getAttribute("data-lang") === nextLang
      );
    });

    // Update text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[nextLang] && translations[nextLang][key]) {
        el.textContent = translations[nextLang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[nextLang] && translations[nextLang][key]) {
        el.placeholder = translations[nextLang][key];
      }
    });

    // Update hero titles in both Ocean Hero and 3D Scrollytelling Hero
    const heroHtml = HERO_HTML[nextLang] || HERO_HTML.tr;

    const heroOceanTitle = document.querySelector(
      '#heroOcean [data-i18n="heroTitle"]'
    );
    if (heroOceanTitle) heroOceanTitle.innerHTML = heroHtml.oceanTitle;

    const heroScrollyTitle = document.querySelector(
      '#hero .scrolly-title[data-i18n="heroTitle"]'
    );
    if (heroScrollyTitle) heroScrollyTitle.innerHTML = heroHtml.scrollyTitle;

    const scrollyStep2Title = document.querySelector(
      '[data-i18n="scrollyStep2Title"]'
    );
    if (scrollyStep2Title) scrollyStep2Title.innerHTML = heroHtml.step2Title;

    const scrollyStep3Title = document.querySelector(
      '[data-i18n="scrollyStep3Title"]'
    );
    if (scrollyStep3Title) scrollyStep3Title.innerHTML = heroHtml.step3Title;

    // Update page title
    document.title = heroHtml.pageTitle;

    document.dispatchEvent(
      new CustomEvent("poseidon:langchange", { detail: { lang: nextLang } })
    );
  }

  // Language dropdown toggle & selection
  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const themeMenu = document.getElementById("themeDropdown");
      if (themeMenu) themeMenu.classList.remove("show");
      langDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (langSwitcher && !langSwitcher.contains(e.target)) {
        langDropdown.classList.remove("show");
      }
    });

    langOptions.forEach((opt) => {
      opt.addEventListener("click", () => {
        const selected = opt.getAttribute("data-lang");
        if (selected) setLanguage(selected);
        langDropdown.classList.remove("show");
      });
    });
  }

  // Initialize language
  setLanguage(currentLang);

  // ===== Theme & Live Concept Switcher =====
  const themeSwitcher = document.getElementById("themeSwitcher");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeDropdown = document.getElementById("themeDropdown");
  const themeOptions = document.querySelectorAll(".theme-option");
  const activeThemeDot = document.getElementById("activeThemeDot");

  const oceanWrap = document.getElementById("oceanWrap");
  const oceanVideo = document.getElementById("oceanBgVideo");
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
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const scene = btn.getAttribute("data-scene");
      if (!scene) return;
      const curTheme = document.documentElement.getAttribute("data-theme");
      const isOcean = curTheme === "ocean-video" || curTheme === "ocean-light";
      setOceanScene(scene, true);
      if (!isOcean) {
        applyTheme("ocean-video");
      }
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

    if (nextTheme === "studio-light" || nextTheme === "studio-dark") {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    }
  }

  if (themeToggleBtn && themeDropdown) {
    themeToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (langDropdown) langDropdown.classList.remove("show");
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
      ru: {
        1: {
          num: "01",
          status: "АРХИТЕКТУРА ОТКРЫТА",
          modules: "8 БАЗОВЫХ МОДУЛЕЙ АКТИВНЫ",
        },
        2: {
          num: "02",
          status: "ПОТОК ДАННЫХ В СИСТЕМУ",
          modules: "СБОРКА МОДУЛЕЙ ИНТЕРФЕЙСА",
        },
        3: {
          num: "03",
          status: "КОРПОРАТИВНАЯ СИСТЕМА ГОТОВА",
          modules: "5 МОДУЛЕЙ ИНТЕГРИРОВАНЫ",
        },
      },
      ar: {
        1: {
          num: "01",
          status: "تجهيز وحدات النظام",
          modules: "8 وحدات برمجية نشطة",
        },
        2: {
          num: "02",
          status: "تدفق البيانات وتكاملها",
          modules: "تجميع واجهات النظام",
        },
        3: {
          num: "03",
          status: "النظام المؤسسي جاهز",
          modules: "5 وحدات متكاملة بالكامل",
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

    const CONTACT_LABELS = {
      tr: {
        subject: "Poseidon - İletişim Formu",
        intro: "Poseidon web sitesi iletişim formu:",
        name: "Ad Soyad",
        email: "E-posta",
        message: "Mesaj",
      },
      en: {
        subject: "Poseidon - Contact Form",
        intro: "Poseidon website contact form:",
        name: "Name",
        email: "Email",
        message: "Message",
      },
      ru: {
        subject: "Poseidon - Контактная форма",
        intro: "Сообщение с сайта Poseidon:",
        name: "Имя и фамилия",
        email: "E-mail",
        message: "Сообщение",
      },
      ar: {
        subject: "Poseidon - نموذج التواصل",
        intro: "رسالة من نموذج التواصل لموقع Poseidon:",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        message: "الرسالة",
      },
    };

    function buildWhatsAppUrl({ name, email, message }) {
      if (!whatsappNumber) return "#";
      const lbl = CONTACT_LABELS[currentLang] || CONTACT_LABELS.tr;
      const lines = [
        lbl.intro,
        "",
        `${lbl.name}: ${name || "-"}`,
        `${lbl.email}: ${email || "-"}`,
        "",
        `${lbl.message}: ${message || "-"}`,
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
        const lbl = CONTACT_LABELS[currentLang] || CONTACT_LABELS.tr;
        const bodyLines = [
          `${lbl.name}: ${name || "-"}`,
          `${lbl.email}: ${email || "-"}`,
          "",
          `${lbl.message}:`,
          message || "-",
        ];
        emailQuickLink.href = `mailto:${encodeURIComponent(
          contactEmail
        )}?subject=${encodeURIComponent(lbl.subject)}&body=${encodeURIComponent(
          bodyLines.join("\n")
        )}`;
      }
    }

    // Initialize quick links once and keep them updated
    syncQuickLinks();
    contactForm.addEventListener("input", syncQuickLinks);
    document.addEventListener("poseidon:langchange", syncQuickLinks);

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

  // ===== About Section: 3D Coverflow System Showcase =====
  function initAboutShowcase() {
    const showcase = document.getElementById("aboutShowcase");
    if (!showcase) return;

    const cfStage = document.getElementById("cfStage");
    const cfPrevBtn = document.getElementById("cfPrevBtn");
    const cfNextBtn = document.getElementById("cfNextBtn");
    const cfDots = document.getElementById("cfDots");

    const SCREENS_I18N = {
      tr: [
        {
          id: "depo-dashboard",
          img: "assets/screens/depo-dashboard.png",
          tag: "DEPO // DASHBOARD",
          title: "Depo & Stok Özet Paneli",
          sub: "Canlı ciro, en çok satanlar grafiği ve anlık stok durumu",
        },
        {
          id: "depo-pos",
          img: "assets/screens/depo-pos.png",
          tag: "DEPO // HIZLI SATIŞ & KASA",
          title: "Dokunmatik Barkodlu POS Terminali",
          sub: "Hızlı perakende satışı, para üstü hesaplama ve fiş kesimi",
        },
        {
          id: "depo-urunler",
          img: "assets/screens/depo-urunler.png",
          tag: "DEPO // STOK & KATALOG",
          title: "Stok Kartları & Raf Yönetimi",
          sub: "Kategori hiyerarşisi, barkod tanımları ve kritik limitler",
        },
        {
          id: "depo-fiyat",
          img: "assets/screens/depo-fiyat-guncelleme.png",
          tag: "DEPO // FİYAT MOTORU",
          title: "Toplu Fiyat & Zam/İndirim Motoru",
          sub: "Kategori bazlı yüzdesel fiyat güncelleme ve kâr marjı hesabı",
        },
        {
          id: "depo-analiz",
          img: "assets/screens/depo-analiz.png",
          tag: "DEPO // SATIŞ ANALİTİĞİ",
          title: "Satış & Hareket Analitiği",
          sub: "Tarih aralıklı hareket dökümleri ve dinamik filtreleme",
        },
        {
          id: "resto-dashboard",
          img: "assets/screens/resto-dashboard.png",
          tag: "RESTO // RESTORAN DASHBOARD",
          title: "Resto POS Restoran Yönetimi",
          sub: "Anlık salon cirosu, masa doluluk oranı ve mutfak akışı",
        },
        {
          id: "resto-masalar",
          img: "assets/screens/resto-masalar.png",
          tag: "RESTO // MASALAR HARİTASI",
          title: "Canlı Masalar Kroki Haritası",
          sub: "Salon ve teras krokisi, masa birleştirme ve adisyon durumu",
        },
        {
          id: "fiyat-cepte-ajans",
          img: "assets/screens/fiyat-cepte-ajans.png",
          tag: "FİYAT CEPTE // ÇOKLU MAĞAZA",
          title: "Ajans & Mağaza Yönetim Paneli",
          sub: "Tek merkezden butik vitrinleri ve sipariş yönetimi",
        },
        {
          id: "fiyat-cepte-vitrin",
          img: "assets/screens/fiyat-cepte-vitrin.png",
          tag: "FİYAT CEPTE // BUTİK VİTRİNİ",
          title: "Mobil Butik Vitrin & Sipariş Platformu",
          sub: "Doğal paletler, Instagram Stories entegrasyonu ve sepet",
        },
        {
          id: "arac-servis-kabul",
          img: "assets/screens/arac-servis-kabul.png",
          tag: "ARAÇ SERVİS // ARAÇ KABUL",
          title: "Araç Kabul & İş Emri Yönetimi",
          sub: "Plaka, şase no, usta seçimi, yapılan işlemler ve ödeme takibi",
        },
        {
          id: "arac-servis-kayitlar",
          img: "assets/screens/arac-servis-kayitlar.png",
          tag: "ARAÇ SERVİS // SERVİS KAYITLARI",
          title: "Servis Kayıtları & Borç Takibi",
          sub: "Giriş tarihleri, sorumlu usta, toplam tutar ve kalan borç listesi",
        },
        {
          id: "arac-servis-araclar",
          img: "assets/screens/arac-servis-araclar.png",
          tag: "ARAÇ SERVİS // ARAÇ FİLOSU",
          title: "Araç & Şase Kayıt Sistemi",
          sub: "Plaka ve şase no ile anlık araç, kilometre ve servis geçmişi arama",
        },
        {
          id: "arac-servis-ustalar",
          img: "assets/screens/arac-servis-ustalar.png",
          tag: "ARAÇ SERVİS // USTALAR",
          title: "Usta & Personel İş Takibi",
          sub: "Ustaların toplam işlem sayısı ve son iş tarihi raporlaması",
        },
        {
          id: "arac-servis-musteriler",
          img: "assets/screens/arac-servis-musteriler.png",
          tag: "ARAÇ SERVİS // MÜŞTERİLER",
          title: "Müşteri & Araç İlişki Yönetimi",
          sub: "Müşteri bazlı araç sayısı, iletişim bilgileri ve servis geçmişi",
        },
      ],
      en: [
        {
          id: "depo-dashboard",
          img: "assets/screens/depo-dashboard.png",
          tag: "WAREHOUSE // DASHBOARD",
          title: "Warehouse & Stock Dashboard",
          sub: "Live turnover, top-selling items and inventory telemetry",
        },
        {
          id: "depo-pos",
          img: "assets/screens/depo-pos.png",
          tag: "WAREHOUSE // POS TERMINAL",
          title: "Touchscreen Barcode POS Terminal",
          sub: "Fast retail checkout, change calculation and instant receipts",
        },
        {
          id: "depo-urunler",
          img: "assets/screens/depo-urunler.png",
          tag: "WAREHOUSE // INVENTORY",
          title: "Item Master & Shelf Management",
          sub: "Category hierarchy, barcodes and reorder threshold alerts",
        },
        {
          id: "depo-fiyat",
          img: "assets/screens/depo-fiyat-guncelleme.png",
          tag: "WAREHOUSE // PRICING ENGINE",
          title: "Bulk Price & Margin Engine",
          sub: "Category-wide percentage adjustments and margin updates",
        },
        {
          id: "depo-analiz",
          img: "assets/screens/depo-analiz.png",
          tag: "WAREHOUSE // ANALYTICS",
          title: "Sales & Stock Movement Analytics",
          sub: "Date-range ledger audits and dynamic filtering",
        },
        {
          id: "resto-dashboard",
          img: "assets/screens/resto-dashboard.png",
          tag: "RESTO // DASHBOARD",
          title: "Resto POS Hospitality Dashboard",
          sub: "Live turnover, dining hall occupancy and kitchen queue",
        },
        {
          id: "resto-masalar",
          img: "assets/screens/resto-masalar.png",
          tag: "RESTO // FLOOR PLAN",
          title: "Interactive Floor & Table Map",
          sub: "Visual floor plans, table merging and live ticket status",
        },
        {
          id: "fiyat-cepte-ajans",
          img: "assets/screens/fiyat-cepte-ajans.png",
          tag: "FIYAT CEPTE // MULTI-STORE",
          title: "Agency & Store Management Panel",
          sub: "Centralized control of boutique storefronts and order desks",
        },
        {
          id: "fiyat-cepte-vitrin",
          img: "assets/screens/fiyat-cepte-vitrin.png",
          tag: "FIYAT CEPTE // STOREFRONT",
          title: "Boutique Storefront & Ordering Desk",
          sub: "Natural organic palettes, Instagram Stories and instant checkout",
        },
        {
          id: "arac-servis-kabul",
          img: "assets/screens/arac-servis-kabul.png",
          tag: "AUTO SERVICE // CHECK-IN",
          title: "Vehicle Intake & Work Order",
          sub: "Plate, VIN tracking, technician assignment, operations & payments",
        },
        {
          id: "arac-servis-kayitlar",
          img: "assets/screens/arac-servis-kayitlar.png",
          tag: "AUTO SERVICE // RECORDS",
          title: "Service Records & Balance Tracking",
          sub: "Entry dates, assigned technician, total amounts & remaining debt",
        },
        {
          id: "arac-servis-araclar",
          img: "assets/screens/arac-servis-araclar.png",
          tag: "AUTO SERVICE // FLEET",
          title: "Vehicle & VIN Registry",
          sub: "Instant search by license plate or VIN, mileage and service history",
        },
        {
          id: "arac-servis-ustalar",
          img: "assets/screens/arac-servis-ustalar.png",
          tag: "AUTO SERVICE // TECHNICIANS",
          title: "Technician Workload Tracking",
          sub: "Total jobs completed per technician and latest service date logs",
        },
        {
          id: "arac-servis-musteriler",
          img: "assets/screens/arac-servis-musteriler.png",
          tag: "AUTO SERVICE // CUSTOMERS",
          title: "Customer & Vehicle CRM",
          sub: "Customer vehicle counts, contact directory and service records",
        },
      ],
      ru: [
        {
          id: "depo-dashboard",
          img: "assets/screens/depo-dashboard.png",
          tag: "СКЛАД // ПАНЕЛЬ УПРАВЛЕНИЯ",
          title: "Панель управления складом",
          sub: "Выручка, топ продаж и график складских остатков",
        },
        {
          id: "depo-pos",
          img: "assets/screens/depo-pos.png",
          tag: "СКЛАД // БЫСТРАЯ КАССА",
          title: "Сенсорный кассовый POS-терминал",
          sub: "Быстрые розничные продажи, расчет сдачи и печать чеков",
        },
        {
          id: "depo-urunler",
          img: "assets/screens/depo-urunler.png",
          tag: "СКЛАД // КАТАЛОГ ТОВАРОВ",
          title: "Каталог товаров и складские полки",
          sub: "Иерархия категорий, штрихкоды и минимальные остатки",
        },
        {
          id: "depo-fiyat",
          img: "assets/screens/depo-fiyat-guncelleme.png",
          tag: "СКЛАД // МОДУЛЬ ЦЕНООБРАЗОВАНИЯ",
          title: "Пакетное обновление цен и наценок",
          sub: "Массовая корректировка цен по категориям и расчет маржи",
        },
        {
          id: "depo-analiz",
          img: "assets/screens/depo-analiz.png",
          tag: "СКЛАД // АНАЛИТИКА ПРОДАЖ",
          title: "Анализ продаж и складских движений",
          sub: "Отчеты за период, анализ прибыли и фильтрация данных",
        },
        {
          id: "resto-dashboard",
          img: "assets/screens/resto-dashboard.png",
          tag: "RESTO // ПАНЕЛЬ РЕСТОРАНА",
          title: "Resto POS — Панель ресторана",
          sub: "Выручка зала, занятость столиков и очередь кухни",
        },
        {
          id: "resto-masalar",
          img: "assets/screens/resto-masalar.png",
          tag: "RESTO // КАРТА ЗАЛА",
          title: "Интерактивная карта столов зала",
          sub: "План зала и террасы, объединение столов и статус счета",
        },
        {
          id: "fiyat-cepte-ajans",
          img: "assets/screens/fiyat-cepte-ajans.png",
          tag: "FIYAT CEPTE // МУЛЬТИ-МАГАЗИН",
          title: "Агентская панель мульти-магазинов",
          sub: "Управление витринами и продажами множества бутиков",
        },
        {
          id: "fiyat-cepte-vitrin",
          img: "assets/screens/fiyat-cepte-vitrin.png",
          tag: "FIYAT CEPTE // ВИТРИНА БУТИКА",
          title: "Витрина бутика и заказы в WhatsApp",
          sub: "Органическая палитра, интеграция Stories и быстрая корзина",
        },
        {
          id: "arac-servis-kabul",
          img: "assets/screens/arac-servis-kabul.png",
          tag: "АВТОСЕРВИС // ПРИЕМКА",
          title: "Приемка авто и заказ-наряд",
          sub: "Госномер, VIN-код, выбор мастера, список работ и расчет оплаты",
        },
        {
          id: "arac-servis-kayitlar",
          img: "assets/screens/arac-servis-kayitlar.png",
          tag: "АВТОСЕРВИС // ЗАПИСИ СТО",
          title: "Журнал ремонтов и задолженностей",
          sub: "Даты заезда, ответственный мастер, итоговая сумма и остаток долга",
        },
        {
          id: "arac-servis-araclar",
          img: "assets/screens/arac-servis-araclar.png",
          tag: "АВТОСЕРВИС // БАЗА АВТО",
          title: "Реестр автомобилей и VIN",
          sub: "Мгновенный поиск по номеру и VIN, пробег и история обслуживания",
        },
        {
          id: "arac-servis-ustalar",
          img: "assets/screens/arac-servis-ustalar.png",
          tag: "АВТОСЕРВИС // МАСТЕРА",
          title: "Учет загруженности мастеров",
          sub: "Количество выполненных заказов и дата последней работы мастера",
        },
        {
          id: "arac-servis-musteriler",
          img: "assets/screens/arac-servis-musteriler.png",
          tag: "АВТОСЕРВИС // КЛИЕНТЫ",
          title: "База клиентов и автопарк",
          sub: "Количество автомобилей у клиента, контакты и история визитов",
        },
      ],
      ar: [
        {
          id: "depo-dashboard",
          img: "assets/screens/depo-dashboard.png",
          tag: "المستودعات // لوحة التحكم",
          title: "لوحة تحكم المستودعات والمخزون",
          sub: "إجمالي المبيعات، المنتجات الأكثر مبيعاً ورسوم بيانية فورية",
        },
        {
          id: "depo-pos",
          img: "assets/screens/depo-pos.png",
          tag: "المستودعات // نقاط البيع",
          title: "نقطة بيع سريعة بشاشة لمس وباركود",
          sub: "بيع تجزئة فوري، احتساب الباقي وطباعة الإيصالات",
        },
        {
          id: "depo-urunler",
          img: "assets/screens/depo-urunler.png",
          tag: "المستودعات // كتالوج الأصناف",
          title: "كتالوج المنتجات وإدارة الأرفف",
          sub: "تصنيفات شجرية، باركود وحدود تنبيه المخزون",
        },
        {
          id: "depo-fiyat",
          img: "assets/screens/depo-fiyat-guncelleme.png",
          tag: "المستودعات // محرك الأسعار",
          title: "محرك تعديل الأسعار والخصومات الشامل",
          sub: "تحديث نسب الأسعار حسب الأقسام واحتساب هوامش الربح",
        },
        {
          id: "depo-analiz",
          img: "assets/screens/depo-analiz.png",
          tag: "المستودعات // تحليلات المخزون",
          title: "تحليلات المبيعات وحركة المخزون",
          sub: "كشوفات الحركات حسب التاريخ، تقارير الأرباح وتصفية متقدمة",
        },
        {
          id: "resto-dashboard",
          img: "assets/screens/resto-dashboard.png",
          tag: "RESTO // لوحة المطاعم",
          title: "لوحة تحكم مطاعم Resto POS",
          sub: "إيرادات الصالة اللحظية، نسبة إشغال الطاولات ومتابعة المطبخ",
        },
        {
          id: "resto-masalar",
          img: "assets/screens/resto-masalar.png",
          tag: "RESTO // مخطط الصالة",
          title: "مخطط الصالة والطاولات التفاعلي",
          sub: "خريطة بصرية للأقسام، دمج ونقل الطاولات وحالة الطلبات",
        },
        {
          id: "fiyat-cepte-ajans",
          img: "assets/screens/fiyat-cepte-ajans.png",
          tag: "FIYAT CEPTE // إدارة المتاجر",
          title: "لوحة تحكم الوكالات والمتاجر المتعددة",
          sub: "إدارة واجهات ومبيعات عدة متاجر وبوتيكات من لوحة واحدة",
        },
        {
          id: "fiyat-cepte-vitrin",
          img: "assets/screens/fiyat-cepte-vitrin.png",
          tag: "FIYAT CEPTE // واجهة البوتيك",
          title: "واجهة متجر البوتيك والطلب المباشر",
          sub: "تصاميم وألوان طبيعية، قصص إنستغرام وسلة طلب سريعة",
        },
        {
          id: "arac-servis-kabul",
          img: "assets/screens/arac-servis-kabul.png",
          tag: "خدمة المركبات // استلام",
          title: "استلام المركبات وأوامر العمل",
          sub: "رقم اللوحة والشاصي، تعيين الفني، العمليات المنجزة والدفعات",
        },
        {
          id: "arac-servis-kayitlar",
          img: "assets/screens/arac-servis-kayitlar.png",
          tag: "خدمة المركبات // السجلات",
          title: "سجلات الصيانة ومتابعة الأرصدة",
          sub: "تواريخ الدخول، الفني المسؤول، إجمالي المبلغ والرصيد المتبقي",
        },
        {
          id: "arac-servis-araclar",
          img: "assets/screens/arac-servis-araclar.png",
          tag: "خدمة المركبات // المركبات",
          title: "سجل المركبات وأرقام الشاصي",
          sub: "بحث فوري برقم اللوحة أو الشاصي، عداد الكيلومترات وسجل الصيانة",
        },
        {
          id: "arac-servis-ustalar",
          img: "assets/screens/arac-servis-ustalar.png",
          tag: "خدمة المركبات // الفنيون",
          title: "متابعة أداء الفنيين والورش",
          sub: "إجمالي المهام المنجزة لكل فني وتاريخ آخر عملية صيانة",
        },
        {
          id: "arac-servis-musteriler",
          img: "assets/screens/arac-servis-musteriler.png",
          tag: "خدمة المركبات // العملاء",
          title: "إدارة علاقات العملاء والمركبات",
          sub: "عدد المركبات لكل عميل، بيانات التواصل وسجل الزيارات",
        },
      ],
    };

    let cfIndex = 0;
    let isStageHovered = false;

    function getScreens() {
      return SCREENS_I18N[currentLang] || SCREENS_I18N.tr;
    }

    function buildCardHtml(item, idx) {
      return `
        <div class="sc-screen-card" data-screen-idx="${idx}">
          <div class="sc-win-chrome">
            <span class="sc-win-dots"><i></i><i></i><i></i></span>
            <span class="sc-win-tag">${item.tag}</span>
          </div>
          <div class="sc-screen-img-wrap">
            <img class="sc-custom-photo" src="${item.img}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="sc-screen-caption">
            <div>
              <strong>${item.title}</strong>
              <span>${item.sub}</span>
            </div>
          </div>
        </div>
      `;
    }

    function updateCoverflowPositions() {
      if (!cfStage || !cfDots) return;
      const cards = cfStage.querySelectorAll(".cf-card");
      const total = cards.length;
      if (total === 0) return;

      const isNarrow = window.innerWidth <= 820;
      const step1 = isNarrow ? 195 : 290;
      const step2 = isNarrow ? 320 : 485;

      cards.forEach((card, i) => {
        let diff = i - cfIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        const abs = Math.abs(diff);
        if (abs === 0) {
          card.style.setProperty("--cf-x", "0px");
          card.style.setProperty("--cf-z", "80px");
          card.style.setProperty("--cf-scale", "1.04");
          card.style.setProperty("--cf-rot", "0deg");
          card.style.opacity = "1";
          card.style.zIndex = "10";
          card.style.filter = "none";
          card.style.pointerEvents = "auto";
          card.classList.add("is-active");
        } else if (abs === 1) {
          const sign = diff > 0 ? 1 : -1;
          card.style.setProperty("--cf-x", `${sign * step1}px`);
          card.style.setProperty("--cf-z", "-90px");
          card.style.setProperty("--cf-scale", "0.85");
          card.style.setProperty("--cf-rot", `${-sign * 26}deg`);
          card.style.opacity = "0.78";
          card.style.zIndex = "6";
          card.style.filter = "brightness(0.84)";
          card.style.pointerEvents = "auto";
          card.classList.remove("is-active");
        } else if (abs === 2) {
          const sign = diff > 0 ? 1 : -1;
          card.style.setProperty("--cf-x", `${sign * step2}px`);
          card.style.setProperty("--cf-z", "-210px");
          card.style.setProperty("--cf-scale", "0.68");
          card.style.setProperty("--cf-rot", `${-sign * 36}deg`);
          card.style.opacity = "0.42";
          card.style.zIndex = "3";
          card.style.filter = "brightness(0.68)";
          card.style.pointerEvents = "auto";
          card.classList.remove("is-active");
        } else {
          card.style.setProperty("--cf-x", "0px");
          card.style.setProperty("--cf-z", "-320px");
          card.style.setProperty("--cf-scale", "0.5");
          card.style.setProperty("--cf-rot", "0deg");
          card.style.opacity = "0";
          card.style.zIndex = "1";
          card.style.pointerEvents = "none";
          card.classList.remove("is-active");
        }
      });

      cfDots.querySelectorAll(".cf-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === cfIndex);
      });
    }

    function renderCoverflow() {
      if (!cfStage || !cfDots) return;
      const list = getScreens();
      if (cfIndex >= list.length) cfIndex = 0;

      cfStage.innerHTML = list
        .map(
          (item, i) =>
            `<div class="cf-card" data-cf-idx="${i}">${buildCardHtml(item, i)}</div>`
        )
        .join("");

      cfDots.innerHTML = list
        .map(
          (_, i) =>
            `<button type="button" class="cf-dot ${i === cfIndex ? "active" : ""}" data-cf-dot="${i}" aria-label="${i + 1}"></button>`
        )
        .join("");

      updateCoverflowPositions();
    }

    if (cfPrevBtn) {
      cfPrevBtn.addEventListener("click", () => {
        const total = getScreens().length;
        cfIndex = (cfIndex - 1 + total) % total;
        updateCoverflowPositions();
      });
    }

    if (cfNextBtn) {
      cfNextBtn.addEventListener("click", () => {
        const total = getScreens().length;
        cfIndex = (cfIndex + 1) % total;
        updateCoverflowPositions();
      });
    }

    if (cfDots) {
      cfDots.addEventListener("click", (e) => {
        const dot = e.target.closest(".cf-dot");
        if (!dot) return;
        cfIndex = Number(dot.getAttribute("data-cf-dot")) || 0;
        updateCoverflowPositions();
      });
    }

    if (cfStage) {
      let touchStartX = null;
      cfStage.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.touches[0]?.clientX ?? null;
        },
        { passive: true }
      );
      cfStage.addEventListener(
        "touchend",
        (e) => {
          if (touchStartX === null) return;
          const endX = e.changedTouches[0]?.clientX ?? touchStartX;
          const dx = endX - touchStartX;
          touchStartX = null;
          if (Math.abs(dx) > 40) {
            const total = getScreens().length;
            cfIndex =
              dx < 0 ? (cfIndex + 1) % total : (cfIndex - 1 + total) % total;
            updateCoverflowPositions();
          }
        },
        { passive: true }
      );

      // Clicking a card in the 3D coverflow:
      // Side cards slide to center. The active center card does not enlarge (per requirement).
      cfStage.addEventListener("click", (e) => {
        const cfCard = e.target.closest(".cf-card");
        if (!cfCard) return;
        const idx = Number(cfCard.getAttribute("data-cf-idx")) || 0;
        if (idx !== cfIndex) {
          cfIndex = idx;
          updateCoverflowPositions();
        }
      });
    }

    showcase.addEventListener("mouseenter", () => {
      isStageHovered = true;
    });
    showcase.addEventListener("mouseleave", () => {
      isStageHovered = false;
    });

    setInterval(() => {
      if (isStageHovered) return;
      const total = getScreens().length;
      if (total <= 1) return;
      cfIndex = (cfIndex + 1) % total;
      updateCoverflowPositions();
    }, 4500);

    window.addEventListener("resize", updateCoverflowPositions);
    document.addEventListener("poseidon:langchange", renderCoverflow);
    renderCoverflow();
  }

  initAboutShowcase();
});
