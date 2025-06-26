import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-addstudent',
  standalone: false,
  templateUrl: './addstudent.html',
  styleUrl: './addstudent.css'
})
export class Addstudent implements OnInit {
formgroup !: FormGroup

constructor(
  private studentservice : StudentService,
  private formbuilder : FormBuilder,
  private router : Router

){}
  ngOnInit(): void {
    this.formgroup=this.formbuilder.group({
      name:[''],
      email:[''],
      fee:['']



    })
  }

  addstudent(): void{

    const student: Student ={...this.formgroup.value};

    this.studentservice.saveAllStudent(student).subscribe({

      next : (res)=>{

        console.log("Student saved",res);

        this.formgroup.reset();
        
        this.router.navigate(['/view']);

      },

      error : (error)=>{
      console.log(error);

      }

    })

  }

}
