import { Accounts } from "./accounts.model";

export class Transaction {


    id !: string;
    accountId !: string;
    accountName ?:string;  //last update for show name in transaction table
    type!: 'Deposit' | 'Withdraw' | 'Fixed Deposit';    
    amount !: number;
    transactiontime !: Date;
    description?: string;

    //account ?:Accounts;

}