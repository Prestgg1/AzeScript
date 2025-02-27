<template>
  <div class="py-20 bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 justify-center  flex ">
        <div class="flex flex-wrap justify-around w-full items-center lg:gap-8">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="text-center text-white py-4"
          >
            <div class="text-4xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-lg">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const stats = ref([
  { id: 1, value: "10,000+", label: "Script" },
  { id: 2, value: "50,000+", label: "Istifadəçi" },
  { id: 3, value: "100,000+", label: "Yüklənmə" },
]);
</script>
