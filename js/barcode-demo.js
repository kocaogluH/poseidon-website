/**
 * Poseidon Barkodlu Stok & Depo Takip Sistemi
 * Tam Fonksiyonel Masaüstü Simülasyonu + Excel İçe/Dışa Aktarma
 */

document.addEventListener("DOMContentLoaded", () => {
  // Demo Ürün Veritabanı
  const INVENTORY = [
    { barcode: "8690112", name: "Koli Bandı 45x100mm Şeffaf", category: "Ambalaj", location: "Raf A-04", stock: 140, critical: 20, price: 45.0, icon: "📦" },
    { barcode: "8690245", name: "Çelik Civata M8x40 (100'lük)", category: "Hırdavat", location: "Raf C-12", stock: 85, critical: 15, price: 120.0, icon: "🔩" },
    { barcode: "8690389", name: "Endüstriyel Temizleyici 5L", category: "Kimyasal", location: "Raf B-02", stock: 24, critical: 10, price: 285.0, icon: "🧴" },
    { barcode: "8690512", name: "Sızma Zeytinyağı 5L Teneke", category: "Gıda", location: "Raf D-08", stock: 12, critical: 15, price: 950.0, icon: "🥫" },
    { barcode: "8690678", name: "Rulman 6204-2RS Metal Kapak", category: "Hırdavat", location: "Raf C-05", stock: 60, critical: 10, price: 75.0, icon: "⚙️" },
    { barcode: "8690781", name: "Streç Film 50cm 17 Mikron", category: "Ambalaj", location: "Raf A-08", stock: 95, critical: 25, price: 180.0, icon: "🗞️" },
    { barcode: "8690892", name: "Silikon Mastik Şeffaf 310ml", category: "Kimyasal", location: "Raf B-06", stock: 8, critical: 10, price: 65.0, icon: "🧪" },
    { barcode: "8690943", name: "Endüstriyel Eldiven No:10", category: "Hırdavat", location: "Raf A-02", stock: 210, critical: 50, price: 35.0, icon: "🧤" },
  ];

  // Ses Sentezleyici
  let audioCtx = null;
  let soundEnabled = true;

  function playBeep(freq = 2450, duration = 0.08) {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  }

  function playCashRegister() {
    playBeep(1800, 0.05);
    setTimeout(() => playBeep(2600, 0.12), 60);
  }

  // Toast Bildirim
  function showToast(msg) {
    let toast = document.getElementById("winToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "winToast";
      toast.className = "win-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> <span>${msg}</span>`;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // ===== GERÇEK EXCEL (.CSV BOM) DIŞA AKTARMA FONKSİYONU =====
  function exportToExcelCSV(filename, rows) {
    const BOM = "\uFEFF"; // Excel Türkçe karakter desteği
    const csvContent =
      BOM +
      rows
        .map((row) =>
          row
            .map((cell) => `"${String(cell !== undefined && cell !== null ? cell : "").replace(/"/g, '""')}"`)
            .join(";")
        )
        .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`✓ Excel dosyası indirildi: ${filename}`);
  }

  // ===== 1. MENÜ SEKMELERİ (TÜM SEKMELERİ ÇALIŞTIRMA) =====
  const menuTabs = document.querySelectorAll(".win-menubar span");
  const views = document.querySelectorAll(".win-view");

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      menuTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const targetId = tab.getAttribute("data-target");
      views.forEach((v) => {
        if (v.id === targetId) {
          v.style.display = "block";
        } else {
          v.style.display = "none";
        }
      });
      showToast(`Sekme açıldı: ${tab.textContent.trim()}`);
    });
  });

  // Ses Aç/Kapa Butonu
  const soundToggleBtn = document.getElementById("winSoundToggle");
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Ses: Açık`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg> Ses: Kapalı`;
      showToast(soundEnabled ? "Barkod sesi açıldı" : "Barkod sesi kapatıldı");
    });
  }

  // ===== 2. SEKME 1: STOK HAREKETLERİ & BARKOD OKUYUCU =====
  let movementItems = [
    { barcode: "8690112", name: "Koli Bandı 45x100mm Şeffaf", location: "Raf A-04", qty: 3, price: 45.0 },
    { barcode: "8690245", name: "Çelik Civata M8x40 (100'lük)", location: "Raf C-12", qty: 2, price: 120.0 },
    { barcode: "8690389", name: "Endüstriyel Temizleyici 5L", location: "Raf B-02", qty: 1, price: 285.0 },
  ];

  const tableBody = document.getElementById("barcodeTableBody");
  const totalItemsEl = document.getElementById("totalItemsCount");
  const totalQtyEl = document.getElementById("totalQtyCount");
  const totalPriceEl = document.getElementById("totalPriceAmount");
  const scanInput = document.getElementById("barcodeScanInput");
  const scanBtn = document.getElementById("barcodeScanBtn");

  function renderMovementTable(lastAddedBarcode = null) {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    if (movementItems.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="table-empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M7 15h0M7 9h0M11 9h0M15 9h0M11 15h0M15 15h0"/>
              </svg>
              <div>Henüz ürün okutulmadı. Yukarıdaki örnek barkodlara tıklayın veya barkod okutun.</div>
            </div>
          </td>
        </tr>`;
    } else {
      movementItems.forEach((item) => {
        const tr = document.createElement("tr");
        if (lastAddedBarcode && item.barcode === lastAddedBarcode) {
          tr.className = "new-row-flash";
        }

        const lineTotal = (item.qty * item.price).toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        tr.innerHTML = `
          <td><code>${item.barcode}</code></td>
          <td><strong>${item.name}</strong></td>
          <td><span class="badge-location">${item.location}</span></td>
          <td>
            <div class="qty-control">
              <button class="qty-btn" data-action="dec" data-barcode="${item.barcode}">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-barcode="${item.barcode}">+</button>
            </div>
          </td>
          <td>₺${item.price.toFixed(2)}</td>
          <td><strong>₺${lineTotal}</strong></td>
          <td>
            <button class="btn-row-del" data-action="del" data-barcode="${item.barcode}" title="Satırı Sil">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }

    const totalLines = movementItems.length;
    const totalQty = movementItems.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = movementItems.reduce((sum, i) => sum + i.qty * i.price, 0);

    if (totalItemsEl) totalItemsEl.textContent = totalLines;
    if (totalQtyEl) totalQtyEl.textContent = totalQty;
    if (totalPriceEl) {
      totalPriceEl.textContent = "₺" + totalPrice.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  function processBarcode(code) {
    const cleanCode = (code || "").trim();
    if (!cleanCode) return;

    playBeep();

    const existing = movementItems.find((i) => i.barcode === cleanCode);
    if (existing) {
      existing.qty += 1;
      showToast(`Miktar artırıldı (+1): ${existing.name}`);
    } else {
      const match = INVENTORY.find((i) => i.barcode === cleanCode) || {
        name: `Özel Ürün (#${cleanCode.slice(-4)})`,
        location: "Genel Depo",
        price: 95.0,
      };

      movementItems.unshift({
        barcode: cleanCode,
        name: match.name,
        location: match.location,
        qty: 1,
        price: match.price,
      });
      showToast(`Barkod okundu: ${match.name}`);
    }

    renderMovementTable(cleanCode);

    if (scanInput) {
      scanInput.value = "";
      scanInput.focus();
    }
  }

  if (scanBtn && scanInput) {
    scanBtn.addEventListener("click", () => {
      processBarcode(scanInput.value || "8690112");
    });

    scanInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        processBarcode(scanInput.value);
      }
    });
  }

  document.querySelectorAll(".chip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-barcode");
      if (code) processBarcode(code);
    });
  });

  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      const barcode = btn.getAttribute("data-barcode");
      if (!action || !barcode) return;

      const idx = movementItems.findIndex((i) => i.barcode === barcode);
      if (idx === -1) return;

      if (action === "inc") {
        movementItems[idx].qty += 1;
        playBeep();
      } else if (action === "dec") {
        if (movementItems[idx].qty > 1) {
          movementItems[idx].qty -= 1;
        } else {
          movementItems.splice(idx, 1);
        }
      } else if (action === "del") {
        movementItems.splice(idx, 1);
      }
      renderMovementTable();
    });
  }

  const btnReset = document.getElementById("winBtnReset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      movementItems = [];
      renderMovementTable();
      showToast("Stok hareket listesi temizlendi.");
    });
  }

  // ===== 3. SEKME 2: ÜRÜN LİSTESİ & EXCEL İŞLEMLERİ =====
  const productsTableBody = document.getElementById("productsTableBody");
  const productSearchInput = document.getElementById("productSearchInput");
  const productCategorySelect = document.getElementById("productCategorySelect");
  const btnNewProduct = document.getElementById("btnNewProduct");
  const btnExportProductsExcel = document.getElementById("btnExportProductsExcel");
  const btnOpenExcelImport = document.getElementById("btnOpenExcelImport");

  function renderProductsList() {
    if (!productsTableBody) return;
    const query = (productSearchInput?.value || "").toLowerCase().trim();
    const category = productCategorySelect?.value || "all";

    const filtered = INVENTORY.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        item.barcode.includes(query) ||
        item.location.toLowerCase().includes(query);
      const matchesCat = category === "all" || item.category === category;
      return matchesQuery && matchesCat;
    });

    productsTableBody.innerHTML = "";

    if (filtered.length === 0) {
      productsTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 30px; color: #94a3b8;">
            Aramanıza uygun ürün bulunamadı.
          </td>
        </tr>`;
      return;
    }

    filtered.forEach((item) => {
      let statusBadge = `<span class="badge-status normal">Stokta (${item.stock})</span>`;
      if (item.stock <= item.critical) {
        statusBadge = `<span class="badge-status danger">Kritik Stok (${item.stock})</span>`;
      } else if (item.stock < item.critical * 1.5) {
        statusBadge = `<span class="badge-status warning">Azalıyor (${item.stock})</span>`;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span style="font-size: 1.2rem;">${item.icon || "📦"}</span></td>
        <td><code>${item.barcode}</code></td>
        <td><strong>${item.name}</strong></td>
        <td>${item.category}</td>
        <td><span class="badge-location">${item.location}</span></td>
        <td>${statusBadge}</td>
        <td>₺${item.price.toFixed(2)}</td>
        <td>
          <button class="win-btn-sec" style="padding: 4px 10px; font-size: 0.76rem;" onclick="window.printBarcodeDirect('${item.barcode}')">
            🖨️ Etiket
          </button>
        </td>
      `;
      productsTableBody.appendChild(tr);
    });
  }

  if (productSearchInput) productSearchInput.addEventListener("input", renderProductsList);
  if (productCategorySelect) productCategorySelect.addEventListener("change", renderProductsList);

  if (btnNewProduct) {
    btnNewProduct.addEventListener("click", () => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newCode = "8690" + randomNum;
      INVENTORY.unshift({
        barcode: newCode,
        name: `Yeni Eklenen Ürün #${randomNum}`,
        category: "Hırdavat",
        location: "Raf B-" + Math.floor(1 + Math.random() * 20),
        stock: 50,
        critical: 10,
        price: 150.0,
        icon: "📦",
      });
      renderProductsList();
      showToast(`Yeni ürün kartı oluşturuldu: #${newCode}`);
    });
  }

  // Ürün Listesini Gerçek Excel (CSV) Olarak İndirme
  if (btnExportProductsExcel) {
    btnExportProductsExcel.addEventListener("click", () => {
      const headers = [
        "Barkod No",
        "Ürün Tanımı",
        "Kategori",
        "Depo/Raf Konumu",
        "Mevcut Stok Adedi",
        "Kritik Stok Seviyesi",
        "Birim Fiyat (TL)",
      ];

      const rows = [headers];
      INVENTORY.forEach((item) => {
        rows.push([
          item.barcode,
          item.name,
          item.category,
          item.location,
          item.stock,
          item.critical,
          item.price.toFixed(2),
        ]);
      });

      exportToExcelCSV("poseidon-stok-envanter-listesi.csv", rows);
    });
  }

  // ===== EXCEL İLE TOPLU ÜRÜN İÇE AKTARMA (IMPORT) MODALI =====
  const excelModal = document.getElementById("excelImportModal");
  const excelModalCloseBtn = document.getElementById("excelModalCloseBtn");
  const excelModalCloseSec = document.getElementById("excelModalCloseSec");
  const btnDownloadTemplate = document.getElementById("btnDownloadTemplate");
  const btnSimulateExcelImport = document.getElementById("btnSimulateExcelImport");
  const excelDropzone = document.getElementById("excelDropzone");
  const excelFileInput = document.getElementById("excelFileInput");
  const importProgressWrap = document.getElementById("importProgressWrap");
  const importProgressFill = document.getElementById("importProgressFill");
  const importProgressText = document.getElementById("importProgressText");

  if (btnOpenExcelImport && excelModal) {
    btnOpenExcelImport.addEventListener("click", () => {
      if (importProgressWrap) importProgressWrap.style.display = "none";
      excelModal.classList.add("active");
    });
  }

  function closeExcelModal() {
    if (excelModal) excelModal.classList.remove("active");
  }

  if (excelModalCloseBtn) excelModalCloseBtn.addEventListener("click", closeExcelModal);
  if (excelModalCloseSec) excelModalCloseSec.addEventListener("click", closeExcelModal);

  // Şablon Excel Dosyası İndirme
  if (btnDownloadTemplate) {
    btnDownloadTemplate.addEventListener("click", () => {
      const templateHeaders = [
        "Barkod",
        "Urun_Adi",
        "Kategori",
        "Raf_Konumu",
        "Stok_Miktari",
        "Kritik_Limit",
        "Birim_Fiyat",
      ];
      const sampleRows = [
        templateHeaders,
        ["8690991", "Örnek Çelik Somun M10", "Hırdavat", "Raf C-02", "120", "20", "18.50"],
        ["8690992", "Karton Koli 40x30x30", "Ambalaj", "Raf A-10", "300", "50", "32.00"],
        ["8690993", "Sanayi Tipi Gres Yağı 1kg", "Kimyasal", "Raf B-08", "45", "10", "210.00"],
      ];
      exportToExcelCSV("poseidon-ornek-stok-sablonu.csv", sampleRows);
    });
  }

  // Excel'den Toplu Ürün Girişi Simülasyonu
  function executeImport(batchProducts) {
    if (!importProgressWrap || !importProgressFill) return;
    importProgressWrap.style.display = "block";
    importProgressFill.style.width = "0%";
    if (importProgressText) importProgressText.textContent = "Excel dosyası okunuyor...";

    setTimeout(() => {
      importProgressFill.style.width = "45%";
      if (importProgressText) importProgressText.textContent = "Barkodlar ve ürün kartları doğrulanıyor...";

      setTimeout(() => {
        importProgressFill.style.width = "100%";
        if (importProgressText) importProgressText.textContent = `Tamamlandı! ${batchProducts.length} adet ürün sisteme aktarıldı.`;

        // Ürünleri Envantere Ekle
        batchProducts.forEach((p) => {
          INVENTORY.unshift(p);
        });

        renderProductsList();
        renderPosTiles();

        playCashRegister();
        showToast(`✓ ${batchProducts.length} adet yeni ürün Excel'den başarıyla yüklendi!`);

        setTimeout(() => {
          closeExcelModal();
        }, 1200);
      }, 700);
    }, 500);
  }

  if (btnSimulateExcelImport) {
    btnSimulateExcelImport.addEventListener("click", () => {
      const sampleBatch = [
        { barcode: "8691001", name: "Karton Koli 40x30x30 Çift Oluklu", category: "Ambalaj", location: "Raf A-01", stock: 350, critical: 50, price: 34.0, icon: "📦" },
        { barcode: "8691002", name: "Çelik Somun M10 Paslanmaz", category: "Hırdavat", location: "Raf C-03", stock: 120, critical: 25, price: 18.5, icon: "🔩" },
        { barcode: "8691003", name: "Gres Yağı Sanayi Tipi 1KG", category: "Kimyasal", location: "Raf B-08", stock: 45, critical: 10, price: 210.0, icon: "🧴" },
        { barcode: "8691004", name: "Balonlu Naylon 100cm Rulo", category: "Ambalaj", location: "Raf A-05", stock: 80, critical: 15, price: 420.0, icon: "🗞️" },
        { barcode: "8691005", name: "Lokma Anahtar Takımı 12 Parça", category: "Hırdavat", location: "Raf C-09", stock: 18, critical: 5, price: 650.0, icon: "⚙️" },
        { barcode: "8691006", name: "Köpük Sabun Kartuşu 1000ml", category: "Kimyasal", location: "Raf B-04", stock: 64, critical: 12, price: 85.0, icon: "🧼" },
        { barcode: "8691007", name: "Zımba Teli No:10 (1000 Adet)", category: "Hırdavat", location: "Raf A-03", stock: 190, critical: 30, price: 25.0, icon: "📎" },
        { barcode: "8691008", name: "Palet Streç Filmi 23 Mikron Siyah", category: "Ambalaj", location: "Raf A-09", stock: 75, critical: 20, price: 240.0, icon: "📦" },
      ];
      executeImport(sampleBatch);
    });
  }

  // Gerçek Dosya Seçimi / Sürükle Bırak
  if (excelDropzone && excelFileInput) {
    excelDropzone.addEventListener("click", () => excelFileInput.click());

    excelFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);

        if (lines.length > 1) {
          const imported = [];
          for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(/[;,]/).map((p) => p.replace(/"/g, "").trim());
            if (parts.length >= 2) {
              imported.push({
                barcode: parts[0] || "869" + Math.floor(1000 + Math.random() * 9000),
                name: parts[1] || `Excel Ürünü #${i}`,
                category: parts[2] || "Genel",
                location: parts[3] || "Raf A-01",
                stock: parseInt(parts[4]) || 50,
                critical: parseInt(parts[5]) || 10,
                price: parseFloat(parts[6]) || 100.0,
                icon: "📦",
              });
            }
          }
          if (imported.length > 0) {
            executeImport(imported);
            return;
          }
        }
        // Eğer standart okunamadıysa demo batch çalıştır
        showToast("Dosya okundu, veriler işleniyor...");
        btnSimulateExcelImport.click();
      };
      reader.readAsText(file, "UTF-8");
    });
  }

  // ===== 4. SEKME 3: HIZLI SATIŞ & POS EKRANI =====
  let posCart = [
    { barcode: "8690112", name: "Koli Bandı 45x100mm", qty: 2, price: 45.0 },
    { barcode: "8690245", name: "Çelik Civata M8x40", qty: 1, price: 120.0 },
  ];

  const posCartListEl = document.getElementById("posCartList");
  const posTotalEl = document.getElementById("posTotalAmount");
  const posTilesContainer = document.getElementById("posTilesContainer");

  function renderPosTiles() {
    if (!posTilesContainer) return;
    posTilesContainer.innerHTML = "";
    INVENTORY.slice(0, 12).forEach((item) => {
      const tile = document.createElement("div");
      tile.className = "pos-product-tile";
      tile.innerHTML = `
        <div class="tile-icon">${item.icon || "📦"}</div>
        <div class="tile-name">${item.name}</div>
        <div class="tile-price">₺${item.price.toFixed(2)}</div>
      `;
      tile.addEventListener("click", () => {
        addToPosCart(item);
      });
      posTilesContainer.appendChild(tile);
    });
  }

  function renderPosCart() {
    if (!posCartListEl) return;
    posCartListEl.innerHTML = "";

    if (posCart.length === 0) {
      posCartListEl.innerHTML = `<div style="text-align: center; color: #64748b; padding: 40px 0;">Sepet boş. Sağdaki ürünlere tıklayarak sepete ekleyin.</div>`;
    } else {
      posCart.forEach((item, idx) => {
        const line = document.createElement("div");
        line.className = "pos-cart-item";
        line.innerHTML = `
          <div>
            <strong>${item.name}</strong><br/>
            <small style="color: #94a3b8;">${item.qty} adet x ₺${item.price.toFixed(2)}</small>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <strong style="color: var(--accent-light);">₺${(item.qty * item.price).toFixed(2)}</strong>
            <button class="btn-row-del" onclick="window.removePosItem(${idx})" title="Çıkar">✕</button>
          </div>
        `;
        posCartListEl.appendChild(line);
      });
    }

    const total = posCart.reduce((sum, i) => sum + i.qty * i.price, 0);
    if (posTotalEl) posTotalEl.textContent = "₺" + total.toLocaleString("tr-TR", { minimumFractionDigits: 2 });
  }

  function addToPosCart(item) {
    playBeep(2600, 0.05);
    const existing = posCart.find((i) => i.barcode === item.barcode);
    if (existing) {
      existing.qty += 1;
    } else {
      posCart.push({ barcode: item.barcode, name: item.name, qty: 1, price: item.price });
    }
    renderPosCart();
    showToast(`Sepete eklendi: ${item.name}`);
  }

  window.removePosItem = function (idx) {
    posCart.splice(idx, 1);
    renderPosCart();
  };

  document.querySelectorAll(".pos-pay-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (posCart.length === 0) {
        showToast("Lütfen önce sepete ürün ekleyin.");
        return;
      }
      playCashRegister();
      const method = btn.getAttribute("data-method") || "Nakit";
      const receiptNo = "#POS-" + Math.floor(1000 + Math.random() * 9000);
      showToast(`Satış Tamamlandı (${method})! Fiş No: ${receiptNo}`);
      posCart = [];
      renderPosCart();
    });
  });

  // ===== 5. SEKME 4: SAYIM & KONTROL =====
  let countItems = [
    { barcode: "8690112", name: "Koli Bandı 45x100mm", location: "A-04", system: 140, counted: 140 },
    { barcode: "8690245", name: "Çelik Civata M8x40", location: "C-12", system: 85, counted: 84 },
    { barcode: "8690389", name: "Endüstriyel Temizleyici 5L", location: "B-02", system: 24, counted: 24 },
    { barcode: "8690512", name: "Sızma Zeytinyağı 5L", location: "D-08", system: 12, counted: 14 },
    { barcode: "8690678", name: "Rulman 6204-2RS", location: "C-05", system: 60, counted: 60 },
  ];

  const countTableBody = document.getElementById("countTableBody");

  function renderCountTable() {
    if (!countTableBody) return;
    countTableBody.innerHTML = "";

    countItems.forEach((item, idx) => {
      const diff = item.counted - item.system;
      let diffBadge = `<span style="color: #10b981; font-weight: 700;">✓ Eşit (0)</span>`;
      if (diff > 0) {
        diffBadge = `<span style="color: #38bdf8; font-weight: 700;">+${diff} Fazla</span>`;
      } else if (diff < 0) {
        diffBadge = `<span style="color: #f87171; font-weight: 700;">${diff} Eksik</span>`;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><code>${item.barcode}</code></td>
        <td><strong>${item.name}</strong></td>
        <td><span class="badge-location">${item.location}</span></td>
        <td><strong>${item.system}</strong></td>
        <td>
          <div class="qty-control">
            <button class="qty-btn" onclick="window.changeCount(${idx}, -1)">-</button>
            <span class="qty-num">${item.counted}</span>
            <button class="qty-btn" onclick="window.changeCount(${idx}, +1)">+</button>
          </div>
        </td>
        <td>${diffBadge}</td>
      `;
      countTableBody.appendChild(tr);
    });
  }

  window.changeCount = function (idx, delta) {
    countItems[idx].counted = Math.max(0, countItems[idx].counted + delta);
    playBeep(2100, 0.04);
    renderCountTable();
  };

  const btnConfirmCount = document.getElementById("btnConfirmCount");
  if (btnConfirmCount) {
    btnConfirmCount.addEventListener("click", () => {
      countItems.forEach((i) => (i.system = i.counted));
      renderCountTable();
      showToast("Depo sayımı onaylandı ve sistem stokları güncellendi!");
    });
  }

  // ===== 6. SEKME 5: DEPO RAPORLARI (GERÇEK EXCEL AKTARIM) =====
  const btnExportExcel = document.getElementById("btnExportExcel");
  const btnExportPdf = document.getElementById("btnExportPdf");

  if (btnExportExcel) {
    btnExportExcel.addEventListener("click", () => {
      const headers = [
        "Barkod No",
        "Ürün Adı",
        "Kategori",
        "Depo Konumu",
        "Mevcut Stok Miktarı",
        "Birim Maliyet (TL)",
        "Toplam Envanter Değeri (TL)",
      ];
      const rows = [headers];
      INVENTORY.forEach((item) => {
        const lineVal = item.stock * item.price;
        rows.push([
          item.barcode,
          item.name,
          item.category,
          item.location,
          item.stock,
          item.price.toFixed(2),
          lineVal.toFixed(2),
        ]);
      });
      exportToExcelCSV("poseidon-depo-envanter-raporu.csv", rows);
    });
  }

  if (btnExportPdf) {
    btnExportPdf.addEventListener("click", () => {
      showToast("PDF Envanter Dökümü hazırlandı ve indirildi.");
    });
  }

  // ===== 7. SEKME 6: SİSTEM AYARLARI =====
  const btnSaveSettings = document.getElementById("btnSaveSettings");
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener("click", () => {
      showToast("Sistem ve donanım ayarları başarıyla kaydedildi!");
    });
  }

  // ===== 8. TERMAL ETİKET MODALI =====
  const modal = document.getElementById("barcodePrintModal");
  const btnPrintLabel = document.getElementById("winBtnPrintLabel");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCloseSec = document.getElementById("modalCloseSec");
  const thermalPrintBtn = document.getElementById("thermalPrintBtn");

  window.printBarcodeDirect = function (barcode) {
    const item = INVENTORY.find((i) => i.barcode === barcode) || INVENTORY[0];
    openLabel(item);
  };

  function openLabel(item) {
    if (!modal) return;
    document.getElementById("lblProductName").textContent = item.name;
    document.getElementById("lblBarcodeNum").textContent = item.barcode;
    document.getElementById("lblLocation").textContent = item.location;
    document.getElementById("lblDate").textContent = new Date().toLocaleDateString("tr-TR");
    document.getElementById("lblPrice").textContent = "₺" + item.price.toFixed(2);
    modal.classList.add("active");
  }

  if (btnPrintLabel) {
    btnPrintLabel.addEventListener("click", () => {
      const first = movementItems[0] || INVENTORY[0];
      openLabel(first);
    });
  }

  function closeModal() {
    if (modal) modal.classList.remove("active");
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalCloseSec) modalCloseSec.addEventListener("click", closeModal);

  if (thermalPrintBtn) {
    thermalPrintBtn.addEventListener("click", () => {
      thermalPrintBtn.textContent = "Yazdırılıyor...";
      setTimeout(() => {
        thermalPrintBtn.textContent = "✓ Yazdırıldı";
        showToast("Termal barkod etiketi yazıcıya gönderildi!");
        setTimeout(() => {
          closeModal();
          thermalPrintBtn.textContent = "🖨️ Etiketi Yazdır";
        }, 800);
      }, 700);
    });
  }

  // İlk çizimler
  renderMovementTable();
  renderProductsList();
  renderPosTiles();
  renderPosCart();
  renderCountTable();
});
