
# 博物館智能客服小博 🏛️

這是一個使用 Gemini API 打造的風趣幽默的博物館客服聊天機器人。它旨在以輕鬆、友善且禮貌的語氣回答訪客的問題，讓訪客感到愉快和受歡迎。

## ✨ 功能特色

- **智能對話**: 由 Google Gemini API 驅動，能夠理解並回應使用者查詢。
- **幽默風格**: 以風趣幽默的語氣與使用者互動。
- **即時回應**: 快速處理並回覆使用者訊息。
- **響應式設計**: 在不同裝置上均有良好顯示效果。
- **錯誤處理**: 優雅地處理 API 錯誤或初始化問題。
- **美觀介面**: 使用 Tailwind CSS 打造現代化且簡潔的使用者介面。

## 🛠️ 技術棧

- **前端**: React 18, TypeScript
- **API**: Google Gemini API (`@google/genai`)
- **樣式**: Tailwind CSS
- **模組綑綁/開發伺服器**: (通常由 `vite` 或 `create-react-app` 等工具處理，此專案直接使用 esm.sh 進行瀏覽器內模組解析，本地開發時建議使用簡單的 HTTP 伺服器)

## 🚀 開始使用

### 先決條件

- [Node.js](https://nodejs.org/) (建議 LTS 版本)
- `npm` (隨 Node.js 安裝) 或 `yarn`
- 一個有效的 Google Gemini API 金鑰。

### 環境變數

在專案的根目錄下建立一個 `.env` 檔案。**這是至關重要的步驟，因為 API 金鑰必須透過環境變數提供。**

```env
# .env
API_KEY=YOUR_GEMINI_API_KEY
```

將 `YOUR_GEMINI_API_KEY` 替換為您從 Google AI Studio 取得的真實 API 金鑰。

**重要**: 此應用程式的程式碼設計為直接從 `process.env.API_KEY` 讀取金鑰。請勿在程式碼中硬編碼金鑰或建立 UI 元素來輸入金鑰。

### 本機安裝與執行

1.  **複製儲存庫** (如果您是從 GitHub 下載 ZIP，請解壓縮):
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **安裝依賴**:
    由於此專案的 `index.html` 使用 `esm.sh` CDN 直接匯入 React 和 `@google/genai`，因此嚴格來說，本機執行時不需要 `npm install` 來安裝這些大型函式庫到 `node_modules`。
    但是，為了更好的開發體驗（例如，若未來想加入 linting, TypeScript 編譯檢查等），可以初始化一個 `package.json`:
    ```bash
    npm init -y
    ```
    如果您想在本機進行 TypeScript 類型檢查或打包，可以安裝相關開發依賴：
    ```bash
    npm install typescript --save-dev
    # 或
    yarn add typescript --dev
    ```

3.  **執行應用程式**:
    由於沒有使用像 Vite 或 Create React App 這樣的開發伺服器，您需要一個簡單的 HTTP 伺服器來提供 `index.html` 和相關的 `.tsx` 檔案。 `process.env.API_KEY` 需要在執行環境中可用。

    **選項 A: 使用 `serve` 套件 (推薦)**
    a.  安裝 `serve` (如果尚未安裝):
        ```bash
        npm install -g serve
        ```
    b.  為了讓 `process.env.API_KEY` 在瀏覽器環境中透過某種方式被模擬（因為瀏覽器本身無法直接存取 Node.js 的 `process.env`），我們需要稍微調整。一個簡單的方法是在啟動伺服器前，將 `.env` 檔案中的 `API_KEY` 注入到 `index.html` 中的一個全域變數。

        **注意**: 這是一種簡化的本地開發方法。對於生產部署 (如 Vercel)，平台會處理環境變數的注入。

        **簡化本地開發的調整 (僅供本地測試):**
        可以手動修改 `index.html`，在 `<script type="module" src="/index.tsx"></script>` 之前加入：
        ```html
        <script>
          // 僅供本地開發：手動從 .env 檔案讀取或直接在此處設定
          // 在真實部署中，API_KEY 應該由部署平台安全地注入
          window.process = { env: { API_KEY: 'YOUR_GEMINI_API_KEY_FOR_LOCAL_DEV' } };
        </script>
        ```
        **警告**: 請勿將帶有真實 API 金鑰的此版本提交到版本控制。`.env` 檔案應保持為獲取金鑰的唯一來源。

    c.  在專案根目錄執行：
        ```bash
        serve -s .
        ```
        它會在本地啟動一個伺服器 (通常是 `http://localhost:3000` 或類似位址)。

    **選項 B: 使用 VS Code Live Server 擴充功能**
    如果您使用 VS Code，可以安裝 "Live Server" 擴充功能。安裝後，右鍵點擊 `index.html` 並選擇 "Open with Live Server"。同樣，您需要處理 `API_KEY` 的問題，如選項 A 中所述，透過在 `index.html` 中手動設定 `window.process.env.API_KEY` 供本地開發使用。

4.  在瀏覽器中開啟應用程式 (通常是 `http://localhost:3000` 或 Live Server 提供的位址)。

### 專案結構

```
.
├── README.md               # 本文件
├── index.html              # HTML 入口檔案
├── index.tsx               # React 應用程式主要進入點
├── App.tsx                 # 主要的 React 應用程式組件
├── components/             # UI 組件資料夾
│   ├── ChatInput.tsx       # 聊天輸入框組件
│   ├── ChatMessageBubble.tsx # 聊天訊息泡泡組件
│   └── ChatWindow.tsx      # 聊天視窗組件
├── services/               # 服務相關邏輯
│   └── geminiService.ts    # 與 Gemini API 互動的服務
├── constants.ts            # 應用程式常數 (如提示語、模型名稱)
├── types.ts                # TypeScript 類型定義
├── metadata.json           # 專案元數據
└── .env                    # 環境變數檔案 (需手動建立，不受版本控制)
```

## 部署到 Vercel

Vercel 是一個優秀的靜態網站和 Serverless Functions 部署平台，非常適合此類前端應用。

1.  **確保您的專案已推送到 GitHub (或其他 Vercel 支援的 Git 提供者)**。

2.  **註冊/登入 Vercel**:
    前往 [Vercel](https://vercel.com/) 並使用您的 GitHub (或其他 Git 提供者) 帳戶登入。

3.  **匯入專案**:
    - 在 Vercel 儀表板上，點擊 "Add New..." -> "Project"。
    - 選擇 "Continue with Git"。
    - 從列表中選擇您的 GitHub 儲存庫，或提供儲存庫的 URL。

4.  **設定專案**:
    - **Framework Preset**: Vercel 通常能自動偵測到是 React 專案。如果沒有，您可以選擇 "Create React App" 或 "Other" (因為我們沒有標準的 CRA 結構，"Other" 可能更合適)。
    - **Build and Output Settings**:
        - **Build Command**: 由於我們沒有傳統的建置步驟 (例如 `npm run build`)，您可以將此欄位留空，或如果 Vercel 強制要求，可以輸入一個無操作的命令，例如 `echo "No build required"`。
        - **Output Directory**: 設定為 `.` (根目錄)，因為 `index.html` 位於根目錄。
        - **Install Command**: 可以設定為 `npm install` 或 `yarn install`，或者如果不需要安裝依賴 (因為是 CDN)，可以嘗試 `echo "No install required"`。
    - **Environment Variables**:
        - 這是**最重要的步驟**。點擊 "Environment Variables" 區塊。
        - 新增一個名為 `API_KEY` 的環境變數。
        - 將其值設定為您的 Google Gemini API 金鑰。
        - **重要**: Vercel 會安全地儲存此金鑰，並在執行時將其注入到您的應用程式環境中，`process.env.API_KEY` 將會被正確填充。

5.  **部署**:
    點擊 "Deploy" 按鈕。Vercel 將會拉取您的程式碼，設定環境，並部署您的應用程式。

6.  **完成**:
    部署完成後，Vercel 會提供一個 URL (例如 `your-project-name.vercel.app`)，您可以透過此 URL 存取您的線上聊天機器人。

### Vercel 的 `process.env` 處理

當您在 Vercel 專案設定中設定環境變數 (如 `API_KEY`) 時，Vercel 會在建置和執行階段將這些變數注入到您的應用程式環境中。對於前端專案，Vercel 通常會使這些變數在客戶端 JavaScript 中以 `process.env.YOUR_VARIABLE_NAME` 的形式可用，但前提是變數名稱以 `NEXT_PUBLIC_` (對於 Next.js 專案) 或 `VITE_` (對於 Vite 專案) 為前綴。

由於我們這個專案的結構較為簡單，並且直接在 `index.tsx` 中使用 `process.env.API_KEY`，Vercel 對於 "Other" 或簡單 HTML/JS 專案的環境變數注入可能需要確認。
如果直接使用 `process.env.API_KEY` 在 Vercel 上部署後無法在客戶端取得，您可能需要調整 `App.tsx` 中獲取 API 金鑰的方式，或者在 Vercel 設定中將環境變數名稱改為 Vercel 期望的公開變數前綴 (如果適用於"Other"類型的專案)。

一個更可靠的方法是，確保 Vercel 在提供靜態檔案時，能以某種方式將環境變數注入到客戶端。如果 Vercel 的標準環境變數注入對於此類簡單專案不起作用，您可能需要在部署前使用腳本將 `API_KEY` 寫入到一個 JS 檔案中，或者使用 Vercel 的 Serverless Functions 來代理 API 請求 (這會更安全，但增加了複雜性)。

**對於目前結構，最簡單的方式是依賴 Vercel 將設定的 `API_KEY` 環境變數使其在 `process.env.API_KEY` 中可用。這通常適用於許多前端框架的部署。**

## 📝 未來可能的改進

- 新增更複雜的狀態管理 (例如 Redux Toolkit, Zustand)。
- 實現聊天歷史記錄儲存 (例如使用 `localStorage`)。
- 引入 UI 動畫和過渡效果。
- 加入主題切換 (淺色/深色模式)。
- 針對本地開發，整合 Vite 或 Parcel 以獲得更好的開發體驗和 HMR。

## 🤝 貢獻

歡迎提交 Pull Request 或開啟 Issue 來改進此專案！

---

希望這個 README 檔案對您有所幫助！
