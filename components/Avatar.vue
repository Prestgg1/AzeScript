<template>
  <div :class="props.class" class="dropdown">
    <div tabindex="0" class="m-1 flex items-center gap-2 cursor-pointer">
      <div class="avatar">
        <div class="w-10 h-10 rounded-full">
          <img :src="user.image || 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'" alt="">
        </div>
      </div>
      <span>{{ user.username }}</span>
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
      <li v-for="link in links" :key="link.href" class="hover:bg-blue-50 rounded-md"><NuxtLink :to="link.href">{{ link.text }}</NuxtLink></li>
      <li class="border-t text-red-600 hover:bg-blue-50 rounded-md">
        <a @click="openModal"><font-awesome icon="sign-out-alt" class="mr-1" /> Çıxış</a>
      </li>
    </ul>
  </div>

  <!-- Modal -->
  <dialog id="logout_modal" class="modal">
    <div class="modal-box bg-blue-200 p-6 rounded-xl">
      <h3 class="font-bold text-xl text-center">Əminsiniz?</h3>
      <p class="py-4 text-center text-gray-700">Çıxmaq üzərəsiniz. Davam etmək istəyirsiniz?</p>
      <div class="modal-action justify-center">
        <button class="btn btn-error text-white" @click="logout">Bəli, Çıxış Et</button>
        <button class="btn btn-outline" @click="closeModal">Xeyr, Qalmağa Davam Et</button>
      </div>
    </div>
</dialog>

</template>
<script setup>
import { ref } from 'vue'
import { authClient } from '~/lib/auth-client'

const props = defineProps(['user','class'])

const links = ref([
  { href: "/profile/", text: "İdarə Paneli" },
  { href: "/profile/scripts/", text: "Scriptlərim" },
  { href: "/profile/scripts/add", text: "Script Əlavə Et" },
  { href: "/profile/favorite", text: "Favorilərim" },
  { href: "/settings/", text: "Parametrlər" },
])

const openModal = () => {
  document.getElementById('logout_modal').showModal()
}

const closeModal = () => {
  document.getElementById('logout_modal').close()
}

const logout = async () => {
  await authClient.signOut()
  closeModal() 
  window.location.href = '/login'

}
</script>
