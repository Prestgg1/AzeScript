<!-- components/RememberAndForgot.vue -->
<template>
    <div class="flex items-center justify-between">
        <label class="label cursor-pointer">
            <input type="checkbox" :checked="rememberMe"
            @change="$emit('update:rememberMe', $event.target.checked)" class="checkbox checkbox-primary" />
            <span class="label-text ml-2">Məni Xatırla</span>
        </label>
        <a href="/auth/forgot-password" class="link link-primary text-sm">
            Şifrəmi unutdum
        </a>
    </div>
</template>

<script setup>
defineProps({
    rememberMe: Boolean,
});
defineEmits(["update:rememberMe"]);
</script>
