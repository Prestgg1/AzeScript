<!-- Forgot password form component -->
<template>
  <div class="max-w-md mx-auto">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-2xl justify-center mb-6">Şifrəmi Unuttum</h1>
        
        <p class="text-center text-base-content/70 mb-6">
          E-poçt adresinizi girin, sizə şifrə yeniləmə linki göndərək.
        </p>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email Input -->
          <div class="form-control w-full">
            <label for="email" class="label">
              <span class="label-text">E-poçt</span>
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="input input-bordered w-full"
              :class="{ 'input-error': error }"
            />
            <span class="label">
              <span class="label-text-alt text-error">{{ error }}</span>
            </span>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-full"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder' }}
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <a href="/auth/login" class="link link-primary text-sm">
            Giriş səhifəsinə qayıt
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { forgotPasswordSchema } from '../../lib/validations/auth';

const isSubmitting = ref(false);
const email = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  isSubmitting.value = true;

  try {
    const validatedData = await forgotPasswordSchema.parseAsync({ email: email.value });
    console.log('Forgot password data is valid:', validatedData);
    
    // Here you would typically make an API call to send reset password email
    
  } catch (err:any) {
    if (err.errors?.[0]) {
      error.value = err.errors[0].message;
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>