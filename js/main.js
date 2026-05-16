/**
 * MEN'S SMOOTH - メインスクリプト
 *
 * 担当機能：
 *   1. SPハンバーガーメニュー開閉
 *   2. FAQアコーディオン
 *   3. スムーススクロール（ヘッダー高さを考慮したオフセット付き）
 *   4. 追従CTA表示制御（SP限定・FV通過後に表示）
 *   5. フォームバリデーション（全予約フォーム共通）
 *
 * 即時関数（IIFE）でラップし、グローバルスコープを汚染しない。
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

  /* =========================================================
     1. SPハンバーガーメニュー
     ========================================================= */

  /**
   * ハンバーガーボタンとドロワーメニューの開閉制御。
   * ドロワーが開いているとき body.overflow=hidden でページスクロールを止める。
   */
  function initHamburger() {
    var hamburger = document.querySelector(".js-hamburger");
    var drawer = document.querySelector(".js-drawer");

    // ページによってはヘッダーが存在しない場合があるため早期リターン
    if (!hamburger || !drawer) return;

    hamburger.addEventListener("click", function () {
      var isOpen = drawer.classList.toggle("is-open");
      hamburger.classList.toggle("is-active", isOpen);
      // aria-expanded でスクリーンリーダーに開閉状態を伝える
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      // ドロワー表示中はページ本体をスクロールさせない
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // ドロワー内のリンクをタップしたら自動で閉じる（UX向上）
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        drawer.classList.remove("is-open");
        hamburger.classList.remove("is-active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* =========================================================
     2. FAQアコーディオン
     ========================================================= */

  /**
   * 質問ボタンをクリックすると .faq-item に is-open クラスが付き、
   * CSS側の max-height トランジションで回答パネルが開閉する。
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

  /* =========================================================
     3. スムーススクロール
     ========================================================= */

  /**
   * ページ内リンク（href="#..."）をクリックしたとき、固定ヘッダー分の
   * オフセットを差し引いてスクロール位置を調整する。
   *
   * CSS の scroll-behavior: smooth だけだとヘッダー高さを考慮できないため JS で実装。
   * ヘッダー高さ：
   *   PC  → 80px（ヘッダーのみ）
   *   SP  → 86px（ヘッダー50px ＋ 電話ストリップ26px ＋ 余裕10px）
   */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        // "#" 単体や空文字は対象外
        if (!href || href === "#" || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var headerHeight = window.innerWidth <= 768 ? 86 : 80;
        var rect = target.getBoundingClientRect();
        var offset = window.pageYOffset + rect.top - headerHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      });
    });
  }

  /* =========================================================
     4. 追従CTA表示制御（SP限定）
     ========================================================= */

  /**
   * SP画面でユーザーがFVを通過したら画面下部に固定CTAを表示する。
   * フッターに到達したら非表示にしてフッターリンクと重ならないようにする。
   *
   * scroll / resize イベントを requestAnimationFrame でスロットリングし、
   * 過剰な再描画を防ぐ（ticking フラグで制御）。
   */
  function initFloatingCta() {
    var floatingCta = document.querySelector(".js-floating-cta");
    if (!floatingCta) return;

    var fv = document.querySelector(".fv");
    var footer = document.querySelector(".footer");

    function update() {
      // PCでは CSS側で display:none だが、念のり is-visible も外す
      if (window.innerWidth > 768) {
        floatingCta.classList.remove("is-visible");
        return;
      }

      var scrollY = window.pageYOffset;
      // FVの下端（-100px の余裕を持たせてFV途中から表示開始）
      var fvBottom = fv ? fv.offsetTop + fv.offsetHeight : 400;
      // フッターの上端（+50px の余裕でフッター直前に非表示）
      var footerTop = footer ? footer.offsetTop : Infinity;
      var viewportBottom = scrollY + window.innerHeight;

      var visible = scrollY > fvBottom - 100 && viewportBottom < footerTop + 50;
      floatingCta.classList.toggle("is-visible", visible);
      // aria-hidden をリアルタイムで更新し、スクリーンリーダーに可視状態を伝える
      floatingCta.setAttribute("aria-hidden", visible ? "false" : "true");
    }

    // rAF スロットリング：scroll イベントは高頻度で発火するため1フレーム1回に間引く
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

    // passive:true でスクロールパフォーマンスを向上（preventDefault を使わないため）
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // 初期表示時にも一度評価（ページ途中でリロードされた場合に対応）
    update();
  }

  /* =========================================================
     5. フォームバリデーション
     ========================================================= */

  /**
   * HTML標準バリデーション（novalidate で無効化）の代わりに JS で実装。
   * 理由：ブラウザ標準のエラーUIはデザインが制御できないため。
   *
   * 対象：form[novalidate] を持つ全フォーム（予約フォーム・お問い合わせ）
   */
  function initFormValidation() {
    document.querySelectorAll("form[novalidate]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        // バリデーション失敗時はフォーム送信を中断
        if (!validateForm(form)) e.preventDefault();
      });

      // 入力・変更のタイミングでそのフィールドのエラーをリセット（即時フィードバック）
      form.querySelectorAll("[required]").forEach(function (field) {
        var ev = field.type === "checkbox" ? "change" : "input";
        field.addEventListener(ev, function () { clearError(field); });
      });
    });
  }

  /**
   * フォーム内の全 required フィールドを検証。
   * エラーがあれば表示し、最初のエラーフィールドにフォーカスを移す。
   * @returns {boolean} 全フィールドが有効なら true
   */
  function validateForm(form) {
    var firstInvalid = null;
    form.querySelectorAll("[required]").forEach(function (field) {
      clearError(field); // 前回のエラーを一旦リセット
      var err = getFieldError(field);
      if (err) {
        showError(field, err);
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  /**
   * フィールドのエラーメッセージを返す。問題なければ空文字を返す。
   * チェックボックス・メール・電話番号はそれぞれ専用の検証を行う。
   */
  function getFieldError(field) {
    if (field.type === "checkbox") {
      return field.checked ? "" : "チェックが必要です";
    }
    if (!field.value.trim()) {
      return "この項目は必須です";
    }
    // メールアドレス形式チェック（@と.が含まれているか）
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
      return "正しいメールアドレスを入力してください";
    }
    // 電話番号：数字のみ抽出して10桁以上かチェック（ハイフンや括弧は除外）
    if (field.type === "tel" && field.value.replace(/\D/g, "").length < 10) {
      return "正しい電話番号を入力してください（10桁以上）";
    }
    return "";
  }

  /**
   * フィールドの直下にエラーメッセージ要素を追加し、赤枠スタイルを付与する。
   * チェックボックスは input が非表示のため、親の label に is-error を付ける。
   */
  function showError(field, message) {
    var msg = document.createElement("p");
    msg.className = "form-error-msg";
    msg.textContent = message;
    if (field.type === "checkbox") {
      var label = field.closest(".form-checkbox");
      label.classList.add("is-error");
      // エラーメッセージは label の直後に挿入
      label.insertAdjacentElement("afterend", msg);
    } else {
      field.classList.add("is-error");
      field.closest(".form-row").appendChild(msg);
    }
  }

  /**
   * フィールドのエラー表示（赤枠・メッセージ）を取り除く。
   */
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
