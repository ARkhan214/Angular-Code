import { ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '../../model/location.model';
import { LocationService } from '../../service/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-location',
  standalone: false,
  templateUrl: './update-location.html',
  styleUrl: './update-location.css'
})
export class UpdateLocation {

  id: string = '';
  l:Location = new Location();
   
  constructor(
private locationService:LocationService,
private router:Router,
private route:ActivatedRoute,
private cdr:ChangeDetectorRef

  ){}

   ngOnInit(): void {
    this.loadLocationById();
   
  }
loadLocationById() {
    this.id = this.route.snapshot.params['id'];  
    this.locationService.getLocationById(this.id).subscribe({

      next: (res) => {
        this.l = res;
        this.cdr.markForCheck(); // Uncomment if using OnPush
      },
      error: (err) => {
        console.error('Error fetching student:', err);
      }
    });
  }


updateLocation(): void {
    this.locationService.updateLocation(this.id, this.l)
      .subscribe({
        next: () => this.router.navigate(['/allloc']),
        error: err => console.error('Update failed', err)
      });
  }


}
