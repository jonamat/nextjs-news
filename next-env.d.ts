/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEWSAPI_TOKEN: string;
    }
  }
}
