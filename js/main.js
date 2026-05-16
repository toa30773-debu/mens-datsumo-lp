/**
 * MEN'S SMOOTH - Main JavaScript
 * - SPハンバーガーメニュー
 * - FAQアコーディオン
 * - スムーススクロール
 * - 追従CTA表示制御
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHamburger();
    initFaq();
    initSmoothScroll();
    initFloatingCta();
    initFormValidation();
  });

  /**
   * SPハンバーガーメニュー
   * .header__hamburger を押すと .sp-drawer の開閉を切り替える
   */
  function initHamburger() {
    var hamburger = document.querySelector(".js-hamburger");
    var drawer = document.querySelector(".js-drawer");
    if (!hamburger || !drawer) return;

    hamburger.addEventListener("click", function () {
      var isOpen = drawer.classList.toggle("is-open");
      hamburger.classList.toggle("is-active", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // ドロワー内のリンクをタップしたら閉じる
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        drawer.classList.remove("is-open");
        hamburger.classList.remove("is-active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /**
   * FAQアコーディオン
   * .faq-item__question を押すと .faq-item の is-open 切り替え
   */
  function initFaq() {
    var questions = document.querySelectorAll(".js-faq-question");
    questions.forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        if (!item) return;
        var isOpen = item.classList.toggle("is-open");
        q.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  }

  /**
   * スムーススクロール
   * a[href^="#"] のクリックでスムーズに対象セクションまでスクロール
   * （CSSの scroll-behavior: smooth でも動くが、ヘッダー高さを考慮してJSで行う）
   */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (!href || href === "#" || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        // SPはヘッダー56 + 電話ストリップ約30 = 86px、PCは80px
        var headerHeight = window.innerWidth <= 768 ? 86 : 80;
        var rect = target.getBoundingClientRect();
        var offset = window.pageYOffset + rect.top - headerHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      });
    });
  }

  /**
   * 追従CTA表示制御
   * SPでFVを通過したら .floating-cta を表示、Footerに到達したら非表示
   */
  function initFloatingCta() {
    var floatingCta = document.querySelector(".js-floating-cta");
    if (!floatingCta) return;

    var fv = document.querySelector(".fv");
    var footer = document.querySelector(".footer");

    function update() {
      if (window.innerWidth > 768) {
        floatingCta.classList.remove("is-visible");
        return;
      }

      var scrollY = window.pageYOffset;
      var fvBottom = fv ? fv.offsetTop + fv.offsetHeight : 400;
      var footerTop = footer ? footer.offsetTop : Infinity;
      var viewportBottom = scrollY + window.innerHeight;

      var visible = scrollY > fvBottom - 100 && viewportBottom < footerTop + 50;
      floatingCta.classList.toggle("is-visible", visible);
      floatingCta.setAttribute("aria-hidden", visible ? "false" : "true");
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /**
   * フォームバリデーション
   * required フィールドを submit 時に検証し、エラーをインラインで表示する
   */
  function initFormValidation() {
    document.querySelectorAll("form[novalidate]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        if (!validateForm(form)) e.preventDefault();
      });

      // 入力・変更のタイミングでエラーをリセット
      form.querySelectorAll("[required]").forEach(function (field) {
        var ev = field.type === "checkbox" ? "change" : "input";
        field.addEventListener(ev, function () { clearError(field); });
      });
    });
  }

  function validateForm(form) {
    var firstInvalid = null;
    form.querySelectorAll("[required]").forEach(function (field) {
      clearError(field);
      var err = getFieldError(field);
      if (err) {
        showError(field, err);
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function getFieldError(field) {
    if (field.type === "checkbox") {
      return field.checked ? "" : "チェックが必要です";
    }
    if (!field.value.trim()) {
      return "この項目は必須です";
    }
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
      return "正しいメールアドレスを入力してください";
    }
    if (field.type === "tel" && field.value.replace(/\D/g, "").length < 10) {
      return "正しい電話番号を入力してください（10桁以上）";
    }
    return "";
  }

  function showError(field, message) {
    var msg = document.createElement("p");
    msg.className = "form-error-msg";
    msg.textContent = message;
    if (field.type === "checkbox") {
      var label = field.closest(".form-checkbox");
      label.classList.add("is-error");
      label.insertAdjacentElement("afterend", msg);
    } else {
      field.classList.add("is-error");
      field.closest(".form-row").appendChild(msg);
    }
  }

  function clearError(field) {
    if (field.type === "checkbox") {
      var label = field.closest(".form-checkbox");
      label.classList.remove("is-error");
      var next = label.nextElementSibling;
      if (next && next.classList.contains("form-error-msg")) next.remove();
    } else {
      field.classList.remove("is-error");
      var row = field.closest(".form-row");
      var errEl = row && row.querySelector(".form-error-msg");
      if (errEl) errEl.remove();
    }
  }
})();
