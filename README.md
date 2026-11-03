# 「逃離日常」凝聚營回顧網站

這是一個純 HTML / CSS / JavaScript 的靜態網站，不需要安裝套件，適合直接部署到 GitHub Pages。

## 快速修改

主要文字、參加者照片／姓名／介紹，以及活動照片清單都在 `data.json`。

1. 把照片放入 `img/`。
2. 在 `data.json` 將 `photo`、`cover` 或 `activityPhotos` 裡的圖片路徑改成新檔名。
3. 每位參加者使用 `photo`、`name`、`intro` 三個欄位，可自行增加或刪除整筆資料。

參加者會自動每兩人分成一個滿版段落。人物轉場與視差使用 GSAP 3.15.0／ScrollTrigger，透過 CDN 載入；如果網路無法載入 GSAP，內容仍會正常顯示，只是不會播放捲動動畫。

建議照片：JPG 或 WebP、長邊 1600–2400 px，每張約 0.3–1.5 MB。封面建議橫式 5:4，照片牆建議橫式 3:2 或 4:3。

## 本機預覽

網站會讀取 `data.json`，因此請在此資料夾啟動本機伺服器（不要直接雙擊 `index.html`）：

```powershell
python -m http.server 8000
```

再開啟 <http://localhost:8000>。

## GitHub Pages 部署

專案已包含 `.github/workflows/deploy.yml`。推送到 GitHub 後：

1. 開啟儲存庫的 **Settings → Pages**。
2. 在 **Build and deployment → Source** 選擇 **GitHub Actions**。
3. 推送到 `main` 後，工作流程會自動發布。

GitHub Free 的 Pages 需使用公開儲存庫。GitHub 官方目前說明：Pages 來源儲存庫建議不超過 1 GB、發布網站不超過 1 GB、每月有 100 GB 軟性流量上限。一般 Git 單檔超過 50 MiB 會警告、100 MiB 會阻擋；從瀏覽器上傳時單檔上限為 25 MiB。
