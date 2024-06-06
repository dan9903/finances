export interface IRegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface IRegistrationResponse {
  username: string;
  token: string;
  roles: string[];
}
