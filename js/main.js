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

      // FVを通過し、Footerに到達していなければ表示
      if (scrollY > fvBottom - 100 && viewportBottom < footerTop + 50) {
        floatingCta.classList.add("is-visible");
      } else {
        floatingCta.classList.remove("is-visible");
      }
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
})();
