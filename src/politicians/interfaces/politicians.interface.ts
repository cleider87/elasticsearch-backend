export interface Politician {
  id?: string;
  fullName: string;
  party: string;
  partyFilter: string;
  gender: string;
  occupation: string;
  occupationFilter: string;
  community: string;
  institution: string;
  baseSalary: number;
  monthlyPayment: number;
  yearlyPayment: number;
  complementSalary: number;
  extraPay: number;
  otherAllowancesAndIndemnities: number;
  threeYearsSalary: number;
  observations: string;
}
