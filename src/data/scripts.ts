export interface Script {
  title: string;
  description: string;
  price: number;
  image: string;
  isFree: boolean;
  features?: string[];
  longDescription?: string;
  demoUrl?: string;
  version?: string;
  lastUpdate?: string;
  requirements?: string[];
  rating?: number;
  downloads?: number;
}

export interface Comment {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export const comments: Comment[] = [
  {
    id: 1,
    userName: "Ahmet Yılmaz",
    rating: 5,
    comment: "Harika bir script! Kurulumu ve kullanımı çok kolay.",
    date: "2024-03-15",
    avatar: "/images/avatars/user1.webp"
  },
  {
    id: 2,
    userName: "Ayşe Demir",
    rating: 4,
    comment: "Güzel tasarlanmış ve iyi düşünülmüş. Birkaç küçük özellik eklenebilir.",
    date: "2024-03-14",
    avatar: "/images/avatars/user2.webp"
  }
];

export const scripts: Script[] = [
  {
    title: "E-ticaret Dashboard",
    description: "Modern ve kullanıcı dostu e-ticaret yönetim paneli scripti",
    longDescription: "Bu dashboard scripti, e-ticaret sitenizi yönetmek için ihtiyacınız olan tüm özellikleri içerir. Stok takibi, sipariş yönetimi, müşteri analizi ve daha fazlası...",
    price: 299,
    image: "/images/ecommerce-dashboard.webp",
    isFree: false,
    features: [
      "Responsive tasarım",
      "Stok yönetimi",
      "Sipariş takibi",
      "Müşteri yönetimi",
      "Analitik dashboard",
      "Çoklu dil desteği"
    ],
    version: "2.1.0",
    lastUpdate: "2024-03-10",
    requirements: [
      "PHP 8.0+",
      "MySQL 5.7+",
      "Node.js 16+"
    ],
    rating: 4.5,
    downloads: 1250,
    demoUrl: "https://demo.webscriptmarket.com/ecommerce-dashboard"
  },
  {
    title: "Blog CMS",
    description: "SEO dostu, modern blog yönetim sistemi",
    price: 199,
    image: "/images/blog-cms.webp",
    isFree: false,
    rating: 4.8,
    downloads: 850,
    features: [
      "SEO optimizasyonu",
      "Kategori yönetimi",
      "Etiket sistemi",
      "Medya yönetimi"
    ]
  },
  {
    title: "Form Builder",
    description: "Sürükle-bırak form oluşturucu",
    price: 0,
    image: "/images/form-builder.webp",
    isFree: true,
    rating: 4.2,
    downloads: 2100,
    features: [
      "Sürükle-bırak arayüz",
      "20+ hazır form elementi",
      "Form doğrulama",
      "SMTP entegrasyonu"
    ]
  }
];

// Featured scripts are a subset of all scripts
export const featuredScripts = scripts.slice(0, 3);