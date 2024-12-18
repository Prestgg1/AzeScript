<!-- Yeni skript forması komponenti -->
<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Əsas Məlumat -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Skript Adı</span>
        </label>
        <input
          type="text"
          v-model="formData.title"
          class="input input-bordered"
          :class="{ 'input-error': errors.title }"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.title }}</span>
        </span>
      </div>
      
      <div class="form-control">
        <label class="label">
          <span class="label-text">Kateqoriya</span>
        </label>
        <select
          v-model="formData.category"
          class="select select-bordered"
          :class="{ 'select-error': errors.category }"
        >
          <option value="">Seçin</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.category }}</span>
        </span>
      </div>
    </div>

    <!-- Qiymətləndirmə -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Qiymət (₼)</span>
        </label>
        <input
          type="number"
          v-model="formData.price"
          min="0"
          step="0.01"
          class="input input-bordered"
          :class="{ 'input-error': errors.price }"
          :disabled="formData.isFree"
        />
        <span class="label">
          <span class="label-text-alt text-error">{{ errors.price }}</span>
        </span>
      </div>
      
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            v-model="formData.isFree"
            class="checkbox checkbox-primary"
          />
          <span class="label-text">Pulsuz Skript</span>
        </label>
      </div>
    </div>

    <!-- Təsvir -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Təsvir</span>
      </label>
      <textarea
        v-model="formData.description"
        rows="4"
        class="textarea textarea-bordered"
        :class="{ 'textarea-error': errors.description }"
      ></textarea>
      <span class="label">
        <span class="label-text-alt text-error">{{ errors.description }}</span>
      </span>
    </div>

    <!-- Fayl Yükləmə -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Skript Faylı</span>
      </label>
      <input
        type="file"
        accept=".zip,.rar,.7zip"
        @change="handleFileChange"
        class="file-input file-input-bordered w-full"
        :class="{ 'file-input-error': errors.file }"
      />
      <span class="label">
        <span class="label-text-alt text-error">{{ errors.file }}</span>
      </span>
    </div>

    <!-- Göndərmə Düymələri -->
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        class="btn"
        @click="$emit('cancel')"
      >
        İmtina
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Paylaşılır...' : 'Paylaş' }}
      </button>
    </div>
  </form>
</template>

  
  <script setup>
  import { ref, reactive } from 'vue';
  import { scriptSchema } from '../../lib/validations/script';
  
  const categories = [
    'E-ticaret',
    'API',
    'Frontend',
    'Backend',
    'Veritabanı',
    'Güvenlik',
  ];
  
  const isSubmitting = ref(false);
  
  const formData = reactive({
    title: '',
    category: '',
    price: 0,
    isFree: false,
    description: '',
    file: null
  });
  
  const errors = reactive({
    title: '',
    category: '',
    price: '',
    description: '',
    file: ''
  });
  
  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
  };
  
  const handleFileChange = (event) => {
    const file = (event.target).files?.[0];
    if (file) {
      formData.file = file;
    }
  };
  
  const handleSubmit = async () => {
    clearErrors();
    isSubmitting.value = true;
  
    try {
      const validatedData = await scriptSchema.parseAsync(formData);
      console.log('Script data is valid:', validatedData);
      
      // Here you would typically make an API call to upload the script
      
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