<template>
<div class="dropdown dropdown-start">
        <div tabindex="0" class="m-1 flex items-center space-x-2 cursor-pointer">
          <div class="avatar">
            <div class="w-10 h-10 rounded-full">
              <img :src="user.image || 'https://via.placeholder.com/40'" alt="">
            </div>
          </div>
          <span>{{ user.username }}</span>
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
          <li><NuxtLink to="/profile">İdarə Paneli</NuxtLink></li>
          <li><NuxtLink to="/settings">Parametrlər</NuxtLink></li>
          <li class="border-t text-red-600">
            <a @click="logout"><font-awesome icon="sign-out-alt" class="mr-1" /> Çıxış</a>
          </li>
        </ul>
      </div>
</template>
<script setup>
const props = defineProps(['user'])
</script>
