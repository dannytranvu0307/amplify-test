### 概要

VTESフロントエンドシステムは、JavaScrip言語で書かれており、ユーザーが日付別のチケットの情報を検索し、Excelファイルでチケットの情報をエクスポートすることを目的としています。
フレームワーク：Reactフレームワーク

ツール：
-NodeJs:開発環境をホスティングする
    - バージョン：18.16.0LTS

### ライブラリ：
    "dependencies":  プロジェクトの必要なライブラリ
     "@reduxjs/toolkit": "^1.9.5" :ReduxToolkit（リダックス ツールキット-ReduxToolkitは、Reactでのアプリケーション状態の管理をより簡単にするユーティリティを提供するライブラリです。
     "aos": "^2.3.4" :AOS（アニメーション ライブラリ-AOSは、アニメーションの作成とスクロールイベントに応じたアニメーションのトリガリングを簡単にするライブラリです。
     "axios": "^1.4.0" :Axios（HTTP クライアント-Axiosは、HTTPリクエストの作成とレスポンスの取得を簡単にするためのクライアントライブラリです。
     "exceljs": "^4.3.0":ExcelJS（Excel 操作ライブラリ-ExcelJSは、Excelファイルの作成や編集を行うためのライブラリです。
     "i18next": "^22.4.15":i18next（国際化（i18n）ライブラリ-i18nextは、多言語対応アプリケーションの国際化（i18n）機能を提供するライブラリです。
     "i18next-browser-languagedetector": "^7.0.1":i18next-browser-languagedetector（ブラウザ言語検出ライブラリ-i18next-browser-languagedetectorは、
      ブラウザの言語を検出するためのライブラリです。
     "i18next-http-backend": "^2.2.0":i18next-http-backend（HTTP バックエンドライブラリ）- i18next-http-backendは、HTTPを使用したバックエンドとの連携を可能にするライブラリです。
     "react": "^18.2.0":React（リアクト）- Reactは、コンポーネントベースのユーザーインターフェースを構築するためのJavaScriptライブラリです。
     "react-datepicker": "^4.11.0":React Datepicker日付選択コンポーネント- React Datepickerは、日付選択を行うためのコンポーネントライブラリです。
     "react-dom": "^18.2.0":React DOM（React DOM-React DOMは、ReactアプリケーションをWebページにレンダリングするためのライブラリです。
     "react-i18next": "^12.2.2"React i18next（React i18next-React i18nextは、Reactアプリケーションでi18nextを使用した国際化（i18n）機能を提供するライブラリです。
     "react-icons": "^4.8.0"React Icons（アイコンコンポーネント集）- React Iconsは、多数のアイコンを提供するReactコンポーネントライブラリです。
     "react-image-file-resizer": "^0.4.8"React Image File Resizer（画像ファイルリサイズツール）- React Image File Resizerは、画像ファイルのリサイズを行うためのツールです。
     "react-redux": "^8.0.5"React Redux（React Redux）- React Reduxは、ReactアプリケーションでReduxを使用した状態管理を行うためのライブラリです。
     "react-router-dom": "^6.11.0"React Router DOM（React ルーターライブラリ）- React Router DOMは、Reactアプリケーションでのルーティングを簡単にするためのライブラリです。
 
  "devDependencies": 　開発のライブラリー
    "@types/react": "^18.0.28"@types/react（React の型定義）- @types/react は、React の型定義を提供するパッケージです。
    "@types/react-dom": "^18.0.11"@types/react-dom（React DOM の型定義）- @types/react-dom は、React DOM の型定義を提供するパッケージです。
    "@vitejs/plugin-react": "^4.0.0"@vitejs/plugin-react（Vite の React プラグイン）- @vitejs/plugin-react は、Vite プロジェクトで React をサポートするためのプラグインです。
    "autoprefixer": "^10.4.14"Autoprefixer（ベンダープレフィックス自動付与ツール）- Autoprefixer は、ベンダープレフィックスを自動的に追加するツールです。
    "eslint": "^8.38.0"ESLint（コード静的解析ツール）- ESLint は、コードの品質やスタイルの静的解析を行うツールです。
    "eslint-plugin-react": "^7.32.2"ESLint Plugin React（React 向け ESLint プラグイン）- ESLint Plugin React は、React プロジェクト向けの ESLint プラグインです。
    "eslint-plugin-react-hooks": "^4.6.0"ESLint Plugin React Hooks（React Hooks 向け ESLint プラグイン-ESLint Plugin React Hooks は、React Hooks の使用を検証するESLint プラグインです。
    "eslint-plugin-react-refresh": "^0.3.4"ESLint Plugin React Refresh（React Refresh 向け ESLint プラグイン）- ESLint Plugin React Refresh は、React Refresh の使用を検証する ESLint プラグインです。
    "tailwindcss": "^3.3.2"Tailwind CSS（CSS フレームワーク）- Tailwind CSS は、スタイリングを行うための CSS フレームワークです。
    "vite": "^4.3.3"Vite（モダンなビルドツール）- Vite は、モダンなビルドシステムを提供するツールです。
    "vite-plugin-rewrite-all": "^1.0.1"Vite Plugin Rewrite All（Vite のパスリライトプラグイン）- Vite Plugin Rewrite All は、Vite プロジェクトのパスをリライトするためのプラグインす。
  

### インストール手順：

1. NodeJS。
   OSによって、適切なバージョンをインストールしてください
　　https://nodejs.org/en/download
1. GitLab VTIからプロジェクトをクローンします。
    
    `git clone -b Production https://git.vti.com.vn/vu.tranvan/frontend.shinjin.2023.git`
    
2. frontend.shinjin.2023フォルダに移動して、コマンドラインを開き、次を実行します。
- npm install 
- npm run dev 

### 使用手順：

1. リンクにアクセスしてください：http://localhost:5173
2. ユーザーアカウントに登録またはログインしてください。
3. 検索してファイルをエクスポートしてください。

### 使用されるPath：

- ‘http://localhost:5173/login’: システムにログインする
- ‘http://localhost:5173/register’: 新規登録-アカウントを作成する
- ‘http://localhost:5173’: ホームページにアクセスする
- ‘http://localhost:5173/passwordreset’: パスワードの変更リンクを送信することメールを入力して、リンクをメールから取得する
- ‘http://localhost:5173/profile: ユーザー情報を観覧、または変更する
- ‘http://localhost:5173/history’: 抽出したファイル履歴を観覧、または再び取得することを出来る
- ‘http://localhost:5173/confirmresetpassword/:authToken’: 新しいパスワードを設定する。期限があるリンクです
   

### ディレクトリ構造

 /src/pages ：ページコンポーネントのフォルダ
 /src/features: config redux とアプリ全体で使用される関数
 /src/instances:同じプロパティを共有するオブジェクトに関する構成情報
 /src/functional:テキスト、データ処理関数、ファイル出力を保存するディレクトリ...
 /src/components:ページの詳細コンポーネントのテキストを保存する
 /src/static :ロゴワードを保存する
 /public/locale :言語設定ファイルを保存する
 /dist :導入に使用される製品ファイル

### 作成者

- Tran Van Vu (VJP)
- メール：[vu.tranvan@vti.com.vn](mailto:vu.tranvan@vti.com.vn)
- Le Hoang Phuc (VJP)
- メール：[phuc.lehoang1@vti.com.vn](mailto:phuc.lehoang1@vti.com.vn)

### お問い合わせ：

ご質問、提案、またはフィードバックがある場合は、以下のメールアドレスにお問い合わせください：[vu.tranvan@vti.com.vn](mailto:vu.tranvan@vti.com.vn)
