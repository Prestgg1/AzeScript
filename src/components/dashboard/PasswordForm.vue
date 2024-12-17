<!-- Password change form component -->
<template>
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Mevcut Şifre</span>
          </label>
          <input
            type="password"
            v-model="formData.currentPassword"
            class="input input-bordered"
            :class="{ 'input-error': errors.currentPassword }"
          />
          <span class="label">
            <span class="label-text-alt text-error">{{ errors.currentPassword }}</span>
          </span>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">Yeni Şifre</span>
          </label>
          <input
            type="password"
            v-model="formData.newPassword"
            class="input input-bordered"
            :class="{ 'input-error': errors.newPassword }"
          />
          <span class="label">
            <span class="label-text-alt text-error">{{ errors.newPassword }}</span>
          </span>
        </div>
      </div>
  
      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Değiştiriliyor...' : 'Şifreyi Değiştir' }}
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { passwordChangeSchema } from '../../lib/validations/profile';
  
  const isSubmitting = ref(false);
  
  const formData = reactive({
    currentPassword: '',
    newPassword: ''
  });
  
  const errors = reactive({
    currentPassword: '',
    newPassword: ''
  });
  
  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
  };
  
  const handleSubmit = async () => {
    clearErrors();
    isSubmitting.value = true;
  
    try {
      const validatedData = await passwordChangeSchema.parseAsync(formData);
      console.log('Password change data is valid:', validatedData);
      
      // Here you would typically make an API call to change the password
      
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (field && errors.hasOwnProperty(field)) {
            errors[field] = err.message;
          }
        });
      }
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>