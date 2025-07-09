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

// user:User[] = [];
user:any;

constructor(
  private userservice:UserService,
  private routr: Router,
  private cdr:ChangeDetectorRef
){}


  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void{
    this.user=this.userservice.getAllUser();

  }

}
