import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Truck } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { SHOP_PHONE, SHOP_WHATSAPP } from "@/data/governorates";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/50">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <img src={logo.url} alt="Logo Aura Bio" className="h-12 w-auto rounded-md" />
          <p className="mt-3 text-sm text-muted-foreground">Le soin naturel, simplement.</p>
        </div>

        <div>
          <h3 className="text-base font-semibold">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
            <li><Link to="/produits" className="hover:text-primary">Produits</Link></li>
            <li><Link to="/a-propos" className="hover:text-primary">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/livraison" className="hover:text-primary">Livraison</Link></li>
            <li><Link to="/conditions" className="hover:text-primary">Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}>{SHOP_PHONE}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 shrink-0" />
              <a href={`https://wa.me/${SHOP_WHATSAPP}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0" />
              Livraison partout en Tunisie
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aura Bio — Marque tunisienne de soins naturels.
      </div>
    </footer>
  );
}
