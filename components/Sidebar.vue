<template>
     <div
      class="fixed left-4 top-20 w-64 rounded-xl bg-gray-900 text-white transition-all duration-300 shadow-xl max-h-[600px]"
      :class="{ 'w-20': isCollapsed }"
    >
      <div
        class="flex h-14 items-center justify-between px-4 border-b border-gray-700"
      >
        <h1 class="text-xl font-bold" v-show="!isCollapsed">İdarə Paneli</h1>
        <button
          @click="toggleSidebar"
          class="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <font-awesome
            :icon="isCollapsed ? 'chevron-right' : 'chevron-left'"
          ></font-awesome>
        </button>
      </div>
      <nav class="mt-4">
        <a
          href="#"
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <font-awesome :icon='["fas", "home"]' class="w-8"></font-awesome>
          <span v-show="!isCollapsed">Profil detalları</span>
        </a>
        <a href="#" class="flex items-center bg-gray-800 px-4 py-3 text-white">
          <font-awesome :icon='["fas", "plus-circle"]' class="w-8"></font-awesome>
          <span v-show="!isCollapsed">Script Əlavə Et</span>
        </a>
        <a
          href="#"
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <font-awesome :icon='["fas", "list"]' class="w-8"></font-awesome>
          <span v-show="!isCollapsed">Scriptlərim</span>
        </a>
      </nav>
      <div class="mt-auto mx-2 rounded-lg bg-gray-800 p-4">
        <div class="flex items-center space-x-3">
          <img :src="userAvatar" class="h-10 w-10 rounded-full" alt="Profil" />
          <div v-show="!isCollapsed">
            <p class="font-medium">Ahmet Yılmaz</p>
            <p class="text-sm text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>

 const userAvatar =
 "https://public.readdy.ai/ai/img_res/00b220b5578f7cf58e54302bc3c37dc0.jpg";
 const isCollapsed = ref(false);
 const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
</script>
