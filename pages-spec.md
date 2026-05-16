# pages-spec.md — ページ・セクション仕様書

---

## index.html（トップ LP）

### Header

| 項目 | PC | SP |
|---|---|---|
| 高さ | 80px | 50px + 電話ストリップ 26px = 76px |
| 背景 | `#0d1b2a` | 同左 |
| 位置 | `position: sticky; top: 0; z-index: 100` | 同左 |
| ロゴ | MEN'S SMOOTH（20px / 700） | 16px |
| 電話番号 | インライン表示（オレンジ電話アイコン付き） | 電話ストリップに分離（sticky, top: 50px） |
| ナビ | `display: contents`（flex アイテムとして展開） | 非表示（ドロワーに移動） |
| CTA | 「無料カウンセリング予約」ボタン | 「無料予約」（短縮）ボタン |
| ハンバーガー | 非表示 | 表示（32px、3線） |

**SP ドロワー**
- `position: fixed; top: 76px; z-index: 98`
- ナビリンク + CTA ボタン縦並び
- `.js-hamburger` クリックで `.js-drawer` に `is-open` トグル

---

### FV（ファーストビュー）

| 項目 | PC | SP |
|---|---|---|
| 高さ | 780px（固定） | auto（フレックス縦積み） |
| 背景 | ダークネイビー → グラデーション + アニメーション | `linear-gradient(to top, #0d1b2a, #050d17)` |
| レイアウト | テキスト左・画像右（absolute 配置） | 縦積み（flex-direction: column） |
| 見出し | 68px / 700 / 白 | 36px |
| サブテキスト | 20px / `#bfd6f0` | 14px / `#ccdef2` |
| 説明文 | 15px / `#99b2d1`（PC のみ表示） | 非表示 |
| ヒーロー画像 | 右寄せ 580×580px / border-radius: 16px | 幅 100% / height: 200px |
| CTA ボタン | `btn--lg`（22px 48px padding） | `btn` 幅 100% / height: 52px |
| Stats バー | 最下部 height: 90px / 背景 blur 帯（100vw 拡張） | height: 50px / 3 項目（「最短当日」非表示） |

**アニメーション（`prefers-reduced-motion` で無効化）**

| 対象 | キーフレーム | 周期 |
|---|---|---|
| 背景グラデーション | `fvBgShift`（background-position 移動） | 18s alternate |
| グリッド模様（`::before`） | `fvGridDrift`（translate 60px） | 30s linear |
| 光の帯（`::after`） | `fvSheen`（background-position 移動） | 12s ease-in-out |
| 装飾グロー1（右上） | `fvOrbFloat1`（translate + scale） | 14s ease-in-out |
| 装飾グロー2（左下） | `fvOrbFloat2`（translate + scale） | 11s ease-in-out |

---

### Campaign

| 項目 | 値 |
|---|---|
| 背景 | `#0a0a0f` |
| 上下ボーダー | 3px グラデーションライン（gold） |
| キャッチ | 52px / `#f7e580`（PC）、38px（SP） |
| CTA | `btn--gold btn--md`（¥500 キャンペーンページへ） |

---

### Nayami（お悩み）

| 項目 | 値 |
|---|---|
| 背景 | `#f2f6fb` |
| 背景装飾 | 3行マーキーテキスト（`position: absolute; z-index: 0`） |
| カード数 | 3枚 |
| グリッド | PC: 3列 / SP: 1列（max-width: 335px） |
| カード背景 | `#ffffff` / border-radius: 20px / shadow |
| 画像高さ | 200px（PC） / そのまま |
| タグカラー | 青 `#1565c0` / シアン `#0090af` / 紺 `#0f5096` |

**背景マーキー仕様**

| 行 | フォントサイズ | 色 | opacity | 速度 | 方向 |
|---|---|---|---|---|---|
| Row 1 | 64px（SP: 36px） | `#1565c0` | 0.07 | 75s | normal |
| Row 2 | 52px（SP: 30px） | `#151c2e` | 0.06 | 60s | reverse（italic） |
| Row 3 | 72px（SP: 40px） | `#ff6b2b` | 0.06 | 90s | normal |

---

### Benefit（メリット）

| 項目 | 値 |
|---|---|
| 背景 | `#ffffff` |
| カード数 | 4枚（2×2グリッド） |
| グリッド | PC: 2列 / SP: 1列 |
| カードスタイル | 左ボーダー 8px（blue / cyan 交互）、右側に絶対配置画像 |
| カード padding | `36px 200px 36px 36px`（PC）/ 画像を上部に移動（SP） |
| 画像 | right: 0, top: 0, width: 180px, height: 100%（PC のみ） |

---

### Feature（選ばれる理由）

| 項目 | 値 |
|---|---|
| 背景 | `#08121f`（最暗） |
| カード数 | 4枚 |
| グリッド | PC: 4列 / SP: 1列 |
| カードスタイル | 半透明ボーダー `rgba(255,255,255,0.12)`・暗背景 |
| 画像高さ | 160px（PC）/ 120px（SP） |
| 番号カラー | 奇数: `#1565c0` / 偶数: `#00b4d8` |

---

### Price（料金）

| 項目 | 値 |
|---|---|
| 背景 | `#f2f6fb` |
| カード数 | 3枚（ヒゲ・全身・部分） |
| グリッド | PC: 3列 / SP: 1列 |
| カード背景 | `#0d1b2a` |
| 画像高さ | 140px |
| 価格フォント | Inter 44px（PC）/ 32px（SP） |
| CTA | プランごとに `btn--secondary / btn--primary / btn--cyan` |

| プラン | 価格 | CTA カラー | URL パラメータ |
|---|---|---|---|
| ヒゲ脱毛 | ¥29,800 / 全6回 | blue | `?plan=hige` |
| 全身脱毛 | ¥79,800 / 全6回 | orange | `?plan=zenshin` |
| 部分脱毛 | ¥9,800〜/ 部位 | cyan | `?plan=bubun` |

---

### Flow（施術の流れ）

| 項目 | 値 |
|---|---|
| 背景 | `#ffffff` |
| ステップ数 | 4 |
| PC レイアウト | 横並び flex（矢印「→」セパレータ付き） |
| SP レイアウト | 縦積み（矢印 rotate 90deg） |
| カード幅 | 270px（PC）/ 100% max 335px（SP） |
| 画像高さ | 140px |
| ステップ番号 | absolute top-left、半透明円形バッジ |

---

### Testimonials（口コミ）

| 項目 | 値 |
|---|---|
| 背景 | `#0d1b2a` |
| カード数 | 3枚 |
| グリッド | PC: 3列 / SP: 1列 |
| アクセントカラー | blue / orange / cyan（カードごとに異なる） |
| クォートマーク | Inter 72px、アクセントカラー 0.6 opacity |
| 本文最小高さ | 140px（PC のみ） |
| アバター | 48px 円形、イニシャル2文字 |

---

### FAQ

| 項目 | 値 |
|---|---|
| 背景 | `#f2f6fb` |
| 項目数 | 5 |
| 最大幅 | 960px（中央配置） |
| アコーディオン | `max-height: 0 → 400px` アニメーション |
| 左ボーダー | 4px solid `#1565c0` |
| Q アイコン | 40px 正方形、`#1565c0`、Inter 18px |
| A アイコン | 40px 正方形、`#00b4d8` |
| トグル記号 | 「＋」→ `rotate(45deg)` で「×」 |

---

### Stores（店舗一覧）

| 項目 | 値 |
|---|---|
| 背景 | `#08121f` |
| 店舗数 | 3（渋谷 / 新宿 / 池袋） |
| グリッド | PC: 3列（max 1144px）/ SP: 1列 |
| カード背景 | `#0f2138` |
| 下線アクセント | store-card__name の下に 32×3px オレンジバー |
| マップボタン | absolute right-bottom、`#ff6b2b`、border-radius: 6px |

---

### Bottom CTA

| 項目 | 値 |
|---|---|
| 背景 | `#1565c0` |
| ボタン | `btn--primary btn--xl`（24px 64px / 20px / border-radius: 12px） |
| 安心訴求 | ✓ 完全無料 / ✓ キャンセル OK / ✓ 勧誘なし / ✓ 当日対応可 |

---

### Floating CTA（SP のみ）

- `position: fixed; bottom: 0; z-index: 80`
- `transform: translateY(100%)` → `translateY(0)`（`is-visible` クラスで出現）
- FV 通過後に表示、Footer に到達したら非表示
- ボタン: `#ff6b2b`、height: 52px、border-radius: 8px

---

## 予約フォームページ共通仕様

### ヘッダー
index.html と同一構造。ただし `<nav>` と `<a class="header__tel">` に `is-pc` クラスを付けないこと（`display: revert` で崩れる）。

### サブページヒーロー（`.subpage-hero`）

| 項目 | 値 |
|---|---|
| 背景 | `linear-gradient(to bottom, #0d1b2a, #14387a)` |
| padding | 22px 20px 30px |
| バッジ | `#ff6b2b`（通常）/ `#d1b847`（キャンペーン） |

### フォームカード（`.form-card`）

- 背景: `#ffffff` / border-radius: 16px / padding: 36px 40px
- 入力欄: `#f7f7fa` 背景、focus 時に `#1565c0` ボーダー + shadow
- 送信ボタン: `.form-submit`（`#ff6b2b`）/ キャンペーンは `.form-submit--gold`

### reservation-plan.html 固有

- PC: 2カラム（プラン選択 520px + フォーム 680px）
- `?plan=hige / zenshin / bubun` でラジオボタンをプリセレクト
- 選択中プランをサマリー表示（`.js-selected-plan-name`）

---

## サンクスページ共通仕様

- `<meta name="robots" content="noindex">`
- ✓ アイコン（`#1fb86b` 円形、60px）
- 次のステップ表示（`.thanks-steps`）
- LINE 友だち追加ブロック（`.thanks-line`）
- thanks-campaign.html のみオレンジバナー（`.thanks-banner`）表示

---

## ドキュメントページ共通仕様（privacy / tokusho / company / contact）

- `body.subpage` → `background: #f5f5f7`
- `.doc-wrap`：max-width 860px 中央配置
- `.doc-card`：白カード / padding: 40px 48px / shadow
- `.doc-section__title`：左ボーダー 3px `#1565c0`
- `.doc-table`：th 幅 200px / `#f5f7fb` 背景 / td `#4e5a6b`
- SP: padding 24px 20px / th 幅 130px
