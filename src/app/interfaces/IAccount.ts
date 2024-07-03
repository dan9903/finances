export interface IAccount {
  id: string;
  name: string;
  typeAccount: string;
}

export interface IAccountRequest {
  id?: string;
  name?: string;
  typeAccount?: string;
}
