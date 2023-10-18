import { html } from '../../lib/html.js';
import { getQueryIndex } from '../../lib/query-index.js';
import {
  createOptimizedPicture,
  readBlockConfig,
} from '../../scripts/lib-franklin.js';

/** @type {import('./recent-articles').decorate} */
export default async function decorate(block) {
  const index = await getQueryIndex();

  const magazines = index.items.filter((item) =>
    item.path?.startsWith('/magazine/'),
  );
  magazines.sort((a, b) => (a.lastModified > b.lastModified ? -1 : 1));

  const config = readBlockConfig(block);
  const amount = Number(config.amount) || magazines.length || 3;
  const $item = document.createElement('div');
  for (let i = 0; i < amount; i += 1) {
    const magazine = magazines[i];
    if (!magazine) break;

    $item.insertAdjacentHTML(
      'beforeend',
      html`
        <div class="article">
          <div class="image-wrapper">
            <a href="${magazine.path}">
              ${!magazine.image
                ? null
                : createOptimizedPicture(magazine.image, magazine.title)
                    .innerHTML}
            </a>
          </div>
          <div class="content-wrapper">
            <a href="${magazine.path}">
              <h3>${magazine.title}</h3>
            </a>
            <p>${magazine.description}</p>
            <a href="${magazine.path}" class="button">Read more</a>
          </div>
        </div>
      `,
    );
  }
  block.innerHTML = $item.innerHTML;
}
