<template>
    <Head>
    <Title>Kateqoriyalar</Title>
  </Head>
  <div class="min-h-screen bg-white">
    <!-- Header -->

    <!-- Categories Page -->
    <div class="pt-24 pb-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-4">Skript Kategoriyaları</h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Eytiyacınız olan skript kateqoriyasını seçin və minlərlə keyfiyyətli
            skripti dərhal əldə edin.
          </p>
        </div>

        <!-- Loading durumu -->
        <div v-if="pending" class="text-center py-10">
          <p class="text-lg font-medium text-gray-600">Yüklənilir...</p>
          <span class="loading loading-spinner loading-xl"></span>
        </div>

        <!-- Hata durumu -->
        <div v-else-if="error" class="text-center py-10">
          <p class="text-lg font-medium text-red-600">Məlumatların yüklənməsində xəta yarandı.</p>
        </div>

        <!-- API'den gelen kategoriler gösteriliyor -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="category in detailedCategories"
            :key="category.id"
            class="bg-white rounded-xl flex justify-between flex-col shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="relative h-48 overflow-hidden">
              <NuxtImg
                :src="category.image"
                class="w-full h-full object-cover"
                :alt="category.name"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-semibold">{{ category.name }}</h3>
                <p class="text-sm opacity-90">
                  {{ category.productCount }} Skript
                </p>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-600 mb-4">{{ category.description }}</p>
              <NuxtLink  :to="'/categories/' + category.slug" class="btn rounded-md w-full py-2 bg-blue-600 text-white hover:bg-blue-700">
                Kəşfet
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Contact Page -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface ResponseCategoryType {
  data: categoryType[];
}

// API'den veri çekiyoruz
const { data: categories, pending, error } = useFetch<ResponseCategoryType>('/api/categories');

const detailedCategories = computed(() => categories.value?.data || []);
</script>
