# データ・画像を追加した後のpush手順

VS Codeのターミナル（PowerShell）で実行する。
確認時点（2026-10-07）のブランチは `main`、追跡先は `origin/main`。
各コマンドが成功したことを確認してから、次へ進む。エラーが出たらそこで止める。

## 1. heartpiaへ移動

```powershell
cd "C:\Users\user\Desktop\NOTE\Game\heartpia"
```

## 2. 追加した内容を確認

```powershell
git -c core.quotepath=false status --short
git branch --show-current
git diff -- data.js
```

- ブランチが `main` であることを確認する。違う場合は、そのまま以下を実行しない。
- 画像は [img/](img/) の該当カテゴリに置く（虫なら `img\insect\`）。
- 自動参照される画像は「データ上の名前.png」とファイル名を完全一致させる。
- 料理画像はゲーム画面のスクショから [tools/crop_cooking.ps1](tools/crop_cooking.ps1) で切り出す（料理を検出し、料理中心の正方形・上下左右の余白20pxで `img\cooking\` に保存）。
- 画像だけの追加なら、すでに項目がある場合は [data.js](data.js) の変更は不要。新しい項目や数値も追加・修正した場合は、その変更も含める。
- [index.html](index.html) をブラウザで開き、対象の画像・データが表示されることを確認する。

## 3. 今回のファイルをステージする

画像とデータを対象にする（変更がないファイルは追加されない）。

```powershell
git add -- img data.js
```

このメモも一緒に保存する場合：

```powershell
git add -- PUSH_MEMO.md
```

確認する：

```powershell
git -c core.quotepath=false diff --cached --stat
git diff --cached -- data.js
git -c core.quotepath=false status --short
```

意図したファイルだけがステージされていることを確認する。
`git add .` は使わず、他に必要な変更があればファイル名を指定して追加する。
秘密情報や `.env` は追加しない。

## 4. コミットする

```powershell
git commit -m "生物図鑑の画像・データを追加"
```

画像だけなら、メッセージは `"虫の画像を追加"` など今回の内容に合わせて変更してよい。
`nothing to commit` と出た場合は、追加対象とステージ状況を確認する。

## 5. pushする

外部（GitHub等）へ送信する操作。送信内容を確認してから実行する。

```powershell
git push origin main
```

## 6. 完了を確認する

```powershell
git status
```

`Your branch is up to date with 'origin/main'.` を確認する。
`nothing to commit, working tree clean` なら未コミットの変更もない。
残った変更がある場合は、今回送信しなかったものか確認する。

push成功だけでは公開サイトへの反映完了は保証されない。
自動公開を設定している場合は、その処理の完了後に公開ページを再読み込みし、追加画像を確認する。

## pushが拒否された場合

- 認証エラー：GitHub等へのログイン・アクセス権を確認する。トークンはこのメモへ書かない。
- `rejected` / `non-fast-forward`：リモートに手元にない変更がある。`git status` で未コミットの変更がないことを確認してから、以下を順番に実行する。

```powershell
git pull --rebase origin main
git push origin main
```

未コミットの変更がある場合や、rebaseで競合した場合はそこで止めて相談する。
`--force` で上書きしない。

---

このメモの作成時には、コミット・push・公開反映は実行していない。
