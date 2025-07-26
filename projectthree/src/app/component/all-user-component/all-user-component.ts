import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-all-user-component',
  standalone: false,
  templateUrl: './all-user-component.html',
  styleUrl: './all-user-component.css'
})
export class AllUserComponent implements OnInit {

    users : User []= [];

    constructor(
      private userService:UserService
    ){}



  ngOnInit(): void {
    this.loaadUsers();

  }

  loaadUsers(){
    this.userService.getAllUser().subscribe({
      next:(res)=>{this.users=res;},
      error:(err)=>{console.log(err);}
    });
  }


viewUser(id: number) {
  alert(`Viewing user with ID: ${id}`);
}

deleteUser(id: number) {
  if (confirm('Are you sure to delete?')) {
    console.log('Deleting user:', id);
    // Call API here if needed
  }
}


}
