'use strict';

// Redefine currently emits Twitter's compact summary card unconditionally.
// The site's 1200x630 preview image is designed for the large card layout.
hexo.extend.filter.register('after_render:html', (html) =>
  html.replace(
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:card" content="summary_large_image">',
  ),
);
