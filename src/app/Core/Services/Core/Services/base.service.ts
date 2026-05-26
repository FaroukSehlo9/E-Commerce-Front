import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AlertService } from '../../../../Shared/services/alert';
import { environment } from '../../../../../environments/environment.development';
import { GeneralResponse } from '../../../Models/general-response';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  // حقن الخدمات باستخدام inject (الطريقة الأحدث والأنظف في Standalone)
  protected http = inject(HttpClient);
  protected alert = inject(AlertService);

  // رابط الـ API الأساسي من ملف الـ environment
  protected baseUrl = environment.apiUrl;

  // اسم الكنترولر (لازم اللي يورث من الكلاس ده يحدده، مثل 'Product' أو 'Category')
  protected abstract readonly controllerName: string;

  /** 1. جلب الكل **/
 getAll(): Observable<GeneralResponse<T[]>> {
  const url = `${this.baseUrl}/${this.controllerName}/GetAll`;
  return this.http.get<GeneralResponse<T[]>>(url);
}

  /** 2. جلب عنصر واحد بالـ ID (Query Parameter: ?Id=guid) **/
  getById(id: string): Observable<GeneralResponse<T>> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<GeneralResponse<T>>(`${this.baseUrl}/${this.controllerName}/GetById`, { params });
  }

  /** 3. إضافة عنصر جديد **/
  add(model: T): Observable<GeneralResponse<T>> {
    return this.http.post<GeneralResponse<T>>(`${this.baseUrl}/${this.controllerName}/Add`, model)
      .pipe(
        tap(res => this.handleResponse(res, 'تمت الإضافة بنجاح'))
      );
  }

  /** 4. تحديث عنصر موجود **/
  update(model: T): Observable<GeneralResponse<T>> {
    return this.http.post<GeneralResponse<T>>(`${this.baseUrl}/${this.controllerName}/Update`, model)
      .pipe(
        tap(res => this.handleResponse(res, 'تم التعديل بنجاح'))
      );
  }

  /** 5. حذف ناعم لعنصر واحد (Query Parameter: ?Id=guid) **/
  softDelete(id: string): Observable<GeneralResponse<boolean>> {
    const params = new HttpParams().set('Id', id);
    return this.http.post<GeneralResponse<boolean>>(`${this.baseUrl}/${this.controllerName}/SoftDelete`, {}, { params })
      .pipe(
        tap(res => this.handleResponse(res, 'تم الحذف بنجاح'))
      );
  }

  /** 6. حذف ناعم لمجموعة عناصر (Request Body: string[]) **/
  softRangeDelete(ids: string[]): Observable<GeneralResponse<boolean>> {
    return this.http.post<GeneralResponse<boolean>>(`${this.baseUrl}/${this.controllerName}/SoftRangeDelete`, ids)
      .pipe(
        tap(res => this.handleResponse(res, 'تم حذف المجموعة بنجاح'))
      );
  }

  /** ميثود داخلية للتعامل مع الـ Alerts أوتوماتيك **/
  private handleResponse(res: GeneralResponse<any>, successMessage: string) {
    if (res.success) {
      this.alert.success(res.message || successMessage);
    } else {
      this.alert.error(res.message || 'حدث خطأ ما');
    }
  }
}
