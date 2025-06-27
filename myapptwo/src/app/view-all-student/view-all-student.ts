import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { error } from 'console';
import {} from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-view-all-student',
  standalone: false,
  templateUrl: './view-all-student.html',
  styleUrl: './view-all-student.css'
})
export class ViewAllStudent implements OnInit{
  student: any;
  constructor (
    private studentservice:StudentService,
    private router:Router,
    private cdr:ChangeDetectorRef
    

  ){}

  ngOnInit(): void {
   this.loadAllStudent();
  }
loadAllStudent(){
this.student = this.studentservice.getAllStudent();

}

deleteStudent(id:string):void{

 this.studentservice.deleteStudent(id).subscribe({

next: ()=>{
this.loadAllStudent();
this.cdr.reattach();

},
error:(error)=>{

}

 })

}

getStudentById(id:string):void{
this.studentservice.getStudentById(id).subscribe({

  next:(res)=>{
    console.log(res)
    console.log("Data Save");
    this.router.navigate(['/updatestudent',id])

  },

  error:(err)=>{
    console.log(err);

  }


});


}


}
