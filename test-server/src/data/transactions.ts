export interface ITransaction {
  id: string;
  date: Date;
  account: string;
  category: string;
  payee?: string;
  amount: number;
  nature: 'I' | 'O' | 'B';
  notes?: string;
}

export const transactions: ITransaction[] = [
  {
    id: "sda23-4e31ddsa-jdknsna",
    date: new Date("08/09/2024 08:09:21 AM"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "e4b8e772-7805-4f62-a667-a9f98e0bbe5f",
    payee: "Shopee",
    amount: 29.90,
    nature: 'O',
    notes: "ferramentas micro retifica"
  },
  {
    id: "hdusa-dsahdu-dsahds",
    date: new Date("05/10/2023 12:01:23 AM"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "23ue3-398dusa-ki0dsa",
    payee: "Shopee",
    amount: 16.90,
    nature: 'O',
    notes: "ferramentas micro retifica"
  },
  {
    id: "hdusa-dsadsadu-dsahds",
    date: new Date("12/02/2024 11:40:12 PM"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "442cbaca-ee8b-492d-a0e0-4c89c9c6f7e3",
    payee: "Salary",
    amount: 46.90,
    nature: 'I'
  },
  {
    id: "hdusa-dsa897u-dsahds",
    date: new Date("03/27/2024 07:48 PM"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "23ue3-398dusa-ki0dsa",
    payee: "Shopee",
    amount: 6.90,
    nature: 'O',
    notes: "ferramentas micro retifica"
  }
];

