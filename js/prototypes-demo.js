/**
 * Poseidon - Restoran & Adisyon Otomasyonu + Ön Muhasebe & Finans Canlı Prototipleri
 * Çok Dilli Destek (TR / EN / RU / AR)
 */
document.addEventListener("DOMContentLoaded", () => {
  const VALID_LANGS = ["tr", "en", "ru", "ar"];
  const storedLang = localStorage.getItem("poseidon_lang");
  let currentLang = VALID_LANGS.includes(storedLang) ? storedLang : "tr";

  const PROTO_LANG = {
    tr: {
      locale: "tr-TR",
      zoneSalon: "Salon",
      zoneTeras: "Teras",
      statusEmpty: "Boş",
      statusOccupied: "Dolu",
      statusBill: "Hesap İstendi",
      emptyOrder: "Bu masada henüz sipariş yok. Yukarıdaki menüden ürün ekleyin.",
      tableSelected: (id) => `${id} seçildi`,
      toastSelectItemFirst: "Lütfen önce masaya ürün ekleyin.",
      toastSentKitchen: (id) => `✓ ${id} siparişi mutfağa (KDS) gönderildi!`,
      toastBillRequested: (id) => `🧾 ${id} için hesap istendi.`,
      toastTablePaid: (id, method, amt) => `✓ ${id} (${method}) kapatıldı: ${amt}`,
      payCash: "Nakit",
      payCard: "Kredi Kartı",
      kdsEmpty: "Şu anda mutfakta bekleyen aktif sipariş bulunmuyor.",
      kdsPreparing: "Hazırlanıyor",
      kdsReady: "Hazır",
      kdsMarkReady: "✓ Hazır İşaretle",
      kdsServe: "🍽️ Servis Edildi",
      toastKdsReady: (id) => `✓ ${id} siparişi servise hazır!`,
      menuActive: "Aktif",
      menuSoldOut: "Tükendi",
      btnToggle: "Durum Değiştir",
      kpiDailyRev: "Günlük Toplam Ciro",
      kpiClosedOrders: "Kapanan Adisyon",
      kpiCashTotal: "Nakit Tahsilat",
      kpiCardTotal: "Kart Tahsilat",
      // Accounting
      accKpiCash: "Toplam Kasa & Banka",
      accKpiIncome: "Aylık Gelir",
      accKpiExpense: "Aylık Gider",
      accKpiNet: "Net Nakit Akışı",
      txIncome: "Gelir",
      txExpense: "Gider",
      invPaid: "Ödendi",
      invPending: "Bekliyor",
      btnCollect: "Tahsil Et",
      toastTxAdded: "✓ Finansal hareket kasa ve özetlere işlendi.",
      toastTxInvalid: "Lütfen geçerli bir açıklama ve tutar girin.",
      toastInvCreated: (no) => `✓ ${no} numaralı E-Fatura GİB'e iletildi!`,
      toastInvPaid: (no) => `✓ ${no} tahsil edildi ve kasa bakiyesi güncellendi.`,
      toastClientCollected: (name, amt) => `✓ ${name} carisinden ${amt} tahsilat işlendi.`,
      defaultInvItem: "Yazılım & Danışmanlık Hizmeti",
      menuItems: {
        m1: { name: "Izgara Köfte", cat: "Ana Yemek" },
        m2: { name: "Adana Kebap", cat: "Ana Yemek" },
        m3: { name: "Tavuk Şiş", cat: "Ana Yemek" },
        m4: { name: "Mercimek Çorbası", cat: "Başlangıç" },
        m5: { name: "Künefe", cat: "Tatlı" },
        m6: { name: "Ayran", cat: "İçecek" },
        m7: { name: "Limonata", cat: "İçecek" },
        m8: { name: "Türk Kahvesi", cat: "İçecek" },
      },
      txDescs: {
        t1: "Kurumsal ERP Yıllık Bakım Tahsilatı",
        t2: "Sunucu & Bulut Altyapı Gideri",
        t3: "POS Terminali Donanım Satışı",
        t4: "Ofis Kira & Genel Giderler",
      },
      banks: {
        b1: "Ana Kasa (TL)",
        b2: "Garanti BBVA Ticari",
        b3: "İş Bankası POS Bloke",
      },
    },
    en: {
      locale: "en-US",
      zoneSalon: "Main Hall",
      zoneTeras: "Terrace",
      statusEmpty: "Available",
      statusOccupied: "Occupied",
      statusBill: "Bill Requested",
      emptyOrder: "No items on this table yet. Click a menu item above to add.",
      tableSelected: (id) => `Selected ${id}`,
      toastSelectItemFirst: "Please add at least one item first.",
      toastSentKitchen: (id) => `✓ Order for ${id} sent to Kitchen (KDS)!`,
      toastBillRequested: (id) => `🧾 Bill requested for ${id}.`,
      toastTablePaid: (id, method, amt) => `✓ ${id} closed (${method}): ${amt}`,
      payCash: "Cash",
      payCard: "Credit Card",
      kdsEmpty: "No active kitchen tickets right now.",
      kdsPreparing: "Preparing",
      kdsReady: "Ready",
      kdsMarkReady: "✓ Mark Ready",
      kdsServe: "🍽️ Served",
      toastKdsReady: (id) => `✓ Order ${id} is ready to serve!`,
      menuActive: "Available",
      menuSoldOut: "Sold Out",
      btnToggle: "Toggle",
      kpiDailyRev: "Daily Revenue",
      kpiClosedOrders: "Closed Checks",
      kpiCashTotal: "Cash Payments",
      kpiCardTotal: "Card Payments",
      accKpiCash: "Total Cash & Bank",
      accKpiIncome: "Monthly Income",
      accKpiExpense: "Monthly Expense",
      accKpiNet: "Net Cash Flow",
      txIncome: "Income",
      txExpense: "Expense",
      invPaid: "Paid",
      invPending: "Pending",
      btnCollect: "Collect",
      toastTxAdded: "✓ Transaction recorded and balances updated.",
      toastTxInvalid: "Please enter a valid description and amount.",
      toastInvCreated: (no) => `✓ E-Invoice ${no} issued successfully!`,
      toastInvPaid: (no) => `✓ ${no} marked as paid and cash updated.`,
      toastClientCollected: (name, amt) => `✓ Collected ${amt} from ${name}.`,
      defaultInvItem: "Software & Consulting Service",
      menuItems: {
        m1: { name: "Grilled Meatballs", cat: "Main Course" },
        m2: { name: "Adana Kebab", cat: "Main Course" },
        m3: { name: "Chicken Shish", cat: "Main Course" },
        m4: { name: "Lentil Soup", cat: "Starter" },
        m5: { name: "Kunefe Dessert", cat: "Dessert" },
        m6: { name: "Ayran", cat: "Beverage" },
        m7: { name: "Fresh Lemonade", cat: "Beverage" },
        m8: { name: "Turkish Coffee", cat: "Beverage" },
      },
      txDescs: {
        t1: "Enterprise ERP Annual Support",
        t2: "Cloud & Server Infrastructure",
        t3: "POS Terminal Hardware Sale",
        t4: "Office Rent & Utilities",
      },
      banks: {
        b1: "Main Cash Register",
        b2: "Garanti BBVA Business",
        b3: "Isbank POS Settlement",
      },
    },
    ru: {
      locale: "ru-RU",
      zoneSalon: "Зал",
      zoneTeras: "Терраса",
      statusEmpty: "Свободен",
      statusOccupied: "Занят",
      statusBill: "Счёт запрошен",
      emptyOrder: "Заказ пуст. Выберите блюда из быстрого меню выше.",
      tableSelected: (id) => `Выбран стол ${id}`,
      toastSelectItemFirst: "Сначала добавьте позиции в заказ.",
      toastSentKitchen: (id) => `✓ Заказ для ${id} отправлен на кухню (KDS)!`,
      toastBillRequested: (id) => `🧾 Запрошен счёт для ${id}.`,
      toastTablePaid: (id, method, amt) => `✓ ${id} закрыт (${method}): ${amt}`,
      payCash: "Наличные",
      payCard: "Карта",
      kdsEmpty: "На кухне сейчас нет активных заказов.",
      kdsPreparing: "Готовится",
      kdsReady: "Готово",
      kdsMarkReady: "✓ Готово",
      kdsServe: "🍽️ Выдано",
      toastKdsReady: (id) => `✓ Заказ ${id} готов к подаче!`,
      menuActive: "В наличии",
      menuSoldOut: "Стоп-лист",
      btnToggle: "Изменить",
      kpiDailyRev: "Выручка за день",
      kpiClosedOrders: "Закрытых чеков",
      kpiCashTotal: "Наличные",
      kpiCardTotal: "Безналичные",
      accKpiCash: "Касса и банки",
      accKpiIncome: "Доход за месяц",
      accKpiExpense: "Расход за месяц",
      accKpiNet: "Чистый поток",
      txIncome: "Доход",
      txExpense: "Расход",
      invPaid: "Оплачен",
      invPending: "Ожидает",
      btnCollect: "Оплатить",
      toastTxAdded: "✓ Операция добавлена, балансы обновлены.",
      toastTxInvalid: "Введите корректное описание и сумму.",
      toastInvCreated: (no) => `✓ Счёт ${no} успешно сформирован!`,
      toastInvPaid: (no) => `✓ Счёт ${no} оплачен.`,
      toastClientCollected: (name, amt) => `✓ Получено ${amt} от ${name}.`,
      defaultInvItem: "ПО и консалтинговые услуги",
      menuItems: {
        m1: { name: "Котлеты на гриле", cat: "Горячее" },
        m2: { name: "Адана кебаб", cat: "Горячее" },
        m3: { name: "Куриный шашлык", cat: "Горячее" },
        m4: { name: "Чечевичный суп", cat: "Супы" },
        m5: { name: "Кюнефе", cat: "Десерт" },
        m6: { name: "Айран", cat: "Напитки" },
        m7: { name: "Лимонад", cat: "Напитки" },
        m8: { name: "Турецкий кофе", cat: "Напитки" },
      },
      txDescs: {
        t1: "Годовая поддержка ERP",
        t2: "Облачная инфраструктура",
        t3: "Продажа POS-терминалов",
        t4: "Аренда офиса и связь",
      },
      banks: {
        b1: "Основная касса",
        b2: "Garanti BBVA Бизнес",
        b3: "Isbank Эквайринг",
      },
    },
    ar: {
      locale: "ar-EG",
      zoneSalon: "الصالة",
      zoneTeras: "التراس",
      statusEmpty: "متاح",
      statusOccupied: "مشغول",
      statusBill: "طلب الفاتورة",
      emptyOrder: "لا توجد طلبات على هذه الطاولة بعد. أضف من القائمة أعلاه.",
      tableSelected: (id) => `تم تحديد ${id}`,
      toastSelectItemFirst: "يرجى إضافة منتج واحد على الأقل أولاً.",
      toastSentKitchen: (id) => `✓ تم إرسال طلب ${id} إلى المطبخ!`,
      toastBillRequested: (id) => `🧾 تم طلب الفاتورة للطاولة ${id}.`,
      toastTablePaid: (id, method, amt) => `✓ تم إغلاق ${id} (${method}): ${amt}`,
      payCash: "نقداً",
      payCard: "بطاقة ائتمان",
      kdsEmpty: "لا توجد طلبات نشطة في المطبخ حالياً.",
      kdsPreparing: "قيد التحضير",
      kdsReady: "جاهز",
      kdsMarkReady: "✓ تحديد كجاهز",
      kdsServe: "🍽️ تم التقديم",
      toastKdsReady: (id) => `✓ طلب ${id} جاهز للتقديم!`,
      menuActive: "متوفر",
      menuSoldOut: "نفد",
      btnToggle: "تبديل",
      kpiDailyRev: "إيرادات اليوم",
      kpiClosedOrders: "الفواتير المغلقة",
      kpiCashTotal: "التحصيل النقدي",
      kpiCardTotal: "تحصيل البطاقات",
      accKpiCash: "إجمالي النقدية والبنوك",
      accKpiIncome: "الدخل الشهري",
      accKpiExpense: "المصروفات الشهرية",
      accKpiNet: "صافي التدفق",
      txIncome: "دخل",
      txExpense: "مصروف",
      invPaid: "مدفوعة",
      invPending: "قيد الانتظار",
      btnCollect: "تحصيل",
      toastTxAdded: "✓ تم تسجيل العملية وتحديث الأرصدة.",
      toastTxInvalid: "يرجى إدخال وصف ومبلغ صحيحين.",
      toastInvCreated: (no) => `✓ تم إصدار الفاتورة الإلكترونية ${no}!`,
      toastInvPaid: (no) => `✓ تم تحصيل الفاتورة ${no}.`,
      toastClientCollected: (name, amt) => `✓ تم تحصيل ${amt} من ${name}.`,
      defaultInvItem: "خدمات برمجية واستشارية",
      menuItems: {
        m1: { name: "كفتة مشوية", cat: "طبق رئيسي" },
        m2: { name: "أضنة كباب", cat: "طبق رئيسي" },
        m3: { name: "شيش طاووق", cat: "طبق رئيسي" },
        m4: { name: "شوربة عدس", cat: "مقبلات" },
        m5: { name: "كنافة", cat: "حلويات" },
        m6: { name: "عيران", cat: "مشروبات" },
        m7: { name: "ليموناضة", cat: "مشروبات" },
        m8: { name: "قهوة تركية", cat: "مشروبات" },
      },
      txDescs: {
        t1: "تحصيل صيانة ERP السنوية",
        t2: "تكاليف الخوادم والسحابة",
        t3: "بيع أجهزة نقاط البيع",
        t4: "إيجار المكتب والمرافق",
      },
      banks: {
        b1: "الصندوق الرئيسي",
        b2: "حساب جارانتي التجاري",
        b3: "تسوية نقاط البيع",
      },
    },
  };

  function pLang() {
    return PROTO_LANG[currentLang] || PROTO_LANG.tr;
  }

  function fmtMoney(val) {
    return (
      "₺" +
      Number(val || 0).toLocaleString(pLang().locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  let toastTimer = null;
  function showProtoToast(msg) {
    let toast = document.getElementById("winToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "winToast";
      toast.className = "win-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  // ===== 1. SYSTEM SWITCHER (Warehouse / Restaurant / Accounting) =====
  const sysTabs = document.querySelectorAll(".system-tab-btn[data-system]");
  const sysPanels = {
    warehouse: document.getElementById("system-panel-warehouse"),
    restaurant: document.getElementById("system-panel-restaurant"),
    accounting: document.getElementById("system-panel-accounting"),
  };

  sysTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-system");
      if (!sysPanels[target]) return;
      sysTabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      Object.entries(sysPanels).forEach(([key, panel]) => {
        if (panel) panel.style.display = key === target ? "block" : "none";
      });
    });
  });

  function bindPanelMenubar(panelEl) {
    if (!panelEl) return;
    const tabs = panelEl.querySelectorAll(".win-menubar span");
    const views = panelEl.querySelectorAll(".win-view");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const targetId = tab.getAttribute("data-target");
        views.forEach((v) => {
          v.style.display = v.id === targetId ? "block" : "none";
        });
      });
    });
  }

  bindPanelMenubar(sysPanels.restaurant);
  bindPanelMenubar(sysPanels.accounting);

  // =========================================================================
  // 2. RESTORAN & ADİSYON OTOMASYONU PROTOTİPİ
  // =========================================================================
  const MENU_CATALOG = [
    { id: "m1", price: 320, available: true },
    { id: "m2", price: 380, available: true },
    { id: "m3", price: 290, available: true },
    { id: "m4", price: 110, available: true },
    { id: "m5", price: 190, available: true },
    { id: "m6", price: 55, available: true },
    { id: "m7", price: 85, available: true },
    { id: "m8", price: 75, available: true },
  ];

  const tables = [
    { id: "M-01", zone: "salon", status: "occupied", items: [{ id: "m2", qty: 2 }, { id: "m6", qty: 2 }] },
    { id: "M-02", zone: "salon", status: "empty", items: [] },
    { id: "M-03", zone: "salon", status: "bill", items: [{ id: "m1", qty: 2 }, { id: "m5", qty: 1 }, { id: "m8", qty: 2 }] },
    { id: "M-04", zone: "salon", status: "empty", items: [] },
    { id: "M-05", zone: "teras", status: "occupied", items: [{ id: "m3", qty: 1 }, { id: "m7", qty: 2 }] },
    { id: "M-06", zone: "teras", status: "empty", items: [] },
    { id: "M-07", zone: "teras", status: "occupied", items: [{ id: "m4", qty: 2 }, { id: "m1", qty: 1 }] },
    { id: "M-08", zone: "teras", status: "empty", items: [] },
  ];

  let kitchenTickets = [
    { tableId: "M-01", status: "preparing", items: [{ id: "m2", qty: 2 }, { id: "m6", qty: 2 }] },
    { tableId: "M-05", status: "preparing", items: [{ id: "m3", qty: 1 }, { id: "m7", qty: 2 }] },
  ];

  let selectedTableId = "M-01";
  let restoStats = { cash: 6420, card: 8430, closed: 19 };

  function calcTableTotal(table) {
    return table.items.reduce((sum, it) => {
      const m = MENU_CATALOG.find((x) => x.id === it.id);
      return sum + (m ? m.price * it.qty : 0);
    }, 0);
  }

  function renderRestoAll() {
    if (!sysPanels.restaurant) return;
    const t = pLang();

    // Stats bar
    const openCount = tables.filter((tb) => tb.status !== "empty").length;
    const pendingKds = kitchenTickets.filter((k) => k.status === "preparing").length;
    const openEl = document.getElementById("restoStatOpenVal");
    const kdsEl = document.getElementById("restoStatKitchenVal");
    const revEl = document.getElementById("restoStatRevVal");
    if (openEl) openEl.textContent = `${openCount} / ${tables.length}`;
    if (kdsEl) kdsEl.textContent = String(pendingKds);
    if (revEl) revEl.textContent = fmtMoney(restoStats.cash + restoStats.card);

    // Tables grid
    const grid = document.getElementById("restoTablesGrid");
    if (grid) {
      grid.innerHTML = tables
        .map((tb) => {
          const total = calcTableTotal(tb);
          const statusLabel =
            tb.status === "occupied" ? t.statusOccupied : tb.status === "bill" ? t.statusBill : t.statusEmpty;
          const badgeCls = tb.status === "occupied" ? "blue" : tb.status === "bill" ? "amber" : "green";
          const zoneTxt = tb.zone === "salon" ? t.zoneSalon : t.zoneTeras;
          return `
            <button type="button" class="resto-table-card ${tb.status} ${tb.id === selectedTableId ? "selected" : ""}" data-table-id="${tb.id}">
              <div class="resto-table-top">
                <span>${tb.id}</span>
                <span class="proto-badge ${badgeCls}">${statusLabel}</span>
              </div>
              <span class="resto-table-zone">${zoneTxt}</span>
              <span class="resto-table-total">${fmtMoney(total)}</span>
            </button>
          `;
        })
        .join("");

      grid.querySelectorAll(".resto-table-card").forEach((card) => {
        card.addEventListener("click", () => {
          selectedTableId = card.getAttribute("data-table-id");
          renderRestoAll();
        });
      });
    }

    // Selected Table Panel
    const sel = tables.find((tb) => tb.id === selectedTableId) || tables[0];
    const titleEl = document.getElementById("restoSelectedTableTitle");
    const statusEl = document.getElementById("restoSelectedTableStatus");
    const totalEl = document.getElementById("restoOrderTotal");
    if (titleEl) titleEl.textContent = `${sel.id} (${sel.zone === "salon" ? t.zoneSalon : t.zoneTeras})`;
    if (statusEl) {
      statusEl.textContent =
        sel.status === "occupied" ? t.statusOccupied : sel.status === "bill" ? t.statusBill : t.statusEmpty;
      statusEl.className = `proto-badge ${sel.status === "occupied" ? "blue" : sel.status === "bill" ? "amber" : "green"}`;
    }
    if (totalEl) totalEl.textContent = fmtMoney(calcTableTotal(sel));

    // Quick Menu Chips
    const qMenu = document.getElementById("restoQuickMenu");
    if (qMenu) {
      qMenu.innerHTML = MENU_CATALOG.filter((m) => m.available)
        .map((m) => `<button type="button" class="resto-menu-chip" data-menu-id="${m.id}">+ ${t.menuItems[m.id].name} (${fmtMoney(m.price)})</button>`)
        .join("");
      qMenu.querySelectorAll(".resto-menu-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          const mid = chip.getAttribute("data-menu-id");
          const existing = sel.items.find((x) => x.id === mid);
          if (existing) existing.qty += 1;
          else sel.items.push({ id: mid, qty: 1 });
          if (sel.status === "empty") sel.status = "occupied";
          renderRestoAll();
        });
      });
    }

    // Order Items
    const orderBox = document.getElementById("restoOrderItems");
    if (orderBox) {
      if (sel.items.length === 0) {
        orderBox.innerHTML = `<div style="color: var(--win-text-muted); font-size: 0.84rem; padding: 12px 0;">${t.emptyOrder}</div>`;
      } else {
        orderBox.innerHTML = sel.items
          .map((it) => {
            const m = MENU_CATALOG.find((x) => x.id === it.id);
            return `
              <div class="resto-order-row">
                <span>${t.menuItems[it.id].name}</span>
                <div class="resto-qty-ctrl">
                  <button type="button" class="resto-qty-btn" data-act="dec" data-id="${it.id}">-</button>
                  <strong>${it.qty}</strong>
                  <button type="button" class="resto-qty-btn" data-act="inc" data-id="${it.id}">+</button>
                  <span style="min-width: 68px; text-align: right; color: var(--accent-light);">${fmtMoney((m ? m.price : 0) * it.qty)}</span>
                </div>
              </div>
            `;
          })
          .join("");

        orderBox.querySelectorAll(".resto-qty-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            const act = btn.getAttribute("data-act");
            const item = sel.items.find((x) => x.id === id);
            if (!item) return;
            if (act === "inc") item.qty += 1;
            else {
              item.qty -= 1;
              if (item.qty <= 0) sel.items = sel.items.filter((x) => x.id !== id);
            }
            if (sel.items.length === 0) sel.status = "empty";
            renderRestoAll();
          });
        });
      }
    }

    // KDS Grid
    const kdsGrid = document.getElementById("restoKdsGrid");
    if (kdsGrid) {
      if (kitchenTickets.length === 0) {
        kdsGrid.innerHTML = `<div style="color: var(--win-text-muted); font-size: 0.9rem;">${t.kdsEmpty}</div>`;
      } else {
        kdsGrid.innerHTML = kitchenTickets
          .map(
            (tk, idx) => `
          <div class="kds-card ${tk.status === "ready" ? "ready" : ""}">
            <div class="kds-head">
              <span>🍽️ ${tk.tableId}</span>
              <span class="proto-badge ${tk.status === "ready" ? "green" : "amber"}">${tk.status === "ready" ? t.kdsReady : t.kdsPreparing}</span>
            </div>
            <ul class="kds-items">
              ${tk.items.map((it) => `<li>• ${it.qty}x ${t.menuItems[it.id].name}</li>`).join("")}
            </ul>
            <button type="button" class="${tk.status === "ready" ? "win-btn-sec" : "win-btn-primary"}" data-kds-idx="${idx}">
              ${tk.status === "ready" ? t.kdsServe : t.kdsMarkReady}
            </button>
          </div>
        `
          )
          .join("");

        kdsGrid.querySelectorAll("button[data-kds-idx]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = Number(btn.getAttribute("data-kds-idx"));
            const tk = kitchenTickets[idx];
            if (!tk) return;
            if (tk.status === "preparing") {
              tk.status = "ready";
              showProtoToast(t.toastKdsReady(tk.tableId));
            } else {
              kitchenTickets.splice(idx, 1);
            }
            renderRestoAll();
          });
        });
      }
    }

    // Menu Table
    const menuBody = document.getElementById("restoMenuTableBody");
    if (menuBody) {
      menuBody.innerHTML = MENU_CATALOG.map(
        (m) => `
        <tr>
          <td><strong>${t.menuItems[m.id].name}</strong></td>
          <td>${t.menuItems[m.id].cat}</td>
          <td>${fmtMoney(m.price)}</td>
          <td><span class="proto-badge ${m.available ? "green" : "red"}">${m.available ? t.menuActive : t.menuSoldOut}</span></td>
          <td><button type="button" class="win-btn-sec" data-toggle-menu="${m.id}">${t.btnToggle}</button></td>
        </tr>
      `
      ).join("");

      menuBody.querySelectorAll("button[data-toggle-menu]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const m = MENU_CATALOG.find((x) => x.id === btn.getAttribute("data-toggle-menu"));
          if (m) {
            m.available = !m.available;
            renderRestoAll();
          }
        });
      });
    }

    // Reports KPIs
    const repBox = document.getElementById("restoReportKpis");
    if (repBox) {
      repBox.innerHTML = `
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.kpiDailyRev}</span><span class="proto-kpi-value pos">${fmtMoney(restoStats.cash + restoStats.card)}</span></div>
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.kpiClosedOrders}</span><span class="proto-kpi-value acc">${restoStats.closed}</span></div>
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.kpiCashTotal}</span><span class="proto-kpi-value">${fmtMoney(restoStats.cash)}</span></div>
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.kpiCardTotal}</span><span class="proto-kpi-value">${fmtMoney(restoStats.card)}</span></div>
      `;
    }
  }

  document.getElementById("restoBtnSendKitchen")?.addEventListener("click", () => {
    const sel = tables.find((tb) => tb.id === selectedTableId);
    const t = pLang();
    if (!sel || sel.items.length === 0) return showProtoToast(t.toastSelectItemFirst);
    sel.status = "occupied";
    const existing = kitchenTickets.find((k) => k.tableId === sel.id);
    const snapshot = sel.items.map((x) => ({ ...x }));
    if (existing) {
      existing.items = snapshot;
      existing.status = "preparing";
    } else {
      kitchenTickets.push({ tableId: sel.id, status: "preparing", items: snapshot });
    }
    showProtoToast(t.toastSentKitchen(sel.id));
    renderRestoAll();
  });

  document.getElementById("restoBtnRequestBill")?.addEventListener("click", () => {
    const sel = tables.find((tb) => tb.id === selectedTableId);
    const t = pLang();
    if (!sel || sel.items.length === 0) return showProtoToast(t.toastSelectItemFirst);
    sel.status = "bill";
    showProtoToast(t.toastBillRequested(sel.id));
    renderRestoAll();
  });

  function closeTablePayment(method) {
    const sel = tables.find((tb) => tb.id === selectedTableId);
    const t = pLang();
    if (!sel || sel.items.length === 0) return showProtoToast(t.toastSelectItemFirst);
    const total = calcTableTotal(sel);
    if (method === "cash") restoStats.cash += total;
    else restoStats.card += total;
    restoStats.closed += 1;
    sel.items = [];
    sel.status = "empty";
    kitchenTickets = kitchenTickets.filter((k) => k.tableId !== sel.id);
    showProtoToast(t.toastTablePaid(sel.id, method === "cash" ? t.payCash : t.payCard, fmtMoney(total)));
    renderRestoAll();
  }

  document.getElementById("restoBtnPayCash")?.addEventListener("click", () => closeTablePayment("cash"));
  document.getElementById("restoBtnPayCard")?.addEventListener("click", () => closeTablePayment("card"));

  // =========================================================================
  // 3. ÖN MUHASEBE & FİNANS PROTOTİPİ
  // =========================================================================
  const banks = [
    { id: "b1", balance: 48500 },
    { id: "b2", balance: 184200 },
    { id: "b3", balance: 32600 },
  ];

  const clients = [
    { id: "c1", name: "Anadolu Lojistik A.Ş.", taxNo: "1020304050", balance: 28500 },
    { id: "c2", name: "Ege Gıda San. Ltd.", taxNo: "4512098731", balance: 14200 },
    { id: "c3", name: "Marmara Tekstil A.Ş.", taxNo: "7788990011", balance: 0 },
    { id: "c4", name: "Yıldız Otomotiv Ltd.", taxNo: "3344556677", balance: 9800 },
  ];

  const transactions = [
    { date: "19.11.2026", descKey: "t1", customDesc: null, type: "income", amount: 42000 },
    { date: "18.11.2026", descKey: "t2", customDesc: null, type: "expense", amount: 8400 },
    { date: "17.11.2026", descKey: "t3", customDesc: null, type: "income", amount: 18500 },
    { date: "15.11.2026", descKey: "t4", customDesc: null, type: "expense", amount: 16200 },
  ];

  const invoices = [
    { no: "PSN2026000412", clientId: "c1", amount: 28500, paid: false },
    { no: "PSN2026000411", clientId: "c2", amount: 14200, paid: false },
    { no: "PSN2026000410", clientId: "c3", amount: 42000, paid: true },
  ];

  let invSeq = 413;

  function renderAccAll() {
    if (!sysPanels.accounting) return;
    const t = pLang();

    const totalCash = banks.reduce((s, b) => s + b.balance, 0);
    const pendingSum = invoices.filter((i) => !i.paid).reduce((s, i) => s + i.amount, 0);
    const totalIncome = transactions.filter((x) => x.type === "income").reduce((s, x) => s + x.amount, 0);
    const totalExpense = transactions.filter((x) => x.type === "expense").reduce((s, x) => s + x.amount, 0);

    const cashStatEl = document.getElementById("accStatCashVal");
    const pendStatEl = document.getElementById("accStatPendingVal");
    if (cashStatEl) cashStatEl.textContent = fmtMoney(totalCash);
    if (pendStatEl) pendStatEl.textContent = fmtMoney(pendingSum);

    // KPIs
    const kpiGrid = document.getElementById("accKpiGrid");
    if (kpiGrid) {
      kpiGrid.innerHTML = `
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.accKpiCash}</span><span class="proto-kpi-value acc">${fmtMoney(totalCash)}</span></div>
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.accKpiIncome}</span><span class="proto-kpi-value pos">${fmtMoney(totalIncome)}</span></div>
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.accKpiExpense}</span><span class="proto-kpi-value neg">${fmtMoney(totalExpense)}</span></div>
        <div class="proto-kpi-card"><span class="proto-kpi-label">${t.accKpiNet}</span><span class="proto-kpi-value ${totalIncome - totalExpense >= 0 ? "pos" : "neg"}">${fmtMoney(totalIncome - totalExpense)}</span></div>
      `;
    }

    // Transactions table
    const txBody = document.getElementById("accTxTableBody");
    if (txBody) {
      txBody.innerHTML = transactions
        .map(
          (tx) => `
        <tr>
          <td>${tx.date}</td>
          <td>${tx.customDesc || t.txDescs[tx.descKey]}</td>
          <td><span class="proto-badge ${tx.type === "income" ? "green" : "red"}">${tx.type === "income" ? t.txIncome : t.txExpense}</span></td>
          <td style="font-weight: 600; color: ${tx.type === "income" ? "#4ade80" : "#f87171"};">${tx.type === "income" ? "+" : "-"}${fmtMoney(tx.amount)}</td>
        </tr>
      `
        )
        .join("");
    }

    // Invoice Client Select
    const invSelect = document.getElementById("accInvClient");
    if (invSelect && invSelect.options.length === 0) {
      invSelect.innerHTML = clients.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");
    }

    // Invoice Table
    const invBody = document.getElementById("accInvTableBody");
    if (invBody) {
      invBody.innerHTML = invoices
        .map((inv, idx) => {
          const cl = clients.find((c) => c.id === inv.clientId);
          return `
            <tr>
              <td><code>${inv.no}</code></td>
              <td>${cl ? cl.name : "-"}</td>
              <td>${fmtMoney(inv.amount)}</td>
              <td><span class="proto-badge ${inv.paid ? "green" : "amber"}">${inv.paid ? t.invPaid : t.invPending}</span></td>
              <td>${inv.paid ? "✓" : `<button type="button" class="win-btn-sec" data-pay-inv="${idx}">${t.btnCollect}</button>`}</td>
            </tr>
          `;
        })
        .join("");

      invBody.querySelectorAll("button[data-pay-inv]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const inv = invoices[Number(btn.getAttribute("data-pay-inv"))];
          if (!inv || inv.paid) return;
          inv.paid = true;
          banks[1].balance += inv.amount;
          const cl = clients.find((c) => c.id === inv.clientId);
          if (cl) cl.balance = Math.max(0, cl.balance - inv.amount);
          transactions.unshift({
            date: new Date().toLocaleDateString(t.locale),
            descKey: null,
            customDesc: `${inv.no} - ${cl ? cl.name : ""}`,
            type: "income",
            amount: inv.amount,
          });
          showProtoToast(t.toastInvPaid(inv.no));
          renderAccAll();
        });
      });
    }

    // Clients Table
    const clSearch = (document.getElementById("accClientSearch")?.value || "").toLowerCase();
    const clBody = document.getElementById("accClientsTableBody");
    if (clBody) {
      clBody.innerHTML = clients
        .filter((c) => c.name.toLowerCase().includes(clSearch) || c.taxNo.includes(clSearch))
        .map(
          (c) => `
        <tr>
          <td><strong>${c.name}</strong></td>
          <td><code>${c.taxNo}</code></td>
          <td style="font-weight: 700; color: ${c.balance > 0 ? "#fbbf24" : "#4ade80"};">${fmtMoney(c.balance)}</td>
          <td>${c.balance > 0 ? `<button type="button" class="win-btn-sec" data-collect-cl="${c.id}">${t.btnCollect}</button>` : "✓"}</td>
        </tr>
      `
        )
        .join("");

      clBody.querySelectorAll("button[data-collect-cl]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cl = clients.find((c) => c.id === btn.getAttribute("data-collect-cl"));
          if (!cl || cl.balance <= 0) return;
          const amt = cl.balance;
          cl.balance = 0;
          banks[0].balance += amt;
          transactions.unshift({
            date: new Date().toLocaleDateString(t.locale),
            descKey: null,
            customDesc: cl.name,
            type: "income",
            amount: amt,
          });
          showProtoToast(t.toastClientCollected(cl.name, fmtMoney(amt)));
          renderAccAll();
        });
      });
    }

    // Banks Grid
    const banksGrid = document.getElementById("accBanksGrid");
    if (banksGrid) {
      banksGrid.innerHTML = banks
        .map(
          (b) => `
        <div class="acc-bank-card">
          <span style="font-size: 0.85rem; color: var(--win-text-muted);">${t.banks[b.id]}</span>
          <strong style="font-size: 1.3rem; color: var(--accent-light);">${fmtMoney(b.balance)}</strong>
        </div>
      `
        )
        .join("");
    }
  }

  document.getElementById("accBtnAddTx")?.addEventListener("click", () => {
    const t = pLang();
    const descEl = document.getElementById("accTxDesc");
    const amtEl = document.getElementById("accTxAmount");
    const typeEl = document.getElementById("accTxType");
    const desc = (descEl?.value || "").trim();
    const amt = parseFloat(amtEl?.value || "0");
    const type = typeEl?.value || "income";
    if (!desc || isNaN(amt) || amt <= 0) return showProtoToast(t.toastTxInvalid);

    transactions.unshift({
      date: new Date().toLocaleDateString(t.locale),
      descKey: null,
      customDesc: desc,
      type,
      amount: amt,
    });
    if (type === "income") banks[0].balance += amt;
    else banks[0].balance -= amt;

    if (descEl) descEl.value = "";
    if (amtEl) amtEl.value = "";
    showProtoToast(t.toastTxAdded);
    renderAccAll();
  });

  const invAmtInput = document.getElementById("accInvAmount");
  const invGrandEl = document.getElementById("accInvGrandTotal");
  if (invAmtInput && invGrandEl) {
    const updateVat = () => {
      const net = parseFloat(invAmtInput.value || "0");
      invGrandEl.textContent = fmtMoney(isNaN(net) ? 0 : net * 1.2);
    };
    invAmtInput.addEventListener("input", updateVat);
    updateVat();
  }

  document.getElementById("accBtnCreateInv")?.addEventListener("click", () => {
    const t = pLang();
    const clientId = document.getElementById("accInvClient")?.value || "c1";
    const net = parseFloat(invAmtInput?.value || "0");
    if (isNaN(net) || net <= 0) return showProtoToast(t.toastTxInvalid);

    const gross = Math.round(net * 1.2 * 100) / 100;
    const no = `PSN2026000${invSeq++}`;
    invoices.unshift({ no, clientId, amount: gross, paid: false });
    const cl = clients.find((c) => c.id === clientId);
    if (cl) cl.balance += gross;
    showProtoToast(t.toastInvCreated(no));
    renderAccAll();
  });

  document.getElementById("accClientSearch")?.addEventListener("input", renderAccAll);

  // Sync with website language switcher
  document.addEventListener("poseidon:langchange", (e) => {
    const nextLang = e.detail?.lang;
    if (nextLang && PROTO_LANG[nextLang]) {
      currentLang = nextLang;
      renderRestoAll();
      renderAccAll();
      if (invAmtInput && invGrandEl) {
        const net = parseFloat(invAmtInput.value || "0");
        invGrandEl.textContent = fmtMoney(isNaN(net) ? 0 : net * 1.2);
      }
    }
  });

  renderRestoAll();
  renderAccAll();
});
