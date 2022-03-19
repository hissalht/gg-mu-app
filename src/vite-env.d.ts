/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTION_INTEGRATION_TOKEN: string;
  readonly VITE_NOTION_API_VERSION: string;
  readonly VITE_CHARACTER_DB_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
