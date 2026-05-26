// ColumnConfig.interface.ts
export interface ColumnConfig {
  header: string;     // اسم العمود (مثلاً: "اسم المنتج")
  field: string;      // اسم الخاصية في الـ Object (مثلاً: "name")
  type?:any; // النوع عشان نتحكم في التنسيق
}
