interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
