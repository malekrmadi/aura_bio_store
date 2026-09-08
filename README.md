# Aura Bio: Natural Glow

Je veux créer un site e-commerce frontend-only pour une marque tunisienne appelée "Aura Bio".

IMPORTANT :

Je veux un site SIMPLE, MODERNE, ÉLÉGANT et surtout TRÈS FACILE À UTILISER.

Le public cible est principalement tunisien. Il ne faut donc surtout pas créer une interface compliquée ou trop "tech". L'objectif est que quelqu'un qui n'est pas particulièrement à l'aise avec les sites e-commerce puisse comprendre immédiatement :

1. ce que nous vendons

2. combien ça coûte

3. ce que le produit apporte

4. comment commander

5. où renseigner son téléphone et son adresse

Le site doit être pensé avant tout pour MOBILE, car la majorité des visiteurs viendront probablement de Facebook, Instagram et TikTok.

==================================================

1. IDENTITÉ VISUELLE

==================================================

La marque s'appelle :

Aura Bio

Le logo fourni doit être utilisé comme logo principal du site.

J'ai également fourni une image de couverture / bannière avec une ambiance naturelle :

- plantes

- feuilles

- lumière naturelle

- gouttes d'eau

- ambiance bio

- couleurs vertes, beige, crème et naturelles

Utilise cette image comme inspiration visuelle pour le site et éventuellement comme Hero/Banner de la homepage.

L'identité visuelle doit transmettre :

- naturel

- soin

- confiance

- douceur

- qualité

- produits naturels

- beauté

- bien-être

Palette recommandée :

- vert naturel / vert forêt doux

- vert sauge

- beige / crème

- blanc cassé

- touches dorées très légères si nécessaire

Évite les couleurs trop agressives ou trop saturées.

Le design doit être premium mais accessible.

Pas de design luxueux compliqué.

Pas de gros effets inutiles.

Pas de site qui ressemble à une marketplace.

Le logo doit rester très visible et respirer.

==================================================

2. TECHNOLOGIE

==================================================

Créer uniquement le FRONTEND.

Stack :

- React

- Vite

- JavaScript ou TypeScript

- CSS classique / CSS Modules

- Responsive design

PAS DE BACKEND.

PAS DE DATABASE.

PAS D'AUTHENTIFICATION.

PAS D'ADMIN DASHBOARD.

PAS DE système utilisateur complexe.

Les produits doivent être stockés dans des données locales faciles à modifier, par exemple :

src/data/products.js

Je veux pouvoir plus tard modifier facilement :

- nom

- prix

- ancien prix

- images

- description

- ingrédients

- bénéfices

- utilisation

- avis

- offres

- stock

- catégories

L'architecture doit être propre afin que je puisse connecter plus tard Google Sheets / Google Apps Script pour récupérer les produits et enregistrer les commandes.

Ne mets donc pas toute la logique directement dans les composants.

Prévoir une petite couche de service, par exemple :

services/productService.js

services/orderService.js

Pour l'instant ces services peuvent utiliser des données mock/locales.

==================================================

3. STRUCTURE DU SITE

==================================================

Je veux une structure très simple.

Pages principales :

1. Accueil

2. Produits / Catalogue

3. Page produit

4. Panier

5. Commande / Checkout

Mais le parcours doit pouvoir être extrêmement rapide.

Exemple :

Facebook Ad

↓

Page produit

↓

Choix quantité / offre

↓

Informations client

↓

Commander

Je veux donc que la page produit puisse presque fonctionner comme une landing page + checkout.

==================================================

4. HOMEPAGE

==================================================

Créer une homepage simple.

SECTION HERO :

Utiliser l'image de couverture fournie comme inspiration.

Afficher :

"Aura Bio"

Un slogan court autour du naturel et du soin.

Exemple :

"Le soin naturel, simplement."

Sous le slogan :

"Découvrez nos soins naturels pour la peau, les cheveux et le corps."

CTA principal :

"Découvrir nos produits"

CTA secondaire éventuellement :

"Commander maintenant"

Ne pas mettre trop de texte.

-----------------------------------

SECTION CATÉGORIES

Afficher quelques catégories sous forme de cartes :

🌿 Soins du corps

💆 Soins des cheveux

🦶 Soins des pieds

🫒 Huiles naturelles

✨ Beauté & bien-être

Les catégories doivent pouvoir être modifiées facilement.

-----------------------------------

SECTION PRODUITS POPULAIRES

Afficher 3 à 6 produits.

Chaque carte produit doit afficher :

- image principale

- nom

- courte description

- ancien prix si disponible

- nouveau prix

- badge éventuel "PROMO"

- bouton "Voir le produit"

- éventuellement "Commander"

Exemple :

Crème Soin des Pieds

 ~35 DT~

 29 DT

PROMO

"Voir le produit"

-----------------------------------

SECTION POURQUOI AURA BIO ?

Créer une section très visuelle avec 3 ou 4 arguments :

🌿 Ingrédients naturels

❤️ Pensé pour votre bien-être

🇹🇳 Marque tunisienne

📦 Livraison en Tunisie

Les textes doivent être courts.

-----------------------------------

SECTION AVIS CLIENTS

Créer un carousel d'avis clients.

Exemple :

"J'ai beaucoup aimé le produit, mes pieds sont beaucoup plus doux."

★★★★★

"Amel — Tunis"

Utiliser des données mock.

Prévoir plusieurs avis.

Le carousel doit être très simple sur mobile.

-----------------------------------

SECTION BANNER

Créer une petite bannière promotionnelle :

"Prenez soin de vous naturellement."

"Découvrez nos offres du moment."

CTA :

"Voir les offres"

-----------------------------------

FOOTER

Afficher :

Aura Bio

"Le soin naturel, simplement."

Liens :

- Accueil

- Produits

- À propos

- Contact

- Livraison

- Conditions

Contact :

Téléphone

WhatsApp

Mention :

"Livraison partout en Tunisie"

==================================================

5. CATALOGUE PRODUITS

==================================================

Créer une page /products.

Afficher les produits sous forme de grille.

Sur mobile :

1 colonne

Sur tablette :

2 colonnes

Desktop :

3 ou 4 colonnes selon l'espace.

Prévoir un système simple de filtres :

- Tous

- Soins du corps

- Cheveux

- Pieds

- Huiles

- Beauté

Pas de système de filtrage compliqué.

Chaque produit doit afficher :

IMAGE

NOM

DESCRIPTION COURTE

PRIX ANCIEN

PRIX ACTUEL

BADGE PROMO si nécessaire

CTA

Exemple :

--------------------------------

[ IMAGE PRODUIT ]

Soin Intensif des Pieds

Vaseline + huile de nigelle + cire d'abeille

35 DT   29 DT

-17%

[ Voir le produit ]

--------------------------------

==================================================

6. PAGE PRODUIT

==================================================

C'est la page LA PLUS IMPORTANTE du site.

Elle doit être conçue pour convertir quelqu'un venant d'une publicité Facebook / Instagram / TikTok.

Structure :

-----------------------------------

GALERIE PRODUIT

-----------------------------------

Afficher plusieurs photos du produit.

Prévoir :

- image principale

- thumbnails

- possibilité de changer l'image

- zoom léger éventuellement

Sur mobile :

carousel/swipe.

-----------------------------------

INFORMATIONS PRODUIT

-----------------------------------

Nom

Badge :

"BEST SELLER"

ou

"PROMO"

Ancien prix barré

Nouveau prix en évidence

Exemple :

35 DT

29 DT

Puis une phrase très courte expliquant le produit.

Exemple :

"Un soin naturel conçu pour nourrir et adoucir les pieds secs."

-----------------------------------

OFFRES / QUANTITÉS

-----------------------------------

Prévoir un système d'offres très visible.

Exemple :

OFFRE 1

1 produit

29 DT

OFFRE 2 ⭐

2 produits

49 DT

Soit 24,5 DT / produit

OFFRE 3

3 produits

69 DT

L'utilisateur peut sélectionner une offre.

Le prix total doit se mettre à jour automatiquement.

Le système doit être générique afin que chaque produit puisse avoir ses propres offres.

Par exemple :

offers: [

  {

    quantity: 1,

    price: 29,

    label: "1 produit"

  },

  {

    quantity: 2,

    price: 49,

    label: "2 produits",

    badge: "MEILLEURE OFFRE"

  }

]

-----------------------------------

QUANTITÉ

-----------------------------------

Ajouter + et -.

Mais ne pas rendre cette partie compliquée si une offre est sélectionnée.

-----------------------------------

CTA PRINCIPAL

-----------------------------------

Un gros bouton :

"Commander maintenant"

Sur mobile, prévoir éventuellement un bouton sticky en bas :

"Commander — 29 DT"

Ce bouton doit rester visible lorsque c'est pertinent.

-----------------------------------

DESCRIPTION

-----------------------------------

Créer des sections simples :

Pourquoi l'utiliser ?

Bénéfices :

✓ Nourrit la peau

✓ Aide à maintenir la douceur

✓ Idéal pour les zones sèches

✓ Texture agréable

✓ Utilisation facile

IMPORTANT :

Ne pas inventer de propriétés médicales ou thérapeutiques.

Les bénéfices doivent être présentés comme des informations cosmétiques / de soin et non comme des promesses médicales.

-----------------------------------

INGRÉDIENTS

-----------------------------------

Afficher les ingrédients de manière claire.

Exemple :

Huile de nigelle

Cire d'abeille

Vaseline

Créer éventuellement des petites cartes avec icônes.

-----------------------------------

MODE D'UTILISATION

-----------------------------------

Afficher une procédure très simple.

1. Nettoyer la zone

2. Appliquer une petite quantité

3. Masser doucement

4. Utiliser régulièrement

Le contenu doit être configurable pour chaque produit.

-----------------------------------

CONTENU VISUEL

-----------------------------------

Après la présentation du produit, prévoir une ou plusieurs sections permettant d'afficher :

- image promotionnelle

- image avant/après si fournie

- affiche informative

- photo lifestyle

- banner

- contenu éducatif

Ces éléments doivent être configurables dans les données du produit.

Par exemple :

contentBlocks: [

  {

    type: "image",

    image: "...",

    title: "...",

    text: "..."

  }

]

-----------------------------------

AVIS CLIENTS

-----------------------------------

Afficher plusieurs avis.

★★★★★

"Très bon produit, j'ai beaucoup aimé."

Nom du client

Ville

Ajouter éventuellement une photo si elle existe.

-----------------------------------

FAQ

-----------------------------------

Quelques questions simples :

Comment utiliser le produit ?

Combien de temps faut-il l'utiliser ?

Comment se passe la livraison ?

Est-ce que la livraison est disponible partout en Tunisie ?

Comment commander ?

-----------------------------------

CTA FINAL

-----------------------------------

Terminer la page avec un gros bloc :

"Prêt à prendre soin de vous ?"

[ Commander maintenant ]

==================================================

7. CHECKOUT / COMMANDE

==================================================

Je veux absolument que la commande soit SIMPLE.

Pas de création de compte.

Pas de login.

Pas de mot de passe.

Pas de processus compliqué.

Le client sélectionne son produit / offre puis arrive directement à un formulaire.

Titre :

"Finaliser ma commande"

Afficher un résumé :

Produit

Quantité

Offre

Prix

Livraison

TOTAL

-----------------------------------

FORMULAIRE CLIENT :

Nom et prénom *

Téléphone *

Gouvernorat *

Ville / Délégation *

Adresse *

Note / complément d'adresse (optionnel)

Prévoir un select avec les 24 gouvernorats tunisiens.

Les champs doivent être très faciles à comprendre.

Téléphone :

format tunisien.

-----------------------------------

LIVRAISON

Afficher clairement :

"Livraison partout en Tunisie"

Le coût de livraison doit être configurable.

Par exemple :

Livraison : 7 DT

Total :

56 DT

-----------------------------------

PAIEMENT

Pour la première version, prévoir :

"Paiement à la livraison"

Avec une petite explication :

"Vous payez à la réception de votre commande."

Ne pas intégrer de paiement bancaire pour l'instant.

Je pourrai ajouter cela plus tard.

-----------------------------------

BOUTON FINAL :

"CONFIRMER MA COMMANDE"

Le bouton doit être très visible.

Après validation, afficher une page de confirmation très simple :

"Merci pour votre commande ! ❤️"

"Votre commande a bien été enregistrée."

"Nous allons vous contacter prochainement pour confirmer votre commande."

Afficher :

Numéro de commande

Nom

Téléphone

Total

Ajouter éventuellement :

"Besoin d'aide ? Contactez-nous sur WhatsApp."

==================================================

8. PANIER

==================================================

Créer un panier simple.

Le panier doit permettre :

- voir les produits

- modifier quantité

- supprimer

- voir sous-total

- voir livraison

- voir total

- passer commande

Le panier doit être sauvegardé dans localStorage.

Afficher un petit compteur sur l'icône panier dans le header.

Mais IMPORTANT :

Pour une commande provenant d'une publicité, l'utilisateur ne doit pas être obligé de passer par le panier.

Depuis une page produit :

"Commander maintenant"

peut l'envoyer directement vers le checkout avec le produit sélectionné.

==================================================

9. HEADER

==================================================

Header très simple.

Desktop :

Logo Aura Bio

Accueil

Produits

À propos

Contact

Panier 🛒

Mobile :

Logo

Panier

Menu hamburger

Le header doit rester propre.

Sur mobile, éventuellement rendre le header sticky.

==================================================

10. MOBILE FIRST

==================================================

C'est une priorité absolue.

Le site doit être pensé d'abord pour :

iPhone / Android

Puis tablette et desktop.

Les boutons doivent être suffisamment grands.

Les textes doivent être lisibles.

Ne pas mettre trop d'informations côte à côte.

Les formulaires doivent être extrêmement simples.

Les CTA doivent être visibles.

==================================================

11. EXPÉRIENCE UTILISATEUR

==================================================

Je veux appliquer cette règle :

"Si une information n'est pas nécessaire pour acheter, ne pas la mettre au premier plan."

Le site doit être :

Simple

Rapide

Rassurant

Visuel

Facile à comprendre

Éviter :

- animations excessives

- popups agressifs

- menus complexes

- dizaines de filtres

- comptes utilisateurs

- fonctionnalités inutiles

- design trop chargé

- textes trop longs

Les animations doivent être discrètes :

fade

slide léger

hover

transition douce

==================================================

12. DONNÉES PRODUITS

==================================================

Créer au minimum 5 produits fictifs pour montrer le fonctionnement du site.

Exemples de catégories :

1. Soin des pieds

2. Huile naturelle

3. Soin des cheveux

4. Soin du corps

5. Produit beauté

Créer une structure de données complète.

Exemple :

{

  id: "foot-care-001",

  slug: "soin-pieds",

  name: "Soin Intensif des Pieds",

  category: "Soins des pieds",

  shortDescription: "...",

  description: "...",

  images: [

    "...",

    "...",

    "..."

  ],

  oldPrice: 35,

  price: 29,

  badge: "PROMO",

  ingredients: [

    "...",

    "...",

    "..."

  ],

  benefits: [

    "...",

    "...",

    "..."

  ],

  usage: [

    "...",

    "...",

    "..."

  ],

  offers: [

    {

      quantity: 1,

      price: 29,

      label: "1 produit"

    },

    {

      quantity: 2,

      price: 49,

      label: "2 produits",

      badge: "MEILLEURE OFFRE"

    }

  ],

  reviews: [],

  faq: [],

  contentBlocks: []

}

Cette structure doit permettre d'ajouter facilement de nouveaux produits sans modifier les composants React.

==================================================

13. GOOGLE SHEETS — PRÉPARATION

==================================================

Je gérerai moi-même plus tard la connexion avec Google Sheets.

Pour l'instant, NE PAS créer de backend.

Mais le code doit être préparé pour que je puisse remplacer facilement :

submitOrder(order)

par une fonction qui envoie les données vers Google Apps Script / Google Sheets.

Créer par exemple :

services/orderService.js

avec :

submitOrder(order)

Pour l'instant :

- simuler l'enregistrement

- retourner un numéro de commande

- afficher la confirmation

La commande doit avoir une structure claire :

{

  orderId,

  createdAt,

  customer: {

    name,

    phone,

    governorate,

    city,

    address,

    note

  },

  items: [],

  subtotal,

  deliveryFee,

  total,

  paymentMethod,

  status

}

Je veux pouvoir brancher Google Sheets plus tard sans devoir refaire tout le frontend.

==================================================

14. SEO

==================================================

Prévoir les bases SEO :

- title

- meta description

- Open Graph

- URLs propres pour les produits

- slug produit

- alt text des images

Exemple :

/products/soin-intensif-pieds

Les pages produits doivent avoir leur propre title et description.

==================================================

15. PERFORMANCE

==================================================

Optimiser le site pour mobile.

Images lazy-loaded lorsque pertinent.

Éviter les bibliothèques inutiles.

Éviter les animations lourdes.

Le site doit charger rapidement même avec une connexion mobile moyenne.

==================================================

16. DESIGN SYSTEM

==================================================

Créer quelques composants réutilisables :

Header

Footer

Button

ProductCard

ProductGallery

Price

OfferSelector

QuantitySelector

ReviewCarousel

FAQ

CategoryCard

CartItem

OrderSummary

CheckoutForm

SectionTitle

PromoBanner

Créer des styles cohérents.

Les boutons principaux doivent avoir un style facilement identifiable.

Le prix actuel doit être très visible.

L'ancien prix doit être barré et visuellement secondaire.

Les promotions doivent être visibles mais pas agressives.

==================================================

17. IMPORTANT : NE PAS SUR-DESIGNER

==================================================

Je préfère un site très simple et extrêmement efficace plutôt qu'un site avec énormément de fonctionnalités.

Imagine que le client arrive depuis une publicité Facebook sur son téléphone.

Il doit pouvoir :

VOIR LE PRODUIT

↓

COMPRENDRE LE PRODUIT

↓

VOIR LE PRIX

↓

CHOISIR UNE OFFRE

↓

CLIQUER "COMMANDER"

↓

RENTRER SON NOM + TÉLÉPHONE + ADRESSE

↓

CONFIRMER

en quelques étapes seulement.

==================================================

18. LIVRABLE FINAL

==================================================

Créer une application React complète et fonctionnelle avec :

- Homepage

- Catalogue

- Pages produits dynamiques

- Galerie photos

- Promotions

- Offres multi-quantités

- Panier

- Checkout

- Formulaire tunisien

- Gouvernorats tunisiens

- Paiement à la livraison

- Page confirmation

- Avis clients

- FAQ

- Responsive mobile/tablette/desktop

- données mock

- architecture prête pour Google Sheets

- SEO de base

- localStorage panier

Utiliser le logo Aura Bio et l'univers visuel naturel fourni comme référence.

Avant de terminer, vérifier que tout le parcours suivant fonctionne :

Homepage → Produit → Offre → Commander → Checkout → Confirmation

et :

Homepage → Catalogue → Produit → Panier → Checkout → Confirmation.

Le résultat doit ressembler à une vraie petite marque e-commerce tunisienne de produits naturels, et non à un template générique de SaaS. du coup je tai mis plusierus imahge , logo de aura bio , couverture de aura bio ça peut etre une hero section , et 3 image de mon produit a mettre pour presenter le produit , et 3 affiche aussi a mettre en complement en bas de la section produit et c etc commme info supplementaires sur la page du produit s,  , fais moi un bon site stp

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aura-bio-boutique.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3710d168-6e9e-464c-b5e3-462388b15a5f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
#   a u r a _ b i o _ s t o r e  
 