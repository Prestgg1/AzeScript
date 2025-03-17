<template>
  <header class="sticky top-0 left-0 right-0 bg-white shadow-sm z-50">
    <div class="mx-auto px-4 md:px-16 xl:px-32 h-16 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold text-blue-600">AzeScript</h1>
        </NuxtLink>
        <nav class="hidden xl:flex gap-6">
          <NuxtLink
            v-for="link in links"
            :key="link.href"
            :to="link.href"
            active-class="text-blue-600"
            class="text-gray-600 hover:text-blue-600"
          >
            {{ link.text }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Profil və ya Loading -->
       
      <div class="hidden xl:block">
        <div v-if="isLoading" class="flex items-center gap-4">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        </div>
        <Avatar v-else-if="session" :user="session.user" class="dropdown-bottom" />
        <div v-else class="hidden xl:flex items-center gap-4">
          <NuxtLink class="rounded-md px-4 py-2 text-blue-600 hover:bg-blue-50 whitespace-nowrap" to="/login">
            Daxil Ol
          </NuxtLink>
          <NuxtLink class="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap" to="/register">
            Qeydiyyatdan Keç
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="xl:hidden text-gray-600 hover:text-blue-600">
        <font-awesome :icon="isMenuOpen ? 'fa-times' : 'fa-bars'" class="text-2xl"></font-awesome>
      </button>
    </div>

    <!-- Mobil Menyu -->
    <div
      class="xl:hidden absolute top-16 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out"
      :class="isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
      style="overflow: hidden;"
    >
      <nav class="flex flex-col gap-2 p-4">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          active-class="text-blue-600"
          class="text-gray-600 hover:text-blue-600 block py-2"
        >
          {{ link.text }}
        </NuxtLink>
        <Avatar v-if="session" class="self-center dropdown-top" :user="session.user" />
        <div v-else class="flex justify-between">
          <NuxtLink to="/login" active-class="text-blue-600" class="btn border-0 rounded-md px-4 py-2 text-blue-600 hover:bg-blue-50 whitespace-nowrap">
            Daxil ol
          </NuxtLink>
          <NuxtLink to="/register" active-class="text-blue-600" class="btn rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap">
            Qeydiyyatdan keç
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client";
const session = useState<UserSession | null>('user')

interface UserSession {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
    firstName: string;
    lastName: string;
    banned?: boolean;
    role?: string;
    banReason?: string | null;
  };
}

const router = useRouter()
const isLoading = ref(true);
const isMenuOpen = ref(false);

onMounted(async () => {
  try {
    if(session.value) return
    const { data } = await authClient.getSession();
    session.value = data as UserSession | null; 
  } catch (error) {
    console.error("Session error:", error);
  } finally {
    isLoading.value = false;
  }
});

watch(() => router.currentRoute.value, () => {
  isMenuOpen.value = false;
});

const links = [
  { href: "/", text: "Ana Səhifə" },
  { href: "/scripts/", text: "Scriptlər" },
  { href: "/categories/", text: "Kategoriyalar" },
  { href: "/about/", text: "Haqqımızda" },
  { href: "/contact/", text: "Əlaqə" },
];
</script>
