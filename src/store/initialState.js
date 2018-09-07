import Cookies from 'js-cookie';

export default {
  authenticated: Cookies.get('authenticated') === 'true',
};
