<script setup>
import { ref } from 'vue';

const links = [
  { href: '/', text: 'Ana Səhifə' },
  { href: '/scripts', text: 'Scriptlər' },
  { href: '/about', text: 'Haqqımızda' },
  { href: '/contact', text: 'Əlaqə' },
];

// State to control the mobile menu
const isMenuOpen = ref(false);
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Site title -->
        <a href="/" class="text-2xl font-bold text-primary-600">AzeScript</a>

        <!-- Mobile menu button -->
        <button
          class="md:hidden text-gray-600 focus:outline-none focus:text-primary-500"
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
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="text-gray-600 hover:text-primary-500 transition-colors"
          >
            {{ link.text }}
          </a>
        </div>
      </div>

      <!-- Mobile menu (visible only when open) -->
      <div v-if="isMenuOpen" class="md:hidden mt-4 py-3 space-y-2">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="block text-gray-600 hover:text-primary-500 transition-colors"
        >
          {{ link.text }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
