<template>
    <Form @submit="sendComment" v-slot="{setFieldValue}"    :validationSchema="commentSchema" class="mt-5">
      <h3 class="text-xl font-semibold mb-6">Şərhlər</h3>
      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <!-- Rating Section -->
        <div class="flex items-center mb-4">
          <div class="text-xl mr-2">Xal:</div>
          <div class="flex">
            <div class="rating">
              <input
                v-model="rating"
                type="radio"
                name="rating"
                @click="setFieldValue('rating',1)"
                value="1"
                class="mask mask-star-2 bg-orange-400"
                aria-label="1 star"
              />
              <input
                v-model="rating"
                type="radio"
                name="rating"
                value="2"
                @click="setFieldValue('rating',2)"
                class="mask mask-star-2 bg-orange-400"
                aria-label="2 star"
              />
              <input
                v-model="rating"
                type="radio"
                name="rating"
                @click="setFieldValue('rating',3)"
                value="3"
                class="mask mask-star-2 bg-orange-400"
                aria-label="3 star"
              />
              <input
                v-model="rating"
                type="radio"
                name="rating"
                value="4"
                @click="setFieldValue('rating',4)"
                class="mask mask-star-2 bg-orange-400"
                aria-label="4 star"
              />
              <input
                v-model="rating"
                type="radio"
                name="rating"
                @click="setFieldValue('rating',5)"
                value="5"
                class="mask mask-star-2 bg-orange-400"
                aria-label="5 star"
              />
            </div>
          </div>
        </div>
        <!-- Content Section -->
        <Field
          name="content"
          as="textarea"
          placeholder="Şərhinizi yazın..."
          class="w-full textarea p-4 border rounded-lg mb-4 h-32"
        />
        <button
          type="submit"
          class="rounded-md btn whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700"
        >
          Şəth et
        </button>
      </div>
  
      <!-- Comments Display -->
      <div class="gap-6 flex flex-col" v-if="fetchloading">
        <Comment   v-for="comment in comments" :key="comment.id" :comment="comment"></Comment>
        <div  class="text-gray-600 text-sm md:text-base">
        Şərh yoxdur
      </div>
      </div>
  
    
      <ErrorMessage name="rating" class="text-red-500 text-sm mt-1" />
      <ErrorMessage name="content" class="text-red-500 text-sm mt-1" />
    </Form>
  </template>
  
  <script setup lang="ts">
  import { Form, Field, ErrorMessage } from 'vee-validate';
  const comments = ref<any[]>([])
  const fetchloading = ref(false)
  
onMounted(()=>{
    $fetch('/api/comments/'+productid).then(res=>{
        comments.value = res
        fetchloading.value = true
    })
})


  // Props and Emits
  const { productid } = defineProps(['comments','productid']);
console.log(productid)
  
  // Local state for rating
  const rating = ref<number | null>(null);
  
  
  // Submit Function
  async function sendComment(values:any) {
    console.log('Yorum gönderildi:', values);
  
    try {
      const response = await fetch('/api/comments/add/'+productid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: values.rating,
          content: values.content,
          productid, 
        }),
      });
  
      if (response) {
        const newComment = await response.json();
        // Formu sıfırlama
        rating.value = null;
        return;
      }
  
      alert('Yorum eklenemedi. Lütfen tekrar deneyin.');
    } catch (error) {
      console.error('Yorum gönderilirken bir hata oluştu:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  }
  </script>
  
  <style scoped>
  /* Stil eklemeleri */
  </style>
  