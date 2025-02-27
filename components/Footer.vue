<template>
      <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center sm:text-left mb-8 lg:mb-0">
            <h3 class="text-xl font-bold mb-4">Azescript</h3>
            <p class="text-gray-400">
              Kod dünyasının ən böyük skript paylaşım platformu
            </p>
          </div>
          <div class="text-center sm:text-left mb-8 lg:mb-0">
            <h4 class="text-lg font-semibold mb-4">Hızlı Linklər</h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-gray-400 hover:text-white">Ana Səhifə</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/scripts/" class="text-gray-400 hover:text-white">Skriptlər</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/categories/" class="text-gray-400 hover:text-white"
                  >Kategoriyalar</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/contact/" class="text-gray-400 hover:text-white">Əlaqə</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="text-center sm:text-left mb-8 lg:mb-0">
            <h4 class="text-lg font-semibold mb-4">Əlaqə</h4>
            <ul class="space-y-2 text-gray-400">
              <li><font-awesome icon="fa-envelope" class="mr-2"/> prestgg56@gmail.com </li>
              <li><font-awesome icon="fa-phone" class="mr-2"/> +994 51 407 05 92</li>
              <li>
                <font-awesome icon="fa-location-dot" class="mr-2"/> Binəqədi, Azərbaycan
              </li>
            </ul>
          </div>
          <div class="text-center sm:text-left">
            <h4 class="text-lg font-semibold mb-4">Bülten</h4>
            <div class="relative">
              <input
                type="email"
                placeholder="E-poçt adresiniz"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <button
                class="rounded-md absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                Abunə Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>