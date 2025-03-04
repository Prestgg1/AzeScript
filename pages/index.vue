<template>
	<Head>
		<Title>Ana Səhifə</Title>
	</Head>
	<div
	  class="relative min-h-[400px] md:h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden"
	>
	  <div
		class="md:px-32 mx-auto px-4 h-full flex flex-col md:flex-row items-center py-12 md:py-0"
	  >
		<div class="w-full md:w-1/2 text-white z-10 text-center md:text-left">
		  <h2 class="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
			Kod Dünyasının Paylaşım Platforması
		  </h2>
		  <p class="text-lg md:text-xl mb-6 md:mb-8">
			Kodunuzu paylaşın, satın, kəşf edin və inkişaf etdirin. 
			Proqram təminatı dünyasının ən böyük skript paylaşım platformasına xoş gəlmisiniz.
		  </p>
		  <div
			class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
		  >
			<button
			  class="rounded-md px-6 md:px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
			>
			  Başla
			</button>
			<button
			  class="rounded-md px-6 md:px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-600"
			>
			  Kəşf et
			</button>
		  </div>
		</div>
		<div
		  class="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-100"
		>
		  <NuxtImg
			src="/img/heroimage.jpg"
			class="w-full h-full object-cover"
			alt="Qəhrəman Şəkli"
		  />
		</div>
	  </div>
	</div>
	<PopularScripts/>
	<Categories/>
	<Stats/>
</template>


<script lang="ts" setup>
import { NuxtImg } from "#components";
import Stats from "~/components/Stats.vue";

</script>

<style scoped>
.popular-scripts-swiper {
  padding-bottom: 3rem;
}

</style>

  