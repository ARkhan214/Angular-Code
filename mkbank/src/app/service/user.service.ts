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

//user[] last update

  getAllUser(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl);
}

saveAllUser(alluser:User): Observable<any>{
  return this.http.post(this.baseUrl,alluser);
}

deleteUser(id:string): Observable<any>{
return this.http.delete(this.baseUrl+'/'+id);
}

//last update user[]

getUserById(id:string):Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl+'/'+id);
}

updateUser(id:string,user:User):Observable<any>{
  return this.http.put(this.baseUrl+'/'+id,user);
}

}
