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

      <div v-if="status === 'success'" class="mt-5">
        <h3 class="text-xl font-semibold mb-6">Şərhlər</h3>
        <div class="bg-gray-50 p-6 rounded-lg mb-6">
                      <div class="flex items-center mb-4">
                        <div class="text-xl mr-2">Xal:</div>
                        <div class="flex">
<div class="rating">
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="1 star" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="2 star"  />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="3 star" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="4 star" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="5 star" />
</div>
                            
                          
                        </div>
                      </div>
                      <textarea
                        
                        placeholder="Xalınızı yazın..."
                        class="w-full p-4 border rounded-lg mb-4 h-32"
                      ></textarea>
                      <button
                        
                        class="rounded-md whitespace-nowrap px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Şəth et
                      </button>
                    </div>
        <div class="gap-6 flex flex-col" v-if="data?.comments && data?.comments.length>0">
          <Comment v-for="comment in data?.comments" :key="comment.id" :comment="comment"></Comment>
        </div> 
        <div v-else class="text-gray-600 text-sm md:text-base">
          Şərh yoxdur
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useAsyncData, type ScriptType } from "#imports";

const { slug } = useRoute().params;
const { data, status } = useAsyncData<ScriptType>(`script-${slug}`, () => $fetch(`/api/products/product-detail/${slug}`), {
  server: true
});

</script>
