import { getMetadata } from '../../scripts/lib-franklin.js';

/**
 *
 * @param {HTMLElement} block The main element
 */
export default function decorate(block) {
  const title = getMetadata('og:title');
  const ul = block.querySelector('ul');
  const $ul = document.createElement('ul');

  const trail = [];
  if (ul && ul.children) {
    [...ul.children].forEach((el) => {
      trail.push({
        text: el.textContent,
        link: el.querySelector('a')?.href,
      });
    });
  }
  trail.push({
    text: title,
  });
  while (trail.length) {
    const step = trail.shift();
    const $li = document.createElement('li');
    $ul.append($li);
    let $wrap = $li;
    if (step.link) {
      $wrap = document.createElement('a');
      $wrap.href = step.link;
      $li.append($wrap);
    }
    const $span = document.createElement('span');
    $wrap.append($span);
    $span.textContent = step.text;
  }
  block.innerHTML = '';
  block.appendChild($ul);
}
