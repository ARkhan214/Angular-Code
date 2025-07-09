import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Accountsservice {
  private baseUrl: string = "http://localhost:3000/accounts";

  constructor(
    private http:HttpClient
  ) { }

  
}
