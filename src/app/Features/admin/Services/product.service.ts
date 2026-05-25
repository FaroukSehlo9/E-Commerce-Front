import { Injectable } from '@angular/core';
import { BaseService } from '../../../Core/Services/Core/Services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<any> {
  // اسم الكنترولر في الـ API بتاعك
  protected readonly controllerName = 'Product';
}
