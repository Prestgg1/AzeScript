<template>
  <Head>
    <Title>Daxil Ol</Title>
  </Head>
  <NuxtLayout name="auth">
    <template v-slot:header> Hesabınıza daxil olun </template>
    <template v-slot:title>Xoş Gəlmisiniz</template>
    <Form
      :validation-schema="loginSchema"
      @submit="handleLogin"
      class="flex flex-col gap-6"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >E-poçt</label
        >
        <Field
          type="email"
          name="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ornek@email.com"
        />
        <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Şifrə</label
        >
        <PasswordField name="password" />

      
        <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <Field
            id="rememberMe"
            type="checkbox"
            name="rememberMe"
            :value="true"
            :unchecked-value="false"
          />
          <label for="rememberMe">Məni yadda saxla</label>
        </div>
        <a href="#" class="text-sm text-blue-600 hover:text-blue-800"
          >Şifrəmi unutdum</a
        >
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full rounded-md py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium flex justify-center items-center gap-2 disabled:bg-blue-300"
      >
        <span v-if="isLoading">Daxil olunur...</span>
        <span v-else>Daxil ol</span>
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
        class="w-full rounded-md py-3 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
      >
        <font-awesome :icon="['fab', 'google']" class="text-[20px]" />
        <span>Google ilə daxil ol</span>
      </button>
      <div class="mt-6 text-center text-sm text-gray-600">
        Hesabınız yoxdur?
        <NuxtLink
          to="/register"
          class="text-blue-600 hover:text-blue-800 font-medium"
        >
          Qeydiyyatdan keçin
        </NuxtLink>
      </div>
    </Form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { authClient } from "~/lib/auth-client";
import { useToast } from "vue-toast-notification";


const $toast = useToast({
  position: "top-right",
});

const isLoading = ref(false);

const handleLogin = async (values: any) => {
  const { data, error } = await authClient.signIn.email(
    {
      email: values.email,
      password: values.password,
      callbackURL: "/profile",
      rememberMe: values.rememberMe,
    },
    {
      onRequest: (ctx) => {
        isLoading.value = true;
      },
      onSuccess: (ctx) => {
        $toast.success("Uğurla daxil olundu!");
      },
      onError: (ctx) => {
        // display the error message
        $toast.error("Səhv hesab bilgisi");
        console.log(ctx.error.message);
      },
    }
  );
  isLoading.value = false;
};

const handleGoogleLogin = () => {
  console.log("Google ilə giriş cəhdi");
};
</script>
