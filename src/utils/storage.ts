import type { Action, Reducer } from '@reduxjs/toolkit';
import type { PersistConfig, Storage } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import type { PersistPartial } from 'redux-persist/es/persistReducer';

import tauriAPIs from '../tauri-apis';

// getFileNameForKey map redux-persist key identifier to tdex-dashboard filename
function getFileNameForKey(key: string): string {
  return `tdex-dashboard-${key.replace('persist:', '')}`;
}

// tauriStorage will be used to persist reducers in filesystem
export const tauriStorage: Storage = {
  async getItem(key: string) {
    try {
      const json = await tauriAPIs.fs?.readTextFile(getFileNameForKey(key), { dir: tauriAPIs.fs?.Dir.App });
      return JSON.parse(json || '');
    } catch (err) {
      console.error('readTextFile', err);
    }
  },
  async setItem(key: string, value: any) {
    if ('__TAURI__' in window) {
      try {
        await tauriAPIs.fs?.readDir('', { dir: tauriAPIs.fs?.Dir.App });
      } catch (err) {
        await tauriAPIs.fs?.createDir('', { dir: tauriAPIs.fs?.Dir.App, recursive: true });
      }
      await tauriAPIs.fs?.writeFile(
        { path: getFileNameForKey(key), contents: JSON.stringify(value) },
        { dir: tauriAPIs.fs?.Dir.App }
      );
    }
  },
  async removeItem(key: string) {
    await tauriAPIs.fs?.removeFile(getFileNameForKey(key), { dir: tauriAPIs.fs?.Dir.App });
  },
};

function createLocalStorageConfig<S>(
  key: string,
  whitelist?: string[],
  blacklist?: string[],
  version = 0
): PersistConfig<S> {
  return {
    key,
    storage: tauriStorage,
    version,
    whitelist,
    blacklist,
  };
}

// custom persist reducer function
export function persist<S>(opts: {
  reducer: Reducer<S, Action>;
  key: string;
  whitelist?: string[];
  blacklist?: string[];
  version?: number;
}): Reducer<S & PersistPartial, Action> {
  return persistReducer<S, Action>(
    createLocalStorageConfig(opts.key, opts.whitelist, opts.blacklist, opts.version),
    opts.reducer
  );
}
