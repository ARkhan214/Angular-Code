import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

}
