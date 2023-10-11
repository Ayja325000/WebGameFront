export function setLocalStore(items: {}) {
  let entries = Object.entries(items);
  entries.forEach(([key, value]) => {
    localStorage.setItem(key, value as string);
  });
}
export function getLocalStore(keys: string | string[]) {
  if (typeof keys === 'string') {
    let value = localStorage.getItem(keys);
    return value;
  } else {
    let res: any = {};
    keys.forEach(key => {
      let value = localStorage.getItem(key);
      res[key] = value;
    });
    return res;
  }
}
export function removeLocalStorage(keys: string | string[]) {
  if (typeof keys === 'string') {
    let value = localStorage.removeItem(keys);
  } else {
    keys.forEach(key => {
      let value = localStorage.removeItem(key);
    });
  }
}

export function clearUserInfo() {
  removeLocalStorage([KEYS.UID, KEYS.LOGIN_STATUS, KEYS.NICK_NAME, KEYS.USER_NAME]);
}

export enum KEYS {
  LOGIN_STATUS = 'loginStatus',
  UID = 'userId',
  USER_NAME = 'username',
  NICK_NAME = 'nickname',
  COOKIE = 'cookie'
}
export enum LOGIN_STATUS {
  NOT = 'not-login',
  VISITOR = 'visitor',
  USER = 'common-user',
  ADMIN = 'super-user'
}