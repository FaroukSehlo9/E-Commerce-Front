import { Injectable } from '@angular/core';
import { BaseService } from './Core/Services/base.service';
import { IProduct } from '../Models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  // تحديد اسم الكنترولر كما هو في الـ API
  protected override readonly controllerName = 'Product';
}
