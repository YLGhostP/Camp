# 「逃離日常」凝聚營回顧網站

這是一個純 HTML / CSS / JavaScript 的靜態網站，不需要安裝套件，適合直接部署到 GitHub Pages。

## 快速修改

主要文字、兩天行程、跑馬燈、金句、照片清單和成員姓名都在 `content.js`。

1. 把照片放入 `img/`。
2. 在 `content.js` 將 `cover` 或 `gallery` 裡的圖片路徑改成新檔名。
3. 同一檔案內可直接修改營會名稱、日期、地點、行程、回顧文案和成員姓名。

建議照片：JPG 或 WebP、長邊 1600–2400 px，每張約 0.3–1.5 MB。封面建議橫式 5:4，照片牆建議橫式 3:2 或 4:3。

## 本機預覽

可直接開啟 `index.html`，或在此資料夾執行：

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
