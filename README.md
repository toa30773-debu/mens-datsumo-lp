# MEN'S SMOOTH — メンズ脱毛クリニック LP

メンズ脱毛クリニック「MEN'S SMOOTH」のランディングページ一式。  
PC / SP レスポンシブ対応・WordPress 化を意識した構造で実装。

---

## 技術スタック

- HTML5 / CSS3 / JavaScript（バニラJS・フレームワーク不使用）
- Web フォント：Google Fonts（Noto Sans JP / Inter）
- ビルドツール不使用 — ファイルをブラウザで直接開けば動作

---

## 起動方法

```bash
python -m http.server 8000   # Python 3
npx serve .                  # Node.js
```

`http://localhost:8000/` にアクセス。フォーム送信後の遷移確認にはサーバ経由が必要。

---

## ファイル構成

```
mens-datsumo-lp/
├── index.html                    # トップ LP（全セクション）
├── reservation-counseling.html   # 無料カウンセリング予約
├── reservation-plan.html         # 料金プラン選択 + 予約
├── reservation-campaign.html     # ¥500 キャンペーン予約
├── thanks.html                   # 送信完了（カウンセリング・プラン共通）
├── thanks-campaign.html          # 送信完了（¥500 キャンペーン専用）
├── privacy.html                  # プライバシーポリシー
├── tokusho.html                  # 特定商取引法に基づく表記
├── company.html                  # 会社情報・店舗一覧
├── contact.html                  # お問い合わせフォーム
├── css/styles.css                # 全ページ共通スタイル（BEM）
├── js/main.js                    # 全ページ共通スクリプト
└── img/                          # 画像（.webp 使用中・.jpg はバックアップ）
```

---

## CTA リンク設計

| ボタン | 遷移先 |
|---|---|
| 無料カウンセリング予約 | `reservation-counseling.html` |
| このプランで決定する | `reservation-plan.html?plan={hige/zenshin/bubun}` |
| ¥500 キャンペーンを予約する | `reservation-campaign.html` |
| カウンセリング・プラン 送信 | `thanks.html` |
| ¥500 キャンペーン 送信 | `thanks-campaign.html` |

`reservation-plan.html` は `?plan=hige / zenshin / bubun` でプランをプリセレクトできる。

---

## レスポンシブ仕様

- **PC**：1440px 基準、`max-width: 1440px` で中央配置
- **SP**：`@media (max-width: 768px)` で上書き、375px 基準
- ヘッダーの `<nav>` に `display: contents` を使い、nav の子 `<a>` が flex アイテムとして並ぶ設計。`is-pc` クラスを nav や tel リンクに付けると `display: revert` で壊れるため付けないこと

---

## JavaScript（js/main.js）

| 機能 | 概要 |
|---|---|
| SP ハンバーガーメニュー | タップで開閉。ドロワー内リンクタップで自動閉鎖 |
| FAQ アコーディオン | `.js-faq-question` クリックで `is-open` 切り替え |
| スムーススクロール | ヘッダー高さ（SP: 86px / PC: 80px）を考慮してスクロール |
| 追従 CTA | SP 限定。FV 通過後に表示、Footer 到達で非表示 |

---

## 画像

- 形式：**WebP**（quality 82 で変換済み）、元の `.jpg` はバックアップとして保持
- 変換前後：平均 **-93%**（例：`fv-hero.jpg` 2,468KB → `fv-hero.webp` 111KB）
- 同名の `.webp` ファイルを差し替えれば HTML 修正不要

---

## WordPress 化を想定した構成

- 各セクションを `<section class="セクション名">` でブロック化 → `section-*.php` に分割しやすい
- ヘッダー / フッターは `header.php` / `footer.php` に分離可能
- FAQ・店舗・料金プランなど繰り返し要素は `foreach` ループ化できる規則的なマークアップ
- 画像パスは `./img/xxx.webp` → WordPress 化時は `get_template_directory_uri()` に置換

---

## 本番前に要対応

| 項目 | 内容 |
|---|---|
| TEL / メール / 住所 | すべてダミー。実際の情報に置換 |
| 店舗 Google Maps リンク | 仮 URL。実際の座標に変更 |
| LINE 友だち追加リンク | `href="#"` のまま。実際の URL に変更 |
| フォーム送信処理 | 現状はフロントのみ（`action="thanks.html"`）。本番では PHP / CF7 等が必要 |
| `.jpg` バックアップ削除 | 不要であれば `img/*.jpg` を削除してよい |

---

(c) 2025 MEN'S SMOOTH
