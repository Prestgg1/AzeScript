<template>

        <div class="mb-8">
          <h1 class="text-2xl font-bold">Skript Əlavə Et</h1>
          <div class="mt-2 text-sm text-gray-600">
            <span>Ana Səhifə</span>
            <font-awesome icon='chevron-right'  class="mx-2"/>
            <span>Skript Əlavə Et</span>
          </div>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <form @submit.prevent="saveScript">
            <!-- Əsas Məlumatlar -->
            <div class="mb-8">
              <h2 class="mb-4 text-lg font-semibold">Əsas Məlumatlar</h2>
              <div class="grid gap-6 md:grid-cols-3">
                <div>
                  <label class="mb-2 block text-sm font-medium"
                    >Skript Başlığı <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="scriptData.title"
                    type="text"
                    class="w-full rounded-lg border p-2.5"
                    required
                  />
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium"
                    >Kateqoriya <span class="text-red-500">*</span></label
                  >
                  <div class="relative">
                    <button
                      type="button"
                      @click="toggleCategoryDropdown"
                      class="flex w-full items-center justify-between rounded-lg border p-2.5 text-left"
                    >
                      {{ selectedCategory || 'Kateqoriya Seçin' }}
                      <i class="fas fa-chevron-down"></i>
                    </button>
                    <div
                      v-if="showCategoryDropdown"
                      class="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border bg-white shadow-lg"
                    >
                      <div class="max-h-48 overflow-y-auto">
                        <button
                          v-for="category in categories"
                          :key="category"
                          @click="selectCategory(category)"
                          class="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {{ category }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium"
                    >Qiymət (₼) <span class="text-red-500">*</span></label
                  >
                  <div class="flex items-center">
                    <input
                      v-model="scriptData.price"
                      type="number"
                      class="w-full rounded-lg border p-2.5"
                      required
                      disabled
                    />
                    <span class="ml-2 text-gray-500">Yakında</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Xüsusiyyətlər və Tələblər -->
            <div class="mb-8">
              <h2 class="mb-4 text-lg font-semibold">
                Xüsusiyyətlər və Tələblər
              </h2>
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium"
                    >Xüsusiyyətlər <span class="text-red-500">*</span></label
                  >
                  <div class="mb-2 flex">
                    <input
                      v-model="newFeature"
                      type="text"
                      class="flex-1 rounded-l-lg border p-2.5"
                      placeholder="Yeni xüsusiyyət əlavə edin"
                      @keyup.enter="addFeature"
                    />
                    <button
                      type="button"
                      @click="addFeature"
                      class="rounded-md rounded-r-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
                    >
                      <font-awesome :icon="['fas', 'plus']" class="fas fa-plus"/>
                    </button>
                  </div>
                  <div class="max-h-48 overflow-y-auto rounded-lg border p-2">
                    <div
                      v-for="(feature, index) in scriptData.features"
                      :key="index"
                      class="mb-2 flex items-center justify-between rounded bg-gray-50 p-2"
                    >
                      <span>{{ feature }}</span>
                      <button
                        type="button"
                        @click="removeFeature(index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <font-awesome :icon="['fas', 'times']" class="fas fa-times"/>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium"
                    >Sistem Tələbləri
                    <span class="text-red-500">*</span></label
                  >
                  <div class="mb-2 flex">
                    <input
                      v-model="newRequirement"
                      type="text"
                      class="flex-1 rounded-l-lg border p-2.5"
                      placeholder="Yeni tələb əlavə edin"
                      @keyup.enter="addRequirement"
                    />
                    <button
                      type="button"
                      @click="addRequirement"
                      class="rounded-md rounded-r-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
                    >
                      <font-awesome :icon="['fas', 'plus']" class="fas fa-plus"/>
                    </button>
                  </div>
                  <div class="max-h-48 overflow-y-auto rounded-lg border p-2">
                    <div
                      v-for="(requirement, index) in scriptData.requirements"
                      :key="index"
                      class="mb-2 flex items-center justify-between rounded bg-gray-50 p-2"
                    >
                      <span>{{ requirement }}</span>
                      <button
                        type="button"
                        @click="removeRequirement(index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <font-awesome :icon="['fas', 'times']" class="fas fa-times"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Demo & Açıqlama -->
            <div class="mb-8">
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium">Demo Link</label>
                  <input
                    v-model="scriptData.demoLink"
                    type="url"
                    class="w-full rounded-lg border p-2.5"
                  />
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium"
                    >Açıqlama <span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="scriptData.description"
                    rows="4"
                    class="w-full rounded-lg border p-2.5"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <!-- Mail Şablonu -->
            <div class="mb-8">
              <h2 class="mb-4 text-lg font-semibold">Mail Şablonu</h2>
              <div class="mb-4">
                <label class="mb-2 block text-sm font-medium">Şablon Seçin</label>
                <div class="flex items-center">
                  <select
                    v-model="selectedTemplate"
                    class="w-full rounded-lg border p-2.5"
                    @change="updateMailContent"
                    disabled
                  >
                    <option value="template1">Standart Çatdırılma Şablonu</option>
                    <option value="template2">Xüsusi Çatdırılma Şablonu</option>
                  </select>
                  <span class="ml-2 text-gray-500">Yakında</span>
                </div>
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium"
                  >Mail Məzmunu <span class="text-red-500">*</span></label
                >
                <textarea
                  v-model="mailContent"
                  rows="6"
                  class="w-full rounded-lg border p-2.5"
                  required
                  disabled
                ></textarea>
              </div>
            </div>
            <!-- Əməliyyat Düymələri -->
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="resetForm"
                class="rounded-md bg-gray-200 px-6 py-2.5 text-gray-700 hover:bg-gray-300"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                class="rounded-md bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700"
              >
                Yadda saxla və Göndər
              </button>
            </div>
          </form>
        </div>
 
</template>

  
  <script lang="ts" setup> 
  definePageMeta({
    layout: "dashboard",
  })
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
  
  const toggleCategoryDropdown = () => {
    showCategoryDropdown.value = !showCategoryDropdown.value;
  };
  
  const selectCategory = (category: string) => {
    selectedCategory.value = category;
    scriptData.value.category = category;
    showCategoryDropdown.value = false;
  };
  
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
  const mailTemplates = {
    template1: `Sayın Müşterimiz,
  Script satın alımınız için teşekkür ederiz. Satın aldığınız script paketi ektedir.
  Kurulum talimatları:
  1. Dosyaları sunucunuza yükleyin
  2. Veritabanı ayarlarını yapılandırın
  3. Sistem gereksinimlerini kontrol edin
  Herhangi bir sorunuz olursa bize ulaşmaktan çekinmeyin.
  Saygılarımızla,
  Script Ekibi,
    template2: Değerli Müşterimiz,
  Özel script paketiniz hazırlandı. Ekte script dosyalarını ve özel talimatları bulabilirsiniz.
  Önemli Notlar:
  - Lisans anahtarınız: [LİSANS_ANAHTARI]
  - Kurulum desteği 30 gün geçerlidir
  - Teknik destek 7/24 mevcuttur
  İyi çalışmalar dileriz.
  Saygılarımızla,
  Script Ekibi,"`   
  };
  const updateMailContent = () => {
    mailContent.value =
      mailTemplates[selectedTemplate.value as keyof typeof mailTemplates];
  };
 
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
    updateMailContent();
  };
  // Initialize mail content
  updateMailContent();
  </script>