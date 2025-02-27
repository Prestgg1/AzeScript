<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">

    <div class="pt-16">
      <div class="max-w-7xl mx-auto px-4 py-20">
        <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Xoş Gəlmisiniz</h1>
            <p class="text-gray-600">Hesabınıza daxil olun</p>
          </div>
          
          <Form :validation-schema="loginSchema" @submit="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
              <Field
                type="email"
                name="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ornek@email.com"
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
            
            <div class="flex items-center justify-between">
              <div class="space-x-2">
                <Field id="rememberMe" type="checkbox" name="rememberMe" :value="true" :unchecked-value="false" />
                <label for="rememberMe">Məni yadda saxla</label>
              </div>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Şifrəmi unutdum</a>
            </div>
            
            
            <button type="submit" class="w-full rounded-md py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium">
              Daxil ol
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
              @click="handleGoogleLogin"
              class="w-full rounded-md py-3 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center space-x-2"
            >
              <i class="fab fa-google text-[20px]"></i>
              <span>Google ilə daxil ol</span>
            </button>
          </form>
          
          <div class="mt-6 text-center text-sm text-gray-600">
            Hesabınız yoxdur?
            <button
              type="button"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Qeydiyyatdan keçin
            </button>
          </div>
        </div>
      </div>
    </div>
    
   
    </div>
</template>
<script lang="ts" setup>
import { Form, Field,ErrorMessage } from 'vee-validate';
import { authClient } from '~/lib/auth-client';




const handleLogin = async (values: any) => {
  console.log(values)
  const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email: values.email,
        /**
         * The user password
         */
        password: values.password,
        /**
         * a url to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: values.rememberMe
}, {
    //callbacks
})
};

const handleGoogleLogin = () => {
  console.log('Google ilə giriş cəhdi');
};
</script>
