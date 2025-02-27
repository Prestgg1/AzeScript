<template>

    <!-- Qeydiyyat Bölməsi -->
    <div class="max-w-7xl mx-auto px-4 py-20">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
    <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Qeydiyyatdan keç</h1>
    <p class="text-gray-600">Yeni hesab yaradın</p>
    </div>
    <form @submit.prevent="handleRegister" class="space-y-6">
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
    <input
    type="text"
    v-model="registerForm.fullName"
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Ad Soyad"
    />
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
    <input
    type="email"
    v-model="registerForm.email"
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="nümunə@email.com"
    />
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Şifrə</label>
    <input
    type="password"
    v-model="registerForm.password"
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="••••••••"
    />
    </div>
    <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Şifrə (təkrar)</label>
    <input
    type="password"
    v-model="registerForm.confirmPassword"
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="••••••••"
    />
    </div>
    <div class="flex items-start">
    <input type="checkbox" v-model="registerForm.agreeToTerms" class="mt-1 rounded text-blue-600" />
    <span class="ml-2 text-sm text-gray-600">
    <a href="#" class="text-blue-600 hover:text-blue-800">İstifadə şərtlərini</a> və
    <a href="#" class="text-blue-600 hover:text-blue-800">Məxfilik siyasətini</a> qəbul edirəm
    </span>
    </div>
    <div v-if="registerError" class="text-red-500 text-sm text-center">{{ registerError }}</div>
    <button type="submit" class="w-full rounded-md py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium">
    Qeydiyyatdan keç
    </button>
    <div class="relative">
    <div class="absolute inset-0 flex items-center">
    <div class="w-full border-t border-gray-300"></div>
    </div>
    <div class="relative flex justify-center text-sm">
    <span class="px-2 bg-white text-gray-500">və ya</span>
    </div>
    </div>
    <button
    type="button"
    @click="handleGoogleRegister"
    class="w-full rounded-md py-3 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center space-x-2"
    >
    <font-awesome :icon="['fab', 'google']" class="text-[20px]" />
    <span>Google ilə qeydiyyatdan keç</span>
    </button>
    </form>
    <div class="mt-6 text-center text-sm text-gray-600">
    Artıq hesabınız var?
    <button
    type="button"
    @click="showLoginModal = true"
    class="text-blue-600 hover:text-blue-800 font-medium"
    >
    Daxil olun
    </button>
    </div>
    </div>
    </div>
 
</template>
<script lang="ts" setup>
import { ref } from 'vue';

// Auth Modal States
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
});

const registerForm = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
});

const loginError = ref('');
const registerError = ref('');

const handleLogin = () => {
  loginError.value = '';
  if (!loginForm.value.email || !loginForm.value.password) {
    loginError.value = 'Zəhmət olmasa, bütün sahələri doldurun.';
    return;
  }
  console.log('Daxil olma cəhdi:', loginForm.value);
};

const handleGoogleLogin = () => {
  console.log('Google ilə daxil olma cəhdi');
};

const handleGoogleRegister = () => {
  console.log('Google ilə qeydiyyat cəhdi');
};

const handleRegister = () => {
  registerError.value = '';
  if (!registerForm.value.fullName || !registerForm.value.email || !registerForm.value.password || !registerForm.value.confirmPassword) {
    registerError.value = 'Zəhmət olmasa, bütün sahələri doldurun.';
    return;
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    registerError.value = 'Şifrələr uyğun gəlmir.';
    return;
  }
  if (!registerForm.value.agreeToTerms) {
    registerError.value = 'Zəhmət olmasa, istifadə şərtlərini qəbul edin.';
    return;
  }
  console.log('Qeydiyyat cəhdi:', registerForm.value);
  showRegisterModal.value = false;
  registerForm.value = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };
};
</script>
