import { Injectable } from '@angular/core';
import { BaseService } from '../../../Core/Services/Core/Services/base.service';
import { Product } from '../../../Core/Models/iproduct.model';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<Product> {
  protected readonly controllerName = 'Product';
}
