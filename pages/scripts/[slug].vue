<template>
<Head>
  <Title>{{ data?.title }}</Title>
  <Meta  :name="data?.description" :content="data?.title" />
</Head>
  <div class="pt-10 pb-20">
    <div class="max-w-7xl mx-auto px-4">
      <NuxtLink to="/scripts" class="mb-8 flex items-center text-gray-600 hover:text-gray-900">
        <font-awesome icon="fa-arrow-left" class="mr-2"></font-awesome>
        Skriptlərə Qayıt
      </NuxtLink>

      <!-- Loading Spinner -->
      <div v-if="status == 'pending'" class="flex justify-center items-center h-96">
        <span class="loading loading-spinner loading-xl"></span>
      </div>

      <!-- Script Detail -->
      <div v-else-if="status == 'success'" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
         <img :src="data?.image" :alt="data?.title" class="w-full h-64 md:h-96 object-cover rounded-lg mb-6"> 

          <div class="gap-6 flex flex-col">
            <div>
              <h3 class="text-lg md:text-xl font-semibold mb-3">Təsvir</h3>
             <p class="text-gray-600 text-sm md:text-base">{{ data?.description }}</p> 
            </div>

            <div>
              <h3 class="text-lg md:text-xl font-semibold mb-3">Xüsusiyyətlər</h3>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <li v-for="feature in data?.features" :key="feature" class="flex items-center text-gray-600 text-sm md:text-base">
                  <font-awesome icon="fa-check" class="text-green-500 mr-2"></font-awesome>
                  {{ feature }}
                </li> 
              </ul>
            </div>
          </div>
        </div>

        <div class="gap-6 flex flex-col">
          <div class="bg-white p-6 rounded-lg shadow-lg border">
           <!--  <div class="text-2xl md:text-3xl font-bold mb-4">{{ script.price }}</div> -->
            <button class="w-full py-3 text-sm md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-3">
              Al
            </button>
            <a :href="data?.demoLink" class="btn w-full py-3 text-sm md:text-base border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
              Demo Bax
            </a>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg border">
            <div class="flex items-center justify-between mb-3">
              <div class="text-gray-600 text-sm md:text-base">Kateqoriya</div>
              <div class="font-semibold">{{ data?.category.name }}</div> 
            </div>
            <div class="flex items-center justify-between mb-3">
              <div class="text-gray-600 text-sm md:text-base">Bəyənilmə sayı</div>
              <div class="font-semibold">{{ data?.favorites.length }}</div> 
            </div> 
          <!-- <div class="flex items-center justify-between">
              <div class="text-gray-600 text-sm md:text-base">Reytinq</div>
              <div class="flex items-center">
                <font-awesome icon="fa-star" class="text-yellow-400 mr-1"></font-awesome>
                <span class="font-semibold">{{ script.rating }}</span>
              </div>
            </div> -->
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg border">
                  <h3 class="font-semibold mb-4">Sistem Tələbləri</h3>
                  <ul class="space-y-3">
                    <li
                      v-for="req in data?.requirements"
                      :key="req"
                      class="flex items-center text-gray-600"
                    >
                      <font-awesome icon="fa-circle" class="text-xs text-blue-600 mr-2"></font-awesome>
                      {{ req }}
                    </li>
                  </ul>
            </div>
        </div>
      </div>
<Comments  v-if="status=='success'" :comments='data?.comments'  :productid="data?.id"/>
    
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useAsyncData, type ScriptType } from "#imports";

const { slug } = useRoute().params;
const { data, status } = useAsyncData<ScriptType>(`script-${slug}`, () => $fetch(`/api/products/product-detail/${slug}`), {
  server: true
});
async function  sendComment(){

}
</script>
