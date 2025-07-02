import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../model/student.model';
import { LocationService } from '../service/location.service';
import { Location } from '../model/location.model';

@Component({
  selector: 'app-addstudent',
  standalone: false,
  templateUrl: './addstudent.html',
  styleUrl: './addstudent.css'
})
export class Addstudent implements OnInit {

locations:Location[]=[];

formgroup !: FormGroup

constructor(
  private studentservice : StudentService,
  private formbuilder : FormBuilder,
  private router : Router,
  private locationService:LocationService

){}
  ngOnInit(): void {
    this.formgroup=this.formbuilder.group({
      name:[''],
      email:[''],
      fee:[''],
       location: this.formbuilder.group({
      id: [''],
      name: [''],    
      photo: ['']

    })

    })

this.loadLocation();


  this.formgroup.get('location')?.get('name')?.valueChanges.subscribe(name => {
      const selectedLocation = this.locations.find(loc => loc.name === name);
      if (selectedLocation) {
        this.formgroup.patchValue({ location: selectedLocation });
      }
    });



  }

   loadLocation(): void{
   this.locationService.getAllLocation().subscribe({
    next:(loc) =>{
      this.locations=loc;
    },
    error:(err)=>{
      console.log(err);
    }


   });

  }

  addstudent(): void{

    const student: Student ={...this.formgroup.value};

    this.studentservice.saveAllStudent(student).subscribe({

      next : (res)=>{
        

        console.log("Student saved",res);
        this.loadLocation();

        this.formgroup.reset();
        
        this.router.navigate(['/view']);

      },

      error : (error)=>{
      console.log(error);

      }

    })

  }

}
