export type userId = string;
export type status = number;

export interface UserInfo {
  username: string,
  nickname: string,
  uid: userId
}

export interface Resposne {
  status?: status,
  message?: string,
  details?: string,
  data: any
}

export interface LoginReq {
  username: string,
  password: string
}
export interface LoginRes extends Resposne {
  data: UserInfo;
}

export interface VisitorLoginReq {
  nickname: string
}
export interface VisitorLoginRes extends Resposne {
  data: {
    nickname: string;
    visitorId: userId
  };
}