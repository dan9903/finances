export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  username: string;
  token: string;
  roles: string[];
}
