<template>
    <div class="card bg-base-100 container mx-auto my-5 shadow-md p-6">
      <form @submit.prevent="saveScript">
        <!-- Əsas Məlumatlar -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold">Əsas Məlumatlar</h2>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="form-control">
              <label class="label"><span class="label-text">Skript Başlığı <span class="text-red-500">*</span></span></label>
              <input v-model="scriptData.title" type="text" class="input input-bordered w-full" required />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Kateqoriya <span class="text-red-500">*</span></span></label>
              <select v-model="selectedCategory" class="select select-bordered w-full">
                <option disabled selected>Kateqoriya Seçin</option>
                <option v-for="category in categories" :key="category">{{ category }}</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Qiymət (₼) <span class="text-red-500">*</span></span></label>
              <input v-model="scriptData.price" type="number" class="input input-bordered w-full" required disabled />
            </div>
          </div>
        </div>

        <!-- Şəkil -->
    <!--     <CldUploadWidget
        v-slot="{ open }"
        @result="console.log($event)"
        uploadPreset="learnteach"
        @success="onUploadSuccess"
        @error="onUploadError"
      >
      {{ src }}
        <div
          v-if="!src"
          class="border-4 border-dashed border-white rounded-xl p-4 flex items-center justify-center cursor-pointer"
          @click="open"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span class="ml-4">Şəkil Əlavə Edin</span>
        </div>
        <NuxtImg
          v-else
          :src="src"
          @click="src = null"
          alt="Uploaded Image"
          class="shadow-md w-80 h-80 rounded-xl mx-auto border-4 border-white grayscale"
        />
      </CldUploadWidget> -->
  
        <!-- Xüsusiyyətlər və Tələblər -->
        <div class="mb-6 grid gap-4 md:grid-cols-2">
          <div class="form-control">
            <label class="label"><span class="label-text">Xüsusiyyətlər <span class="text-red-500">*</span></span></label>
            <div class="join w-full">
              <input v-model="newFeature" type="text" class="input outline-none input-bordered w-full join-item" placeholder="Yeni xüsusiyyət əlavə edin" @keyup.enter="addFeature" />
              <button type="button" @click="addFeature" class="btn btn-primary join-item">+</button>
            </div>
            <ul class="mt-2 max-h-48 overflow-y-auto border rounded-md p-2">
              <li v-for="(feature, index) in scriptData.features" :key="index" class="flex justify-between items-center p-2 border-b">
                <span>{{ feature }}</span>
                <button type="button" @click="removeFeature(index)" class="text-red-500">x</button>
              </li>
            </ul>
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text">Sistem Tələbləri <span class="text-red-500">*</span></span></label>
            <div class="join w-full">
              <input v-model="newRequirement" type="text" class="input input-bordered w-full join-item" placeholder="Yeni tələb əlavə edin" @keyup.enter="addRequirement" />
              <button type="button" @click="addRequirement" class="btn btn-primary join-item">+</button>
            </div>
            <ul class="mt-2 max-h-48 overflow-y-auto border rounded-md p-2">
              <li v-for="(requirement, index) in scriptData.requirements" :key="index" class="flex justify-between items-center p-2 border-b">
                <span>{{ requirement }}</span>
                <button type="button" @click="removeRequirement(index)" class="text-red-500">x</button>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Demo & Açıqlama -->
        <div class="mb-6 space-y-4">
          <div class="form-control">
            <label class="label"><span class="label-text">Demo Link</span></label>
            <input v-model="scriptData.demoLink" type="url" class="input input-bordered w-full" />
          </div>
          <div class="form-control ">
            <label class="label"><span class="label-text">Açıqlama <span class="text-red-500">*</span></span></label>
            <textarea v-model="scriptData.description" rows="4" class="textarea textarea-bordered w-full" required></textarea>
          </div>
        </div>
  
        <!-- Əməliyyat Düymələri -->
        <div class="flex justify-end gap-4">
          <button type="button" @click="resetForm" class="btn btn-ghost">Ləğv et</button>
          <button type="submit" class="btn btn-primary">Yadda saxla və Göndər</button>
        </div>
      </form>
    </div>
  </template>
  
  
    
<script lang="ts" setup> 
    definePageMeta({
      layout: "dashboard",
    })
    import { CldUploadWidget } from '#components';

    const src = ref<string | null>(null);
    interface CloudinaryResult {
        info: {
            secure_url: string;
        };
    }

    function onUploadSuccess(result: CloudinaryResult): void {
  src.value = result.info.secure_url;
}

function onUploadError(error:any) {
  console.error('Upload Error:', error);
}

    const scriptData = ref({
      title: "",
      price: "",
      features: [] as string[],
      requirements: [] as string[],
      demoLink: "",
      description: "",
      category: "",
    });
    
    const categories = [
      "E-ticaret",
      "Blog & Haber",
      "Sosyal Medya",
      "Forum & Topluluk",
      "Eğitim & LMS",
      "CRM & İş Yönetimi",
      "Oyun & Eğlence",
      "Finans & Muhasebe",
      "Diğer",
    ];
    
    const showCategoryDropdown = ref(false);
    const selectedCategory = ref("");
    const newFeature = ref("");
    const newRequirement = ref("");
    
  
    const addFeature = () => {
      if (newFeature.value.trim()) {
        scriptData.value.features.push(newFeature.value.trim());
        newFeature.value = "";
      }
    };
    
    const removeFeature = (index: number) => {
      scriptData.value.features.splice(index, 1);
    };
    
    const addRequirement = () => {
      if (newRequirement.value.trim()) {
        scriptData.value.requirements.push(newRequirement.value.trim());
        newRequirement.value = "";
      }
    };
    
    const removeRequirement = (index: number) => {
      scriptData.value.requirements.splice(index, 1);
    };
    const selectedTemplate = ref("template1");
    const mailContent = ref("");
   
    const saveScript = () => {
      // Implement save logic
      console.log("Script saved:", scriptData.value);
      console.log("Mail content:", mailContent.value);
    };
    const resetForm = () => {
      scriptData.value = {
        title: "",
        price: "",
        features: [],
        requirements: [],
        demoLink: "",
        description: "",
        category: "",
      };
      selectedTemplate.value = "template1";
      selectedCategory.value = "";
      newFeature.value = "";
      newRequirement.value = "";
    };
    // Initialize mail content
    
    </script>