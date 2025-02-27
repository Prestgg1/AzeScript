<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-white">
    <!-- Scripts Page -->
    <div class="pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Search and Filters -->
        <div class="mb-8 flex gap-4">
          <div class="flex-1 relative">
            <input type="text" placeholder="Script axtar..." class="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:border-blue-500">
            <font-awesome icon="search" class="absolute right-3 top-3.5 text-gray-400" />
          </div>
          <div class="flex gap-4">
            <div class="relative">
              <button @click="toggleFilter('category')" class="!rounded-button whitespace-nowrap px-4 py-3 border text-gray-700 hover:bg-gray-50 flex items-center">
                <span>Kategoriya</span>
                <font-awesome icon="chevron-down" class="ml-2" />
              </button>
              <div v-if="filters.category" class="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button v-for="cat in categories" :key="cat.id" 
                  @click="selectCategory(cat.name)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">
                  {{ cat.name }}
                </button>
              </div>
            </div>
            <div class="relative">
              <button @click="toggleFilter('price')" class="!rounded-button whitespace-nowrap px-4 py-3 border text-gray-700 hover:bg-gray-50 flex items-center">
                <span>Qiymət</span>
                <font-awesome icon="chevron-down" class="ml-2" />
              </button>
              <div v-if="filters.price" class="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button v-for="range in priceRanges" :key="range"
                  @click="selectPriceRange(range)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">
                  {{ range }}
                </button>
              </div>
            </div>
            <div class="relative">
              <button @click="toggleFilter('sort')" class="!rounded-button whitespace-nowrap px-4 py-3 border text-gray-700 hover:bg-gray-50 flex items-center">
                <span>Sıralama</span>
                <font-awesome icon="chevron-down" class="ml-2" />
              </button>
              <div v-if="filters.sort" class="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button v-for="option in sortOptions" :key="option"
                  @click="selectSortOption(option)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">
                  {{ option }}
                </button>
              </div>
            </div>
          </div>
        </div>
    
        <!-- Active Filters -->
        <div v-if="activeFilters.length > 0" class="flex gap-2 mb-6">
          <div v-for="filter in activeFilters" :key="filter"
            class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center">
            {{ filter }}
            <button @click="removeFilter(filter)" class="ml-2">
              <font-awesome icon="times" class="fas fa-times"></font-awesome>
            </button>
          </div>
        </div>
    
        <!-- Scripts Grid -->
        <div class="grid grid-cols-3 gap-6">
          <div v-for="script in scripts" :key="script.id" 
            class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div class="relative">
              <img :src="script.image" :alt="script.title" class="w-full h-48 object-cover">
              <div class="absolute top-3 right-3">
                <button @click="toggleFavorite(script.id)" 
                  class="!rounded-button whitespace-nowrap w-8 h-8 flex items-center justify-center bg-white shadow-md hover:bg-gray-50">
                  <font-awesome icon="fa-heart" :class="script.isFavorite ? 'text-red-500' : 'text-gray-400'"/>
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{{ script.category }}</span>
                <span class="text-lg font-bold text-gray-900">₼ {{ script.price }}</span>
              </div>
              <h4 class="text-xl font-semibold mb-2">{{ script.title }}</h4>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ script.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <font-awesome icon="star" class=" text-yellow-400 mr-1"/>
                    <span>{{ script.rating }}</span>
                  </div>
                  <div class="flex items-center">
                    <font-awesome icon="download" class=" text-gray-400 mr-1"/>
                    <span>{{ script.downloads }}</span>
                  </div>
                </div>
                <NuxtLink :to="'/scripts/' + script.id" 
                  class="rounded-md whitespace-nowrap px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                  Bax
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
    
        <!-- Pagination -->
        <div class="mt-12 flex justify-center">
          <div class="flex space-x-2">
            <button class="rounded-md whitespace-nowrap w-10 h-10 flex items-center justify-center border" 
             >
           <!--   :class="currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-50'" -->
              <font-awesome icon="chevron-left" />
            </button>
            <button v-for="page in 5" :key="page"
              class="rounded-md whitespace-nowrap w-10 h-10 flex items-center justify-center border"
             >
             <!-- :class="currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'" -->
              {{ page }}
            </button>
            <button class="rounded-md whitespace-nowrap w-10 h-10 flex items-center justify-center border text-gray-700 hover:bg-gray-50">
              <font-awesome icon="chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Header -->

    <!-- Hero Section -->
    <LandingTwo/>
    <!-- Popular Scripts -->
   <ClientOnly>
    <PopularScripts />
</ClientOnly>

    <!-- Categories -->
   <Categories/>
    <!-- Testimonials -->
     <LeastTestimonials/>
 
    <!-- Stats -->
   <Stats/>
    <!-- Footer -->
 
    </div>
    </template>
    <script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import Stats from '~/components/Stats.vue';
    import Categories from '~/components/Categories.vue';
import LeastTestimonials from '@/components/LeastTestimonials.vue';
 
 

    const filters = ref({
      category: false,
      price: false,
      sort: false
    });
    
    const priceRanges = ['0-100 ₺', '101-500 ₺', '501-1000 ₺', '1000+ ₺'];
    const sortOptions = ['En Yeniler', 'En Çok İndirilenler', 'En Çok Beğenilenler', 'Fiyat (Artan)', 'Fiyat (Azalan)'];
    const activeFilters = ref(['Web Geliştirme', '0-100 ₺', 'En Yeniler']);
    
    const scripts = ref([
      {
        id: 1,
        title: 'E-ticaret Admin Paneli',
        description: 'Tam özellikli e-ticaret yönetim paneli. Stok takibi, sipariş yönetimi ve müşteri analizi dahil.',
        price: '799',
        category: 'Web Geliştirme',
        rating: 4.9,
        downloads: '2.3k',
        isFavorite: true,
        image: 'https://public.readdy.ai/ai/img_res/525cc20093bc351b43167965861f79be.jpg'
      },
      {
        id: 2,
        title: 'SEO Analiz Motoru',
        description: 'Gelişmiş SEO analiz aracı. Anahtar kelime analizi, rakip analizi ve site denetimi özellikleri.',
        price: '299',
        category: 'SEO',
        rating: 4.7,
        downloads: '1.8k',
        isFavorite: false,
        image: 'https://public.readdy.ai/ai/img_res/ae6b1b38b7fffc19d30c78c2b5cf5918.jpg'
      },
      {
        id: 3,
        title: 'Sosyal Medya Bot',
        description: 'Otomatik içerik paylaşımı ve etkileşim yönetimi için sosyal medya otomasyon aracı.',
        price: '449',
        category: 'Otomasyon',
        rating: 4.8,
        downloads: '3.1k',
        isFavorite: false,
        image: 'https://public.readdy.ai/ai/img_res/a1f8301f86db525557e3190409789141.jpg'
      },
      {
        id: 4,
        title: 'PDF Dönüştürücü Pro',
        description: 'Gelişmiş PDF düzenleme ve dönüştürme aracı. OCR ve toplu işlem özellikleri.',
        price: '199',
        category: 'Araçlar',
        rating: 4.6,
        downloads: '4.2k',
        isFavorite: true,
        image: 'https://public.readdy.ai/ai/img_res/8825d8434bde3e8c92760d0ef2d1be91.jpg'
      },
      {
        id: 5,
        title: 'Veri Madenciliği Paketi',
        description: 'Büyük veri analizi ve madenciliği için kapsamlı script paketi.',
        price: '899',
        category: 'Veri Analizi',
        rating: 4.9,
        downloads: '1.5k',
        isFavorite: false,
        image: 'https://public.readdy.ai/ai/img_res/6272459f5c3915b2eff38257c7cbbdb5.jpg'
      },
      {
        id: 6,
        title: 'API Test Suite',
        description: 'REST API test otomasyonu için kapsamlı test paketi ve raporlama aracı.',
        price: '349',
        category: 'Geliştirme',
        rating: 4.7,
        downloads: '2.7k',
        isFavorite: false,
        image: 'https://public.readdy.ai/ai/img_res/e16b2c3267bb52df521c652e9f52e07b.jpg'
      }
    ]);
    const categories = ref([
    {
        id: 1,
        name: 'Web Geliştirme',

    },
    {
        id: 2,
        name: 'Otomasyon',
    }
    ])
    const toggleFilter = (filterName: string) => {
   /*    Object.keys(filters.value).forEach(key => {
        if (key !== filterName) filters.value[key] = false;
      });
      filters.value[filterName] = !filters.value[filterName]; */
    };
    
    const selectCategory = (category: string) => {
      filters.value.category = false;
      if (!activeFilters.value.includes(category)) {
        activeFilters.value.push(category);
      }
    };
    
    const selectPriceRange = (range: string) => {
      filters.value.price = false;
      if (!activeFilters.value.includes(range)) {
        activeFilters.value.push(range);
      }
    };
    
    const selectSortOption = (option: string) => {
      filters.value.sort = false;
      if (!activeFilters.value.includes(option)) {
        activeFilters.value.push(option);
      }
    };
    
    const removeFilter = (filter: string) => {
      activeFilters.value = activeFilters.value.filter(f => f !== filter);
    };
    
    const toggleFavorite = (scriptId: number) => {
      const script = scripts.value.find(s => s.id === scriptId);
      if (script) {
        script.isFavorite = !script.isFavorite;
      }
    };
    
  
    </script>
