import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/lib/cart";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { ConfirmationPage } from "@/pages/ConfirmationPage";
import { CartPage } from "@/pages/CartPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { DeliveryPage } from "@/pages/DeliveryPage";
import { TermsPage } from "@/pages/TermsPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/produits" element={<ProductsPage />} />
            <Route path="/produits/:slug" element={<ProductDetailPage />} />
            <Route path="/commande" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/panier" element={<CartPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/livraison" element={<DeliveryPage />} />
            <Route path="/conditions" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
