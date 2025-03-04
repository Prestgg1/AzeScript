<template>

        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <div class="pt-16">
            <div class="max-w-7xl mx-auto px-4 py-20">
              <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div class="text-center mb-8">
                  <h1 class="text-3xl font-bold text-gray-900 mb-2"> 
                    
                    
                  <slot name="title"></slot></h1>
                  <p class="text-gray-600">
                    <!-- Buradaki slot'u doğru şekilde kullanmak için -->
                    <slot name="header"></slot>
                  </p>
                </div>
                <!-- Sayfanın içeriği burada render edilecek -->
                <slot />
              </div>
            </div>
          </div>
        </div>
  </template>
  
<style>
body{
font-family: Poppins, sans-serif;
}
html{
overscroll-behavior: none;
}

</style>