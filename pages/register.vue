<template>
  <!-- Qeydiyyat Bölməsi -->
  <div class="max-w-7xl mx-auto px-4 py-20">
      <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Qeydiyyatdan keç</h1>
              <p class="text-gray-600">Yeni hesab yaradın</p>
          </div>
          <Form :validation-schema="registerSchema" @submit="handleRegister" class="flex flex-col gap-6">
              <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                  <Field
                      type="text"
                      name="name"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ad Soyad"
                  />
                  <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Profil adı</label>
                  <Field
                      type="text"
                      name="username"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Profilin adı"
                  />
                  <ErrorMessage name="username" class="text-red-500 text-sm mt-1" />
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
                  <Field
                      name="email"
                      type="email"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="nümunə@email.com"
                  />
                  <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Şifrə</label>
                  <Field
                      type="password"
                      name="password"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                  />
                  <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Şifrə (təkrar)</label>
                  <Field
                      type="password"
                      name="confirmPassword"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                  />
                  <ErrorMessage name="confirmPassword" class="text-red-500 text-sm mt-1" />
              </div>
              <div class="flex items-start">
                  <Field id="agreeToTerms" type="checkbox" name="agreeToTerms" :value="true" :unchecked-value="false" class="mt-1 rounded text-blue-600" />
                  <span class="ml-2 text-sm text-gray-600">
                      <a href="#" class="text-blue-600 hover:text-blue-800">İstifadə şərtlərini</a> və
                      <a href="#" class="text-blue-600 hover:text-blue-800">Məxfilik siyasətini</a> qəbul edirəm
                  </span>
              </div>
              <ErrorMessage name="agreeToTerms" class="text-red-500 text-sm mt-1" />
              <button type="submit" class="w-full rounded-md py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium">
                  Qeydiyyatdan keç
              </button>
              <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                      <span class="px-2 bg-white text-gray-500">və ya</span>
                  </div>
              </div>
              <button
                  type="button"
                  @click="handleGoogleRegister"
                  class="w-full rounded-md py-3 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center space-x-2"
              >
                  <font-awesome :icon="['fab', 'google']" class="text-[20px]" />
                  <span>Google ilə qeydiyyatdan keç</span>
              </button>
          </form>
          <div class="mt-6 text-center text-sm text-gray-600">
              Artıq hesabınız var?
              <NuxtLink
                  to="/login"
                  class="text-blue-600 hover:text-blue-800 font-medium"
              >
                  Daxil olun
              </NuxtLink>
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field,ErrorMessage } from 'vee-validate';
import { authClient } from '~/lib/auth-client';

const router = useRouter();

const handleGoogleLogin = () => {
  console.log('Google ilə daxil olma cəhdi');
};

const handleGoogleRegister = () => {
  console.log('Google ilə qeydiyyat cəhdi');
};

const handleRegister = async (values: any) => {
  const { name , email, password,username } = values;
  const {data, error} = await authClient.signUp.email({
    email,
    password,
    name,
    username,
    callbackURL: "/dashboard"
  }, {
        onRequest: (ctx) => {
          console.log('Qeydiyyatdan keçmə cəhdi');
            //show loading
        },
        onSuccess: (ctx) => {
          router.push('/login');
          console.log('Qeydiyyatdan keçildi');
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    })
};
</script>
