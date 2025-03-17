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
import { ref, watchEffect } from 'vue';
import Stats from '~/components/Stats.vue';
import Categories from '~/components/Categories.vue';
import LeastTestimonials from '@/components/LeastTestimonials.vue';

const token = useCookie('token');
const pagination = ref<any>({
  currentPage: 1,
  totalPages: 1,
});

const { data: scripts, status, error, refresh } = useAsyncData<responseScriptType>('products', async () => {
  // Eğer token varsa Authorization başlığını ekleyelim
  const headers: Record<string, string> = {};
  
  if (token.value) {
    headers['Authorization'] = 'Bearer ' + token.value; // Token'ı Authorization başlığına ekle
  }

  return $fetch('/api/products', {
    headers,
  });
}, {
  server: true,
});

// Token geldiğinde paginasyon verisini al
watchEffect(() => {
  if (status.value === 'success' && scripts.value) {
    pagination.value = scripts.value.pagination;
  }
});
</script>
