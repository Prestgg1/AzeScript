<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <Head>
    <Title>Skriptlər</Title>
  </Head>
  <div class="min-h-screen bg-white">
    <div class="pt-32 pb-20">
      <div  class="max-w-7xl mx-auto px-4">
        <!-- Search and Filters -->
        <div class="mb-8 flex  flex-col  md:flex-row gap-4">
          <div class="flex-1 relative">
            <input type="text" placeholder="Script axtar..."
              class="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:border-blue-500">
            <font-awesome icon="search" class="absolute right-3 top-3.5 text-gray-400" />
          </div>
         <!--  <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <div v-for="(menu, index) in filterMenus" :key="index" class="relative">
              <button @click="toggleFilter(menu.key)" 
                class="px-4 py-3 border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center w-full md:w-auto">
                <span>{{ menu.label }}</span>
                <font-awesome icon="chevron-down" class="ml-2" />
              </button>
              <div v-if="filters[menu.key]" class="absolute top-full left-0 mt-2 w-full md:w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button v-for="option in menu.options" :key="option"
                  @click="menu.action(option)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">
                  {{ option }}
                </button>
              </div>
            </div>
          </div> -->
        </div>
        <!-- Loading durumu -->
         <div v-if="status == 'pending'" class="flex justify-center gap-10 items-center flex-wrap">
          <div v-for="item in 6" :key="item" class="skeleton overflow-hidden block shadow-lg hover:shadow-xl transition-shadow h-80 w-80">
          </div>
         </div>
          <!-- Scripts Grid -->
        <div v-else-if="status == 'success'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScriptCard  :data="script" v-for="script in scripts?.data" :key="script.id"/> 
        </div>
        <div v-else class="w-full text-center">
          <span  class="text-red-500">Saytımız texniki baxımdadır. Zəhmət olmasa yeniləyin.</span>
        </div>
        <!-- Pagination -->
        <div class="mt-12 flex justify-center">
          <div class="flex space-x-2">
            <button class="rounded-md w-10 h-10 flex items-center justify-center border hover:bg-gray-50">
              <font-awesome icon="chevron-left" />
            </button>
            <button v-for="page in pagination.totalPages" :key="page"
              class="rounded-md w-10 h-10 flex items-center justify-center border hover:bg-gray-50">
              {{ page }}
            </button>
            <button class="rounded-md w-10 h-10 flex items-center justify-center border hover:bg-gray-50">
              <font-awesome icon="chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <LandingTwo/>
    <ClientOnly>
      <PopularScripts />
    </ClientOnly>
    <Categories/>
    <LeastTestimonials/>
    <Stats/>
  </div>
</template>

    <script lang="ts" setup>
    import { ref } from 'vue';
    import Stats from '~/components/Stats.vue';
    import Categories from '~/components/Categories.vue';
import LeastTestimonials from '@/components/LeastTestimonials.vue';
 
 

    const filters = ref({
      category: false,
      price: false,
      sort: false
    });
    type paginationType = {
      currentPage: number,
      totalPages: number,
    }
    const pagination = ref<any> ({
      currentPage: 1,
      totalPages: 1,
    });
    const priceRanges = ['0-100 ₺', '101-500 ₺', '501-1000 ₺', '1000+ ₺'];
    const sortOptions = ['En Yeniler', 'En Çok İndirilenler', 'En Çok Beğenilenler', 'Fiyat (Artan)', 'Fiyat (Azalan)'];
    const activeFilters = ref(['Web Geliştirme', '0-100 ₺', 'En Yeniler']);


const { data: scripts, status, error } = useAsyncData<responseScriptType>('products', () => $fetch('/api/products'), {
  server: true
})
if (status.value == 'success') {
    pagination.value = scripts.value?.pagination
}





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
    
  
    
  
    </script>
