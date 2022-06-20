/// <reference types="vite/client" />

interface ImportMetaEnv {
    API_ORIGIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
