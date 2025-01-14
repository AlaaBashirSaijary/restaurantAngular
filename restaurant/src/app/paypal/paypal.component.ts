import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Orders } from '../shared/models/Oreders';

@Component({
  selector: 'app-paypal-button',
  standalone: true, // تعريف المكون كمكون مستقل
  imports: [HttpClientModule], // استيراد HttpClientModule لتتمكن من استخدام HttpClient
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalButtonComponent implements OnInit {

  @Input()
  order!: Orders; // استخدام الأمر Input لتمرير بيانات الطلب
  private apiUrl = 'https://your-btcpay-server.com/api/v1/invoices'; // رابط API الخاص بـ BTCPay Server
  private apiKey = 'GMPOiMEMP0707MHnp7P7EdIBlIZR0nlHdlovbBRW7or'; // مفتاح API الخاص بك

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // يمكن تنفيذ أكواد أثناء تحميل المكون هنا
  }

  createInvoice() {
    const invoiceData = {
      price: 10, // المبلغ المطلوب
      currency: 'USD', // العملة
      itemDesc: 'وصف المنتج', // وصف المنتج
      redirectURL: 'https://your-website.com/success' // رابط إعادة التوجيه بعد الدفع
    };

    this.http.post(this.apiUrl, invoiceData, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      }
    }).subscribe(
      (response: any) => {
        // إذا تم إنشاء الفاتورة بنجاح، إعادة توجيه المستخدم إلى رابط الدفع
        window.location.href = response.url;
      },
      (error: any) => {
        console.error('حدث خطأ أثناء إنشاء الفاتورة:', error);
      }
    );
  }
}
