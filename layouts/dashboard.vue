<template>

    <div class="min-h-screen flex flex-col bg-white">

      <Header />
      <div class="flex-grow">

        <div class="flex flex-1 ">
      <!-- Yan Panel -->
        <Sidebar/>

      <!-- Əsas Məzmun -->
        <div class="ml-64 flex-1 p-8">
        <NuxtPage />
        </div>
        </div>
      </div>
  <Footer/>

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