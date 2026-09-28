import vaselinePhoto1 from "@/assets/vaseline photo 1.jfif";
import vaselinePhoto2 from "@/assets/vaseline photo 2.jfif";
import vaselinePhoto3 from "@/assets/vaseline photo 3.jfif";
import dihenKebritReal from "@/assets/dihen-kebrit-real.jpg";
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
    question: "كيفية استعمال المنتج ؟",
    answer: "نظف المنطقة المصابة وجففها جيداً، ثم ادهن كمية مناسبة ودلك بلطف حتى يمتصها الجلد.",
  },
  {
    question: "كم مرة يجب استعماله يومياً ؟",
    answer: "للحصول على أفضل النتائج السريعة، ينصح باستعماله مرتين يومياً (صباحاً ومساءً).",
  },
  {
    question: "كيف يتم التوصيل ؟",
    answer: "نتصل بك هاتفياً لتأكيد العنوان والطلب، ثم يصلك الموصل خلال 24 إلى 72 ساعة.",
  },
  {
    question: "هل التوصيل متوفر لجميع الولايات ؟",
    answer: "نعم، التوصيل متوفر لجميع 24 ولاية تونسية والدفع عند الاستلام.",
  },
];

export const mainProduct: Product = {
  id: "foot-care-001",
  slug: "vaseline-huile-de-nigelle",
  name: "فازلين بالحبة السوداء (Vaseline à l'huile de nigelle)",
  category: "Soins des pieds & corps",
  shortDescription: "فازلين + زيت الحبة السوداء + شمع العسل",
  description:
    "عناية فائقة وطبيعية لتنعيم وترطيب المناطق الجافة والمشققة: الكعبين، المرفقين، الركبتين واليدين. تركيبة غنية تمتص بسرعة وتمنحك نعومة ورطوبة تدوم طوال اليوم.",
  images: [vaselinePhoto1, vaselinePhoto2, vaselinePhoto3],
  oldPrice: 35,
  price: 29,
  badge: "الأكثر مبيعاً 🔥 BEST SELLER",
  inStock: true,
  ingredients: ["زيت الحبة السوداء (Huile de nigelle)", "شمع العسل (Cire d'abeille)", "فازلين نقي (Vaseline)"],
  benefits: [
    "يغذي البشرة الجافة والمشققة بعمق",
    "يقضي على تشققات الكعبين والأقدام بسرعة",
    "تركيبة طبيعية 100% تمنح ملمساً ناعماً",
    "استعمال سهل وسريع صباحاً ومساءً",
  ],
  usage: [
    "تنظيف وتجفيف المنطقة الجافة",
    "وضع كمية مناسبة من الفازلين",
    "التدليك بلطف حتى الامتصاص",
  ],
  offers: [
    { quantity: 1, price: 29, label: "قطعة واحدة (1 Produit)" },
    { quantity: 2, price: 49, label: "قطعتين (2 Produits)", badge: "العرض الأفضل 🔥 MEILLEURE OFFRE" },
    { quantity: 3, price: 69, label: "3 قطع (3 Produits)" },
  ],
  reviews: [
    {
      name: "أمل",
      city: "تونس",
      rating: 5,
      text: "منتج رائع جداً، قدمي أصبحت ناعمة من الأيام الأولى. ننصح بيه!",
    },
    {
      name: "سنية",
      city: "سوسة",
      rating: 5,
      text: "ريحة طبيعية وتركيبة تحفون برشا. التوصيل كان سريع.",
    },
    {
      name: "محمد",
      city: "صفاقس",
      rating: 5,
      text: "وصلتني في 48 ساعة، نوعية ممتازة.",
    },
  ],
  faq: commonFaq,
  contentBlocks: [
    {
      type: "image",
      image: affiche1,
      title: "مكونات طبيعية 100%",
      text: "فازلين، زيت حبة البركة وشمع العسل لنتائج سريعة وآمنة.",
    },
    {
      type: "image",
      image: affiche2,
      title: "عناية خاصة ببشرتك",
      text: "مثالي للمناطق الأكثر جفافاً وتشققا.",
    },
  ],
};

export const dihenKebritProduct: Product = {
  id: "dihen-kebrit-002",
  slug: "dehn-el-kebrit",
  name: "دهان كبريت طبيعي (Dahan El Kebrit)",
  category: "Soins de la peau",
  shortDescription: "مرهم الكبريت الطبيعي لمقاومة فطريات الأظافر والجلد والتسلخات",
  description:
    "مرهم طبيعي فعال 100% مستخلص من الكبريت النقي والأعشاب الطبيعية. يمنحك حماية فائقة ضد فطريات الأظافر والجلد والتسلخات، ويهدئ الحكة والتهابات البشرة بسرعة من الاستعمالات الأولى.",
  images: [dihenKebritReal],
  oldPrice: 35,
  price: 29,
  badge: "جديد 🔥 NOUVEAU",
  inStock: true,
  ingredients: [
    "الكبريت النقي (Soufre pur)",
    "زيت شجرة الشاي (Tea Tree Oil)",
    "شمع العسل الطبيعي (Cire d'abeille)",
    "خلاصة الليمون والأعشاب",
  ],
  benefits: [
    "مقاومة فعالة وسريعة لفطريات الأظافر (فطريات القدمين واليدين)",
    "القضاء على فطريات الجلد والتسلخات والحكة",
    "تطهير البشرة وتهدئة التهيج والاحمرار بسرعة",
    "تركيبة طبيعية 100% بدون مواد كيميائية ضارة",
    "نتائج ملحوظة من الأيام الأولى للإستعمال",
  ],
  usage: [
    "تنظيف وتجفيف المنطقة المصابة جيداً",
    "دهن كمية مناسبة من مرهم الكبريت على المنطقة",
    "التدليك بلطف حتى يمتصه الجلد",
    "الاستعمال مرتين يومياً (صباحاً ومساءً) لنتائج سريعة",
  ],
  offers: [
    { quantity: 1, price: 29, label: "قطعة واحدة (1 Produit)" },
    { quantity: 2, price: 49, label: "قطعتين (2 Produits)", badge: "العرض الأفضل 🔥 MEILLEURE OFFRE" },
    { quantity: 3, price: 69, label: "3 قطع (3 Produits)" },
  ],
  reviews: [
    {
      name: "سامي",
      city: "أريانة",
      rating: 5,
      text: "دهان كبريت ممتاز جربتو على الفطريات بين الصوابع ونحى الحكة من ثاني نهار.",
    },
    {
      name: "مريم",
      city: "منستير",
      rating: 5,
      text: "يعطيك الصحة منتج رائع أظافري تحسنت برشا بعد ما جربت عدة كريمات بدون فائدة.",
    },
    {
      name: "ناجح",
      city: "بنزرت",
      rating: 5,
      text: "توصيل سريع وخدمة ممتازة، المنتج فعال 100%.",
    },
  ],
  faq: commonFaq,
  contentBlocks: [
    {
      type: "image",
      image: dihenKebritReal,
      title: "دهان الكبريت الأصيل",
      text: "نتائج سريعة وملحوظة في معالجة فطريات الأظافر والجلد.",
    },
  ],
};

export const products: Product[] = [mainProduct, dihenKebritProduct];

export const categories = [
  { id: "all", label: "جميع المنتجات", emoji: "✨" },
  { id: "Soins des pieds & corps", label: "فازلين الحبة السوداء", emoji: "🌿" },
  { id: "Soins de la peau", label: "دهان كبريت طبيعي", emoji: "🟡" },
];

export const homeReviews: Review[] = [
  ...mainProduct.reviews,
  ...dihenKebritProduct.reviews,
];
