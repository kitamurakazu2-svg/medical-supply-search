# 環境調査（2026-10-10）

旧プロジェクト: /workspace/handwriting-memo。21ファイルのSHA-256が調査前後ですべて一致。Git作業ツリーに変更なし。

index.html / app.js / style.css / sw.js / manifest.webmanifest / アイコン / scripts / tests / .github/workflows/pages.yml / README / package.json / package-lock.json。JavaScript静的PWAで、Tesseract.js 6.0.1、Playwright 1.58.2、esbuild 0.25.12を宣言。node_modulesとdistは未配置。

利用可能: Node 24.19.0、npm 11.9.0、pnpm 11.19.0、Git 2.52.0、gh 2.46.0、Python 3.12.14、Docker 28.4.0、Chromium。適用対象AGENTS.mdは見つからず。

旧Gitはworkブランチ、直近eb17df2。origin: https://github.com/kitamurakazu2-svg/handwriting-memo.git。GitHubコネクターでkitamurakazu2-svg接続成功。リポジトリはpublicで管理・push権限あり。環境内ghの認証確認は失敗。Git pushやPages稼働は未確認。

旧Actionsはmainへのpushと手動実行で旧アプリをビルド・テスト・Pages公開する設定。変更なし。ネットワークは許可先制限とプロキシ方式。新規依存のnpm取得成功。Drive接続は未確認。秘密値は表示していない。

新規フォルダ: /workspace/work/medical-supply-search。React+TypeScript+Vite、架空6品目・2部署。検索、かな等の正規化と登録別名、部署絞り込み、棚・定数量表示、Web Speech API音声入力、スマホ向け表示、PWAビルドを実装。TypeScript検証・ビルド・検索テスト成功。画面・音声・インストール・オフラインは実機未検証。

次の手順はREADME参照。Driveの対象と列、公開許可を確認してから取り込みを実装。独立した新リポジトリを推奨。新規フォルダでGitを初期化し、初期ソースをローカルコミット済み。新リポジトリへのGit接続は403、コネクター一覧には旧リポジトリのみ。アクセス権限確認後にpush予定。Pages公開は別途確認後。旧ファイル削除は不要。

## 接続再確認と実装更新

Git経由で新リポジトリへの読み取り成功。既存mainにはREADMEのみ。7品目へ拡張し、未設定品目表示を追加。Vite baseを /medical-supply-search/ に指定。Pagesワークフローとスマホ向け自動テストを追加。実データ・Drive認証情報は含めていない。
