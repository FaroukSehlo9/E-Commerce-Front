import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../../Core/Models/field-config.interface';
import { DynamicComponent } from '../../../../Core/Models/field.interface';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="group" [className]="config.class || 'form-group'">
      <label [for]="config.name">{{ config.label }}</label>
      <input
        [type]="config.textType || 'text'"
        [id]="config.name"
        [formControlName]="config.name"
        [placeholder]="config.placeholder || ''"
        class="form-control"
      />
    </div>
  `
})
export class FormInputComponent implements DynamicComponent {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  // ... باقي الكود
}
