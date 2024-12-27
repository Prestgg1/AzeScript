<!-- Register form component -->
<template>
    <div class="max-w-md mx-auto w-full">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="card-title text-2xl justify-center mb-6">
                    Kayıt Ol
                </h1>

                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <!-- First Name Input -->
                    <div class="form-control w-full">
                        <label for="firstName" class="label">
                            <span class="label-text">Ad</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            v-model="formData.firstName"
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.firstName }"
                        />
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.firstName
                            }}</span>
                        </span>
                    </div>

                    <!-- Last Name Input -->
                    <div class="form-control w-full">
                        <label for="lastName" class="label">
                            <span class="label-text">Soyad</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            v-model="formData.lastName"
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.lastName }"
                        />
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.lastName
                            }}</span>
                        </span>
                    </div>

                    <!-- User Name İnput -->
                    <div class="form-control w-full">
                        <label for="username" class="label">
                            <span class="label-text">İstifadəçi Adı</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            v-model="formData.username"
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.username }"
                        />
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.username
                            }}</span>
                        </span>
                    </div>

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

                    <!-- Confirm Password Input -->
                    <div class="form-control w-full">
                        <label for="confirmPassword" class="label">
                            <span class="label-text">Şifrə təkrar</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            v-model="formData.confirmPassword"
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.confirmPassword }"
                        />
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.confirmPassword
                            }}</span>
                        </span>
                    </div>

                    <!-- Terms Checkbox -->
                    <div class="form-control">
                        <label class="label justify-start cursor-pointer">
                            <input
                                type="checkbox"
                                v-model="formData.terms"
                                class="checkbox checkbox-primary"
                            />
                            <span class="label-text ml-2">
                                <a href="/terms" class="link link-primary">
                                    İstifadə şərtlərini
                                </a>
                                qəbul edirəm
                            </span>
                        </label>
                        <span class="label">
                            <span class="label-text-alt text-error">{{
                                errors.terms
                            }}</span>
                        </span>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-full"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? "Kayıt yapılıyor..." : "Kayıt Ol" }}
                    </button>
                </form>

                <!-- Login Link -->
                <div class="text-center mt-6">
                    <p class="text-sm text-base-content/70">
                        Zaten hesabınız var mı?
                        <a href="/auth/login" class="link link-primary">
                            Giriş yap
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { registerSchema } from "../../lib/validations/auth";

onMounted(() => {
    fetch("https://test-index-aj5y.onrender.com/api/users/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data.data));
});

const isSubmitting = ref(false);

const formData = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    terms: false,
});

const errors = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    terms: "",
});

const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
        errors[key] = "";
    });
};

const handleSubmit = async () => {
    clearErrors();
    isSubmitting.value = true;

    try {
        const validatedData = await registerSchema.parseAsync(formData);
        console.log("Registration data is valid:", validatedData);
        const response = await fetch(
            "https://test-index-aj5y.onrender.com/api/users/register",
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
                result.message || "Bir hata oluştu, lütfen tekrar deneyin.",
            );
        }

        console.log(result);
        localStorage.setItem("token", result.token);
        // Here you would typically make an API call to register the user
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
