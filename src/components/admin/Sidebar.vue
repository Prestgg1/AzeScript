<!-- Admin Sidebar Component -->
<template>
    <aside
      class="fixed left-0 top-0 h-full bg-gray-800 text-white transition-all duration-300"
      :class="[collapsed ? 'w-16' : 'w-[250px]']"
    >
      <!-- Logo -->
      <div class="p-4 flex items-center justify-between border-b border-gray-700">
        <span v-if="!collapsed" class="text-xl font-bold">Admin Panel</span>



        <AutoComplete/>
        <Button
          icon="pi pi-bars"
          text
          severity="secondary"
          @click="$emit('update:collapsed', !collapsed)"
        /> 
      </div>
  
      <!-- Navigation Menu -->
      <nav class="p-2">
        <Menu :model="menuItems" class="bg-transparent border-none w-full" />
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import AutoComplete from 'primevue/autocomplete';
  const props = defineProps({
    collapsed: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['update:collapsed']);
  
  const router = useRouter();
  
  const menuItems = computed(() => [
    {
      label: props.collapsed ? '' : 'Dashboard',
      icon: 'pi pi-home',
      command: () => router.push('/')
    },
    {
      label: props.collapsed ? '' : 'Kullanıcılar',
      icon: 'pi pi-users',
      command: () => router.push('/users')
    },
    {
      label: props.collapsed ? '' : 'Scriptler',
      icon: 'pi pi-file',
      command: () => router.push('/scripts')
    },
    {
      label: props.collapsed ? '' : 'Kategoriler',
      icon: 'pi pi-tags',
      command: () => router.push('/categories')
    },
    {
      label: props.collapsed ? '' : 'Yorumlar',
      icon: 'pi pi-comments',
      command: () => router.push('/comments')
    },
    {
      label: props.collapsed ? '' : 'Ayarlar',
      icon: 'pi pi-cog',
      command: () => router.push('/settings')
    }
  ]);
  </script>