<template>

          <div class="min-h-screen flex flex-col bg-white">

            <Header />
            <div class="flex-grow">
            <NuxtPage />
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