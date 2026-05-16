# MEN'S SMOOTH

男性専門医療脱毛クリニックのランディングページ一式。3系統のCTA導線設計と、純粋なCSSアニメーションによる高品質なFV演出を実装したポートフォリオ作品。

---

## デモ

🔗 **[ライブデモを見る](https://toa30773.github.io/mens-datsumo-lp/)**

**LP（トップページ）**
| PC版（1440px） | SP版（375px） |
|---|---|
| ![LP PC版](images/ss_lp_pc.png) | ![LP SP版](images/ss_lp_sp.png) |

**無料カウンセリング予約ページ**
| PC版 | SP版 |
|---|---|
| ![カウンセリング予約 PC版](images/ss_counseling_pc.png) | ![カウンセリング予約 SP版](images/ss_counseling_sp.png) |

**料金プラン予約ページ**
| PC版 | SP版 |
|---|---|
| ![料金プラン予約 PC版](images/ss_plan_pc.png) | ![料金プラン予約 SP版](images/ss_plan_sp.png) |

**¥500キャンペーン予約ページ**
| PC版 | SP版 |
|---|---|
| ![キャンペーン予約 PC版](images/ss_campaign_pc.png) | ![キャンペーン予約 SP版](images/ss_campaign_sp.png) |

**カウンセリング完了ページ**
| PC版 | SP版 |
|---|---|
| ![カウンセリング完了 PC版](images/ss_thanks_counseling_pc.png) | ![カウンセリング完了 SP版](images/ss_thanks_counseling_sp.png) |

**料金プラン完了ページ**
| PC版 | SP版 |
|---|---|
| ![料金プラン完了 PC版](images/ss_thanks_plan_pc.png) | ![料金プラン完了 SP版](images/ss_thanks_plan_sp.png) |

**¥500キャンペーン完了ページ**
| PC版 | SP版 |
|---|---|
| ![キャンペーン完了 PC版](images/ss_thanks_campaign_pc.png) | ![キャンペーン完了 SP版](images/ss_thanks_campaign_sp.png) |

---

## 制作の背景・コンセプト

メンズ脱毛クリニックのターゲット（20〜40代男性）に合わせ、「信頼感・清潔感・行動喚起」を軸に設計。予約導線を3系統に分けることで、ユーザーの検討フェーズに応じたCTA設計を実現しました。

- **購買心理フェーズに沿ったセクション構成** — 認知 → 共感 → 比較 → 確信 → 行動
- **3系統のCTA導線** — 無料カウンセリング / ¥500キャンペーン / 料金プラン直申込
- **WordPress移行を意識した構造** — セクションブロック化・ヘッダー・フッターの分離想定

---

## 制作フロー

```
仕様書・デザインシステム作成（.md）
  ↓
Figmaでデザイン（Claude Codeを使用）
  ↓
レビュー・修正（複数回）
  ↓
コーディング（Claude Codeを使用）
  ↓
画像最適化（WebP変換）
  ↓
ブラウザ確認・調整
  ↓
GitHub Pages 公開
```

> **仕様書.mdについて：** リポジトリ内の `project-spec.md` / `design-rules.md` / `coding-rules.md` / `pages-spec.md` は制作前に作成したFigmaデザイン・コーディング用の仕様書です。実際のコードはレビューと修正を経て仕様書から改善されている箇所があります。

> **AI活用について：** デザイン生成・コーディングに Claude Code（Anthropic）を活用しています。プロンプト設計・レビュー・修正指示はすべて自身で行っています。

---

## ページ構成

| ページ | ファイル | 内容 |
|---|---|---|
| トップ LP | `index.html` | FV〜フッターまでの全12セクション |
| 無料カウンセリング予約 | `reservation-counseling.html` | 無料カウンセリング申込フォーム |
| 料金プラン予約 | `reservation-plan.html` | プラン直申込（URLパラメータでプリセレクト）|
| ¥500キャンペーン予約 | `reservation-campaign.html` | キャンペーン申込フォーム |
| 予約完了 | `thanks.html` | 無料・料金プランの完了ページ（`?from=plan` で表示切り替え）|
| キャンペーン完了 | `thanks-campaign.html` | ¥500キャンペーン専用完了ページ |
| プライバシーポリシー | `privacy.html` | — |
| 特定商取引法 | `tokusho.html` | — |
| 会社情報 | `company.html` | — |
| お問い合わせ | `contact.html` | — |

計 **10ページ**を一式制作。

---

## こだわりポイント

**デザイン・演出**
- FV背景は画像なし。CSSグラデーション + グリッドドリフト・光の帯・グロー浮遊の4種アニメーションを重ねてリッチに演出
- お悩みセクションに3行の無限スクロールテキスト（マーキー）をCSS単体で実装
- `prefers-reduced-motion` によるアクセシビリティ対応

**コーディング**
- BEM命名規則の徹底
- PCファースト設計（ブレークポイント: 768px）
- `<nav>` に `display: contents` を適用し、ロゴ〜ナビ〜CTAが一列に並ぶ柔軟なヘッダーレイアウトを実現
- URLの `?plan=` パラメータを読み取り、料金プランをプリセレクトした状態でフォームを表示
- SP専用の画面下部追従CTAバーを実装（FV通過後に出現・フッター到達で非表示）

**画像最適化**
- Node.js（sharp）で全20枚のJPEGをWebP（quality 82）に一括変換
- 平均 **-93%** のファイルサイズ削減（最大 2,468KB → 111KB）

---

## 使用技術

| 技術 | 用途 |
|---|---|
| HTML5 | セマンティクス・アクセシビリティ対応 |
| CSS3 | BEM / レスポンシブ / CSSアニメーション |
| Vanilla JavaScript | ハンバーガー / FAQ / スクロール / 追従CTA |
| Google Fonts | Noto Sans JP / Inter |
| Node.js（sharp） | WebP一括変換（平均 -93% 削減） |
| Figma | UIデザイン（PC・SPフレーム） |
| Claude Code | デザイン生成・コーディング支援 |
| GitHub Pages | ホスティング |

---

## ファイル構成

```
mens-datsumo-lp/
  ├── index.html
  ├── reservation-counseling.html
  ├── reservation-plan.html
  ├── reservation-campaign.html
  ├── thanks.html
  ├── thanks-campaign.html
  ├── privacy.html
  ├── tokusho.html
  ├── company.html
  ├── contact.html
  ├── css/
  │   └── styles.css
  ├── js/
  │   └── main.js
  └── images/
```

---

## WordPress対応について

将来的なWordPress化を前提とした構造で実装。

- ヘッダー・フッター → `header.php` / `footer.php` に即座に分離可能
- 各セクションをブロック化 → Gutenbergブロックへの移行を想定
- お問い合わせフォーム → Contact Form 7に置き換え可能な構造

---

*Portfolio Work*
