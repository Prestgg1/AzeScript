<template>
    <TieredMenu
        ref="menu"
        id="overlay_tmenu"
        :model="items"
        popup
        class="p-2 !bg-primary-500"
    >
        <template #item="{ item }">
            <a :href="item.link" class="p-2 block">{{ item.label }}</a>
        </template>
    </TieredMenu>

    <div
        class="avatar placeholder gap-1 flex cursor-pointer justify-center items-center"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_tmenu"
    >
        <div class="bg-primary-600 text-neutral-content w-10 rounded-full">
            <span class="text-2xl">{{ user.name.charAt(0) }}</span>
        </div>
        <span class="text-xl font-medium"> {{ user.name }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import TieredMenu from "primevue/tieredmenu";
// Dropdownu idarə etmək üçün bir referans
const dropdownRef = ref(null);
const menu = ref();
const items = [
    {
        label: "Idarə Paneli",
        link: "/dashboard",
    },
    {
        label: "Çıxış et",
        link: "/logout",
    },
];

const toggle = (event) => {
    menu.value.toggle(event);
};

const { user } = defineProps(["user"]);
</script>
