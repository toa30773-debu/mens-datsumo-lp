# project-spec.md — プロジェクト仕様書

## プロジェクト概要

| 項目 | 内容 |
|---|---|
| サービス名 | MEN'S SMOOTH（メンズスムース） |
| 業種 | 男性専門医療脱毛クリニック |
| ターゲット | 20〜35歳男性・清潔感・モテ・自己投資に関心がある層 |
| 目的 | 無料カウンセリング予約・¥500体験予約への CV 獲得 |
| 実装フェーズ | HTML/CSS/JS 静的実装（WordPress 化前提） |
| デバイス優先 | SP（375px）／PC（1440px）のレスポンシブ対応 |

---

## ページ構成

| ファイル | 種別 | 役割 |
|---|---|---|
| `index.html` | LP | 認知〜興味〜CV 全フェーズを担う |
| `reservation-counseling.html` | 予約フォーム | 無料カウンセリング申込 |
| `reservation-plan.html` | 予約フォーム | 料金プラン選択 + 申込（?plan= パラメータ対応） |
| `reservation-campaign.html` | 予約フォーム | ¥500 キャンペーン申込 |
| `thanks.html` | 完了画面 | 予約完了 + LINE 誘導 |
| `thanks-campaign.html` | 完了画面 | ¥500 キャンペーン完了 + LINE 誘導 |
| `privacy.html` | 文書 | プライバシーポリシー |
| `tokusho.html` | 文書 | 特定商取引法に基づく表記 |
| `company.html` | 文書 | 会社概要・店舗一覧 |
| `contact.html` | 問い合わせ | 一般問い合わせフォーム |

---

## CTA 導線マップ

```
[index.html]
  ├── Header CTA（PC: 無料カウンセリング予約 / SP: 無料予約）
  │     └── reservation-counseling.html → thanks.html
  │
  ├── FV CTA（無料カウンセリングを予約する）
  │     └── reservation-counseling.html → thanks.html
  │
  ├── Campaign（¥500キャンペーンを予約する）
  │     └── reservation-campaign.html → thanks-campaign.html
  │
  ├── Price カード（このプランで決定する）
  │     └── reservation-plan.html?plan={hige/zenshin/bubun} → thanks.html
  │
  ├── Bottom CTA（無料カウンセリングを予約する）
  │     └── reservation-counseling.html → thanks.html
  │
  └── Floating CTA（SP のみ・FV 通過後に出現）
        └── reservation-counseling.html → thanks.html
```

**CV の優先順位**
1. 無料カウンセリング予約（ハードル最低・メイン CV）
2. ¥500 キャンペーン（限定感・価格訴求）
3. 料金プラン直申込（購買意欲が高いユーザー向け）

---

## LP セクション構成と目的

| # | セクション | 目的 | 心理フェーズ |
|---|---|---|---|
| 1 | Header | ブランド認知・即時 CV 導線 | — |
| 2 | FV | キャッチコピーで共感・第一印象の形成 | 認知 |
| 3 | Campaign | 限定価格で行動を後押し | 興味 |
| 4 | Nayami | 「自分ごと化」させる悩み共感 | 共感 |
| 5 | Benefit | 脱毛で得られる価値の可視化 | 欲求 |
| 6 | Feature | 他院との差別化・信頼構築 | 比較 |
| 7 | Price | 料金の明示・不安払拭 | 検討 |
| 8 | Flow | 施術フローの可視化でハードル低下 | 安心 |
| 9 | Testimonials | 社会的証明・リアリティ付与 | 確信 |
| 10 | FAQ | 直前の疑問を解消 | 納得 |
| 11 | Stores | アクセスのしやすさ確認 | 行動準備 |
| 12 | Bottom CTA | 最終 CV 獲得 | 行動 |

---

## 技術スタック

| 項目 | 採用技術 |
|---|---|
| マークアップ | HTML5 セマンティクス |
| スタイル | CSS3（BEM、PC 基準 + SP メディアクエリ上書き） |
| スクリプト | Vanilla JS（ES5 互換 IIFE 構成） |
| フォント | Google Fonts（Noto Sans JP / Inter） |
| 画像フォーマット | WebP（quality 82、.jpg バックアップ保持） |
| ビルドツール | なし（静的ファイル直配信） |
| WordPress 移行 | 予定あり（テーマ化前提の構造） |

---

## ブラウザ対応

- Chrome / Firefox / Safari / Edge 最新版
- IE11 非対応（CSS Grid / カスタムプロパティ使用）
