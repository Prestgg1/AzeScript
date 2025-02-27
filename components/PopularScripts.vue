<template>
    	<ClientOnly>
        <div class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Populyar Scriptlər</h2>
     <swiper-container ref="containerRef"
          :space-between="30"
		  :breakpoints="breakpoints"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3000 }"
          class="popular-scripts-swiper"
        >
          <swiper-slide v-for="script in popularScripts" :key="script.id">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                :src="script.image"
                class="w-full h-48 object-cover"
                :alt="script.title"
              />
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span
                    class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >{{ script.category }}</span
                  >
                  <div class="flex items-center">
                    <font-awesome :icon='["fas", "star"]' class="text-yellow-400"/>
                    <span class="ml-1 text-gray-600">{{ script.rating }}</span>
                  </div>
                </div>
                <h3 class="text-xl font-semibold mb-2">{{ script.title }}</h3>
                <p class="text-gray-600 mb-4">{{ script.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-blue-600"
                    >{{ script.price }}</span
                  >
                  <NuxtLink
                  :to="'/scripts/' + script.id"
                    class="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Detallar
                  </NuxtLink>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
        </div>
        </div>
    </ClientOnly>

</template>
<script setup lang="ts">

const breakpoints = {
  640: {
	slidesPerView: 1,
  },
  1024: {
	slidesPerView: 2,
  },
  1280: {
	slidesPerView: 3,
  }
}


// Close menu when window is resized to desktop size


const containerRef = ref(null)
const popularScripts = [
  {
    id: 1,
    title: "Veri Analizi Paketi",
    description: "Gelişmiş veri analizi və görselleştirme alətləri",
    category: "Veri Analizi",
    rating: 4.8,
    price: "₼299",
    image:
      "https://public.readdy.ai/ai/img_res/3e3081ec80174a6da622551662c88399.jpg",
  },
  {
    id: 2,
    title: "E-ticaret API",
    description: "Kapsamlı e-ticaret inteqrasiya həlli",
    category: "E-ticaret",
    rating: 4.9,
    price: "₼499",
    image:
      "https://public.readdy.ai/ai/img_res/1b8d6a72807a24ba052a37fd85cca5c6.jpg",
  },
  {
    id: 3,
    title: "SEO Optimizasiya",
    description: "Otomatik SEO analiz və reportla həlli",
    category: "SEO",
    rating: 4.7,
    price: "₼199",
    image:
      "https://public.readdy.ai/ai/img_res/eea223b3665b166aed77ff52e8e7b659.jpg",
  },
];


</script>