# design-rules.md — デザインルール仕様書

---

## カラーパレット

### ブランドカラー

| 変数名（命名参考） | カラーコード | 用途 |
|---|---|---|
| `color-navy-dark` | `#0d1b2a` | Header / Footer / FV / Price カード背景 |
| `color-navy-darker` | `#08121f` | Feature / Stores 背景（最暗） |
| `color-navy-text` | `#151c2e` | 本文テキスト（最暗） |
| `color-blue` | `#1565c0` | メインアクセント・FAQ ボーダー・リンク |
| `color-cyan` | `#00b4d8` | サブアクセント・数値・ホバーライン |
| `color-orange` | `#ff6b2b` | CTA ボタン・強調・アクセント |
| `color-gold` | `#d1b847` | キャンペーン専用アクセント |

### 背景カラー

| カラーコード | 使用セクション |
|---|---|
| `#f2f6fb` | Nayami / Price / FAQ（ライトブルーグレー） |
| `#ffffff` | Benefit / Flow / フォームカード |
| `#f5f5f7` | サブページ全体背景 |
| `#0a0a0f` | Campaign（最暗） |
| `#1565c0` | Bottom CTA セクション |

### テキストカラー

| カラーコード | 用途 |
|---|---|
| `#151c2e` | 見出し・強調テキスト（ライト背景） |
| `#6b788c` | 本文・説明文（ライト背景） |
| `#4e5a6b` | ドキュメントページ本文 |
| `#ffffff` | ダーク背景上のテキスト全般 |
| `#bfd6f0` | FV サブテキスト |
| `#99b2d1` | FV 説明文 |
| `#a6bfdb` | FV Stats ラベル |
| `#8ca1b8` | フッターリンク（通常時） |
| `#99adc4` | 価格 unit / グレーテキスト全般 |

---

## タイポグラフィ

### フォントファミリー

| ファミリー | 用途 | ウェイト |
|---|---|---|
| Noto Sans JP | 日本語全般・本文・見出し | 400 / 500 / 700 / 900 |
| Inter | 英数字・数値・ラベル・ロゴ | 400 / 700 / 800 |

フォールバック: `-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif`

### フォントスケール（PC / SP）

| 用途 | PC | SP |
|---|---|---|
| FV 大見出し | 68px / 700 | 36px / 700 |
| セクション見出し（h2） | 40px / 700 | 24px / 700 |
| CTA / Stores 見出し | 36px / 700 | 24-26px / 700 |
| カード見出し（h3） | 20-24px / 700 | 16-18px / 700 |
| 価格数値 | 44px / 700（Inter） | 32px / 700 |
| 本文 | 14-16px / 400 | 13-14px / 400 |
| ラベル / バッジ | 12px / 700 | 11px / 700 |
| 注釈 / 補足 | 11-13px / 400 | 11-12px / 400 |

### letter-spacing

| 用途 | 値 |
|---|---|
| 英字ラベル（FEATURES 等） | 2.16〜2.4px |
| ロゴ（MEN'S SMOOTH） | 1px（PC） / 0.48px（SP） |
| 通常テキスト | 0（指定なし） |

---

## スペーシング

### セクション余白

| 場所 | PC | SP |
|---|---|---|
| セクション上下 padding | 96px | 56px |
| セクション左右 padding | 120px | 20px |
| Stores / CTA inner | 80px 120px | 56px 20px |
| フォームページ main | 48px 20px | 24px 16px（bottom 100px） |

### カード間隔

| セクション | gap |
|---|---|
| Nayami / Benefit / Feature / Price / Testimonials | 28px（PC） / 16px（SP） |
| FAQ | 16px |
| Stores | 24px |
| Flow（矢印なし部分） | — |

### コンポーネント内余白

| コンポーネント | padding |
|---|---|
| Benefit カード | 36px 200px 36px 36px |
| Feature カード body | 24px |
| Price カード body | 16px 32px 32px |
| Review カード | 40px 28px 28px |
| FAQ 質問行 | 20px 28px |
| doc-card | 40px 48px（PC） / 24px 20px（SP） |

---

## ボーダーラジウス

| 用途 | 値 |
|---|---|
| 大カード（Nayami / Price / Review） | 20px |
| 中カード（FAQ / Flow / form-card / doc-card） | 16px |
| 小カード（store-card / plan-option） | 12px |
| ボタン（デフォルト） | 10px |
| ボタン（btn--xl） | 12px |
| ボタン（btn--sm / header CTA） | 6px |
| タグ / バッジ（pill） | 100px |
| タグ（角丸小） | 11-15px |
| FAQ 番号アイコン | 10px |
| 入力フォーム | 8px |

---

## シャドウ

| 用途 | 値 |
|---|---|
| ライトカード（Nayami / FAQ） | `0 8px 32px rgba(21,28,46,0.1)` |
| Benefit カード | `0 6px 24px rgba(21,101,192,0.1)` |
| Price カード | `0 12px 40px rgba(0,0,0,0.2)` |
| Review カード | `0 8px 32px rgba(0,0,0,0.2)` |
| Flow カード | `0 4px 20px rgba(0,0,0,0.07)` |
| フォームカード | `0 4px 24px rgba(0,0,0,0.08)` |
| Orange CTA ボタン | `0 10px 30px rgba(255,107,43,0.45)` |
| Orange CTA ボタン（xl） | `0 12px 32px rgba(255,107,43,0.5)` |
| Header | `0 2px 12px rgba(0,0,0,0.2)` |

---

## ボタン仕様

### カラーバリエーション

| クラス | 背景 | テキスト | 用途 |
|---|---|---|---|
| `btn--primary` | `#ff6b2b` | `#ffffff` | メイン CTA（shadow 付き） |
| `btn--secondary` | `#1565c0` | `#ffffff` | プランボタン（ヒゲ） |
| `btn--cyan` | `#00b4d8` | `#ffffff` | プランボタン（部分） |
| `btn--gold` | `#d1b847` | `#0a0a0f` | キャンペーン CTA |
| `btn--dark` | `#0d1b2a` | `#ffffff` | サンクスページ戻るボタン |

### サイズバリエーション

| クラス | padding | font-size | border-radius |
|---|---|---|---|
| `btn--xl` | 24px 64px | 20px | 12px |
| `btn--lg` | 22px 48px | 18px | 10px |
| `btn--md` | 14px 24px | 14px | 10px |
| `btn--sm` | 12px 24px | 13px | 6px |
| `(header cta)` | 12px 24px | 13px | 6px |

### ホバー挙動
- `opacity: 0.9`
- `transform: translateY(-1px)`
- `transition: 0.2s ease`

---

## ブレークポイント

| 名称 | 幅 | 補足 |
|---|---|---|
| PC | 1440px | デザイン基準幅 |
| ブレークポイント | 768px | `@media (max-width: 768px)` |
| SP | 375px | デザイン基準幅 |

設計方針：**PC 基準で記述し、`@media (max-width: 768px)` で SP 値を上書き**。

---

## アニメーション・トランジション

### インタラクション

| 対象 | プロパティ | 時間 |
|---|---|---|
| ボタンホバー | opacity / transform | 0.2s ease |
| ナビリンクホバー（色） | color | 0.2s ease |
| ナビリンクアンダーライン | transform: scaleX | 0.25s ease（transform-origin: center） |
| フッターリンクアンダーライン | 同上 | 0.25s ease |
| FAQ アコーディオン | max-height / padding | 0.4s ease |
| ハンバーガーライン | transform / top / opacity | 0.3s ease |
| Floating CTA 出現 | transform: translateY | 0.4s ease |

### ホバーアンダーライン共通パターン（ヘッダー / フッター）

```css
.element {
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;
}
.element::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background-color: #00b4d8;
  transform: scaleX(0);
  transition: transform 0.25s ease;
  transform-origin: center;
}
.element:hover::after { transform: scaleX(1); }
```

---

## グリッドシステム

| セクション | PC | SP |
|---|---|---|
| Nayami / Price / Testimonials / Stores | 3列 | 1列 |
| Benefit / company-grid | 2列 | 1列 |
| Feature | 4列 | 1列 |
| contact-methods | 2列 | 1列 |
| Flow | flex 横並び + 矢印 | flex 縦積み + 矢印 rotate(90deg) |

gap は基本 **28px（PC）/ 16px（SP）**。Stores は 24px。

---

## セクション背景パターン

暗背景と明背景が交互に切り替わることでリズムを生み出す。

```
FV          ← 暗（navy）
Campaign    ← 最暗（#0a0a0f）
Nayami      ← 明（#f2f6fb）
Benefit     ← 白
Feature     ← 最暗（#08121f）
Price       ← 明（#f2f6fb）
Flow        ← 白
Testimonials← 暗（#0d1b2a）
FAQ         ← 明（#f2f6fb）
Stores      ← 最暗（#08121f）
CTA         ← ブルー（#1565c0）
Footer      ← 暗（#0d1b2a）
```

---

## アイコン・マーク仕様

| 用途 | 実装方法 | サイズ |
|---|---|---|
| 電話アイコン | インライン SVG（path） | 16px |
| Q / A アイコン | テキスト（Inter Bold） | 40px 正方形（PC）/ 28px（SP） |
| ステップ番号 | テキスト（Inter Bold） | 52px 円形 |
| 評価星 | テキスト（★） | 18px / `#ffd933` |
| キャンペーンバッジ | 絵文字（🔥⭐） | — |
| 店舗情報アイコン | 絵文字（📍🚃🕐☎） | — |

---

## 全幅帯パターン（コンテナ外に広げる）

コンテナ（max-width: 1440px）の中にいながら、背景だけをビューポート全幅に広げる手法。

```css
.element::before {
  content: "";
  position: absolute;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  /* 背景プロパティをここに設定 */
}
```

使用箇所：FV Stats バー（`rgba(0,0,0,0.25)` + `backdrop-filter: blur(8px)`）
