<template>
    <div class="min-h-screen bg-white">
      <!-- Header -->

      <!-- Categories Page -->
      <div  class="pt-24 pb-20">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4">Skript Kategoriyaları</h1>
            <p class="text-gray-600 max-w-2xl mx-auto">
              İhtiyacınız olan skript kategorisini seçin ve binlerce kaliteli
              skriptə hemen ulaşın.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="category in detailedCategories"
              :key="category.id"
              class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="category.image"
                  class="w-full h-full object-cover"
                  :alt="category.name"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                ></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-xl font-semibold">{{ category.name }}</h3>
                  <p class="text-sm opacity-90">
                    {{ category.scriptCount }} Script
                  </p>
                </div>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">{{ category.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tag in category.tags"
                    :key="tag"
                    class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >{{ tag }}</span
                  >
                </div>
                <button
                  class="rounded-md w-full py-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Kəşfet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Contact Page -->
 
    </div>
  </template>
  
  <script lang="ts" setup>
  const detailedCategories = ref([
    {
      id: 1,
      name: "Veb İnkişafı",
      scriptCount: "2,345",
      description:
        "Modern veb tətbiqləri üçün frontend və backend həlləri, API inteqrasiyaları və daha fazlası.",
      tags: ["React", "Vue", "Node.js", "PHP"],
      image:
        "https://public.readdy.ai/ai/img_res/b4a59450ba9020d595b09ed7cbdfed42.jpg",
    },
    {
      id: 2,
      name: "Mobil Uygulama",
      scriptCount: "1,678",
      description:
        "iOS və Android platformaları üçün mobil tətbiq geliştirme alətləri və şablonları.",
      tags: ["React Native", "Flutter", "Swift", "Kotlin"],
      image:
        "https://public.readdy.ai/ai/img_res/629b3427390920bea55c6d5c7401eaf9.jpg",
    },
    {
      id: 3,
      name: "Veri Analizi",
      scriptCount: "987",
      description:
        "Böyük veri analizi, veri görselleştirme və maşın öyrənməsi alətləri.",
      tags: ["Python", "R", "Tableau", "SQL"],
      image:
        "https://public.readdy.ai/ai/img_res/1bd7949b9a9cac252a067c24876e8fe2.jpg",
    },
    {
      id: 4,
      name: "Yapay Zəka",
      scriptCount: "756",
      description:
        "Yapay zəka və maşın öyrənməsi modelleri, təbii dil işləmə alətləri.",
      tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
      image:
        "https://public.readdy.ai/ai/img_res/9129eb9711bec8dc91d1e53a38d61c6a.jpg",
    },
    {
      id: 5,
      name: "E-ticaret",
      scriptCount: "1,234",
      description:
        "Online mağaza həlləri, ödəniş sistemləri və envanter idarəetmə alətləri.",
      tags: ["WooCommerce", "Shopify", "Magento", "PrestaShop"],
      image:
        "https://public.readdy.ai/ai/img_res/d2945b137a3ffc60c16c924c5ac399e1.jpg",
    },
    {
      id: 6,
      name: "Siber Təhlükəsizlik",
      scriptCount: "543",
      description:
        "Təhlükəsizlik testləri, penetrasiya testləri və təhlükəsizlik açığı tarama alətləri.",
      tags: ["Penetration Testing", "Network Security", "Encryption"],
      image:
        "https://public.readdy.ai/ai/img_res/741dc371d1b59964409698addc206629.jpg",
    },
  ]);

  </script>
  