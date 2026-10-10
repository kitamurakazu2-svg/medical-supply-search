# 診療材料検索PWA（開発初期版）

既存の `/workspace/handwriting-memo` と独立した作業フォルダ。新しいリポジトリ向けの初期構成。GitHub PagesへGitHub Actionsで公開する構成。

## 開発

Node.js 24 / npm を使用。

```sh
npm ci
npm run dev
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

React + TypeScript + Vite。7品目・2部署の架空データのみ使用。定数量は現在庫数ではない。

検索は品目名・品目コード・規格・別名の部分一致。空白区切りでAND検索。NFKC正規化、かな統一、大小文字・区切り記号の吸収。読みや同義語は登録した別名で対応し、任意の誤字を補正する機能はない。

Web Speech APIの対応ブラウザで日本語音声を検索欄へ入力。非対応時は文字入力を利用。認識はブラウザ側のサービスに送信される場合があり、オフライン対応を保証しない。

ビルド時にサービスワーカーとmanifestを生成。初回オンライン読込後、キャッシュが保持されれば検索可能。Chromiumのスマホ幅・オフライン検索は自動テスト対象。音声認識・ホーム画面追加・更新挙動はiPhone/Android実機で検証予定。

## Driveデータの接続方針（未実装）

- 品目マスタ: `code`, `name`, `specification`, `aliases`
- 部署別定数表: `code`, `department`, `shelf`, `quantity`, `unit`
- コードを文字列として扱い、先頭ゼロを保持。品目コードの一意性、参照先、数量の妥当性を検査。
- 対象Driveファイルと列を確認し、許可されたデータをJSONへ変換して静的配信する。Drive認証は閲覧者に要求しない。
- 公開前に品目名だけでなく、棚番号・部署名・定数量の一般公開許可も確認。非公開Driveの認証情報をクライアントへ埋め込まない。
- 当面は `src/data.ts` の架空データを使用し、実データを取得・同梱しない。

## GitHub Pages（承認後）

ユーザーが作成した `medical-supply-search` を使用する。接続権限確認後に初期ソースをpushする。PagesのSourceはGitHub Actions。baseは `/medical-supply-search/`。

公開手順: `npm ci` → `npm test` → `npm run build` → `dist/` をGitHub Pagesへ配信。認証なし。`main`へのpushで `.github/workflows/pages.yml` がテスト・ビルド後に公開する。

## フォルダ構成

- `src/main.tsx`: スマートフォン向け画面と音声入力
- `src/data.ts`: 架空の品目マスタ・部署別定数表
- `src/search.ts`: 表記揺れ・部分一致検索
- `src/search.test.ts`: 検索動作の検証
- `public/`: PWAアイコン
- `vite.config.ts`: Vite・PWA・相対配信パス設定
- `.github/workflows/check.yml`: PRのテストとビルド
- `.github/workflows/pages.yml`: mainのテスト・ビルド・Pages公開
- `tests/app.spec.ts`: スマホ幅・検索・音声API模擬・オフラインの検証

在庫設定のない架空品目（DEMO-007）は「在庫設定品目ではありません」と表示。部署を選択した場合は、その部署の設定品目だけを表示する。
