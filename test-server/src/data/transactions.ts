interface ITransaction {
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
    date: new Date("2024-08-09"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "23ue3-398dusa-ki0dsa",
    payee: "Shopee",
    amount: 20.90,
    nature: 'O',
    notes: "ferramentas micro retifica"
  },
  {
    id: "hdusa-dsahdu-dsahds",
    date: new Date("2024-08-09"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "23ue3-398dusa-ki0dsa",
    payee: "Shopee",
    amount: 20.90,
    nature: 'O',
    notes: "ferramentas micro retifica"
  },
  {
    id: "hdusa-dsadsadu-dsahds",
    date: new Date("2024-08-09"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "23ue3-398dusa-ki0dsa",
    payee: "Shopee",
    amount: 20.90,
    nature: 'I',
    notes: "ferramentas micro retifica"
  },
  {
    id: "hdusa-dsa897u-dsahds",
    date: new Date("2024-08-09"),
    account: "sda23-4e31ddsa-jdknsna",
    category: "23ue3-398dusa-ki0dsa",
    payee: "Shopee",
    amount: 20.90,
    nature: 'O',
    notes: "ferramentas micro retifica"
  }
];

