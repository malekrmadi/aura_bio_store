import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Truck } from "lucide-react";
import { SHOP_PHONE, SHOP_WHATSAPP } from "@/data/governorates";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aura Bio" },
      {
        name: "description",
        content: "Contactez Aura Bio par téléphone ou WhatsApp pour toute question sur nos soins naturels.",
      },
      { property: "og:title", content: "Contact — Aura Bio" },
      { property: "og:description", content: "Téléphone et WhatsApp Aura Bio." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-page max-w-xl py-12">
      <h1 className="text-3xl">Nous contacter</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Une question sur un produit ou votre commande ? Nous vous répondons rapidement.
      </p>

      <div className="mt-6 grid gap-3">
        <a
          href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span className="font-medium">{SHOP_PHONE}</span>
        </a>
        <a
          href={`https://wa.me/${SHOP_WHATSAPP}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <MessageCircle className="h-5 w-5 text-primary" />
          <span className="font-medium">WhatsApp</span>
        </a>
        <div className="flex items-center gap-3 rounded-2xl bg-secondary p-5 text-sm">
          <Truck className="h-5 w-5 text-primary" />
          Livraison partout en Tunisie — paiement à la livraison
        </div>
      </div>
    </div>
  );
}
