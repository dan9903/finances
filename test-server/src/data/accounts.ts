interface IAccount {
  id: string,
  name: string,
  typeAccount: 'I' | 'O' | 'B',
}

export const accounts: IAccount[] = [
  {
    id: "sda23-4e31ddsa-jdknsna",
    name: "nubank",
    typeAccount: 'O'
  },
  {
    id: "hdusa-dsahdu-dsahds",
    name: "Banco do Brasil",
    typeAccount: 'B'
  },
  {
    id: "hdusa-dsadsadu-dsahds",
    name: "Santander",
    typeAccount: 'I'
  },
  {
    id: "hdusa-dsa897u-dsahds",
    name: "Sicredi",
    typeAccount: 'O'
  }
];

