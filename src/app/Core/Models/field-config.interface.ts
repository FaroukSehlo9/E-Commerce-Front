import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  name: string;                   // الاسم البرمجي للحقل (FormControlName)
  type: string;                   // نوع الحقل (input, select, checkbox, etc)
  label?: string;                 // العنوان اللي بيظهر لليوزر
  placeholder?: string;           // الـ placeholder
  value?: any;                    // القيمة المبدئية

  // التحكم في الحالة
  disabled?: boolean;             // تعطيل الحقل
  NonVisible?: boolean;           // إخفاء الحقل من الـ DOM

  // التخصيص
  textType?: string;              // نوع الـ input (text, password, number)
  class?: string;                 // الكلاسات الخاصة بالتنسيق (زي col-6)

  // الخيارات (للـ Select أو Radio)
  options?: { label: string; value: any }[];

  validation?: ValidatorFn[]; // تأكد إنها مكتوبة هنا بنفس الاسم ده

}
