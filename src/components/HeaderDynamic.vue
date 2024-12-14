<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swup from 'swup';

const swup = new Swup();
const links = [
  { href: '/', text: 'Ana Səhifə' },
  { href: '/scripts/', text: 'Scriptlər' },
  { href: '/about/', text: 'Haqqımızda' },
  { href: '/contact/', text: 'Əlaqə' },
];

// State to control the mobile menu
const isMenuOpen = ref(false);

// State to store the current path
const currentPath = ref('');
swup.hooks.on('visit:start', (visit) => {
  currentPath.value = visit.to.url;
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
});

const isActive = (href) => href == '/' ? currentPath.value == href : currentPath.value.startsWith(href);

// Close menu on outside click
const clickOutside = (event) => {
  const menuElement = document.getElementById('mobile-menu');
  const buttonElement = document.getElementById('menu-button');
  if (
    isMenuOpen.value &&
    menuElement &&
    !menuElement.contains(event.target) &&
    buttonElement &&
    !buttonElement.contains(event.target)
  ) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  // Set the current path
  currentPath.value = swup.location.pathname;

  // Add the event listener
  document.addEventListener('click', clickOutside);
});

onBeforeUnmount(() => {
  // Remove the event listener
  document.removeEventListener('click', clickOutside);
});
</script>

<template>
  <div class="flex justify-between items-center">
    <!-- Mobile menu button -->
    <button
      id="menu-button"
      class="md:hidden block text-gray-600 focus:outline-none focus:text-primary-500"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
          v-if="!isMenuOpen"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
          v-else
        />
      </svg>
    </button>

    <!-- Desktop navigation links -->
    <div class="hidden md:flex space-x-8">
      <span
        v-for="link in links"
        :key="link.href"
        @click="swup.navigate(link.href)"
        :class="[
          'text-gray-600 cursor-pointer hover:text-primary-500 transition-colors',
          isActive(link.href) ? 'text-orange-500' : ''
        ]"
      >
        {{ link.text }}
      </span>
    </div>

    <!-- Mobile menu (visible only when open) with animation -->
  </div>
  <div
    v-if="isMenuOpen"
    id="mobile-menu"
    class="absolute z-20 top-full w-full px-5 left-0 bg-white py-3 space-y-2 transition-all duration-300 transform ease-in-out"
    :class="{
      'translate-y-0 opacity-100': isMenuOpen,
      '-translate-y-10 opacity-0': !isMenuOpen,
    }"
  >
    <span
      v-for="link in links"
      :key="link.href"
      @click="swup.navigate(link.href);"
      :class="[
        'block text-gray-600 cursor-pointer hover:text-primary-500 transition-colors',
        isActive(link.href) ? 'text-orange-500' : ''
      ]"
    >
      {{ link.text }}
    </span>
  </div>
</template>

<style scoped>
/* Mobile menu transition */
.md\\:hidden {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
</style>
