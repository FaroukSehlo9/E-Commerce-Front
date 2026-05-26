import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../../../Shared/Components/DynamicForm/dynamic-form/dynamic-form.component';
import { BaseService } from '../../../../Core/Services/Core/Services/base.service';
import { FieldConfig } from '../../../../Core/Models/field-config.interface';

export interface ColumnConfig {
  header: string;
  field: string;
}

declare var bootstrap: any;

@Component({
  selector: 'app-generic-crud',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.css']
})
export class GenericCrudComponent<T extends Record<string, any>> {
  @Input() service!: BaseService<T>;
  @Input() formConfig: FieldConfig[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() data: T[] = [];
  @Input() title: string = 'إدارة البيانات';

  // تأكد أن هذا المتغير موجود ومفتوح للـ template
  public isFormVisible = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onSave(data: T) {
    this.service.add(data).subscribe({
      next: (res) => {
        console.log('تم الحفظ:', res);
        this.closeModal();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  private closeModal() {
    const modalElement = document.getElementById('crudModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
  }
}
