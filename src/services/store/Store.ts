import { Company } from '@services/types';
import { exists, BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { appDataDir } from '@tauri-apps/api/path';

type getProps = {
  [key: string]: Company[];
};

export class Store {
  /**
   * @param {string} storeName name of storefile
   * @param {string} key to search in that file
   * @return {any} results from the file
   **/
  async get(storeName: string, key: string): Promise<any> {
    const fileName = `${storeName}.json`;
    var data: getProps = {};
    const fileExists = await exists(fileName, { dir: BaseDirectory.AppData });
    if (fileExists) {
      let localData = await readTextFile(fileName, { dir: BaseDirectory.AppData });
      data = JSON.parse(localData) as getProps;
    }
    return data[key];
  }

  /**
   * @param {string} storeName name of storefile
   * @param {string} key to search in that file
   * @param {any} value to store in store with that key
   * @return {void}
   **/
  async set(storeName: string, key: string, value: any): Promise<void> {
    const data: getProps = {};
    data[key] = value;
    console.log('log from store', data);
    await writeTextFile(`${storeName}.json`, JSON.stringify(data), { dir: BaseDirectory.AppData });
  }

  async getPDF(companyName: string): Promise<any[]> {
    const fileName = `${companyName}.json`;
    const appDataFolder = await appDataDir();
    const isFileExists = await exists(`${appDataFolder}companies/${fileName}`);
    let data = { papers: [] };
    try {
      if (isFileExists) {
        let localData = await readTextFile(`${appDataFolder}companies/${fileName}`);
        data = JSON.parse(localData);
      }
    } catch (e) {
      console.error(e);
    }

    return data.papers;
  }
}
