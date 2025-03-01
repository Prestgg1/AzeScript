<template>
    <section class="pt-32 pb-20 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center">
        <div class="lg:w-1/2 w-full lg:pr-8 text-center lg:text-left">
          <h2 class="text-4xl sm:text-5xl font-bold mb-6">Kod Dünyasının Paylaşım Platforması</h2>
          <p class="text-lg sm:text-xl text-gray-600 mb-8">
            Kodlama topluluğumuzda skriptlərinizi paylaşın, satın və kəşf edin. Geliştiricilər üçün etibarlı mənbə platforması.
          </p>
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <NuxtLink 
              class="rounded-md cursor-pointer px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 transition duration-300" 
              to="/register">
              İndi Başla
            </NuxtLink>
            <NuxtLink 
              class="rounded-md cursor-pointer px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition duration-300" 
              to="/login">
              Daxil Ol
            </NuxtLink>
          </div>
        </div>
        <div class="lg:w-1/2 w-full mb-8 lg:mb-0">
          <img 
            src="/img/heroimage.jpg" 
            alt="Hero" 
            class="w-full h-64 sm:h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg">
        </div>
      </div>
    </section>
  </template>
  