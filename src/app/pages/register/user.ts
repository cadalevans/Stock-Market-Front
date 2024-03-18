export class User {
    constructor(
      public user_name: string,
      public user_sur_name: string,
      public email: string,
      public password: string,
      public totalBenefit: number,
      public totalCurrentValue: number,
      public totalInvestmentAmount: number

    ) {}
  }