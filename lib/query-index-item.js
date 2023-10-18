import { parseCSVArray, parseJsonArray } from './metadata.js';
/**
 * Describes data returned by query index and adds helper methods.
 */

/** @type {import('./query-index-item').default} */
export default function QueryIndexItem(props) {
  return {
    ...props,
    get keywords() {
      return parseCSVArray(props.keywords || '');
    },
    get robots() {
      return parseCSVArray(props.robots || '');
    },
    get tags() {
      return parseJsonArray(props.tags || '');
    },
  };
}
