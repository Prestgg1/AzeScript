<template>
    <div class="container">
      <div class="max-w-7xl mx-auto px-4 py-20">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Kateqoriya İdarəetməsi</h1>
            <p class="text-gray-600">Yeni kateqoriya əlavə edin və ya mövcud kateqoriyaları redaktə edin</p>
          </div>
  
          <Form v-slot="{ setFieldValue, values }" :validation-schema="categorySchema" @submit="handleCategorySubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kateqoriya Adı</label>
              <Field   @input="updateSlug(values, setFieldValue)"  type="text" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Məs: Veb İnkişafı" />
              <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <Field type="text" name="slug" class="w-full px-4 py-2 border border-gray-300 rounded-lg" readonly />
              <ErrorMessage name="slug" class="text-red-500 text-sm mt-1" />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Təsvir</label>
              <Field type="text" name="description" class="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Kateqoriya haqqında qısa bir təsvir yazın..." />
              <ErrorMessage name="description" class="text-red-500 text-sm mt-1" />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kateqoriya Şəkili</label>
              <CldUploadWidget   @result="console.log($event)"  v-slot="{ open }" uploadPreset="learnteach" @success="(result:any) => {
                console.log(result);
                setFieldValue('image', result.info.secure_url)}" @error="onUploadError">
                <div class="text-center">
                  <NuxtImg v-if="values.image" :src="values.image" @click="values.image = null" class="shadow-md w-80 h-80 rounded-xl border-4 border-white cursor-pointer" alt="Ön izləmə" />
                  <div v-else @click="open" class="cursor-pointer border-2 border-gray-300 border-dashed rounded-lg p-6 text-gray-600 text-sm flex flex-col items-center">
                    <font-awesome :icon="['fas', 'cloud-upload-alt']" class="text-4xl mb-2" />
                    <p>Şəkil yükləmək üçün klikləyin</p>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF - maksimum 10MB</p>
                  </div>
                </div>
              </CldUploadWidget>
            </div>
            <ErrorMessage name="image" class="text-red-500 text-sm mt-1" />
            <div class="flex items-center space-x-4">
              <button type="submit" class="flex-1 rounded-md py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium">
                <font-awesome :icon="['fas', 'plus']" class="mr-2" />Kateqoriya Əlavə et
              </button>
              <button type="reset"  class="rounded-md py-3 px-6 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                <font-awesome :icon="['fas', 'redo']" class="mr-2" />Sıfırla
              </button>
            </div>
          </Form>
  <!-- 
          <div class="mt-12">
            <h2 class="text-xl font-semibold mb-4">Mövcud Kateqoriyalar</h2>
            <div class="grid grid-cols-1 gap-4">
              <div v-for="category in categories" :key="category.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-4">
                  <img :src="category.image" alt="Kateqoriya" class="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 class="font-medium text-gray-900">{{ category.name }}</h3>
                    <p class="text-sm text-gray-500">{{ category.description }}</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <font-awesome :icon="['fas', 'edit']" class="mr-2" />
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <font-awesome :icon="['fas', 'trash']" class="mr-2" />
                  </button>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { CldUploadWidget } from '#components';

  function onUploadError(error:any) {
      console.error('Upload Error:', error);
  }

  definePageMeta({
      layout: "dashboard",
  });
  
  const categories = ref([
    {
      id: 1,
      name: "Web Geliştirme",
      description: "Web uygulamaları və site geliştirme ile ilgili scriptler",
      image:
        "https://public.readdy.ai/ai/img_res/3d2abc40023b46907091fa89bd9dfa20.jpg",
    },
    {
      id: 2,
      name: "Veri Analizi",
      description: "Veri analizi və görselleştirme araçları",
      image:
        "https://public.readdy.ai/ai/img_res/6dd0766bfa212240869d3fd0dc0b6f8f.jpg",
    },
  ]);
  
  const updateSlug = (values: any, setFieldValue: any) => {
  const slug = values.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-');

  setFieldValue('slug', slug); 
};



const handleCategorySubmit = async (values: any) => {
  try {
    // API'ye POST isteği gönderme
    const response = await $fetch('http://localhost:3000/api/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        slug: values.slug,
        description: values.description,
        image: values.image || "https://public.readdy.ai/ai/img_res/7bb2cf08f30e8f2668b7b966e800ce97.jpg",
      }),
    });

    console.log("Kategori başarıyla eklendi:" , response );
  } catch (error) {
    console.error("Hata:", error);
  }
};

  </script>