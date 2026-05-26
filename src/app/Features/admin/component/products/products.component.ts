import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // استيراد ActivatedRoute لمراقبة المسار
import { GenericCrudComponent, ColumnConfig } from '../generic-crud/generic-crud.component';
import { ProductService } from '../../Services/product.service';
import { FieldConfig } from '../../../../Core/Models/field-config.interface';
import { Product } from '../../../../Core/Models/iproduct.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, GenericCrudComponent],
  template: `
    <app-generic-crud
      [service]="productService"
      [formConfig]="productConfig"
      [columns]="productColumns"
      [data]="products"
      title="إدارة المنتجات">
    </app-generic-crud>
  `
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute); // حقن الـ ActivatedRoute
  cdr = inject(ChangeDetectorRef); // حقن الـ ChangeDetectorRef لإجبار الواجهة على التحديث

  products: Product[] = [];

  productConfig: FieldConfig[] = [
    { name: 'name', type: 'input', label: 'اسم المنتج' },
    { name: 'description', type: 'input', label: 'الوصف' },
    { name: 'price', type: 'input', label: 'السعر' },
    { name: 'stockQuantity', type: 'input', label: 'الكمية' },
    { name: 'userName', type: 'input', label: 'اسم المورد' },
  ];

  productColumns: ColumnConfig[] = [
    { header: 'الاسم', field: 'name' },
    { header: 'الوصف', field: 'description' },
    { header: 'السعر', field: 'price' },
    { header: 'الكمية', field: 'stockQuantity' },
    { header: 'اسم المورد', field: 'userName' },
  ];

  ngOnInit() {
    // مراقبة المسار لضمان جلب البيانات في كل مرة يتم فيها الوصول للصفحة
    this.route.url.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (res: any) => {
        // التأكد من استخراج البيانات بالشكل الصحيح
        this.products = res.resource || res;
        // إجبار Angular على تحديث الواجهة فور وصول البيانات
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
