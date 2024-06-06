export interface IUser {
  username: string;
  token: string;
  roles: string[];
}

export interface IUserDetail extends IUser {
  name: string;
  email: string;
  accounts: string[];
}
