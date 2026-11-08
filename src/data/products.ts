import vaselineReal from "@/assets/vaseline-real.jpg";
import dihenKebritReal from "@/assets/dihen-kebrit-real.jpg";
import packDuoReal from "@/assets/pack-duo-real.jpg";
import packCheveuxNatural from "@/assets/pack-cheveux-affiche.jpg";
import packCheveux4Img from "@/assets/pack-cheveux-pack-4-pieces.jpg";
import packTrioPousseImg from "@/assets/pack-cheveux-trio-pousse.jpg";
import packTrioNaturelImg from "@/assets/pack-cheveux-trio-soin-naturel.jpg";
import packDuoAntiChuteImg from "@/assets/pack-cheveux-duo-anti-chute.jpg";
import packDuoSidrBrosseImg from "@/assets/pack-cheveux-duo-sidr-brosse.jpg";
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
  /** Contenu d'un pack, envoyé avec la commande pour la préparation */
  contents?: string | undefined;
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
  contents: "سدر بيو + زيت إكليل الجبل + ديرما رولر 540 + مشط الجذور + فرشة التدليك",
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

/* ------------------------------------------------------------------
 * Combinaisons dérivées du Pack Cheveux (5 pièces).
 * Produits de base : huile de romarin, sidr, derma roller, brosse de massage.
 * ------------------------------------------------------------------ */
const hairItems = {
  oil: "زيت إكليل الجبل (Huile de Romarin)",
  sidr: "سدر بيو (Poudre de Sidr Royal)",
  roller: "ديرما رولر 540 إبرة (Derma Roller 540)",
  brush: "فرشة تدليك فروة الرأس (Brosse de massage)",
};

const hairUsage = {
  roller: "مرر الديرما رولر بلطف على فروة الرأس النظيفة (1 إلى 2 مرات في الأسبوع)",
  oil: "ضع بضع قطرات من زيت إكليل الجبل على فروة الرأس واتركه ساعة على الأقل أو طوال الليل",
  brush: "دلك فروة الرأس بفرشة التدليك لمدة 3 إلى 5 دقائق",
  sidr: "اخلط السدر بالماء الدافئ حتى يصبح عجينة، ضعه على الشعر 20 دقيقة ثم اشطفه جيداً",
};

type HairKey = keyof typeof hairItems;

/** Noms courts envoyés dans la commande (libellé de l'offre) */
const hairShortNames: Record<HairKey, string> = {
  oil: "زيت إكليل الجبل",
  sidr: "سدر بيو",
  roller: "ديرما رولر 540",
  brush: "فرشة التدليك",
};

function makeHairPack(opts: {
  id: string;
  slug: string;
  name: string;
  offerLabel: string;
  image: string;
  items: HairKey[];
  price: number;
  oldPrice: number;
  badge: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  reviews: Review[];
}): Product {
  return {
    id: opts.id,
    slug: opts.slug,
    name: opts.name,
    category: "Soins des cheveux",
    shortDescription: opts.shortDescription,
    description: opts.description,
    images: [opts.image],
    fullImage: true,
    contents: opts.items.map((k) => hairShortNames[k]).join(" + "),
    oldPrice: opts.oldPrice,
    price: opts.price,
    badge: opts.badge,
    inStock: true,
    ingredients: opts.items.map((k) => hairItems[k]),
    benefits: [
      ...opts.benefits,
      `توفير : ${opts.price} د.ت فقط بدلاً من ${opts.oldPrice} د.ت (توفير ${opts.oldPrice - opts.price} د.ت)`,
    ],
    // Ordre logique d'utilisation : roller → huile → brosse → sidr
    usage: (["roller", "oil", "brush", "sidr"] as HairKey[])
      .filter((k) => opts.items.includes(k))
      .map((k) => hairUsage[k]),
    // Le contenu du pack est inclus dans le libellé pour apparaître dans la commande
    offers: [
      {
        quantity: 1,
        price: opts.price,
        label: `${opts.offerLabel} : ${opts.items.map((k) => hairShortNames[k]).join(" + ")}`,
      },
    ],
    reviews: opts.reviews,
    faq: [
      {
        question: "متى تظهر النتائج ؟",
        answer: "مع الاستعمال المنتظم تبدأ النتائج بالظهور (نقص التساقط ونعومة الشعر) خلال 3 إلى 4 أسابيع.",
      },
      ...commonFaq.slice(2),
    ],
    contentBlocks: [],
  };
}

/** Pack de 4 : le pack complet sans l'applicateur d'huile */
export const packCheveux4Product = makeHairPack({
  id: "pack-cheveux-4-005",
  slug: "pack-cheveux-4-pieces",
  name: "باك الشعر الكامل (4 قطع)",
  offerLabel: "باك الشعر الكامل (4 قطع)",
  image: packCheveux4Img,
  items: ["oil", "sidr", "roller", "brush"],
  price: 39,
  oldPrice: 49,
  badge: "عرض خاص 🔥 4 قطع بـ 39 د.ت",
  shortDescription: "زيت إكليل الجبل + سدر بيو + ديرما رولر 540 + فرشة التدليك — 4 قطع بـ 39 د.ت فقط",
  description:
    "كل ما تحتاجه لروتين متكامل للعناية بجذور الشعر: زيت إكليل الجبل لتحفيز النمو، الديرما رولر لتنشيط فروة الرأس، فرشة التدليك لتحسين الامتصاص، والسدر البيو لتنظيف وتغذية الشعر. نفس الباك الكامل بدون مشط التوزيع، بـ 39 د.ت فقط.",
  benefits: [
    "تقوية الشعر من الجذور والحد من التساقط",
    "تحفيز نمو الشعر وزيادة كثافته",
    "تنشيط الدورة الدموية في فروة الرأس",
    "تنظيف وتغذية الشعر ومنحه لمعاناً ونعومة",
  ],
  reviews: [
    { name: "سناء", city: "صفاقس", rating: 5, text: "الباك كامل والسوم مناسب، الشعر ولى أقوى من الشهر الأول." },
    { name: "مريم", city: "بنزرت", rating: 5, text: "ما كنتش نحتاج المشط، الباك هذا جاني بالضبط. شكراً." },
  ],
});

/** Pack de 3 : stimulation de la pousse */
export const packCheveuxTrioPousseProduct = makeHairPack({
  id: "pack-cheveux-3-pousse-006",
  slug: "pack-trio-pousse-cheveux",
  name: "تريو تحفيز النمو (3 قطع)",
  offerLabel: "تريو تحفيز النمو (3 قطع)",
  image: packTrioPousseImg,
  items: ["oil", "roller", "brush"],
  price: 32,
  oldPrice: 45,
  badge: "الأكثر فعالية ضد التساقط 💪",
  shortDescription: "زيت إكليل الجبل + ديرما رولر 540 + فرشة التدليك — 3 قطع بـ 32 د.ت",
  description:
    "الثلاثي الأقوى ضد تساقط الشعر: الديرما رولر ينشط فروة الرأس، زيت إكليل الجبل يغذي الجذور ويحفز النمو، وفرشة التدليك تساعد على امتصاص الزيت بعمق.",
  benefits: [
    "تحفيز نمو الشعر وزيادة كثافته",
    "الحد من التساقط بفضل زيت إكليل الجبل",
    "امتصاص أفضل للزيت بالديرما رولر والتدليك",
  ],
  reviews: [
    { name: "أنيس", city: "تونس", rating: 5, text: "الديرما رولر مع الزيت نتيجة واضحة في الفراغات." },
    { name: "هالة", city: "نابل", rating: 5, text: "التساقط نقص برشا بعد 3 أسابيع." },
  ],
});

/** Pack de 3 : soin naturel doux (sans derma roller) */
export const packCheveuxTrioNaturelProduct = makeHairPack({
  id: "pack-cheveux-3-naturel-007",
  slug: "pack-trio-soin-naturel",
  name: "تريو العناية الطبيعية (3 قطع)",
  offerLabel: "تريو العناية الطبيعية (3 قطع)",
  image: packTrioNaturelImg,
  items: ["oil", "sidr", "brush"],
  price: 29,
  oldPrice: 42,
  badge: "طبيعي 100% 🌿",
  shortDescription: "زيت إكليل الجبل + سدر بيو + فرشة التدليك — 3 قطع بـ 29 د.ت",
  description:
    "روتين طبيعي ولطيف للعناية بالشعر: زيت إكليل الجبل لتغذية الجذور، السدر البيو لتنظيف الشعر وتقويته، وفرشة التدليك لتدليك مريح وتنظيف عميق لفروة الرأس. مناسب لمن لا يريد استعمال الديرما رولر.",
  benefits: ["تغذية الجذور وتقوية الشعر", "تنظيف طبيعي بلا كيمياء بالسدر", "شعر ناعم ولامع"],
  reviews: [
    { name: "نور", city: "سوسة", rating: 5, text: "السدر مع الزيت خلاو شعري ناعم برشا." },
    { name: "ريم", city: "القيروان", rating: 5, text: "منتجات طبيعية والفرشة مريحة برشا." },
  ],
});

/** Pack de 2 : duo anti-chute */
export const packCheveuxDuoAntiChuteProduct = makeHairPack({
  id: "pack-cheveux-2-antichute-008",
  slug: "pack-duo-anti-chute",
  name: "ديو ضد التساقط (قطعتين)",
  offerLabel: "ديو ضد التساقط (قطعتين)",
  image: packDuoAntiChuteImg,
  items: ["oil", "roller"],
  price: 25,
  oldPrice: 35,
  badge: "الثنائي المثالي ✨",
  shortDescription: "زيت إكليل الجبل + ديرما رولر 540 — قطعتين بـ 25 د.ت",
  description:
    "الثنائي الأساسي لتحفيز نمو الشعر: الديرما رولر ينشط فروة الرأس ويحسن امتصاص زيت إكليل الجبل الذي يقوي الجذور ويحد من التساقط.",
  benefits: ["تحفيز نمو الشعر", "الحد من التساقط", "امتصاص أفضل للزيت بالديرما رولر"],
  reviews: [
    { name: "كريم", city: "المنستير", rating: 5, text: "بسيط وفعال، نستعملو مرتين في الجمعة." },
    { name: "أسماء", city: "قابس", rating: 5, text: "سوم مزيان ونتيجة باهية." },
  ],
});

/** Pack de 2 : duo nettoyage & massage */
export const packCheveuxDuoNettoyageProduct = makeHairPack({
  id: "pack-cheveux-2-nettoyage-009",
  slug: "pack-duo-sidr-brosse",
  name: "ديو السدر والتدليك (قطعتين)",
  offerLabel: "ديو السدر والتدليك (قطعتين)",
  image: packDuoSidrBrosseImg,
  items: ["sidr", "brush"],
  price: 19,
  oldPrice: 29,
  badge: "أفضل سعر 💚",
  shortDescription: "سدر بيو + فرشة التدليك — قطعتين بـ 19 د.ت",
  description:
    "لتنظيف عميق وطبيعي لفروة الرأس: السدر البيو ينظف ويغذي الشعر بلطف، وفرشة التدليك السيليكونية تزيل الشوائب وتنشط الدورة الدموية أثناء الغسل.",
  benefits: ["تنظيف عميق لفروة الرأس", "تقليل القشرة والدهون الزائدة", "شعر ناعم ولامع بشكل طبيعي"],
  reviews: [
    { name: "إيناس", city: "أريانة", rating: 5, text: "الفرشة مع السدر في الدوش حاجة ممتازة." },
    { name: "سلمى", city: "مدنين", rating: 5, text: "سوم صغير وجودة باهية." },
  ],
});

export const products: Product[] = [
  mainProduct,
  dihenKebritProduct,
  packDuoProduct,
  packCheveuxProduct,
  packCheveux4Product,
  packCheveuxTrioPousseProduct,
  packCheveuxTrioNaturelProduct,
  packCheveuxDuoAntiChuteProduct,
  packCheveuxDuoNettoyageProduct,
];

export const categories = [
  { id: "all", label: "جميع المنتجات", emoji: "✨" },
  { id: "Soins des pieds & corps", label: "فازلين الحبة السوداء", emoji: "🌿" },
  { id: "Soins de la peau", label: "دهان كبريت طبيعي", emoji: "🟡" },
  { id: "Packs Économiques", label: "باك التوفير (Pack Duo)", emoji: "🎁" },
  { id: "Soins des cheveux", label: "باقات الشعر الطبيعي", emoji: "💆" },
];

export const homeReviews: Review[] = [
  ...mainProduct.reviews,
  ...dihenKebritProduct.reviews,
  ...packDuoProduct.reviews,
  ...packCheveuxProduct.reviews,
];

