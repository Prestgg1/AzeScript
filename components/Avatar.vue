<template>
<div class="dropdown ">
        <div tabindex="0" class="m-1 flex items-center space-x-2 cursor-pointer">
          <div class="avatar">
            <div class="w-10 h-10 rounded-full">
              <img :src="user.image || 'https://via.placeholder.com/40'" alt="">
            </div>
          </div>
          <span>{{ user.username }}</span>
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
          <li v-for="link in links" :key="link.href" class="hover:bg-blue-50 rounded-md"><NuxtLink :to="link.href">{{ link.text }}</NuxtLink></li>
          <li class="border-t text-red-600 hover:bg-blue-50 rounded-md">
            <a @click="logout"><font-awesome icon="sign-out-alt" class="mr-1" /> Çıxış</a>
          </li>
        </ul>
      </div>
</template>
<script setup>
const props = defineProps(['user'])
const links = ref([
  { href: "/profile/", text: "İdarə Paneli" },
  { href: "/profile/scripts/", text: "Scriptlərim" },
  { href: "/profile/scripts/add", text: "Script Əlavə Et" },
  { href: "/profile/favorite", text: "Favorilərim" },
  { href: "/settings/", text: "Parametrlər" },
])
onMounted(() => {
  console.log(props.user)
  if(props.user.duty == "admin") {
    links.value = [
    { href: "/profile/", text: "İdarə Paneli" },
  { href: "/profile/scripts/", text: "Scriptlərim" },
  { href: "/profile/scripts/add", text: "Script Əlavə Et" },
  { href: "/profile/favorite", text: "Favorilərim" },
  { href: "/settings/", text: "Parametrlər" },
    { href: "/admin/categories/", text: "Kategoriyalar" },
    { href: "/admin/users/", text: "İstifadəçilərim" },
    { href: "/admin/users/add", text: "İstifadəçi Əlavə Et" },
    { href: "/admin/settings/", text: "Parametrlərim" },
    ]
 
  }
})
</script>
