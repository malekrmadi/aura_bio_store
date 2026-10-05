import vaselineReal from "@/assets/vaseline-real.jpg";
import dihenKebritReal from "@/assets/dihen-kebrit-real.jpg";
import packDuoReal from "@/assets/pack-duo-real.jpg";
import packCheveuxNatural from "@/assets/static-C-Natural-4x5.jpg";
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
  /** Affiche l'image principale en entier (sans recadrage) */
  fullImage?: boolean | undefined;
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
  images: [vaselineReal],
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

export const packDuoProduct: Product = {
  id: "pack-duo-003",
  slug: "pack-duo-vaseline-kebrit",
  name: "باك التوفير المزدوج (فازلين + دهان كبريت)",
  category: "Packs Économiques",
  shortDescription: "باك متكامل 2 في 1 : فازلين بالحبة السوداء + دهان الكبريت الطبيعي بسعر استثنائي 39 DT",
  description:
    "العرض المزدوج الأكثر توفيراً وتكاملاً! احصل على فازلين بالحبة السوداء لتنعيم وترطيب الأقدام والمناطق المشققة، مع دهان الكبريت الطبيعي لمعالجة فطريات الأظافر والجلد. حل شامل 100% طبيعي بسعر 39 د.ت فقط بدلاً من 58 د.ت (توفير 19 د.ت).",
  images: [packDuoReal, vaselineReal, dihenKebritReal],
  oldPrice: 58,
  price: 39,
  badge: "عرض خاص ⚡ OFFRE DUO -33%",
  inStock: true,
  ingredients: [
    "زيت الحبة السوداء وشمع العسل (Vaseline)",
    "الكبريت النقي وزيت شجرة الشاي (Dahan El Kebrit)",
  ],
  benefits: [
    "عناية متكاملة 2 في 1 : ترطيب ومعالجة في نفس الوقت",
    "تنعيم الأقدام والمناطق المشققة بالفازلين الطبيعي",
    "القضاء على فطريات الأظافر والجلد بدهان الكبريت",
    "توفير كبير : 39 د.ت فقط بدلاً من 58 د.ت (توفير 19 د.ت)",
    "توصيل سريع لجميع الولايات والدفع عند الاستلام",
  ],
  usage: [
    "استعمال فازلين الحبة السوداء للتنعيم والترطيب اليومي",
    "دهن مرهم الكبريت مرتين يومياً على الفطريات والتسلخات",
  ],
  offers: [
    { quantity: 1, price: 39, label: "باك التوفير (فازلين + دهان كبريت)" },
  ],
  reviews: [
    {
      name: "حسناء",
      city: "تونس",
      rating: 5,
      text: "باك رائع واقتصادي برشا! الفازلين يرطب ودهان الكبريت نحى الفطريات. ينصح بيه!",
    },
    {
      name: "كريم",
      city: "نابل",
      rating: 5,
      text: "استغليت عرض 39 دينار ووصلني في يومين، نوعية ممتازة وتغليف محكم.",
    },
    {
      name: "فاطمة",
      city: "صفاقس",
      rating: 5,
      text: "منتجات ممتازة جداً، التوفير واضح والنتيجة ملحوظة من أول أسبوع.",
    },
  ],
  faq: commonFaq,
  contentBlocks: [
    {
      type: "image",
      image: packDuoReal,
      title: "باك التوفير المزدوج",
      text: "فازلين الحبة السوداء + دهان الكبريت لنتائج مذهلة.",
    },
  ],
};

export const packCheveuxProduct: Product = {
  id: "pack-cheveux-004",
  slug: "pack-cheveux-sidr-romarin",
  name: "باك العناية الطبيعية بجذور الشعر (5 قطع)",
  category: "Soins des cheveux",
  shortDescription: "سدر بيو + زيت إكليل الجبل + ديرما رولر 540 + مشط الجذور + فرشة التدليك — 5 قطع بـ 49 د.ت فقط",
  description:
    "من الطبيعة لجذور شعرك! باك متكامل من 5 قطع لتقوية الشعر من الجذور وتحفيز نموه بطريقة طبيعية 100% بلا كيمياء. يجمع بين مسحوق السدر البيو لتنظيف وتغذية الشعر، زيت إكليل الجبل المعروف بتحفيز نمو الشعر ومقاومة التساقط، ديرما رولر 540 إبرة لتنشيط الدورة الدموية في فروة الرأس وتحسين امتصاص الزيت، مشط الجذور لتوزيع الزيت مباشرة على الفروة، وفرشة التدليك السيليكونية لتدليك مريح وتنظيف عميق. كل هذا بـ 49 د.ت فقط بدلاً من 110 د.ت.",
  images: [packCheveuxNatural],
  fullImage: true,
  oldPrice: 110,
  price: 49,
  badge: "عرض استثنائي 🔥 5 قطع بـ 49 د.ت",
  inStock: true,
  ingredients: [
    "سدر بيو (Poudre de Sidr Royal)",
    "زيت إكليل الجبل (Huile de Romarin)",
    "ديرما رولر 540 إبرة (Derma Roller 540)",
    "مشط الجذور لتوزيع الزيت (Peigne applicateur)",
    "فرشة تدليك فروة الرأس (Brosse de massage)",
  ],
  benefits: [
    "تقوية الشعر من الجذور والحد من التساقط",
    "تحفيز نمو الشعر وزيادة كثافته بزيت إكليل الجبل",
    "تنشيط الدورة الدموية في فروة الرأس بالديرما رولر والتدليك",
    "تنظيف وتغذية الشعر بالسدر الطبيعي ومنحه لمعاناً ونعومة",
    "مكونات طبيعية 100% بلا كيمياء",
    "توفير كبير : 49 د.ت فقط بدلاً من 110 د.ت (توفير 61 د.ت)",
  ],
  usage: [
    "مرر الديرما رولر بلطف على فروة الرأس النظيفة (1 إلى 2 مرات في الأسبوع)",
    "ضع زيت إكليل الجبل في مشط الجذور ووزعه مباشرة على فروة الرأس",
    "دلك فروة الرأس بفرشة التدليك لمدة 3 إلى 5 دقائق لتحسين امتصاص الزيت",
    "اترك الزيت ساعة على الأقل أو طوال الليل",
    "اخلط السدر بالماء الدافئ حتى يصبح عجينة، ضعه على الشعر 20 دقيقة ثم اشطفه جيداً",
  ],
  offers: [
    { quantity: 1, price: 49, label: "باك الشعر الطبيعي (5 قطع)" },
  ],
  reviews: [
    {
      name: "إيمان",
      city: "تونس",
      rating: 5,
      text: "الباك كامل ومتكامل، زيت إكليل الجبل مع الديرما رولر نقصلي التساقط برشا. ينصح بيه!",
    },
    {
      name: "رحمة",
      city: "سوسة",
      rating: 5,
      text: "السدر بيو ريحتو طبيعية وشعري ولى ناعم ويلمع. والسوم ما يتعداش.",
    },
    {
      name: "يوسف",
      city: "المهدية",
      rating: 5,
      text: "خذيتو لمرتي، 5 قطع بـ 49 دينار عرض ممتاز ووصل في يومين.",
    },
  ],
  faq: [
    {
      question: "كيفية استعمال الباك ؟",
      answer: "ديرما رولر ثم زيت إكليل الجبل بمشط الجذور، تدليك بالفرشة، واترك الزيت ساعة أو طوال الليل. استعمل السدر كقناع قبل غسل الشعر.",
    },
    {
      question: "متى تظهر النتائج ؟",
      answer: "مع الاستعمال المنتظم تبدأ النتائج بالظهور (نقص التساقط ونعومة الشعر) خلال 3 إلى 4 أسابيع.",
    },
    ...commonFaq.slice(2),
  ],
  contentBlocks: [
    {
      type: "image",
      image: packCheveuxNatural,
      title: "من الطبيعة لجذور شعرك",
      text: "سدر بيو + زيت إكليل الجبل • بلا كيمياء.",
    },
  ],
};

export const products: Product[] = [mainProduct, dihenKebritProduct, packDuoProduct, packCheveuxProduct];

export const categories = [
  { id: "all", label: "جميع المنتجات", emoji: "✨" },
  { id: "Soins des pieds & corps", label: "فازلين الحبة السوداء", emoji: "🌿" },
  { id: "Soins de la peau", label: "دهان كبريت طبيعي", emoji: "🟡" },
  { id: "Packs Économiques", label: "باك التوفير (Pack Duo)", emoji: "🎁" },
  { id: "Soins des cheveux", label: "باك الشعر الطبيعي", emoji: "💆" },
];

export const homeReviews: Review[] = [
  ...mainProduct.reviews,
  ...dihenKebritProduct.reviews,
  ...packDuoProduct.reviews,
  ...packCheveuxProduct.reviews,
];

