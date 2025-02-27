<template>
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h3 class="text-3xl font-bold mb-12 text-center">İstifadəçi Rəyləri</h3>
            <ClientOnly>
                <swiper-container ref="testimonialref"
                    :slides-per-view="2"
                    :space-between="30"
                    :pagination="{ clickable: true }"
                    :autoplay="{ delay: 4000 }"
                    class="testimonials-swiper">
                    <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
                        <div class="bg-white p-8 rounded-lg shadow">
                            <div class="flex items-center mb-6">
                                <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full">
                                <div class="ml-4">
                                    <h4 class="font-semibold">{{ testimonial.name }}</h4>
                                    <div class="flex text-yellow-400">
                                        <i v-for="n in 5" :key="n" class="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="text-gray-600">{{ testimonial.comment }}</p>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </ClientOnly>
        </div>
    </section>
</template>

<script setup>
const testimonialref = ref(null)
const testimonials = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        comment: 'Azescript sayəsində layihələrimizi daha sürətli tamamlayırıq. Mükəmməl bir platformadır!',
        avatar: 'https://public.readdy.ai/ai/img_res/1ef8eab8ced532818e9491a2f4ea0254.jpg'
    },
    {
        id: 2,
        name: 'Ayşe Kaya',
        comment: 'Kod paylaşım platformaları arasında ən istifadə olunanıdır. Skriptlər çox keyfiyyətlidir.',
        avatar: 'https://public.readdy.ai/ai/img_res/c3038a85c4f64abc019747d3d3890a8c.jpg'
    }
];
</script>
