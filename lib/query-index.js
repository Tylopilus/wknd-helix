import { getFetchCacheOptions } from './fetch.js';
import QueryIndexItem from './query-index-item.js';
/** @type Promise<QueryIndex> */
let queryIndexInstancePromise;
const defaultMetaImage =
  '/default-meta-image.png?width=1200&format=pjpg&optimize=medium';

export default class QueryIndex {
  /** @type {import('./query-index-item.d.ts').QueryIndexItemReturnType[]} */
  items;

  /**
   * @param {import('./query-index-item.d.ts').QueryIndexItemReturnType[]} items data array from query-index.json
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * Get query index item by path.
   * @param {string} path Item path
   * @returns {import('./query-index-item.d.ts').QueryIndexItemReturnType | undefined} Item or undefined
   */
  getItem(path) {
    return this.items.find((item) => item.path === path);
  }
}
export async function getQueryIndex() {
  if (!queryIndexInstancePromise) {
    // eslint-disable-next-line no-async-promise-executor
    queryIndexInstancePromise = new Promise(async (resolve, reject) => {
      try {
        /** @type {import('./query-index-item.d.ts').QueryIndexItemProps[]} */
        let data = [];
        const resp = await fetch(`/query-index.json`, getFetchCacheOptions());
        if (resp.ok) {
          const json = await resp.json();
          data = json.data;
        }
        const items = data.map((item) => {
          const queryIndexItem = QueryIndexItem(item);
          // remove default-meta-image.png references
          if (queryIndexItem.image === defaultMetaImage) {
            queryIndexItem.image = undefined;
          }
          return queryIndexItem;
        });
        resolve(new QueryIndex(items));
      } catch (err) {
        reject(err);
      }
    });
  }
  return queryIndexInstancePromise;
}
