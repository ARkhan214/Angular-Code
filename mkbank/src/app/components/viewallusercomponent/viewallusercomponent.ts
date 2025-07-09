import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallusercomponent',
  standalone: false,
  templateUrl: './viewallusercomponent.html',
  styleUrl: './viewallusercomponent.css'
})
export class Viewallusercomponent implements OnInit {

  // user:User = new User();
  user: any;

  constructor(
    private userservice: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.user = this.userservice.getAllUser();
    this.cdr.markForCheck();
  }

  deleteUser(id: string): void {
    this.userservice.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted');
        this.loadData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log('Error deleting User: ', err);
      }

    })

  }

  getUserById(id: string): void {
    this.userservice.getUserById(id).subscribe({

      next: (res) => {
        console.log(res)
        console.log("Data get Successfull");
        this.router.navigate(['/updateuser', id])
      },

      error: (err) => {
        console.log(err);

      }


    });
  }


}
