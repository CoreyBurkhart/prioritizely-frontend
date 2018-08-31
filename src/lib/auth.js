import fetchOptions from '../utils/fetch';

/**
 * @param {String} path
 * @return {Promise}
 */
export default function logout(event, path = '/api/auth/logout') {
  if (event) event.preventDefault();
  let googleSignout = new Promise((res, rej) => {
    rej();
  });

  try {
    const auth2 = gapi.auth2.getAuthInstance();
    googleSignout = auth2.signOut();
  } catch (error) {
    return googleSignout
      .catch(() => {
        console.error('Cannot logout. Not currently signed in.');
      });
  }

  const backendSignout = fetch(path, new fetchOptions.Get());

  return Promise.all([
    googleSignout.catch(console.error),
    backendSignout.catch(console.error),
  ]);
}
