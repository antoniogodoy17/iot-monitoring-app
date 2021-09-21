import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-create-measure',
  templateUrl: './create-measure.component.html',
  styleUrls: ['./create-measure.component.scss']
})
export class CreateMeasureComponent implements OnInit {
  @Output() measureCreated = new EventEmitter<any>();

  measureForm: FormGroup;
  nodes = [
    {
      _id: '6147621debe805bf7a73a98b',
      name: 'Primary CPU',
      zone: 'Conference Room'
    }
  ];
  parameters = [
    {
      _id: '6147624cebe805bf7a73a98c',
      name: 'Battery'
    },
    {
      _id: '6147627debe805bf7a73a98d',
      name: 'Available Memory'
    }
  ];

  constructor(private measurementService: MeasurementService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.measureForm = new FormGroup({
      nodeId: new FormControl(null, [Validators.required]),
      parameterId: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    });
  }

  async createMeasurement(): Promise<void> {
    try {
      if (this.measureForm.valid) {
        const body = { measurement: this.measureForm.value };

        const res = await this.measurementService.createMeasurement(body);
        this.measureCreated.emit(res.data.measurement);
        this.measureForm.reset();
      } else {
        alert('Form is not valid');
      }
    } catch (error) {
      console.error(error);
    }
  }

}
