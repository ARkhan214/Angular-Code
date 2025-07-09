import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private baseUrl: string = "http://localhost:3000/user";

  constructor(
    private http:HttpClient
  ) { }

  getAllUser(): Observable<any>{
  return this.http.get(this.baseUrl);
}

saveAllUser(alluser:User): Observable<any>{
  return this.http.post(this.baseUrl,alluser);
}

deleteUser(id:string): Observable<any>{
return this.http.delete(this.baseUrl+'/'+id);
}

getUserById(id:string):Observable<any>{
  return this.http.get(this.baseUrl+'/'+id);
}

updateUser(id:string,user:User):Observable<any>{
  return this.http.put(this.baseUrl+'/'+id,user);
}

}
