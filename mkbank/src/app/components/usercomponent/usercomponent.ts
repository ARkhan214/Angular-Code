import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-usercomponent',
  standalone: false,
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css'
})
export class Usercomponent implements OnInit {

  formUser !: FormGroup

  constructor(
    private userService:UserService,
    private formbuilder:FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.formUser=this.formbuilder.group({
       name:[''],
      email:[''],
      password:['']
    })
  }

addUser():void{
const user: User ={...this.formUser.value};
this.userService.saveAllUser(user).subscribe({
next:(res)=>{
  console.log("user save",res);
  this.formUser.reset();
  this.router.navigate(['/viewalluser']);
},
error : (err) =>{
  console.log(err);
}

})

}

}
