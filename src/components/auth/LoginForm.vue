<!-- Login form component -->
<template>
    <Toast />
    <div class="max-w-md mx-auto w-full">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="card-title text-2xl justify-center mb-6">
                    Daxil ol
                </h1>
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <!-- Email Input -->
                    <div class="form-control w-full">
                        <label for="email" class="label">
                            <span class="label-text">E-poçt</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            v-model="formData.email"
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.email }"
                        />
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.email
                            }}</span>
                        </span>
                    </div>

                    <!-- Password Input -->
                    <div class="form-control w-full">
                        <label for="password" class="label">
                            <span class="label-text">Şifrə</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            v-model="formData.password"
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.password }"
                        />
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.password
                            }}</span>
                        </span>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <label class="label cursor-pointer">
                            <input
                                type="checkbox"
                                v-model="formData.rememberMe"
                                class="checkbox checkbox-primary"
                            />
                            <span class="label-text ml-2">Məni Xatırla</span>
                        </label>

                        <a
                            href="/auth/forgot-password"
                            class="link link-primary text-sm"
                        >
                            Şifrəmi unutdum
                        </a>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-full"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap" }}
                    </button>
                </form>

                <!-- Register Link -->
                <div class="text-center mt-6">
                    <p class="text-sm text-base-content/70">
                        HHesabınız yoxdu?
                        <a href="/auth/register" class="link link-primary">
                            Daxil ol
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const show = () => {
    toast.add({
        severity: "success",
        summary: "Uğurlu Əməliyyat",
        detail: "Uğurla giriş olundu!",
        life: 3000,
    });
};

import { loginSchema } from "../../lib/validations/auth";

const isSubmitting = ref(false);

const formData = reactive({
    email: "",
    password: "",
    rememberMe: false,
});

const errors = reactive({
    email: "",
    password: "",
});

const clearErrors = () => {
    errors.email = "";
    errors.password = "";
};

const handleSubmit = async () => {
    clearErrors();
    isSubmitting.value = true;

    try {
        const validatedData = await loginSchema.parseAsync(formData);
        console.log("Login data is valid:", validatedData);

        const response = await fetch(
            "https://test-index-aj5y.onrender.com/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: validatedData.email,
                    username: validatedData.username,
                    password: validatedData.password,
                    name: validatedData.firstName,
                    surname: validatedData.lastName,
                }),
            },
        );
        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Bir Problem Oldu.Yenidən yoxlayın.",
            );
        }

        localStorage.setItem("token", result.token);
        show();
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 3000);
    } catch (error) {
        if (error.errors) {
            error.errors.forEach((err) => {
                const field = err.path[0];
                if (field && errors.hasOwnProperty(field)) {
                    errors[field] = err.message;
                }
            });
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>
