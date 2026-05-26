import { Directive, Input, OnInit, ViewContainerRef, inject, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../Core/Models/field-config.interface';
import { DynamicComponent } from '../../../Core/Models/field.interface';
import { FormInputComponent } from '../../Components/DynamicForm/form-input/form-input.component';
import { FormSelectComponent } from '../../Components/DynamicForm/form-select/form-select.component';
import { FormButtonComponent } from '../../Components/DynamicForm/form-button/form-button.component';

@Directive({
  selector: '[appDynamicField]',
  standalone: true
})
export class DynamicFieldDirective implements OnInit {
  // لاحظ هنا: الـ Input أصبح اسمه مطابقاً للـ selector
  @Input() appDynamicField!: FieldConfig;
  @Input() group!: FormGroup;

  private container = inject(ViewContainerRef);

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    let component: any;

    switch (this.appDynamicField.type) {
      case 'input': component = FormInputComponent; break;
      case 'select': component = FormSelectComponent; break;
      case 'button': component = FormButtonComponent; break;
      default: return;
    }

    const componentRef: ComponentRef<DynamicComponent> = this.container.createComponent(component);

    componentRef.instance.config = this.appDynamicField;
    componentRef.instance.group = this.group;
  }
}
