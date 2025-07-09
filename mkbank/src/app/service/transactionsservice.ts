import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {
  private baseUrl:string = "http://localhost:3000/transactions";

  constructor(
    private http:HttpClient
  ) { }




}
