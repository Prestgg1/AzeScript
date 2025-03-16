<template>
  <Head>
    <Title>
       Skript Əlavə Et
    </Title>
  </Head>
  <div class="card bg-base-100 container mx-auto my-5 shadow-md p-6">
    <Form :validationSchema="scriptSchema" v-slot="{ setFieldValue, values,errors }" class="flex flex-col gap-8" @submit="saveScript">
      <!-- Əsas Məlumatlar -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold">Əsas Məlumatlar</h2>
        <div class="flex flex-col gap-4 md:flex-row md:gap-6">
          <div class="form-control flex-1">
            <label class="label">
              <span class="label-text">Skript Başlığı <span class="text-red-500">*</span></span>
            </label>
            <Field name="title" @change="setFieldValue('slug',slugify(values.title))" type="text" class="input input-bordered w-full" required />
            <ErrorMessage name="title" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="form-control flex-1">
            <label class="label">
              <span class="label-text">Url <span class="text-red-500">*</span></span>
            </label>
            <input disabled :value="`azescript.dev/scripts/${values.slug??''}`" type="text" class="input input-bordered w-full" readonly required />
            <ErrorMessage name="slug" class="text-red-500 text-sm mt-1" />
      
          </div>
          <div class="form-control flex-1">
            <label class="label">
              <span class="label-text">Kateqoriya <span class="text-red-500">*</span></span>
            </label>
            <Field as="select" name="category" class="select select-bordered w-full">
              <option disabled value="">Kateqoriya Seçin</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </Field>  
            <ErrorMessage name="category" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="form-control flex-1">
            <label class="label">
              <span class="label-text">Qiymət (₼) <span class="text-red-500">*</span></span>
            </label>
            <Field name="price"  value="0" type="number" class="input input-bordered w-full" required  />
            <ErrorMessage name="price" class="text-red-500 text-sm" />
          </div>
        </div>
      </div>

      <!-- Şəkil Yükləmə -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Skript Şəkli</label>
        <CldUploadWidget
          :options="{ folder: 'azescript/scripts' }"
          @result="console.log($event)"
          v-slot="{ open }"
          uploadPreset="learnteach"
          @success="(result: any) => { setFieldValue('image', result.info.secure_url) }"
          @error="onUploadError"
        >
          <div class="text-center">
            <NuxtImg
              v-if="values.image"
              :src="values.image"
              @click="setFieldValue('image', null)"
              class="shadow-md w-80 h-80 rounded-xl border-4 border-white cursor-pointer"
              alt="Ön izləmə"
            />
            <div
              v-else
              @click="open"
              class="cursor-pointer border-2 border-gray-300 border-dashed rounded-lg p-6 text-gray-600 text-sm flex flex-col items-center"
            >
              <font-awesome :icon="['fas', 'cloud-upload-alt']" class="text-4xl mb-2" />
              <p>Şəkil yükləmək üçün klikləyin</p>
              <p class="text-xs text-gray-500">PNG, JPG, GIF - maksimum 10MB</p>
            </div>
          </div>
           </CldUploadWidget>
      </div>
      <ErrorMessage name="image" class="text-red-500 text-sm mt-1" />
      {{ values.image }}

      <!-- Xüsusiyyətlər və Sistem Tələbləri -->
      <div class="mb-6 grid gap-4 md:grid-cols-2">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Xüsusiyyətlər <span class="text-red-500">*</span></span>
          </label>
          <Field
            name="features"
            type="text"
            class="input input-bordered w-full"
            placeholder="Xüsusiyyətləri aralarında vergül ilə ayırın"
          />
          <ErrorMessage name="features" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Sistem Tələbləri <span class="text-red-500">*</span></span>
          </label>
          <Field
            name="requirements"
            type="text"
            class="input input-bordered w-full"
            placeholder="Sistem tələblərini aralarında vergül ilə ayırın"
          />
          <ErrorMessage name="requirements" class="text-red-500 text-sm mt-1" />

        </div>
      </div>
      <div class="form-control">
          <label class="label">
            <span class="label-text">Açar Sözlər <span class="text-red-500">*</span></span>
          </label>
          <Field
            name="keywords"
            type="text"
            class="input input-bordered w-full"
            placeholder="Açar Sözləri aralarında vergül ilə ayırın"
          />
          <ErrorMessage name="keywords" class="text-red-500 text-sm mt-1" />
        </div>

      <!-- Demo Link & Açıqlama -->
      <div class="mb-6 flex flex-col gap-8">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Demo Link</span>
          </label>
          <Field name="demoLink" type="url" class="input input-bordered w-full" />
          <ErrorMessage name="demoLink" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Açıqlama <span class="text-red-500">*</span></span>
          </label>
          <Field name="description" as="textarea" rows="4" class="textarea textarea-bordered w-full" required />
          <ErrorMessage name="description" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Məzmun <span class="text-red-500">*</span></span>
          </label>
          <Field name="content" as="textarea" rows="4" class="textarea textarea-bordered w-full" required />
          <ErrorMessage name="content" class="text-red-500 text-sm mt-1" />
        </div>
  
      </div>

      <!-- Əməliyyat Düymələri -->
      <div class="flex justify-end gap-4">
        <button type="reset" class="btn btn-ghost">Ləğv et</button>
        <button type="submit" class="btn btn-primary">Yadda saxla və Göndər</button>
      </div>
    </Form>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { CldUploadWidget } from '#components';
const {QuillEditor} = defineAsyncComponent(() => import('@vueup/vue-quill'))


function slugify(str:string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

import '@vueup/vue-quill/dist/vue-quill.snow.css';
definePageMeta({
  layout: "dashboard",
})

const session = useState<UserSession | null>('user')

interface UserSession {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
    firstName: string;
    lastName: string;
    banned?: boolean;
    role?: string;
    banReason?: string | null;
  };
}
// API'den kategorileri çekiyoruz
const categories = ref<categoryType[] | any>([]);
const fetchCategories = async () => {
  try {
    const response: responseCategoryType | any = await $fetch('/api/categories');
    categories.value = response.data;
    console.log(categories.value);
  } catch (error) {
    console.error("Kategorileri çekerken hata oluştu:", error);
  }
};
onMounted(fetchCategories);

function onUploadError(error: any) {
  console.error('Upload Error:', error);
}

// Form submit işlemi; form içindeki "values" objesi ile çalışıyoruz.
const saveScript = async (values: any) => {
  console.log("Submitings")
  const {title,slug,category,requirements,description,image,demoLink,content,features,keywords} = values
  console.log("Submiting",values)
  try {
      const response = await $fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.value?.user.id,
          title,
          slug,
          image: image || "https://public.readdy.ai/ai/img_res/7bb2cf08f30e8f2668b7b966e800ce97.jpg",
          description,
          content,
          price:0,
          keywords: keywords,
          requirements: requirements.split(','),
          features: features.split(','),
          demoLink,
          categoryId: category,
        }),
      });
  
      console.log("Script Uğurla Əlavə Olundu", response);

    } catch (error) {
      console.error("Hata:", error);
    }
};
</script>
