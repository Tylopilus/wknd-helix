/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 */
export function html(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
}
