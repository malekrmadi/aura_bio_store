import vaselinePhoto1 from "@/assets/vaseline photo 1.jfif";
import vaselinePhoto2 from "@/assets/vaseline photo 2.jfif";
import vaselinePhoto3 from "@/assets/vaseline photo 3.jfif";
import affiche1 from "@/assets/affiche1.jfif";
import affiche2 from "@/assets/affiche 2.jfif";
import affiche3 from "@/assets/affiche 3.jfif";

export type Offer = {
  quantity: number;
  price: number;
  label: string;
  badge?: string | undefined;
};

export type Review = {
  name: string;
  city: string;
  rating: number;
  text: string;
};

export type ContentBlock = {
  type: "image";
  image: string;
  title?: string | undefined;
  text?: string | undefined;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  images: string[];
  oldPrice?: number | undefined;
  price: number;
  badge?: string | undefined;
  inStock: boolean;
  ingredients: string[];
  benefits: string[];
  usage: string[];
  offers: Offer[];
  reviews: Review[];
  faq: { question: string; answer: string }[];
  contentBlocks: ContentBlock[];
};

const commonFaq = [
  {
    question: "Comment utiliser le produit ?",
    answer:
      "Appliquez une petite quantité sur une peau propre et massez doucement jusqu'à absorption.",
  },
  {
    question: "Combien de temps faut-il l'utiliser ?",
    answer:
      "Pour un confort optimal, une utilisation régulière, matin et/ou soir, est recommandée.",
  },
  {
    question: "Comment se passe la livraison ?",
    answer:
      "Nous vous appelons pour confirmer votre commande, puis vous êtes livré sous 24 à 72 heures.",
  },
  {
    question: "La livraison est-elle disponible partout en Tunisie ?",
    answer: "Oui, nous livrons dans les 24 gouvernorats.",
  },
  {
    question: "Comment commander ?",
    answer:
      "Choisissez votre offre, cliquez sur « Commander maintenant », renseignez votre nom, téléphone et adresse. Vous payez à la livraison.",
  },
];

export const mainProduct: Product = {
  id: "foot-care-001",
  slug: "vaseline-huile-de-nigelle",
  name: "Vaseline à l'huile de nigelle",
  category: "Soins des pieds & corps",
  shortDescription: "Vaseline + huile de nigelle + cire d'abeille",
  description:
    "Un soin riche et naturel conçu pour nourrir et adoucir les zones sèches : talons, coudes, genoux et mains. Sa texture onctueuse pénètre facilement et laisse la peau douce et confortable.",
  images: [vaselinePhoto1, vaselinePhoto2, vaselinePhoto3],
  oldPrice: 35,
  price: 29,
  badge: "BEST SELLER",
  inStock: true,
  ingredients: ["Huile de nigelle", "Cire d'abeille", "Vaseline"],
  benefits: [
    "Nourrit intensément la peau",
    "Aide à maintenir la douceur",
    "Idéal pour les zones sèches",
    "Texture agréable et non collante",
    "Utilisation simple, matin ou soir",
  ],
  usage: [
    "Nettoyer et sécher la zone",
    "Appliquer une petite quantité",
    "Masser doucement",
    "Utiliser régulièrement",
  ],
  offers: [
    { quantity: 1, price: 29, label: "1 produit" },
    { quantity: 2, price: 49, label: "2 produits", badge: "MEILLEURE OFFRE" },
    { quantity: 3, price: 69, label: "3 produits" },
  ],
  reviews: [
    {
      name: "Amel",
      city: "Tunis",
      rating: 5,
      text: "J'ai beaucoup aimé le produit, mes pieds sont beaucoup plus doux.",
    },
    {
      name: "Sonia",
      city: "Sousse",
      rating: 5,
      text: "Texture très agréable et odeur naturelle. Je recommande vraiment.",
    },
    {
      name: "Mohamed",
      city: "Sfax",
      rating: 4,
      text: "Livraison rapide et produit conforme à la description.",
    },
  ],
  faq: commonFaq,
  contentBlocks: [
    {
      type: "image",
      image: affiche1,
      title: "Des ingrédients naturels",
      text: "Vaseline, huile de nigelle et cire d'abeille : une formule simple et efficace.",
    },
    {
      type: "image",
      image: affiche2,
      title: "Un soin pensé pour vous",
      text: "Idéal pour les peaux sèches et les zones qui demandent plus d'attention.",
    },
    {
      type: "image",
      image: affiche3,
      title: "Conseils d'utilisation",
      text: "Une petite quantité suffit, chaque jour, pour garder la peau douce.",
    },
  ],
};

export const products: Product[] = [mainProduct];


export const categories = [
  { id: "all", label: "Tous", emoji: "✨" },
  { id: "Soins du corps", label: "Soins du corps", emoji: "🌿" },
  { id: "Soins des cheveux", label: "Cheveux", emoji: "💆" },
  { id: "Soins des pieds", label: "Pieds", emoji: "🦶" },
  { id: "Huiles naturelles", label: "Huiles", emoji: "🫒" },
  { id: "Beauté & bien-être", label: "Beauté", emoji: "✨" },
];

export const homeReviews: Review[] = [
  {
    name: "Amel",
    city: "Tunis",
    rating: 5,
    text: "J'ai beaucoup aimé le produit, mes pieds sont beaucoup plus doux.",
  },
  {
    name: "Sonia",
    city: "Sousse",
    rating: 5,
    text: "Des produits naturels, une livraison rapide. Merci Aura Bio !",
  },
  {
    name: "Mohamed",
    city: "Sfax",
    rating: 5,
    text: "Bon rapport qualité prix, je vais recommander.",
  },
  {
    name: "Rania",
    city: "Ariana",
    rating: 5,
    text: "Le service client est très gentil, ils m'ont appelée pour confirmer.",
  },
];
