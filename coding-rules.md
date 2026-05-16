# coding-rules.md — コーディングルール仕様書

---

## ファイル構成ルール

```
/
├── *.html          # ページファイル（フラット配置）
├── css/styles.css  # 全ページ共通スタイル（1ファイル集約）
├── js/main.js      # 全ページ共通スクリプト（1ファイル集約）
└── img/            # 画像（.webp 使用、.jpg をバックアップ保持）
```

- CSS / JS は追加ファイルを作らず 1 ファイルに集約する
- 画像は `img/セクション名-番号.webp` の形式で命名

---

## HTML ルール

### 基本構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="...">
  <meta name="format-detection" content="telephone=no">  <!-- 電話番号自動リンク防止 -->
  <title>ページ名 | MEN'S SMOOTH</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
  ...
  <script src="./js/main.js" defer></script>
</body>
```

- `<script>` は `defer` 属性を付けて `</body>` 直前に配置
- サブページは `<body class="subpage">` を付与
- サンクスページは `<meta name="robots" content="noindex">` を追加

### セマンティクス

| 要素 | 用途 |
|---|---|
| `<header>` | グローバルヘッダー |
| `<main>` | ページ本文（LP は `<section>` を直接格納） |
| `<section>` | 各セクション（id 付き） |
| `<article>` | カード単体（nayami-card / benefit-card / review-card / faq-item 等） |
| `<footer>` | グローバルフッター |
| `<nav>` | ナビゲーション（`aria-label` 必須） |
| `<figure>` | FV ヒーロー画像（`<picture>` を内包） |
| `<header>` inside section | セクションタイトルブロック（`class="section-title"`） |
| `<ol>` | Flow ステップ（順序ありリスト） |

### アクセシビリティ

- 装飾画像には `alt=""` + `aria-hidden="true"`
- インタラクティブ要素に `aria-label` または `aria-expanded`
- 評価星（★）に `aria-label="5つ星評価"`
- ハンバーガーに `aria-expanded="false/true"` をトグル
- マーキー装飾に `aria-hidden="true"`

### PC/SP 出し分け

```html
<!-- PC のみ表示 -->
<span class="is-pc">テキスト</span>

<!-- SP のみ表示 -->
<span class="is-sp">テキスト</span>

<!-- ボタン（display: inline-flex のため専用クラス） -->
<a class="btn btn--primary is-pc">PC用テキスト</a>
<a class="btn btn--primary is-sp">SP用テキスト</a>
```

**禁止事項：** `<nav class="header__nav">` と `<a class="header__tel">` には `is-pc` を付けない。
`display: revert` が `display: contents` / `display: flex` を上書きしてレイアウトが崩れる。

---

## CSS ルール

### 命名規則（BEM）

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

**例**
```css
.faq-item {}
.faq-item__question {}
.faq-item__answer {}
.faq-item.is-open {}          /* 状態クラスは .is-xxx */
.faq-item--featured {}        /* 未使用だが拡張時はこの形式 */
```

状態クラスは `.is-open` / `.is-active` / `.is-visible` を使う。  
JS フックには `.js-xxx` クラスを使い、スタイルを付与しない。

### ファイル構成（styles.css 内セクション順）

```
0. Reset & Base
1. Common Layout（.section, .section__inner, .section-title）
2. Buttons（.btn とバリエーション）
3. Header
4. FV（アニメーション @keyframes 含む）
5. Campaign
6. Nayami（マーキー @keyframes 含む）
7. Benefit
8. Feature
9. Price
10. Flow
11. Testimonials
12. FAQ
13. Stores
14. CTA Section
15. Footer
16. Floating CTA
17a. Document pages（.doc-wrap / .doc-card / .doc-table）
17b. Form pages（.subpage / .form-* / .plan-* / .selected-plan）
18. Thanks page
レスポンシブ（@media max-width: 768px）
ユーティリティ（.is-pc / .is-sp）
```

### 設計方針

- **PC 基準**で書き、`@media (max-width: 768px)` で SP 値を上書き
- セクション背景色はセクション自身（`.fv` / `.nayami` 等）に指定し、`section__inner` には指定しない
- `max-width: 1440px; margin: 0 auto` でコンテナを中央配置
- SP では `padding: 0 20px`（コンテナ幅いっぱいに広げる）

### コンテナパターン

```css
/* セクション標準 */
.section__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 96px 120px;   /* PC */
}
@media (max-width: 768px) {
  .section__inner { padding: 56px 20px; }
}

/* 独自 inner（Stores / CTA） */
.stores__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 120px;
}
```

### 全幅背景帯パターン

```css
.element {
  position: relative; /* 親に relative が必要 */
}
.element::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 100vw;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.25);
  z-index: -1;
  pointer-events: none;
}
```

### グリッドパターン

```css
/* 3 列グリッド（標準） */
.xxx__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 1180px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .xxx__cards {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 335px;
  }
}
```

### `display: contents` パターン（ヘッダーナビ）

`<nav>` 自体を flex アイテムとして消し、子 `<a>` を親 flex コンテナに直接参加させる。

```css
.header__nav {
  display: contents;
  /* nav 自体は表示されず、子 a が header__inner の flex アイテムになる */
}
```

SP では `display: none` で非表示。

---

## JavaScript ルール

### 基本構成

```js
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initXxx();
  });

  function initXxx() {
    var el = document.querySelector(".js-xxx");
    if (!el) return;  // 要素がないページでも安全に動作
    // ...
  }
})();
```

- ES5 互換の即時実行関数（IIFE）で全体をラップ
- `"use strict"` を宣言
- DOMContentLoaded で初期化関数を呼び出す
- 各機能は `init` プレフィックスの関数に分割
- 要素がない場合は `if (!el) return` でガード（全ページ共通ファイルのため必須）
- `const` / `let` / アロー関数は未使用（ES5 互換）

### フック用クラス命名

| クラス | 役割 |
|---|---|
| `.js-hamburger` | ハンバーガーボタン |
| `.js-drawer` | SP ドロワー |
| `.js-faq-question` | FAQ 質問ボタン |
| `.js-floating-cta` | 追従 CTA |
| `.js-selected-plan-name` | 選択プラン表示テキスト |

`.js-` クラスにはスタイルを付与しない（JS 専用）。

### スクロールイベント最適化

```js
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
```

### スムーススクロール

```js
// ヘッダー高さをオフセットして対象セクションへスクロール
var headerHeight = window.innerWidth <= 768 ? 86 : 80;
var rect = target.getBoundingClientRect();
var offset = window.pageYOffset + rect.top - headerHeight;
window.scrollTo({ top: offset, behavior: "smooth" });
```

SP ヘッダー高さ = header 50px + 電話ストリップ 26px + ドロワー分余裕 = **86px**

---

## 画像ルール

- 形式：**WebP**（`quality: 82`）
- SP/PC 切り替えが必要な画像は `<picture>` + `<source media="(max-width: 768px)">` で実装
- ファーストビュー画像は `loading="eager" fetchpriority="high"`
- それ以外は `loading="lazy"`（デフォルト）
- 装飾目的の画像は `alt="" aria-hidden="true"`
- コンテンツ画像は意味のある `alt` テキストを記述

---

## フォームルール

### クラス対応表

| 要素 | クラス |
|---|---|
| フォームグループ | `.form-row` |
| ラベル | `.form-label` |
| 必須バッジ | `.form-label__required`（赤バッジ） |
| 入力 / セレクト | `.form-input` |
| テキストエリア | `.form-input form-textarea` |
| チェックボックスラベル | `.form-checkbox` |
| チェックボックステキスト | `.form-checkbox__text` |
| 送信ボタン | `.form-submit`（オレンジ）/ `.form-submit--gold`（ゴールド） |

### バリデーション

- HTML5 標準の `required` のみ使用
- `novalidate` を `<form>` に付与（スタイルを独自制御する場合）

---

## WordPress 移行時の対応ポイント

| 箇所 | 対応内容 |
|---|---|
| 画像パス `./img/` | `<?php echo get_template_directory_uri(); ?>/img/` に置換 |
| ヘッダー / フッター | `header.php` / `footer.php` に分離 |
| ナビリンク | `wp_nav_menu()` に置換 |
| 繰り返し要素（FAQ / 店舗等） | `WP_Query` または ACF で `foreach` 化 |
| フォーム送信 | Contact Form 7 / WPForms 等に置換 |
| `?plan=` パラメータ | `$_GET['plan']` で受け取り、JS 変数として出力 |
