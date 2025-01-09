// src/stores/userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Kullanıcı bilgileri
    token: null, // Bearer token
  }),
  actions: {
    // Kullanıcı bilgilerini güncelle
    setUser(userData) {
      this.user = userData;
    },

    // Token'ı güncelle
    setToken(token) {
      this.token = token;
    },
   

  },
  persist: true, // Verilerin localStorage veya sessionStorage'da saklanması için
  getters: {
    getUser(state){
        return state.user;
    },
    isAuthenticated: (state) => !!state.token, // Kullanıcı giriş yapmış mı kontrolü
  },
  watch: {
    // Token değeri değiştiğinde otomatik olarak API'ye istek gönder
    token: {
      handler(newToken) {
        if (newToken) {
          this.fetchUserData(newToken);
        }
      },
      immediate: true, // Başlangıçta token varsa da çalışsın
    },
  },
  methods: {
    async fetchUserData(token) {
      try {
        const response = await axios.get('https://azescript.koljan.net/api/users/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Kullanıcı verilerini store'a kaydet
        this.setUser(response.data);
      } catch (error) {
        console.error('User data fetch error:', error);

        // Hata durumunda login sayfasına yönlendir
        const router = useRouter();
        router.push('/auth/login');
      }
    },
  },
});
