import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {

  measurements;
  nodes = {
    '6147621debe805bf7a73a98b': {
      name: 'Primary CPU',
      zone: 'Conference Room'
    }
  };
  parameters = {
    '6147624cebe805bf7a73a98c': 'Battery',
    '6147627debe805bf7a73a98d': 'Available Memory'
  };

  constructor(private authService: AuthService,
              private measurementService: MeasurementService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMeasurements();
  }

  async getMeasurements(): Promise<void> {
    try {
      const res = await this.measurementService.getMeasurements();
      this.measurements = res.data.measurements.sort((a, b) => b.sensedTime - a.sensedTime);
    } catch (error) {
      console.error(error);
    }
  }

  addMeasurement(measure: any): void {
    this.measurements.unshift(measure);
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }
}
