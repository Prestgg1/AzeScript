<!-- Admin Header Component -->
<template>
    <header class="bg-white shadow-sm">
        <nav>
            <div v-for="(key, value) in routeNames" @click="navigate(value)">
                {{ key }}
            </div>
        </nav>
    </header>
</template>

<script setup>
import { navigate } from "astro:transitions/client";
import { ref, computed } from "vue";

const routeNames = {
    "/admin": "Dashboard",
    "/admin/users": "Kullanıcılar",
    "/admin/scripts": "Scriptler",
    "/admin/categories": "Kategoriler",
    "/admin/comments": "Yorumlar",
    "/admin/settings": "Ayarlar",
};
</script>
