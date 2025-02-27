<template>

<section class="pt-32 pb-20 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 flex items-center">
    <div class="w-1/2 pr-8">
    <h2 class="text-5xl font-bold mb-6">Kod Dünyasının Paylaşım Platforması</h2>
    <p class="text-xl text-gray-600 mb-8">Kodlama topluluğumuzda skriptlərinizi paylaşın, satın və kəşf edin. Geliştiricilər üçün etibarlı mənbə platforması.</p>
    <div class="flex space-x-4">
    <NuxtLink class="rounded-md cursor-pointer whitespace-nowrap px-8 py-3 bg-blue-600 text-white hover:bg-blue-700" to="/register">İndi Başla</NuxtLink>
    <NuxtLink class="rounded-md cursor-pointer whitespace-nowrap px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50" to="/login">Daxil Ol</NuxtLink>
    </div>
    </div>
    <div class="w-1/2">
    <img src="/img/heroimage.jpg" alt="Hero" class="w-full h-[500px] object-cover rounded-lg"/>
    </div>
    </div>
    </section>
</template>
