import fetchGet from 'web-utils/fetch/fetch-get';
export function apiRepos(username) {
  return fetchGet(
    `/users/${username}/repos?type=all&sort=updated`,
    null,
    null,
    'https://api.github.com',
  );
}
