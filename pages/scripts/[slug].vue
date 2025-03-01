<template>
  <div class="pt-10 pb-20">
    <div class="max-w-7xl mx-auto px-4">
      <NuxtLink to="/scripts" class="mb-8 flex items-center text-gray-600 hover:text-gray-900">
        <font-awesome icon='fa-arrow-left' class="mr-2"></font-awesome>
        Skriptlərə Qayıt
      </NuxtLink>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <img :src="script.image" :alt="script.title" class="w-full h-64 md:h-96 object-cover rounded-lg mb-6">

          <div class="space-y-6">
            <div>
              <h3 class="text-lg md:text-xl font-semibold mb-3">Təsvir</h3>
              <p class="text-gray-600 text-sm md:text-base">{{ script.longDescription }}</p>
            </div>

            <div>
              <h3 class="text-lg md:text-xl font-semibold mb-3">Xüsusiyyətlər</h3>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li v-for="feature in script.features" :key="feature" class="flex items-center text-gray-600 text-sm md:text-base">
                  <font-awesome icon='fa-check' class="text-green-500 mr-2"></font-awesome>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow-lg border">
            <div class="text-2xl md:text-3xl font-bold mb-4">{{ script.price }}</div>
            <button class="w-full py-3 text-sm md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-3">
              Al
            </button>
            <button class="w-full py-3 text-sm md:text-base border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
              Demo Bax
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg border">
            <div class="flex items-center justify-between mb-3">
              <div class="text-gray-600 text-sm md:text-base">Kateqoriya</div>
              <div class="font-semibold">{{ script.category }}</div>
            </div>
            <div class="flex items-center justify-between mb-3">
              <div class="text-gray-600 text-sm md:text-base">Yükləmə sayı</div>
              <div class="font-semibold">{{ script.downloads }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-gray-600 text-sm md:text-base">Reytinq</div>
              <div class="flex items-center">
                <font-awesome icon='fa-star' class="text-yellow-400 mr-1"></font-awesome>
                <span class="font-semibold">{{ script.rating }}</span>
              </div>
            </div>
          </div>
          
        </div>
       
      </div>
      <div class="mt-5">
          <h3 class="text-xl font-semibold mb-6">Şərhlər</h3>
                <div class="space-y-6">
                  <div v-for="comment in script.comments" :key="comment.id" class="bg-white p-6 rounded-lg shadow">
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
                </div>
                
        </div>
    </div>
  </div>
  
              
       
</template>
  
  <script lang="ts" setup>
  const script = ref({
    id: 1,
    title: 'E-ticarət İdarəetmə Paneli',
    description: 'Stok idarəetməsi, sifariş izləmə və müştəri analizi ilə tam xüsusiyyətli e-ticarət paneli.',
    price: '₼799',
    category: 'Veb İnkişaf',
    rating: 4.9,
    downloads: '2.3k',
    isFavorite: true,
    image: 'https://public.readdy.ai/ai/img_res/525cc20093bc351b43167965861f79be.jpg',
    requirements: [
      'Node.js 14+',
      'MongoDB 4.4+',
      'Redis 6+',
      'Minimum 2GB RAM',
      'Linux/Unix əməliyyat sistemi'
    ],
    features: [
      'Tam avtomatik data sinxronizasiyası',
      'Gerçək zamanlı analitik hesabatlar',
      'Fərdiləşdirilə bilən idarə paneli',
      'REST API dəstəyi',
      'Çoxdilli dəstək',
      'İnkişaf etmiş təhlükəsizlik funksiyaları'
    ],
    longDescription: 'Bu skript, müasir veb tətbiqləri üçün nəzərdə tutulmuş tam həll təqdim edir. Gerçək zamanlı hesabatlar və avtomatik sinxronizasiya ilə layihələrinizi daha yüksək səviyyəyə çıxarın.',
    comments: [
      {
        id: 1,
        user: 'Mehmet Əliyev',
        avatar: 'https://public.readdy.ai/ai/img_res/b8fe48e1fc22c46a13983288965e2ef4.jpg',
        rating: 5,
        date: '2025-02-25',
        comment: 'Möhtəşəm bir skript! Layihəmizə əlavə etdikdən sonra iş yükümüz əhəmiyyətli dərəcədə azaldı.'
      }
    ]
  });
  </script>
  