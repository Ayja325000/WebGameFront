export type userId = string;
export type status = number;

export interface userInfo {
  username: string,
  nickname: string,
  uid: userId
}

export interface resposne {
  status?: status,
  message?: string,
  details?: string,
  data: any
}

export interface loginReq {
  username: string,
  password: string
}
export interface loginRes extends resposne {
  data: userInfo;
}

export interface visitorLoginReq {
  nickname: string
}
export interface visitorLoginRes extends resposne {
  data: {
    nickname: string;
    visitorId: userId
  };
}