import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";
import type { Order } from "@/services/orderService";
import { SHOP_WHATSAPP } from "@/data/governorates";

export function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("aura-bio-last-order");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-lg">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary animate-bounce" />
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold">شكراً لك ! تم تسجيل طلبك بنجاح ❤️</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Merci pour votre commande ! سيتصل بك فريقنا في أقرب وقت عبر الهاتف لتأكيد التوصيل.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-primary bg-primary/10 p-3 rounded-xl border border-primary/20">
          <PhoneCall className="h-4 w-4 shrink-0" />
          <span>يرجى إبقاء الهاتف مشغلا للإجابة على المكالمة</span>
        </div>

        {order && (
          <dl className="mt-6 grid gap-2.5 rounded-2xl bg-secondary/80 p-5 text-left text-sm border border-border">
            <div className="flex justify-between">
              <dt className="text-muted-foreground font-medium">رقم الطلب (N° Commande)</dt>
              <dd className="font-bold text-primary">{order.orderId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground font-medium">الاسم واللقب (Nom)</dt>
              <dd className="font-semibold">{order.customer.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground font-medium">الهاتف (Téléphone)</dt>
              <dd className="font-semibold">{order.customer.phone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground font-medium">الولاية (Gouvernorat)</dt>
              <dd className="font-semibold">{order.customer.governorate}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>المجموع الكلي (Total)</dt>
              <dd className="text-primary text-xl font-bold">{order.total} DT</dd>
            </div>
          </dl>
        )}

        <a
          href={`https://wa.me/${SHOP_WHATSAPP}`}
          target="_blank"
          rel="noreferrer"
          className="btn-base btn-outline mt-6 w-full py-3.5 text-sm font-semibold hover:border-emerald-600 hover:text-emerald-700"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" /> هل لديك استفسار ؟ تواصل عبر الواتساب (WhatsApp)
        </a>
        <Link to="/produits" className="btn-base btn-primary mt-3 w-full py-4 text-base font-bold shadow-md shadow-primary/20">
          مواصلة التسوق • Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

