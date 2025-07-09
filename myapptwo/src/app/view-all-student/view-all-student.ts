import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { } from '@fortawesome/angular-fontawesome'
import { Student } from '../model/student.model';
import { forkJoin } from 'rxjs';
import { LocationService } from '../service/location.service';
import { Location } from '../model/location.model';

@Component({
  selector: 'app-view-all-student',
  standalone: false,
  templateUrl: './view-all-student.html',
  styleUrl: './view-all-student.css'
})
export class ViewAllStudent implements OnInit {
  students: Student[] = [];
  locations: Location[] = [];


  constructor(
    private studentservice: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private locationService: LocationService


  ) { }

  ngOnInit(): void {
    this.loadData();
  }



  loadData(): void {
    forkJoin({
      location: this.locationService.getAllLocation(),
      students: this.studentservice.getAllStudent()
    }).subscribe({
      next: ({ location, students }) => {
        this.locations = location;
        this.students = students;
        this.cdr.markForCheck();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteStudent(id: string): void {

    this.studentservice.deleteStudent(id).subscribe({

      next: () => {
        console.log('Student deleted');
        this.loadData();
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.log('Error deleting student:', err);
      }

    });

  }

  getStudentById(id: string): void {
    this.studentservice.getStudentById(id).subscribe({

      next: (res) => {
        console.log(res)
        console.log("Data get Successfull");
        this.router.navigate(['/updatestudent', id])
      },

      error: (err) => {
        console.log(err);

      }


    });
  }


}
