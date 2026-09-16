export type Governorate = {
  id: string;
  nameAr: string;
  nameFr: string;
  label: string;
};

export const governorateList: Governorate[] = [
  { id: "Ariana", nameAr: "أريانة", nameFr: "Ariana", label: "أريانة (Ariana)" },
  { id: "Béja", nameAr: "باجة", nameFr: "Béja", label: "باجة (Béja)" },
  { id: "Ben Arous", nameAr: "بن عروس", nameFr: "Ben Arous", label: "بن عروس (Ben Arous)" },
  { id: "Bizerte", nameAr: "بنزرت", nameFr: "Bizerte", label: "بنزرت (Bizerte)" },
  { id: "Gabès", nameAr: "قابس", nameFr: "Gabès", label: "قابس (Gabès)" },
  { id: "Gafsa", nameAr: "قفصة", nameFr: "Gafsa", label: "قفصة (Gafsa)" },
  { id: "Jendouba", nameAr: "جندوبة", nameFr: "Jendouba", label: "جندوبة (Jendouba)" },
  { id: "Kairouan", nameAr: "القيروان", nameFr: "Kairouan", label: "القيروان (Kairouan)" },
  { id: "Kasserine", nameAr: "القصرين", nameFr: "Kasserine", label: "القصرين (Kasserine)" },
  { id: "Kébili", nameAr: "قبلي", nameFr: "Kébili", label: "قبلي (Kébili)" },
  { id: "Le Kef", nameAr: "الكاف", nameFr: "Le Kef", label: "الكاف (Le Kef)" },
  { id: "Mahdia", nameAr: "المهدية", nameFr: "Mahdia", label: "المهدية (Mahdia)" },
  { id: "La Manouba", nameAr: "منوبة", nameFr: "La Manouba", label: "منوبة (La Manouba)" },
  { id: "Médenine", nameAr: "مدنين", nameFr: "Médenine", label: "مدنين (Médenine)" },
  { id: "Monastir", nameAr: "المنستير", nameFr: "Monastir", label: "المنستير (Monastir)" },
  { id: "Nabeul", nameAr: "نابل", nameFr: "Nabeul", label: "نابل (Nabeul)" },
  { id: "Sfax", nameAr: "صفاقس", nameFr: "Sfax", label: "صفاقس (Sfax)" },
  { id: "Sidi Bouzid", nameAr: "سيدي بوزيد", nameFr: "Sidi Bouzid", label: "سيدي بوزيد (Sidi Bouzid)" },
  { id: "Siliana", nameAr: "سليانة", nameFr: "Siliana", label: "سليانة (Siliana)" },
  { id: "Sousse", nameAr: "سوسة", nameFr: "Sousse", label: "سوسة (Sousse)" },
  { id: "Tataouine", nameAr: "تطاوين", nameFr: "Tataouine", label: "تطاوين (Tataouine)" },
  { id: "Tozeur", nameAr: "توزر", nameFr: "Tozeur", label: "توزر (Tozeur)" },
  { id: "Tunis", nameAr: "تونس", nameFr: "Tunis", label: "تونس (Tunis)" },
  { id: "Zaghouan", nameAr: "زغوان", nameFr: "Zaghouan", label: "زغوان (Zaghouan)" },
];

export const governorates = governorateList.map((g) => g.id);

export const DELIVERY_FEE = 7;
export const SHOP_PHONE = "+216 20 000 000";
export const SHOP_WHATSAPP = "21620000000";
