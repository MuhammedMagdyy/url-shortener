export interface IDecodedToken {
  payload: string;
  iat: number;
  exp: number;
}

export interface IAxiosIpInfo {
  city: string;
  region: string;
  country_name: string;
}
