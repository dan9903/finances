interface IAccount {
  id: string,
  name: string,
  nature: 'I' | 'O' | 'B',
}

export const accounts: IAccount[] = [
  {
    id: "sda23-4e31ddsa-jdknsna",
    name: "nubank",
    nature: 'O'
  },
  {
    id: "hdusa-dsahdu-dsahds",
    name: "Banco do Brasil",
    nature: 'B'
  },
  {
    id: "hdusa-dsadsadu-dsahds",
    name: "Santander",
    nature: 'I'
  },
  {
    id: "hdusa-dsa897u-dsahds",
    name: "Sicredi",
    nature: 'O'
  }
];

