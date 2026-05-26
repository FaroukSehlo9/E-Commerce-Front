import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.interface';

// واجهة توحد الخصائص التي تستقبلها كل كومبوننتاتنا
export interface DynamicComponent {
  config: FieldConfig;
  group: FormGroup;
}
