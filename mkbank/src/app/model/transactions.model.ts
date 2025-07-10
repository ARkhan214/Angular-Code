export class Transaction {


    id !: string;
    accountId !: string;
    type!: 'DEPOSIT' | 'WITHDRAW' | 'FIXED DEPOSIT';    
    amount !: number;
    transactiontime !: Date;
    description?: string;


}