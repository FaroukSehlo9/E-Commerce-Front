import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../../../Core/Models/field-config.interface';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="group" [className]="config.class || 'form-group'">
      <button
        [type]="config.textType || 'submit'"
        class="btn btn-primary"
        [disabled]="config.disabled">
        {{ config.label }}
      </button>
    </div>
  `
})
export class FormButtonComponent {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
}
