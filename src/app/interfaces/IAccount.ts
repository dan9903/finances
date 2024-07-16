export interface IAccount {
  id: string;
  name: string;
  nature: string;
}

export interface IAccountRequest {
  id?: string;
  name?: string;
  nature?: string;
}
