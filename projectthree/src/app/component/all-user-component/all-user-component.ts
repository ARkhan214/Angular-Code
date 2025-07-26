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
  this.userService.getUserById(id).subscribe({
    next: (user) => {
      alert(`User: ${user.name}\nEmail: ${user.email}`);
      
    },
    error: (err) => {
      alert('User not found!');
      console.error(err);
    }
  });
}


deleteUser(id: number) {
  if (confirm('Are you sure to delete?')) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.loaadUsers(); 
      },
      error: (err) => {
        alert('Failed to delete user.');
        console.error(err);
      }
    });
  }
}



}
