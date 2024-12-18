<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Avatar Bölməsi -->
    <div class="flex items-center space-x-6">
      <img
        :src="formData.avatar"
        :alt="formData.name"
        class="w-20 h-20 rounded-full"
      />
      <div>
        <label class="block text-sm font-medium text-gray-700">Profil Şəkli</label>
        <input
          type="file"
          accept="image/*"
          @change="handleAvatarChange"
          class="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-primary-50 file:text-primary-600
            hover:file:bg-primary-100"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.avatar }}</span>
        </span>
      </div>
    </div>

    <!-- Əsas Məlumat -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Ad və Soyad</span>
        </label>
        <input
          type="text"
          v-model="formData.name"
          class="input input-bordered"
          :class="{ 'input-error': errors.name }"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.name }}</span>
        </span>
      </div>
      
      <div class="form-control">
        <label class="label">
          <span class="label-text">E-poçt</span>
        </label>
        <input
          type="email"
          v-model="formData.email"
          class="input input-bordered"
          :class="{ 'input-error': errors.email }"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.email }}</span>
        </span>
      </div>
    </div>

    <!-- Əlavə Məlumat -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Haqqımda</span>
      </label>
      <textarea
        v-model="formData.bio"
        rows="4"
        class="textarea textarea-bordered"
        :class="{ 'textarea-error': errors.bio }"
      ></textarea>
      <span class="label">
        <span class="label-text-alt text-error">{{ errors.bio }}</span>
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Məkan</span>
        </label>
        <input
          type="text"
          v-model="formData.location"
          class="input input-bordered"
          :class="{ 'input-error': errors.location }"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.location }}</span>
        </span>
      </div>
      
      <div class="form-control">
        <label class="label">
          <span class="label-text">Vebsayt</span>
        </label>
        <input
          type="url"
          v-model="formData.website"
          class="input input-bordered"
          :class="{ 'input-error': errors.website }"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.website }}</span>
        </span>
      </div>
    </div>

    <!-- Göndərmə Düyməsi -->
    <div class="flex justify-end">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Yadda saxlanılır...' : 'Dəyişiklikləri Yadda Saxla' }}
      </button>
    </div>
  </form>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { profileSchema } from '../../lib/validations/profile';
  
  const isSubmitting = ref(false);
  
  const formData = reactive({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=f97316&color=fff',
    bio: 'Senior Web Developer',
    location: 'İstanbul, Türkiye',
    website: 'https://ahmetyilmaz.dev'
  });
  
  const errors = reactive({
    name: '',
    email: '',
    avatar: '',
    bio: '',
    location: '',
    website: ''
  });
  
  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
  };
  
  const handleAvatarChange = (event) => {
    const file = (event.target).files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('Selected file:', file);
    }
  };
  
  const handleSubmit = async () => {
    clearErrors();
    isSubmitting.value = true;
  
    try {
      const validatedData = await profileSchema.parseAsync(formData);
      console.log('Profile data is valid:', validatedData);
      
      // Here you would typically make an API call to update the profile
      
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