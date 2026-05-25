import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // 1. رسالة نجاح
  success(message: string, title: string = 'تم بنجاح') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      timer: 3000 // تقفل لوحدها بعد 3 ثواني
    });
  }

  // 2. رسالة خطأ
  error(message: string, title: string = 'عذراً..') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33',
    });
  }

  // 3. رسالة تأكيد (زي قبل الحذف)
  async confirm(message: string, title: string = 'هل أنت متأكد؟'): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالتنفيذ',
      cancelButtonText: 'إلغاء'
    });
    return result.isConfirmed;
  }
}
