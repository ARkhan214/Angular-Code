export class Accounts{


    id ?:string;
    userId ?:string;
    type !:string;
    balance !:number;
    userName?: string;  //last update

    // new fild for close part
     status?: 'Active' | 'Closed';
}