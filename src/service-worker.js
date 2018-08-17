/* global workbox */
/* eslint no-underscore-dangle: ["error", { "allow": ["__precacheManifest"] }] */

let precacheManifest = this.__precacheManifest || [];
const revisionRe = /.+\.\w{20}\.js/;

// add the revision property if it is only present in the url
precacheManifest = precacheManifest.map((entry) => {
  let r = entry;

  if ('url' in entry && revisionRe.test(entry.url)) {
    const [revision] = entry.url.match(/\w{20}(?=\.js)/);
    r = {
      revision,
      url: entry.url,
    };
  }

  return r;
});

workbox.precaching.precacheAndRoute(precacheManifest, workbox.strategies.staleWhileRevalidate());
