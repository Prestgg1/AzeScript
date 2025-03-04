<template>
    <!-- Header - Eyni başlıq qalır -->
    <Head>
    <Title>Haqqımızda</Title>
  </Head>
    <!-- Haqqımızda Səhifəsi -->
    <div class="pt-24 pb-20">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Qəhrəman Bölməsi -->
            <div class="relative h-[400px] rounded-2xl overflow-hidden mb-16">
                <img src="https://public.readdy.ai/ai/img_res/8640c22af99fa0199372992e7bec5130.jpg" 
                    class="w-full h-full object-cover" alt="Azescript Ofisi" />
                <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent flex items-center">
                    <div class="max-w-2xl px-8">
                        <h1 class="text-4xl font-bold text-white mb-4">Yazılım Dünyasında İnnovativ Həllər</h1>
                        <p class="text-white/90 text-lg">2025-ci ildən bəri tərtibatçılara güc qatır, gələcəyi formalaşdırırıq.</p>
                    </div>
                </div>
            </div>

            <!-- Missiya və Vizyon -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div class="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <font-awesome :icon="['fas', 'rocket']" class="text-blue-600 text-2xl"></font-awesome>
                    </div>
                    <h2 class="text-2xl font-bold mb-4">Missiyamız</h2>
                    <p class="text-gray-600">Tərtibatçılara ən keyfiyyətli və etibarlı skript həllərini təqdim edərək, proqramlaşdırma proseslərini sürətləndirmək və məhsuldarlığı artırmaq.</p>
                </div>
                <div class="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <font-awesome :icon="['fas', 'eye']" class="text-blue-600 text-2xl"></font-awesome>
                    </div>
                    <h2 class="text-2xl font-bold mb-4">Vizyonumuz</h2>
                    <p class="text-gray-600">Proqramlaşdırma ekosistemində qlobal bir platforma kimi, innovativ həllərlə sektorda lider mövqeyə çatmaq.</p>
                </div>
            </div>

            <!-- Komanda -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">Komandamız</h2>
                <div class="flex justify-center gap-8">
                    <div v-for="member in teamMembers" :key="member.id" class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                        <img :src="member.image" :alt="member.name" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
                            <p class="text-gray-600 mb-4">{{ member.position }}</p>
                            <div class="flex gap-3">
                                <a href="#" class="text-gray-400 hover:text-blue-600">
                                    <font-awesome :icon="['fab', 'linkedin']" class="text-xl" />
                                </a>
                                <a href="#" class="text-gray-400 hover:text-blue-400">
                                    <font-awesome :icon="['fab', 'twitter']" class="text-xl" />
                                </a>
                                <a href="#" class="text-gray-400 hover:text-gray-600">
                                    <font-awesome :icon="['fab', 'github']" class="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dəyərlərimiz -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="value in companyValues" :key="value.id" class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <font-awesome :icon="['fa', value.icon]" class="text-blue-600 text-xl"></font-awesome>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">{{ value.title }}</h3>
                    <p class="text-gray-600">{{ value.description }}</p>
                </div>
            </div>

        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

const teamMembers = [
    {
        id: 1,
        name: 'Sarıyev Səbuhi',
        position: 'CEO & Yaradıcı',
        image: 'https://media.licdn.com/dms/image/v2/D4E03AQEF_7HpvIQYUQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731563446818?e=1746057600&v=beta&t=uahOvXmK0sBBlyKLmkOTdjzq-3FhS-2MB70LiMbK92s'
    },
];

const companyValues = ref([
    {
        id: 1,
        title: 'İnnovasiya',
        description: 'Daim inkişaf edən texnologiya dünyasında ən yeni və ən yaxşı həlləri təqdim etməyə diqqət yetiririk.',
        icon: 'lightbulb'
    },
    {
        id: 2,
        title: 'Etibarlılıq',
        description: 'İstifadəçilərimizə hər zaman təhlükəsiz və keyfiyyətli xidmət göstərməyə zəmanət veririk.',
        icon: 'shield-alt'
    },
    {
        id: 3,
        title: 'Əməkdaşlıq',
        description: 'Cəmiyyət yönümlü yanaşmamızla tərtibatçılar arasında güclü bağlar qururuq.',
        icon: 'hands-helping'
    }
]);
</script>
