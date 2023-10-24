import type { GameDetails } from "@/utils/game";
import type { LoginReq, LoginRes, userId, VisitorLoginReq, VisitorLoginRes } from "./typedef";

// GET method implementation:
async function get(url = "", params = {}): Promise<any> {
  let urlParams = Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join('&');
  const response = await fetch(`${url}?${urlParams}`);
  return response.json(); // parses JSON response into native JavaScript objects
}

// POST method implementation:
async function post(url = "", data = {}): Promise<any> {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// const address = 'http://127.0.0.1/api/';
const address = 'http://124.220.108.199/api/';
const url = (path: string) => {
  return address + path;
}
enum APIS {
  LOGIN = 'login',
  LOGIN_VISITOR = 'visitor-login',

  USER_LIST = 'user',

  ROOM_CREATE = 'create-room',
  ROOM_SEARCH = 'search-room',
  ROOM_JOIN = 'join-room',
  ROOM_EXIT = 'exit-room',
}

export const getUsers: () => Promise<userId[]> = () => get(url(APIS.USER_LIST));
export const login: (data: LoginReq) => Promise<LoginRes> = (data) => post(url(APIS.LOGIN), data);
export const visitorLogin: (data: VisitorLoginReq) => Promise<VisitorLoginRes> = (data) => post(url(APIS.LOGIN_VISITOR), data);

export const createRoom: (data: { userId: string, gameId: string }) => Promise<any> = (data) => post(url(APIS.ROOM_CREATE), data);
export const searchRoom: (data: { roomId: string }) => Promise<any> = (data) => post(url(APIS.ROOM_SEARCH), data);
export const joinRoom: (data: { userId: string, roomId: string }) => Promise<any> = (data) => post(url(APIS.ROOM_JOIN), data);
export const exitRoom: (data: { userId: string, roomId: string }) => Promise<any> = (data) => post(url(APIS.ROOM_EXIT), data);