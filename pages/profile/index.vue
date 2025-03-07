<template>
  <Head>
    <Title>Profil</Title>
  </Head>
    <!-- Əsas Məzmun -->
    <div class="py-2 flex-1 container mx-auto px-4">
      
      <!-- Statistik Baxış -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div 
          v-for="stat in statsData" 
          :key="stat.title"
          class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm">{{ stat.title }}</h3>
            <div :class="stat.iconBg" class="w-10 h-10 rounded-full flex items-center justify-center">
              <font-awesome :icon="stat.icon" :class="stat.iconColor"></font-awesome>
            </div>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-bold">{{ stat.value }}</span>
            <span class="text-green-500 text-sm flex items-center">
              <font-awesome icon="arrow-up" class="mr-1"></font-awesome>
              {{ stat.growth }}%
            </span>
          </div>
        </div>
      </div>
  
      <!-- Qrafiklər -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-4">Yükləmə Statistikası</h3>
          <div ref="downloadChart" class="h-80"></div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-4">Gəlir Statistikası</h3>
          <div ref="earningsChart" class="h-80"></div>
        </div>
      </div>
  
      <!-- Skript İdarəetmə -->
      <div class="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 class="text-lg font-semibold mb-3 sm:mb-0">Skript İdarəetmə</h3>
          <NuxtLink to="/profile/scripts/add" class="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 flex items-center">
            <font-awesome icon="plus" class="mr-2"></font-awesome>
            Yeni Skript Əlavə Et
          </NuxtLink>
        </div>
  
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50">
                <th class="text-left py-3 px-4">Skript Adı</th>
                <th class="text-left py-3 px-4">Kateqoriya</th>
                <th class="text-left py-3 px-4">Qiymət</th>
                <th class="text-left py-3 px-4">Yükləmə</th>
                <th class="text-left py-3 px-4">Status</th>
                <th class="text-left py-3 px-4">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="script in scripts" :key="script.id" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <img :src="script.image" alt="Skript thumbnail" class="w-10 h-10 rounded object-cover" />
                    <span class="font-medium">{{ script.name }}</span>
                  </div>
                </td>
                <td class="py-3 px-4">{{ script.category }}</td>
                <td class="py-3 px-4">{{ script.price }}</td>
                <td class="py-3 px-4">{{ script.downloads }}</td>
                <td class="py-3 px-4">
                  <span :class="statusClasses(script.status)">{{ script.status }}</span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex gap-2">
                    <button class="rounded-md p-2 text-blue-600 hover:bg-blue-50">
                      <font-awesome icon="edit"></font-awesome>
                    </button>
                    <button class="rounded-md p-2 text-red-600 hover:bg-red-50">
                      <font-awesome icon="trash"></font-awesome>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
    </div>
  </template>
  

<script lang="ts" setup>
definePageMeta({
    layout: "dashboard",
})
import * as echarts from 'echarts';

const statsData = [
          { title: "Ümumi Skript", value: 150, growth: 12, icon: "code", iconColor: "text-blue-600", iconBg: "bg-blue-100" },
          { title: "Ümumi Yükləmə", value: 3500, growth: 8, icon: "download", iconColor: "text-green-600", iconBg: "bg-green-100" },
          { title: "Ümumi Şərh", value: 450, growth: 15, icon: "comments", iconColor: "text-purple-600", iconBg: "bg-purple-100" },
          { title: "Ümumi Gəlir", value: "$5,000", growth: 20, icon: "coins", iconColor: "text-yellow-600", iconBg: "bg-yellow-100" },
        ]
function statusClasses(status: string) {
        return {
          "px-2 py-1 rounded-full text-xs": true,
          "bg-green-100 text-green-700": status === "Aktiv",
          "bg-yellow-100 text-yellow-700": status === "İncelemede",
          "bg-red-100 text-red-700": status === "Passiv"
        };
};


const scriptler = ref<categoryType[] | any>([]);
const fetchCategories = async () => {
  try {
    const response: responseCategoryType | any = await $fetch('/api/products');
    scriptler.value = response.data;
    console.log(scriptler.value);
  } catch (error) {
    console.error("Kategorileri çekerken hata oluştu:", error);
  }
};
onMounted(fetchCategories);

const scripts = ref([
    {
        id: 1,
        name: 'E-ticarət API',
        category: 'Backend',
        price: '₼499',
        downloads: '2,345',
        status: 'Aktiv',
        image: 'https://public.readdy.ai/ai/img_res/1c8f62ecea6685b08c47f07e5de5cb06.jpg'
    },
    {
        id: 2,
        name: 'Admin Panel',
        category: 'Frontend',
        price: '₼299',
        downloads: '1,567',
        status: 'İcmalda',
        image: 'https://public.readdy.ai/ai/img_res/a0961021ff9678c35b092ed22fd1876c.jpg'
    },
    {
        id: 3,
        name: 'Analitik Dashboard',
        category: 'Frontend',
        price: '₼399',
        downloads: '987',
        status: 'Aktiv',
        image: 'https://public.readdy.ai/ai/img_res/499a370ffc772a7c441ee9ec1d428e5c.jpg'
    }
]);



onMounted(() => {
    const downloadChart = echarts.init(document.querySelector('.h-80') as HTMLElement);
    const earningsChart = echarts.init(document.querySelectorAll('.h-80')[1] as HTMLElement);
    const downloadOption = {
        animation: false,
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Bz', 'Brş', 'Çrş', 'Çm', 'Cüm', 'Şnb', 'Bzr']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            color: '#3B82F6'
        }]
    };
    const earningsOption = {
        animation: false,
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [2500, 3500, 4200, 4800, 5200, 6000],
            type: 'bar',
            color: '#10B981'
        }]
    };
    downloadChart.setOption(downloadOption);
    earningsChart.setOption(earningsOption);
});
</script>
