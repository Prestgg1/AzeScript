<template>
    <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div class="relative">
            <NuxtImg :src="script.image" :alt="script.title" class="w-full h-48 object-cover"/>
            <button @clicktoggleFavorite(script.id)
                class="absolute top-3 right-3 bg-white shadow-md w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50">
                <font-awesome icon="fa-heart" :class="script.favorites.length > 0 ? 'text-red-500' : 'text-gray-400'" />
            </button>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-3">
                <span v-if="script.category" class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{{ script.category?.name }}</span>
                <span class="text-lg font-bold text-gray-900">{{ Number(script.price) > 0 ? `₼ ${script.price}` : 'Pulsuz'
                    }}</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">{{ script.title }}</h4>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ script.description }}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <font-awesome icon="fa-star" class="text-yellow-400 mr-1"></font-awesome>
                    <span class="font-semibold ">{{ script.averageRating }}</span>
                </div>
                <NuxtLink :to="'/scripts/' + script.slug"
                    class="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                    Bax
                </NuxtLink>
                
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const { data: script } = defineProps<{ data: ScriptType }>();


</script>