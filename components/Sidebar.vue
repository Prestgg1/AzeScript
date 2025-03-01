<template>
  <div
    class="bg-gray-900 h-full text-white transition-all duration-300 shadow-xl flex flex-col "
    :class="{ 'w-20': isCollapsed, 'w-64': !isCollapsed }"
  >
    <div
      class="flex h-14 items-center justify-between px-4 border-b border-gray-700"
    >
      <h1 class="text-xl font-bold transition-all duration-300"
        :class="{ 'absolute opacity-0 w-0 invisible overflow-hidden': isCollapsed }">
        İdarə Paneli
      </h1>
      <button
        @click="toggleSidebar"
        class="rounded-lg p-2  text-gray-400 hover:bg-gray-800 hover:text-white"
      >
        <font-awesome
          :icon="isCollapsed ? 'chevron-right' : 'chevron-left'"
        ></font-awesome>
      </button>
    </div>
    <nav class="mt-4 space-y-2 flex-1">
      <a
        href="#"
        class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
      >
        <font-awesome :icon='["fas", "home"]' class="w-8" />
        <span class="ml-3 transition-all duration-300"
          :class="{ 'opacity-0 w-0 hi overflow-hidden': isCollapsed }">Profil detalları</span>
      </a>
      <a href="#" class="flex items-center bg-gray-800 px-4 py-3 text-white transition-all duration-300">
        <font-awesome :icon='["fas", "plus-circle"]' class="w-8" />
        <span class="ml-3 transition-all duration-300"
          :class="{ 'opacity-0 w-0 overflow-hidden': isCollapsed }">Script Əlavə Et</span>
      </a>
      <a
        href="#"
        class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
      >
        <font-awesome :icon='["fas", "list"]' class="w-8" />
        <span class="ml-3 transition-all duration-300"
          :class="{ 'opacity-0 w-0 overflow-hidden': isCollapsed }">Scriptlərim</span>
      </a>
    </nav>
    <div class="mt-auto mx-2 rounded-lg bg-gray-800 p-4 transition-all duration-300">
      <div class="flex items-center space-x-3">
        <img :src="userAvatar" class="h-10 w-10 rounded-full transition-all duration-300" />
        <div class="transition-all duration-300"
          :class="{ 'opacity-0 w-0 overflow-hidden': isCollapsed }">
          <p class="font-medium">Ahmet Yılmaz</p>
          <p class="text-sm text-gray-400">Admin</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const userAvatar =
  "https://public.readdy.ai/ai/img_res/00b220b5578f7cf58e54302bc3c37dc0.jpg";
const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
