<template>
    <Toast />
    <div class="max-w-md mx-auto w-full">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="card-title text-2xl justify-center mb-6">
                    Daxil ol
                </h1>
                <form class="space-y-6" @submit.prevent="mutate(formData)">
                    <!-- Email Input -->
                    <InputField
                        id="email"
                        label="E-poçt"
                        v-model="formData.email"
                        :error="errors.email"
                        type="email"
                    />
                    <!-- Password Input -->
                    <InputField
                        id="password"
                        label="Şifrə"
                        v-model="formData.password"
                        :error="errors.password"
                        type="password"
                    />
                    <!-- Remember Me & Forgot Password -->
                    <RememberAndForgot
                        v-model:rememberMe="formData.rememberMe"
                    />

                    <button
                        type="submit"
                        class="btn btn-primary w-full"
                        :disabled="isPending"
                    >
                        {{ isPending ? "Daxil olunur..." : "Daxil Ol" }}
                    </button>
                </form>

                <!-- Register Link -->
                <div class="text-center mt-6">
                    <p class="text-sm text-base-content/70">
                        Hesabınız yoxdu?
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
import { reactive } from "vue";
import { LoginApi } from "../../services/auth";
import { useMutation } from "@tanstack/vue-query";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputField from "./InputField.vue";
import RememberAndForgot from "./RememberAndForgot.vue";
import { loginSchema } from "../../lib/validations/auth";
import cookie from "js-cookie";

// Toast instance
const toast = useToast();

// Form state
const formData = reactive({
    email: "",
    password: "",
    rememberMe: false,
});

// Errors state
const errors = reactive({
    email: "",
    password: "",
});

// Clear errors helper
const clearErrors = () => {
    errors.email = "";
    errors.password = "";
};

// API Call Function
const loginUser = async (data) => {
    clearErrors();
    const validatedData = await loginSchema.parseAsync(data);
    const result = await LoginApi(validatedData);
    return result;
};

// Vue Query Mutation
const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
        cookie.set("token", data.token);
        toast.add({
            severity: "success",
            summary: "Uğurlu Əməliyyat",
            detail: "Uğurla giriş olundu!",
            life: 3000,
        });
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 3000);
    },

    onError: (error) => {
        if (error.errors) {
            error.errors.forEach((err) => {
                const field = err.path[0];
                if (field && errors.hasOwnProperty(field)) {
                    errors[field] = err.message;
                }
            });
        } else {
            toast.add({
                severity: "error",
                summary: "Xəta",
                detail: error.message,
                life: 3000,
            });
        }
    },
});
</script>
