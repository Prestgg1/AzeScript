<template>

    <!-- Əsas Məzmun -->
    <div class="pt-20 pb-12">
    <div class="max-w-7xl mx-auto px-4">
    <!-- Statistik Baxış -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between mb-4">
    <h3 class="text-gray-500 text-sm">Ümumi Skript</h3>
    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
    <font-awesome icon="code" class="text-blue-600"></font-awesome>
    </div>
    </div>
    <div class="flex items-end space-x-2">
    <span class="text-2xl font-bold">{{ stats.totalScripts }}</span>
    <span class="text-green-500 text-sm flex items-center">
    <font-awesome icon="arrow-up" class="mr-1"></font-awesome>
    12%
    </span>
    </div>
    </div>
    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between mb-4">
    <h3 class="text-gray-500 text-sm">Ümumi Yükləmə</h3>
    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
    <font-awesome icon="download" class="text-green-600"></font-awesome>
    </div>
    </div>
    <div class="flex items-end space-x-2">
    <span class="text-2xl font-bold">{{ stats.totalDownloads }}</span>
    <span class="text-green-500 text-sm flex items-center">
    <font-awesome icon="arrow-up" class="mr-1"></font-awesome>
    8%
    </span>
    </div>
    </div>
    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between mb-4">
    <h3 class="text-gray-500 text-sm">Ümumi Şərh</h3>
    <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
    <font-awesome icon="comments" class="text-purple-600"></font-awesome>
    </div>
    </div>
    <div class="flex items-end space-x-2">
    <span class="text-2xl font-bold">{{ stats.totalComments }}</span>
    <span class="text-green-500 text-sm flex items-center">
    <font-awesome icon="arrow-up" class="mr-1"></font-awesome>
    15%
    </span>
    </div>
    </div>
    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between mb-4">
    <h3 class="text-gray-500 text-sm">Ümumi Gəlir</h3>
    <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
    <font-awesome icon="coins" class="text-yellow-600"></font-awesome>
    </div>
    </div>
    <div class="flex items-end space-x-2">
    <span class="text-2xl font-bold">{{ stats.totalEarnings }}</span>
    <span class="text-green-500 text-sm flex items-center">
    <font-awesome icon="arrow-up" class="mr-1"></font-awesome>
    20%
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
    <div class="flex justify-between items-center mb-6">
    <h3 class="text-lg font-semibold">Skript İdarəetmə</h3>
    <button @click="showAddScriptPage = true" class="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
    <font-awesome icon="plus" class="mr-2"></font-awesome>
    Yeni Skript Əlavə Et
    </button>
    </div>
    <div class="overflow-x-auto">
    <table class="w-full">
    <thead>
    <tr class="border-b border-gray-200">
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
    <div class="flex items-center space-x-3">
    <img :src="script.image" alt="Skript thumbnail" class="w-10 h-10 rounded object-cover" />
    <span class="font-medium">{{ script.name }}</span>
    </div>
    </td>
    <td class="py-3 px-4">{{ script.category }}</td>
    <td class="py-3 px-4">{{ script.price }}</td>
    <td class="py-3 px-4">{{ script.downloads }}</td>
    <td class="py-3 px-4">
    <span :class="{
    'px-2 py-1 rounded-full text-xs': true,
    'bg-green-100 text-green-700': script.status === 'Aktiv',
    'bg-yellow-100 text-yellow-700': script.status === 'İncelemede',
    'bg-red-100 text-red-700': script.status === 'Passiv'
    }">{{ script.status }}</span>
    </td>
    <td class="py-3 px-4">
    <div class="flex space-x-2">
    <button class="!rounded-button p-2 text-blue-600 hover:bg-blue-50">
    <font-awesome icon="edit" class="mr-2"></font-awesome>
    </button>
    <button class="!rounded-button p-2 text-red-600 hover:bg-red-50">
    <font-awesome icon="trash" class="mr-2"></font-awesome>
    </button>
    </div>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
const showNotifications = ref(false);
const showUserMenu = ref(false);
const showAddScriptModal = ref(false);
const userAvatar = 'https://public.readdy.ai/ai/img_res/cfe465c0cd515eb244455023704a67a9.jpg';
const userName = ref('Ahmet Yılmaz');
const stats = ref({
    totalScripts: '156',
    totalDownloads: '12.5K',
    totalComments: '847',
    totalEarnings: '₼24,680'
});
const notifications = ref([
    {
        id: 1,
        title: 'Yeni skript üçün rəy aldınız',
        time: '5 dəqiqə əvvəl',
        icon: 'fas fa-star text-yellow-500'
    },
    {
        id: 2,
        title: 'Skriptiniz təsdiqləndi',
        time: '1 saat əvvəl',
        icon: 'fas fa-check-circle text-green-500'
    },
    {
        id: 3,
        title: 'Yeni satış baş verdi',
        time: '2 saat əvvəl',
        icon: 'fas fa-shopping-cart text-blue-500'
    }
]);
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
const categories = ref([
    'Frontend',
    'Backend',
    'Full Stack',
    'Mobil',
    'WordPress',
    'E-ticarət'
]);
const newScript = ref({
    name: '',
    category: '',
    description: '',
    price: '',
    version: ''
});
const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
    showUserMenu.value = false;
};
const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
    showNotifications.value = false;
};
const handleAddScript = () => {
    // Skript əlavə etmə funksiyası
    showAddScriptModal.value = false;
};
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
