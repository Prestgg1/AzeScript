<!-- Loading State Component -->
<template>
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        <div class="flex flex-col items-center">
            <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="mt-4 text-primary-600 font-medium">Yüklənir...</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(false);

// Listen for Swup events
onMounted(() => {
    document.addEventListener('swup:willReplaceContent', () => {
        isLoading.value = true;
    });

    document.addEventListener('swup:contentReplaced', () => {
        isLoading.value = false;
    });
});
</script>

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style> 