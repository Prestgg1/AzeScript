<template>
           <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center mb-4">
                      <NuxtImg  :alt="comment.user.name" class="w-12 h-12 rounded-full mr-4"  :src="comment.user.image || 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'" />
                      
                      <div>
                        <div class="font-semibold">{{ comment.user.name }}</div>
                        <div class="flex items-center">
                          <div class="flex text-yellow-400 mr-2">
                            <font-awesome v-for="star in comment.rating" :key="star" icon='fa-star'></font-awesome>
                          </div>
                          <span class="text-gray-500">{{ comment.date }}</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-600">{{ comment.content}}</p>
                  </div>
</template>
<script setup lang="ts">
const { comment } = defineProps(['comment']);
</script>
