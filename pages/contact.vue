<template>
    <!-- Əlaqə Səhifəsi -->
    <div class="pt-24 pb-20">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h1 class="text-4xl font-bold mb-4">Əlaqə</h1>
                    <p class="text-gray-600 mb-8">Suallarınız və ya təklifləriniz üçün bizimlə əlaqə saxlaya bilərsiniz. Ən qısa zamanda sizə cavab verəcəyik.</p>
                    <div class="flex flex-col gap-6">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <font-awesome icon='map-marker-alt' class="text-blue-600 text-xl"></font-awesome>
                            </div>
                            <div>
                                <h3 class="font-semibold">Ünvan</h3>
                                <p class="text-gray-600">Azərbaycan, Binəqədi</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <font-awesome icon='phone' class="text-blue-600 text-xl"></font-awesome>
                            </div>
                            <div>
                                <h3 class="font-semibold">Telefon</h3>
                                <p class="text-gray-600">+994 51 407 05 92</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <font-awesome icon='envelope' class="text-blue-600 text-xl"></font-awesome>
                            </div>
                            <div>
                                <h3 class="font-semibold">E-poçt</h3>
                                <p class="text-gray-600">prestgg56@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12">
                        <h3 class="text-xl font-semibold mb-4">Bizi İzləyin</h3>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                                <font-awesome :icon='["fab", "facebook"]'></font-awesome>
                            </a>
                            <a href="#" class="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500">
                                <font-awesome :icon='["fab", "twitter"]'></font-awesome>
                            </a>
                            <a href="#" class="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700">
                                <font-awesome :icon='["fab", "instagram"]'></font-awesome>
                            </a>
                            <a href="#" class="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900">
                                <font-awesome :icon='["fab", "linkedin-in"]'></font-awesome>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
                    <h2 class="text-2xl font-bold mb-6">Mesaj Göndərin</h2>
                    <form @submit.prevent="handleContactSubmit" class="flex flex-col gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                            <input type="text" v-model="contactForm.name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Adınız və Soyadınız" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
                            <input type="email" v-model="contactForm.email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="E-poçt ünvanınız" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Mövzu</label>
                            <select v-model="contactForm.subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Seçin</option>
                                <option value="general">Ümumi Məlumat</option>
                                <option value="support">Texniki Dəstək</option>
                                <option value="business">Biznes Əməkdaşlıq</option>
                                <option value="other">Digər</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                            <textarea v-model="contactForm.message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Mesajınız..."></textarea>
                        </div>
                        <button type="submit" class="w-full !rounded-button py-2 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center">
                            <font-awesome icon='fa-paper-plane' class="mr-2"></font-awesome>
                            Göndər
                        </button>
                    </form>
                    <div v-if="showSuccessMessage" class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
                        Mesajınız uğurla göndərildi. Ən qısa zamanda sizə cavab verəcəyik.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const contactForm = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});
const showSuccessMessage = ref(false);
const handleContactSubmit = () => {
    if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.subject || !contactForm.value.message) {
        alert('Zəhmət olmasa bütün sahələri doldurun.');
        return;
    }
    setTimeout(() => {
        showSuccessMessage.value = true;
        contactForm.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
        setTimeout(() => {
            showSuccessMessage.value = false;
        }, 3000);
    }, 500);
};
</script>
