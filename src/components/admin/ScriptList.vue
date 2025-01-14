<!-- Script List Component -->
<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-800">Scriptler</h1>
            <div class="flex space-x-3">
                <div class="relative">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Script axtar..."
                        class="pl-10 pr-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <svg
                        class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <button
                    @click="addNewScript"
                    class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                >
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    Yeni Script
                </button>
            </div>
        </div>

        <!-- Scripts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="script in paginatedScripts"
                :key="script.id"
                class="bg-white rounded-lg shadow-md overflow-hidden"
            >
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">
                                {{ script.title }}
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">
                                {{ script.description }}
                            </p>
                        </div>
                        <span
                            :class="[
                                'px-2 py-1 text-xs font-semibold rounded-full',
                                script.status === 'Onaylı'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800',
                            ]"
                        >
                            {{ script.status }}
                        </span>
                    </div>

                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <svg
                                    class="h-4 w-4 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="ml-1 text-sm text-gray-600">
                                    {{ script.rating }}
                                </span>
                            </div>
                            <span class="mx-2 text-gray-300">|</span>
                            <div class="flex items-center">
                                <svg
                                    class="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                    />
                                </svg>
                                <span class="ml-1 text-sm text-gray-600">
                                    {{ script.downloads }}
                                </span>
                            </div>
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                            {{ script.price === 0 ? "Ücretsiz" : `${script.price} ₺` }}
                        </span>
                    </div>

                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <span class="text-orange-600 font-medium">
                                    {{ script.author[0] }}
                                </span>
                            </div>
                            <span class="ml-2 text-sm text-gray-600">
                                {{ script.author }}
                            </span>
                        </div>
                        <span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-800">
                            {{ script.category }}
                        </span>
                    </div>

                    <div class="mt-4 flex space-x-2">
                        <button 
                            @click="editScript(script)"
                            class="flex-1 bg-orange-100 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                        >
                            Düzenle
                        </button>
                        <button 
                            @click="deleteScript(script.id)"
                            class="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                            Sil
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-8">
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button 
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span class="sr-only">Önceki</span>
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                        currentPage === page
                            ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                >
                    {{ page }}
                </button>
                <button 
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span class="sr-only">Sonraki</span>
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

// Mock scripts data
const scripts = ref([
    {
        id: 1,
        title: "E-ticaret API",
        description: "REST API entegrasyonu için hazır script",
        author: "Ahmet Y.",
        downloads: 1234,
        rating: 4.8,
        category: "API",
        status: "Onaylı",
        price: 299,
    },
    {
        id: 2,
        title: "Admin Panel Template",
        description: "Hazır admin panel şablonu",
        author: "Mehmet K.",
        downloads: 856,
        rating: 4.5,
        category: "Template",
        status: "İncelemede",
        price: 0,
    },
    {
        id: 3,
        title: "SEO Optimizer",
        description: "Otomatik SEO optimizasyonu scripti",
        author: "Ayşe D.",
        downloads: 2341,
        rating: 4.9,
        category: "SEO",
        status: "Onaylı",
        price: 199,
    },
]);

const filteredScripts = computed(() => {
    return scripts.value.filter(script => {
        const searchLower = searchQuery.value.toLowerCase()
        return script.title.toLowerCase().includes(searchLower) ||
               script.description.toLowerCase().includes(searchLower) ||
               script.author.toLowerCase().includes(searchLower) ||
               script.category.toLowerCase().includes(searchLower)
    })
})

const currentPage = ref(1)
const itemsPerPage = 6

const paginatedScripts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredScripts.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredScripts.value.length / itemsPerPage)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const goToPage = (page) => {
    currentPage.value = page
}

const addNewScript = () => {
    // Yeni script ekleme modalını aç
    console.log('Add new script');
};

const editScript = (script) => {
    // Script düzenleme modalını aç
    console.log('Edit script:', script);
};

const deleteScript = (id) => {
    // Silme onayı al ve sil
    if (confirm('Bu scripti silmek istediğinizden emin misiniz?')) {
        scripts.value = scripts.value.filter(s => s.id !== id);
    }
};
</script> 