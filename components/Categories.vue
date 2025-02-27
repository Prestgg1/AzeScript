<template>
    <div class="py-20">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Kategoriyalar</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
          >
            <img
              :src="category.image"
              class="w-16 h-16 mx-auto mb-4"
              :alt="category.name"
            />
            <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
            <p class="text-gray-600">{{ category.scriptCount }} Script</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
const categories = [
  {
    id: 1,
    name: "Web Development",
    scriptCount: "2,345",
    image:
      "https://public.readdy.ai/ai/img_res/25796c307a4ec84798d49dfd9a3f5660.jpg",
  },
  {
    id: 2,
    name: "Mobile Development",
    scriptCount: "1,678",
    image:
      "https://public.readdy.ai/ai/img_res/912cdb8b1fba4cc75221f4ff1e71e64e.jpg",
  },
  {
    id: 3,
    name: "Data Science",
    scriptCount: "987",
    image:
      "https://public.readdy.ai/ai/img_res/d86ad51ef1e23b5804307a439e52e932.jpg",
  },
  {
    id: 4,
    name: "Artifical Intelligence",
    scriptCount: "756",
    image:
      "https://public.readdy.ai/ai/img_res/eafa588084adec51e0fd2025fb2e465d.jpg",
  },
];

</script>