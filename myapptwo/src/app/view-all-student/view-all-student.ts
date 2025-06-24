import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-view-all-student',
  standalone: false,
  templateUrl: './view-all-student.html',
  styleUrl: './view-all-student.css'
})
export class ViewAllStudent implements OnInit{
  student: any;
  constructor (private studentservice:StudentService){}

  ngOnInit(): void {
   this.loadAllStudent();
  }
loadAllStudent(){
this.student = this.studentservice.getAllStudent();

}

}
