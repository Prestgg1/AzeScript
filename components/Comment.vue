<template>
           <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center mb-4">
                      <img :src="comment.avatar" :alt="comment.user" class="w-12 h-12 rounded-full mr-4">
                      <div>
                        <div class="font-semibold">{{ comment.user }}</div>
                        <div class="flex items-center">
                          <div class="flex text-yellow-400 mr-2">
                            <font-awesome v-for="star in comment.rating" :key="star" icon='fa-star'></font-awesome>
                          </div>
                          <span class="text-gray-500">{{ comment.date }}</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-600">{{ comment.comment }}</p>
                  </div>
</template>
<script setup lang="ts">
const { comment } = defineProps(['comment']);
</script>
