export default function () {
  if (/^\/list\/\w+$/.test(window.location.pathname)) {
    return window.location.pathname.substring(6);
  }
  return '';
}
