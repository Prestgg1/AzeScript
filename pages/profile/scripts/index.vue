<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="flex container mx-auto">
 
    <!-- Main Content -->
    <div class="flex-1 p-8" >
    <div class="mb-8">
    <h1 class="text-2xl font-bold">Scriptlerim</h1>
    <div class="mt-2 text-sm text-gray-600">
    <span>Ana Sayfa</span>
    <i class="fas fa-chevron-right mx-2"></i>
    <span>Scriptlerim</span>
    </div>
    </div>
    <!-- Search and Filter Bar -->
    <div class="mb-6 flex flex-wrap gap-4">
    <div class="flex-1">
    <div class="relative">
    <input type="text" v-model="searchQuery" placeholder="Script ara..." class="w-full rounded-lg border pl-10 pr-4 py-2.5" />
    <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
    </div>
    </div>
    <div class="flex gap-4">
    <div class="relative">
    <button @click="toggleCategoryFilter" class="!rounded-button flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5">
    <span>{{ selectedCategory || 'Kategori' }}</span>
    <i class="fas fa-chevron-down"></i>
    </button>
    <div v-if="showCategoryFilter" class="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border bg-white shadow-lg">
    <div class="p-2">
    <button v-for="category in categories" :key="category" @click="selectCategory(category)" class="w-full rounded px-3 py-2 text-left hover:bg-gray-100">
    {{ category }}
    </button>
    </div>
    </div>
    </div>
    <button @click="toggleSortOrder" class="!rounded-button flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5">
    <i class="fas" :class="sortAscending ? 'fa-sort-amount-up' : 'fa-sort-amount-down'"></i>
    <span>{{ sortAscending ? 'Artan Fiyat' : 'Azalan Fiyat' }}</span>
    </button>
    </div>
    </div>
    <!-- Scripts Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="script in filteredScripts" :key="script.id" class="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div class="mb-4 flex items-start justify-between">
    <div>
    <h3 class="font-semibold">{{ script.title }}</h3>
    <p class="text-sm text-gray-500">{{ script.category }}</p>
    </div>
    <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">{{ script.price }} ₺</span>
    </div>
    <div class="mb-4">
    <p class="text-sm text-gray-600 line-clamp-2">{{ script.description }}</p>
    </div>
    <div class="mb-4">
    <div class="flex flex-wrap gap-2">
    <span v-for="(feature, index) in script.features.slice(0, 3)" :key="index" class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
    {{ feature }}
    </span>
    <span v-if="script.features.length > 3" class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
    +{{ script.features.length - 3 }}
    </span>
    </div>
    </div>
    <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
    <span class="text-sm text-gray-500">{{ script.downloads }} İndirme</span>
    <button @click="editScript(script)" class="text-gray-400 hover:text-blue-500">
    <i class="fas fa-edit"></i>
    </button>
    <button @click="confirmDelete(script)" class="text-gray-400 hover:text-red-500">
    <i class="fas fa-trash"></i>
    </button>
    </div>
    <button @click="showScriptDetails(script)" class="!rounded-button rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
    Detaylar
    </button>
    </div>
    </div>
    </div>
  <!--   <div v-if="selectedScript" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6">
    <div class="mb-6 flex items-start justify-between">
    <div>
    <h2 class="text-2xl font-bold">{{ selectedScript.title }}</h2>
    <p class="text-gray-600">{{ selectedScript.category }}</p>
    </div>
    <button @click="selectedScript = null" class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
    <i class="fas fa-times"></i>
    </button>
    </div>
    <div class="mb-6">
    <h3 class="mb-2 font-semibold">Açıklama</h3>
    <p class="text-gray-600">{{ selectedScript.description }}</p>
    </div>
    <div class="mb-6">
    <h3 class="mb-2 font-semibold">Özellikler</h3>
    <ul class="list-inside list-disc space-y-1 text-gray-600">
    <li v-for="feature in selectedScript.features" :key="feature">{{ feature }}</li>
    </ul>
    </div>
    <div class="mb-6">
    <h3 class="mb-2 font-semibold">Sistem Gereksinimleri</h3>
    <ul class="list-inside list-disc space-y-1 text-gray-600">
    <li v-for="req in selectedScript.requirements" :key="req">{{ req }}</li>
    </ul>
    </div>
    <div class="flex justify-end gap-4">
    <button @click="selectedScript = null" class="!rounded-button rounded-lg border px-6 py-2 text-gray-700 hover:bg-gray-50">
    Kapat
    </button>
    <button @click="downloadScript(selectedScript)" class="!rounded-button rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
    <i class="fas fa-download mr-2"></i>İndir
    </button>
    </div>
    </div>
    </div> -->
    </div>
    </div>
    </template>
    <script lang="ts" setup>
    import { ref, computed } from 'vue';
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const showCategoryFilter = ref(false);
    const sortAscending = ref(true);
    const selectedScript = ref(null);
    const userAvatar = 'https://public.readdy.ai/ai/img_res/00b220b5578f7cf58e54302bc3c37dc0.jpg';
    const categories = [
    'Tümü',
    'E-ticaret',
    'Blog & Haber',
    'Sosyal Medya',
    'Forum & Topluluk',
    'Eğitim & LMS',
    'CRM & İş Yönetimi',
    'Oyun & Eğlence',
    'Finans & Muhasebe',
    'Diğer'
    ];
    const scripts = ref([
    {
    id: 1,
    title: 'E-ticaret Yönetim Sistemi Pro',
    category: 'E-ticaret',
    price: 2499,
    description: 'Gelişmiş özelliklere sahip, modern ve kullanıcı dostu e-ticaret yönetim sistemi. Stok takibi, sipariş yönetimi ve raporlama araçları ile işletmenizi kolayca yönetin.',
    features: ['Çoklu Dil Desteği', 'Gelişmiş Stok Yönetimi', 'Entegre POS Sistemi', 'Mobil Uyumlu', 'SEO Optimizasyonu'],
    requirements: ['PHP 8.0+', 'MySQL 5.7+', '2GB RAM', 'SSL Sertifikası'],
    downloads: 234,
    isFavorite: true
    },
    {
    id: 2,
    title: 'Blog Master Suite',
    category: 'Blog & Haber',
    price: 899,
    description: 'Profesyonel blog ve içerik yönetim sistemi. SEO dostu yapısı ve zengin editör özellikleriyle içeriklerinizi etkili bir şekilde yönetin.',
    features: ['Markdown Editör', 'Otomatik Yedekleme', 'Kategori Yönetimi', 'Etiket Sistemi'],
    requirements: ['Node.js 14+', 'MongoDB', '1GB RAM'],
    downloads: 567,
    isFavorite: false
    },
    {
    id: 3,
    title: 'Sosyal Medya Analitik Platform',
    category: 'Sosyal Medya',
    price: 1899,
    description: 'Sosyal medya hesaplarınızı tek bir panelden yönetin ve detaylı analitik raporlar alın.',
    features: ['Çoklu Hesap Yönetimi', 'Detaylı Analitik', 'Otomatik Paylaşım', 'Rakip Analizi'],
    requirements: ['Python 3.8+', 'PostgreSQL', '4GB RAM'],
    downloads: 189,
    isFavorite: true
    }
    ]);
    const filteredScripts = computed(() => {
    let result = [...scripts.value];
    if (searchQuery.value) {
    result = result.filter(script =>
    script.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    script.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    }
    if (selectedCategory.value && selectedCategory.value !== 'Tümü') {
    result = result.filter(script => script.category === selectedCategory.value);
    }
    result.sort((a, b) => {
    if (sortAscending.value) {
    return a.price - b.price;
    }
    return b.price - a.price;
    });
    return result;
    });
   
    const toggleCategoryFilter = () => {
    showCategoryFilter.value = !showCategoryFilter.value;
    };
    const selectCategory = (category: string) => {
    selectedCategory.value = category === 'Tümü' ? '' : category;
    showCategoryFilter.value = false;
    };
    const toggleSortOrder = () => {
    sortAscending.value = !sortAscending.value;
    };
    const toggleFavorite = (script: any) => {
    script.isFavorite = !script.isFavorite;
    };
    const showScriptDetails = (script: any) => {
    selectedScript.value = script;
    };
    const downloadScript = (script: any) => {
    // Implement download logic
    console.log('Downloading script:', script.title);
    };
    
    const editScript = (script: any) => {
    // Implement edit logic
    console.log('Editing script:', script.title);
    };
    
    const confirmDelete = (script: any) => {
    if (confirm('Bu scripti silmek istediğinizden emin misiniz?')) {
      // Implement delete logic
      console.log('Deleting script:', script.title);
      scripts.value = scripts.value.filter(s => s.id !== script.id);
    }
    };
    </script>
    <style scoped>
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.3s;
    }
    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
    </style>
    