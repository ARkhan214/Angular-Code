import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit{


  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout(){
    this.authService.logout();
    this.authService.removeUserDetails();
    this.router.navigate(['login']);
  }


}
