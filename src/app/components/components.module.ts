import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMeasureComponent } from './create-measure/create-measure.component';



@NgModule({
  declarations: [
    CreateMeasureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateMeasureComponent
  ]
})
export class ComponentsModule { }
