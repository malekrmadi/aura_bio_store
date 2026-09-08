import produit1 from "@/assets/produit-1.jpg.asset.json";
import produit2 from "@/assets/produit-2.jpg.asset.json";
import produit3 from "@/assets/produit-3.jpg.asset.json";
import affiche1 from "@/assets/affiche-1.jpg.asset.json";
import affiche2 from "@/assets/affiche-2.jpg.asset.json";
import affiche3 from "@/assets/affiche-3.jpg.asset.json";

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

export const products: Product[] = [
  {
    id: "foot-care-001",
    slug: "vaseline-huile-de-nigelle",
    name: "Vaseline à l'huile de nigelle",
    category: "Soins des pieds",
    shortDescription: "Vaseline + huile de nigelle + cire d'abeille",
    description:
      "Un soin riche et naturel conçu pour nourrir et adoucir les zones sèches : talons, coudes, genoux et mains. Sa texture onctueuse pénètre facilement et laisse la peau douce et confortable.",
    images: [produit1.url, produit2.url, produit3.url],
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
        image: affiche1.url,
        title: "Des ingrédients naturels",
        text: "Vaseline, huile de nigelle et cire d'abeille : une formule simple et efficace.",
      },
      {
        type: "image",
        image: affiche2.url,
        title: "Un soin pensé pour vous",
        text: "Idéal pour les peaux sèches et les zones qui demandent plus d'attention.",
      },
      {
        type: "image",
        image: affiche3.url,
        title: "Conseils d'utilisation",
        text: "Une petite quantité suffit, chaque jour, pour garder la peau douce.",
      },
    ],
  },
  {
    id: "oil-002",
    slug: "huile-de-nigelle-pure",
    name: "Huile de nigelle pure",
    category: "Huiles naturelles",
    shortDescription: "100% naturelle, pressée à froid",
    description:
      "Une huile de nigelle pure, pressée à froid, à utiliser sur la peau et les cheveux pour un soin naturel au quotidien.",
    images: [produit3.url, produit1.url],
    oldPrice: 30,
    price: 25,
    badge: "PROMO",
    inStock: true,
    ingredients: ["Huile de nigelle 100% pure"],
    benefits: [
      "Nourrit la peau et les cheveux",
      "Convient à un usage quotidien",
      "Pressée à froid",
    ],
    usage: [
      "Verser quelques gouttes dans la main",
      "Appliquer sur la zone souhaitée",
      "Masser doucement",
    ],
    offers: [
      { quantity: 1, price: 25, label: "1 flacon" },
      { quantity: 2, price: 45, label: "2 flacons", badge: "MEILLEURE OFFRE" },
    ],
    reviews: [
      {
        name: "Ines",
        city: "Nabeul",
        rating: 5,
        text: "Très bonne qualité, je l'utilise pour mes cheveux.",
      },
    ],
    faq: commonFaq,
    contentBlocks: [],
  },
  {
    id: "hair-003",
    slug: "soin-cheveux-nigelle",
    name: "Soin cheveux à la nigelle",
    category: "Soins des cheveux",
    shortDescription: "Nourrit et adoucit les cheveux secs",
    description:
      "Un soin capillaire naturel qui nourrit la fibre et facilite le démêlage, pour des cheveux plus doux et plus faciles à coiffer.",
    images: [produit2.url, produit1.url],
    price: 32,
    inStock: true,
    ingredients: ["Huile de nigelle", "Huile d'olive", "Cire d'abeille"],
    benefits: ["Nourrit les cheveux secs", "Facilite le démêlage", "Apporte de la douceur"],
    usage: [
      "Appliquer sur cheveux humides",
      "Masser des longueurs aux pointes",
      "Laisser poser 20 minutes",
      "Rincer",
    ],
    offers: [
      { quantity: 1, price: 32, label: "1 pot" },
      { quantity: 2, price: 55, label: "2 pots", badge: "MEILLEURE OFFRE" },
    ],
    reviews: [
      {
        name: "Rania",
        city: "Ariana",
        rating: 5,
        text: "Mes cheveux sont beaucoup plus doux après quelques utilisations.",
      },
    ],
    faq: commonFaq,
    contentBlocks: [],
  },
  {
    id: "body-004",
    slug: "baume-corps-nourrissant",
    name: "Baume corps nourrissant",
    category: "Soins du corps",
    shortDescription: "Hydratation douce pour tout le corps",
    description:
      "Un baume onctueux à base d'ingrédients naturels pour hydrater la peau du corps et lui apporter confort et douceur.",
    images: [produit1.url, produit3.url],
    oldPrice: 38,
    price: 33,
    badge: "PROMO",
    inStock: true,
    ingredients: ["Beurre de karité", "Cire d'abeille", "Huile d'amande douce"],
    benefits: ["Hydrate la peau", "Texture fondante", "Parfum naturel léger"],
    usage: ["Appliquer après la douche", "Masser jusqu'à absorption"],
    offers: [
      { quantity: 1, price: 33, label: "1 pot" },
      { quantity: 2, price: 59, label: "2 pots", badge: "MEILLEURE OFFRE" },
    ],
    reviews: [
      { name: "Nour", city: "Bizerte", rating: 5, text: "Très agréable, peau douce toute la journée." },
    ],
    faq: commonFaq,
    contentBlocks: [],
  },
  {
    id: "beauty-005",
    slug: "coffret-beaute-naturelle",
    name: "Coffret beauté naturelle",
    category: "Beauté & bien-être",
    shortDescription: "Notre sélection de soins essentiels",
    description:
      "Un coffret qui réunit nos soins essentiels pour prendre soin de la peau et des cheveux, idéal aussi comme cadeau.",
    images: [produit2.url, produit3.url],
    oldPrice: 95,
    price: 79,
    badge: "PROMO",
    inStock: true,
    ingredients: ["Vaseline à l'huile de nigelle", "Huile de nigelle pure", "Baume corps"],
    benefits: ["Une routine complète", "Idéal en cadeau", "Meilleur prix"],
    usage: ["Utiliser chaque soin selon ses instructions"],
    offers: [{ quantity: 1, price: 79, label: "1 coffret" }],
    reviews: [
      { name: "Fatma", city: "Monastir", rating: 5, text: "Joli coffret, offert à ma sœur, elle a adoré." },
    ],
    faq: commonFaq,
    contentBlocks: [],
  },
];

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
