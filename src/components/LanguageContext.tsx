import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface Translation {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
  };
}

export const translations: Translation = {
  // Brand
  brandName: { en: 'JACOB VAULT', fr: 'JACOB VAULT', ar: 'جاكوب فولت' },

  // Navigation
  shop: { en: 'Shop', fr: 'Boutique', ar: 'متجر' },
  lookbook: { en: 'Lookbook', fr: 'Catalogue', ar: 'كتاب الإطلالات' },
  philosophy: { en: 'Philosophy', fr: 'Philosophie', ar: 'الفلسفة' },
  identity: { en: 'Wear Your Identity', fr: 'Portez Votre Identité', ar: 'ارتدِ هويتك' },
  latestDrop: { en: 'Latest Drop', fr: 'Dernière Sortie', ar: 'أحدث إصدار' },
  coreArchive: { en: 'Core Archive', fr: 'Archives de Base', ar: 'الأرشيف الأساسي' },
  studioProfile: { en: 'Vault Profile', fr: 'Profil Vault', ar: 'ملف الخزانة' },
  accessArchive: { en: 'Access Vault', fr: 'Accéder à la Vault', ar: 'دخول الخزانة' },
  searchArchive: { en: 'Search Vault', fr: 'Rechercher Vault', ar: 'بحث في الخزانة' },
  navMenu: { en: 'Navigational Menu', fr: 'Menu de Navigation', ar: 'قائمة التنقل' },
  socials: { en: 'Socials', fr: 'Réseaux', ar: 'التواصل الاجتماعي' },
  inquiries: { en: 'Inquiries', fr: 'Demandes', ar: 'الاستفسارات' },
  rights: { en: 'All Rights Reserved', fr: 'Tous Droits Réservés', ar: 'جميع الحقوق محفوظة' },

  // Hero & CTA
  shopCollection: { en: 'Shop Collection', fr: 'Voir la Collection', ar: 'تسوق المجموعة' },
  watchFilm: { en: 'Watch Film', fr: 'Regarder le Film', ar: 'شاهد الفيلم' },
  limitedDrop: { en: 'Limited Drop', fr: 'Édition Limitée', ar: 'إصدار محدود' },
  archetype: { en: 'Archetype', fr: 'Archétype', ar: 'النموذج الأصلي' },

  // Shop
  all: { en: 'All', fr: 'Tout', ar: 'الكل' },
  men: { en: 'Men', fr: 'Hommes', ar: 'رجال' },
  women: { en: 'Women', fr: 'Femmes', ar: 'نساء' },
  kids: { en: 'Kids', fr: 'Enfants', ar: 'أطفال' },
  outerwear: { en: 'Outerwear', fr: 'Manteaux', ar: 'ملابس خارجية' },
  tailoring: { en: 'Tailoring', fr: 'Tailleur', ar: 'خياطة' },
  knitwear: { en: 'Knitwear', fr: 'Tricots', ar: 'ملابس محبوكة' },
  accessories: { en: 'Accessories', fr: 'Accessoires', ar: 'إكسسوارات' },
  searchPlaceholder: { en: 'Search Vault...', fr: 'Rechercher dans la Vault...', ar: 'بحث في الخزانة...' },
  filterSort: { en: 'Filter & Sort', fr: 'Filtrer & Trier', ar: 'تصفية وفرز' },
  results: { en: 'Results Found', fr: 'Résultats Trouvés', ar: 'نتائج تم العثور عليها' },
  segment: { en: 'Segment', fr: 'Segment', ar: 'القطاع' },
  category: { en: 'Category', fr: 'Catégorie', ar: 'الفئة' },
  collection: { en: 'Collection', fr: 'Collection', ar: 'المجموعة' },
  close: { en: 'Close', fr: 'Fermer', ar: 'إغلاق' },
  sortBy: { en: 'Sort By', fr: 'Trier par', ar: 'ترتيب حسب' },
  priceRange: { en: 'Price Range', fr: 'Gamme de Prix', ar: 'نطاق السعر' },
  resetAll: { en: 'Reset All Filters', fr: 'Réinitialiser les Filtres', ar: 'إعادة ضبط الفلاتر' },
  applyProtocol: { en: 'Apply Protocol', fr: 'Appliquer le Protocole', ar: 'تطبيق البروتوكول' },
  quickAdd: { en: 'Quick Add', fr: 'Ajout Rapide', ar: 'إضافة سريعة' },
  colors: { en: 'Colors', fr: 'Couleurs', ar: 'ألوان' },
  noRecords: { en: 'No Vault Records Found', fr: 'Aucun Enregistrement Trouvé', ar: 'لم يتم العثور على سجلات' },
  clearAll: { en: 'Clear All', fr: 'Effacer Tout', ar: 'مسح الكل' },
  active: { en: 'Active', fr: 'Actif', ar: 'نشط' },
  latestArrivals: { en: 'Latest Arrivals', fr: 'Dernières Arrivées', ar: 'وصل حديثاً' },
  priceLowHigh: { en: 'Price: Low to High', fr: 'Prix: Croissant', ar: 'السعر: من الأقل للأعلى' },
  priceHighLow: { en: 'Price: High to Low', fr: 'Prix: Décroissant', ar: 'السعر: من الأعلى للأقل' },

  // Product Data
  kineticShell: { en: 'Kinetic Shell', fr: 'Coque Cinétique', ar: 'غلاف حركي' },
  draftsmanTrousers: { en: 'Draftsman Trousers', fr: 'Pantalon Dessinateur', ar: 'بنطال المصمم' },
  voidKnit: { en: 'Void Knit', fr: 'Tricot du Vide', ar: 'نسيج الفراغ' },
  observerParka: { en: 'Observer Parka', fr: 'Parka Observateur', ar: 'باركا المراقب' },

  // Product Detail UI
  backToCollection: { en: 'Back to Collection', fr: 'Retour à la Collection', ar: 'العودة للمجموعة' },
  ref: { en: 'Ref', fr: 'Réf', ar: 'مرجع' },
  freeGlobalCourier: { en: 'Free Global Courier', fr: 'Livraison Mondiale Gratuite', ar: 'شحن عالمي مجاني' },
  selectVariant: { en: 'Select Variant', fr: 'Sélectionner la Variante', ar: 'اختر البديل' },
  selectSize: { en: 'Select Size', fr: 'Sélectionner la Taille', ar: 'اختر المقاس' },
  addToVault: { en: 'Add to Vault', fr: 'Ajouter à la Vault', ar: 'إضافة إلى الخزانة' },
  wishlist: { en: 'Wishlist', fr: 'Liste de Souhaits', ar: 'قائمة الأمنيات' },
  share: { en: 'Share', fr: 'Partager', ar: 'مشاركة' },
  composition: { en: 'Composition', fr: 'Composition', ar: 'التكوين' },
  shippingReturns: { en: 'Shipping & Returns', fr: 'Livraison & Retours', ar: 'الشحن والإرجاع' },
  sustainabilityRecord: { en: 'Sustainability Record', fr: 'Registre de Durabilité', ar: 'سجل الاستدامة' },
  selectedInfo: { en: 'Selected', fr: 'Sélectionné', ar: 'المختار' },
  limitedBatch: { en: 'Limited batch availability', fr: 'Disponibilité en lot limité', ar: 'توفر دفعة محدودة' },

  // Limited Drops Page
  limitedDropsTitle: { en: 'Scarcity Protocol', fr: 'Protocole de Rareté', ar: 'بروتوكول الندرة' },
  limitedDropsSubtitle: { en: 'The Art of the Limited Drop', fr: 'L\'Art de la Sortie Limitée', ar: 'فن الإصدار المحدود' },
  dropIntro: {
    en: 'JACOB VAULT exists as a rebellion against mass production. We do not restock. We do not repeat. Once a record is closed, it remains in the vault forever.',
    fr: 'JACOB VAULT existe comme une rébellion contre la production de masse. Nous ne réapprovisionnons pas. Une fois un enregistrement fermé, il reste dans la vault pour toujours.',
    ar: 'جاكوب فولت متمرد على الإنتاج الضخم. لا نعيد التوفير. لا نكرر. بمجرد إغلاق السجل، يظل في الخزانة للأبد.'
  },
  dropTier1Title: { en: 'Iteration Zero', fr: 'Itération Zéro', ar: 'التكرار صفر' },
  dropTier1Desc: { en: 'Ultra-limited prototypes restricted to 24 units globally. Hand-serialized and technically unique.', fr: 'Prototypes ultra-limités restreints à 24 unités dans le monde.', ar: 'نماذج أولية محدودة للغاية تقتصر على ٢٤ قطعة عالمياً. مرقمة يدوياً وفريدة تقنياً.' },
  dropTier2Title: { en: 'Capsule Sequence', fr: 'Séquence Capsule', ar: 'تسلسل الكبسولة' },
  dropTier2Desc: { en: 'Seasonal experiments exploring specific textile narratives. Released in numbered batches of 100.', fr: 'Expériences saisonnières explorant des récits textiles spécifiques.', ar: 'تجارب موسمية تستكشف روايات نسيجية محددة. تصدر في دفعات مرقمة من ١٠٠ قطعة.' },
  dropTier3Title: { en: 'Core Records', fr: 'Registres de Base', ar: 'السجلات الأساسية' },
  dropTier3Desc: { en: 'Essential silhouettes that define the brand identity. Available until the material archive is exhausted.', fr: 'Silhouettes essentielles qui définissent l\'identité de la marque.', ar: 'خطوط أساسية تحدد هوية العلامة التجارية. متاحة حتى ينفد أرشيف المواد.' },
  secondaryProtocol: { en: 'The Secondary Market Protocol', fr: 'Protocole du Marché Secondaire', ar: 'بروتوكول السوق الثانوية' },
  secondaryDesc: {
    en: "To preserve the integrity of the JACOB VAULT ecosystem, we monitor the secondary market. Items identified as being flipped for profit within 72 hours result in a permanent ban.",
    fr: "Pour préserver l'intégrité de l'écosystème JACOB VAULT, nous surveillons le marché secondaire. Les articles revendus pour profit entraînent un bannissement permanent.",
    ar: "للحفاظ على سلامة نظام جاكوب فولت، نقوم بمراقبة السوق الثانوية. العناصر التي يتم رصد بيعها للربح خلال ٧٢ ساعة تؤدي إلى حظر دائم."
  },
  restockRate: { en: 'RESTOCK RATE', fr: 'TAUX DE RÉAPPROVISIONNEMENT', ar: 'معدل إعادة التوفير' },
  uniquenessFactor: { en: 'UNIQUENESS FACTOR', fr: 'FACTEUR D\'UNICITÉ', ar: 'عامل التميز' },
  registerAccess: { en: 'REGISTER FOR ACCESS', fr: 'S\'INSCRIRE POUR L\'ACCÈS', ar: 'سجل للحصول على الدخول' },
  accessRestricted: { en: 'ACCESS: RESTRICTED', fr: 'ACCÈS : RESTRICT', ar: 'الدخول: مقيد' },
  nextProtocol: { en: 'Next Protocol', fr: 'Prochain Protocole', ar: 'البروتوكول التالي' },
  upcomingWindow: { en: 'Upcoming Drop Window', fr: 'Prochaine Fenêtre de Sortie', ar: 'نافذة الإصدار القادمة' },
  days: { en: 'DAYS', fr: 'JOURS', ar: 'أيام' },
  hrs: { en: 'HRS', fr: 'HRS', ar: 'ساعات' },
  min: { en: 'MIN', fr: 'MIN', ar: 'دقائق' },
  decryptionKey: { en: 'Sign up to receive the decryption key via encrypted mail.', fr: 'Inscrivez-vous pour recevoir la clé de décryptage par mail crypté.', ar: 'سجل لتلقي مفتاح فك التشفير عبر البريد المشفر.' },

  // Lookbook
  lookbookTitle: { en: 'Vol. 26 Archive', fr: 'Archive Vol. 26', ar: 'أرشيف الإصدار ٢٦' },
  lookbookIntro: {
    en: 'A documented history of silhouettes, textures, and the evolution of the JACOB VAULT aesthetic. Captured in neutral studio environments to focus on the garment as object.',
    fr: 'Une histoire documentée des silhouettes, des textures et de l\'évolution de l\'esthétique JACOB VAULT.',
    ar: 'تاريخ موثق للخطوط والأنسجة وتطور جمالية جاكوب فولت. تم تصويرها في بيئات استوديو محايدة للتركيز على القطعة كعمل فني.'
  },
  record: { en: 'Record', fr: 'Enregistrement', ar: 'سجل' },
  look1Title: { en: 'The Camouflage Study', fr: 'Étude sur le Camouflage', ar: 'دراسة التمويه' },
  look1Desc: { en: 'Exploring the intersection of urban utility and personal anonymity.', fr: 'Explorer l\'intersection de l\'utilité urbaine et de l\'anonymat personnel.', ar: 'استكشاف التقاطع بين المنفعة الحضرية وعدم الكشف عن الهوية الشخصية.' },
  look2Title: { en: 'Structural Void', fr: 'Vide Structurel', ar: 'الفراغ الهيكلي' },
  look2Desc: { en: 'A collection focusing on negative space and architectural silhouettes.', fr: 'Une collection axée sur l\'espace négatif et les silhouettes architecturales.', ar: 'مجموعة تركز على المساحة السلبية والخطوط المعمارية.' },
  look3Title: { en: 'Kinetic Energy', fr: 'Énergie Cinétique', ar: 'الطاقة الحركية' },
  look3Desc: { en: 'Clothing designed for the high-velocity movement of the modern city.', fr: 'Des vêtements conçus pour le mouvement à grande vitesse de la ville moderne.', ar: 'ملابس مصممة للحركة عالية السرعة في المدينة الحديثة.' },
  conclusion: { en: 'Conclusion', fr: 'Conclusion', ar: 'الخاتمة' },
  moreToCome: { en: 'More to come.', fr: 'À venir.', ar: 'المزيد قادم.' },
  vol27Production: { en: 'Volume 27 is currently in production. Sign up for the community record to receive first access to the printed visual archive.', fr: 'Le volume 27 est actuellement en production.', ar: 'الإصدار ٢٧ قيد الإنتاج حالياً. اشترك في سجل المجتمع للحصول على وصول حصري للأرشيف المرئي المطبوع.' },

  // Philosophy
  foundation: { en: 'Foundation', fr: 'Fondation', ar: 'الأساس' },
  manifesto: { en: 'The JACOB VAULT Manifesto', fr: 'Le Manifeste JACOB VAULT', ar: 'بيان جاكوب فولت' },
  manifestoText1: { en: 'We exist at the intersection of technical engineering and artistic expression. JACOB VAULT was founded on the belief that clothing is not a commodity, but a visual record of our time.', fr: 'Nous existons à l\'intersection de l\'ingénierie technique et de l\'expression artistique.', ar: 'نحن موجودون عند تقاطع الهندسة التقنية والتعبير الفني. تأسست جاكوب فولت على الاعتقاد بأن الملابس ليست سلعة، بل سجلاً مرئياً لعصرنا.' },
  manifestoText2: { en: 'Our process is slow. Our drops are limited. Our commitment to the craft is absolute. We do not design for seasons; we design for longevity.', fr: 'Notre processus est lent. Nos sorties sont limitées. Notre engagement envers l\'artisanat est absolu.', ar: 'عمليتنا بطيئة. إصداراتنا محدودة. التزامنا بالحرفة مطلق. نحن لا نصمم للفصول؛ نحن نصمم لتدوم.' },
  pillar1Title: { en: 'Modular Design', fr: 'Design Modulaire', ar: 'تصميم معياري' },
  pillar1Desc: { en: 'Garments designed to evolve. Detachable components and layering systems.', fr: 'Vêtements conçus pour évoluer. Composants détachables.', ar: 'ملابس مصممة للتطور. مكونات قابلة للفصل وأنظمة طبقات.' },
  pillar2Title: { en: 'Technical Fiber', fr: 'Fibre Technique', ar: 'ألياف تقنية' },
  pillar2Desc: { en: 'Utilizing the highest grade ripstops, membranes, and reactive textiles.', fr: 'Utilisation de ripstops, membranes et textiles réactifs de la plus haute qualité.', ar: 'استخدام أعلى درجات الأقمشة المقاومة للتمزق والأغشية والمنسوجات التفاعلية.' },
  pillar3Title: { en: 'Ethical Shield', fr: 'Bouclier Éthique', ar: 'درع أخلاقي' },
  pillar3Desc: { en: 'Fair wages, safe studio environments, and a transparent supply chain.', fr: 'Salaires équitables, environnements de studio sûrs.', ar: 'أجور عادلة، بيئات استوديو آمنة، وسلسلة توريد شفافة.' },
  pillar4Title: { en: 'Closed Loop', fr: 'Boucle Fermée', ar: 'دائرة مغلقة' },
  pillar4Desc: { en: 'An archive program to return and recycle old pieces into new experiments.', fr: 'Un programme d\'archives pour retourner et recycler les anciennes pièces.', ar: 'برنامج أرشيف لإعادة وتدوير القطع القديمة في تجارب جديدة.' },
  process: { en: 'Process', fr: 'Processus', ar: 'العملية' },
  docuOfCraft: { en: 'Documentation of Craft', fr: 'Documentation de l\'Artisanat', ar: 'توثيق الحرفة' },
  craftText: { en: 'Every JACOB VAULT piece undergoes 72 hours of stress testing and quality assurance before being serialized and added to the record. We believe in the beauty of the build.', fr: 'Chaque pièce JACOB VAULT subit 72 heures de tests de résistance.', ar: 'تخضع كل قطعة من جاكوب فولت لـ ٧٢ ساعة من اختبارات الإجهاد وضمان الجودة قبل أن يتم ترقيمها وإضافتها إلى السجل. نحن نؤمن بجمال البناء.' },
  sustainability: { en: 'Learn more about Sustainability', fr: 'En savoir plus sur la Durabilité', ar: 'تعرف على المزيد حول الاستدامة' },

  // Privacy Policy & Terms
  privacyPolicy: { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية' },
  termsOfExistence: { en: 'Terms of Existence', fr: 'Conditions d\'Existence', ar: 'شروط الوجود' },
  privacyIntro: { en: 'Information Protocol', fr: 'Protocole d\'Information', ar: 'بروتوكول المعلومات' },
  privacyText1: { en: 'Your data is a digital extension of your identity. We treat it with the same technical precision as our garments.', fr: 'Vos données sont une extension numérique de votre identité.', ar: 'بياناتك هي امتداد رقمي لهويتك. نحن نعاملها بنفس الدقة التقنية التي نعامل بها ملابسنا.' },
  privacyText2: { en: 'We only collect essential data required for order fulfillment and studio communication. Your records are encrypted and stored within our secure VAULT network.', fr: 'Nous ne collectons que les données essentielles requises pour l\'exécution des commandes.', ar: 'نحن نجمع فقط البيانات الأساسية المطلوبة لتنفيذ الطلبات والتواصل مع الاستوديو. يتم تشفير سجلاتك وتخزينها داخل شبكة جاكوب فولت الآمنة الخاصة بنا.' },
  termsIntro: { en: 'Existence Agreement', fr: 'Accord d\'Existence', ar: 'اتفاقية الوجود' },
  termsText1: { en: 'By accessing the VAULT, you agree to our structural parameters. Each garment is a unique iteration; variations are intentional evidence of the artistic process.', fr: 'En accédant à la VAULT, vous acceptez nos paramètres structurels.', ar: 'من خلال الدخول إلى الخزانة، فإنك توافق على معاييرنا الهيكلية. كل قطعة هي تكرار فريد؛ الاختلافات هي دليل متعمد على العملية الفنية.' },
  termsText2: { en: 'Limited release items are subject to availability protocols. Resale is permitted only through verified JACOB VAULT second-life channels to maintain brand integrity.', fr: 'Les articles en édition limitée sont soumis à des protocoles de disponibilité.', ar: 'تخضع العناصر ذات الإصدار المحدود لبروتوكولات التوفر. يُسمح بإعادة البيع فقط من خلال قنوات جاكوب فولت المعتمدة للحفاظ على سلامة العلامة التجارية.' },

  // Chatbot
  studioAssistant: { en: 'Vault Assistant', fr: 'Assistant Vault', ar: 'مساعد الخزانة' },
  online: { en: 'Online', fr: 'En ligne', ar: 'متصل' },
  chatWelcome: { en: 'Welcome to JACOB VAULT. How can I assist your navigation?', fr: 'Bienvenue chez JACOB VAULT. Comment puis-je vous aider ?', ar: 'مرحباً بكم في جاكوب فولت. كيف يمكنني مساعدتكم؟' },
  chatPlaceholder: { en: 'Enter inquiry...', fr: 'Entrer une demande...', ar: 'أدخل استفسارك...' },
  chatOrder: { en: 'Order Status', fr: 'Statut Commande', ar: 'حالة الطلب' },
  chatSizing: { en: 'Sizing Guide', fr: 'Guide des Tailles', ar: 'دليل المقاسات' },
  chatShipping: { en: 'Shipping Info', fr: 'Infos Livraison', ar: 'معلومات الشحن' },
  chatHuman: { en: 'Speak to Human', fr: 'Parler à un Humain', ar: 'التحدث مع موظف' },
  chatResponseOrder: { en: 'Please enter your Record ID to track your current acquisition.', fr: 'Veuillez entrer votre ID de commande.', ar: 'يرجى إدخال رقم السجل لتتبع طلبك الحالي.' },
  chatResponseSizing: { en: 'Our garments follow a boxy, oversized architectural silhouette. View the Size Matrix for detailed measurements.', fr: 'Nos vêtements suivent une silhouette architecturale oversize.', ar: 'تتبع ملابسنا قصات معمارية واسعة. يرجى مراجعة دليل المقاسات للتفاصيل.' },
  chatResponseShipping: { en: 'Global shipping is processed within 48 hours of drop authentication.', fr: 'La livraison mondiale est traitée dans les 48 heures.', ar: 'يتم شحن الطلبات العالمية خلال ٤٨ ساعة من تأكيد الإصدار.' },
  chatResponseHuman: { en: 'A vault representative will be with you shortly. Estimated wait: 4 minutes.', fr: 'Un représentant de la vault sera bientôt avec vous.', ar: 'سيتواصل معك ممثل الخزانة قريباً. وقت الانتظار المتوقع: ٤ دقائق.' },

  // Footer & Misc
  footerDesc: {
    en: 'Clothing as a visual record of existence. Experimental textiles, limited release, curated identity.',
    fr: 'Le vêtement comme trace visuelle de l\'existence. Textiles expérimentaux, éditions limitées.',
    ar: 'الملابس كجل مرئي للوجود. منسوجات تجريبية، إصدارات محدودة، هوية منسقة.'
  },
  studio: { en: 'Vault', fr: 'Vault', ar: 'الخزانة' },
  assistance: { en: 'Assistance', fr: 'Assistance', ar: 'المساعدة' },
  careGuide: { en: 'Care Guide', fr: 'Guide d\'Entretien', ar: 'دليل العناية' },
  shipping: { en: 'Shipping', fr: 'Livraison', ar: 'الشحن' },
  sizeMatrix: { en: 'Size Matrix', fr: 'Guide des Tailles', ar: 'دليل المقاسات' },
  contactStudio: { en: 'Contact Vault', fr: 'Contacter la Vault', ar: 'اتصل بالخزانة' },

  // Product & Cart
  addToCart: { en: 'Add to Vault', fr: 'Ajouter à la Vault', ar: 'إضافة إلى الخزانة' },
  concept: { en: 'Concept', fr: 'Concept', ar: 'المفهوم' },
  price: { en: 'Price', fr: 'Prix', ar: 'السعر' },
  checkout: { en: 'Secure Checkout', fr: 'Paiement Sécurisé', ar: 'الدفع الآمن' },
  yourCart: { en: 'Your Vault', fr: 'Votre Vault', ar: 'خزانتك' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
