import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../../Core/Models/field-config.interface';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="group" [className]="config.class || 'form-group'">
      <label [for]="config.name">{{ config.label }}</label>
      <select [id]="config.name" [formControlName]="config.name" class="form-control">
        <option value="">{{ config.placeholder || 'اختر...' }}</option>
        <option *ngFor="let opt of config.options" [value]="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
}
