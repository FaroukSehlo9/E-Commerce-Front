import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../../../Core/Models/field-config.interface';
import { DynamicFieldDirective } from '../../../Directives/dynamic-field/dynamic-field.directive';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFieldDirective],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="row">
        <ng-container *ngFor="let field of config">
          <div [appDynamicField]="field" [group]="form" [class]="field.class"></div>
        </ng-container>
      </div>
    </form>
  `
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FieldConfig[] = [];
  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  private createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => {
      // تأكد أن الـ Interface يحتوي على خاصية validation
      group.addControl(control.name, this.fb.control(control.value || '', control.validation || []));
    });
    return group;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
