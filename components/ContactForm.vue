<template>

    Salam
</template>


<!-- <template>
    <Toast />
    <form class="space-y-6" @submit.prevent="mutate(formData)">
        <div>
            <InputField
                id="name"
                label="Ad Soyad"
                v-model="formData.name"
                :error="errors.name"
            />
        </div>

        <div>
            <InputField
                id="email"
                label="E-poçt"
                v-model="formData.email"
                :error="errors.email"
                type="email"
            />
        </div>

        <div>
            <InputField
                id="message"
                label="Mesajınız"
                v-model="formData.message"
                :error="errors.message"
                type="textarea"
            />
        </div>

        <button
            type="submit"
            class="w-full btn btn-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
            :disabled="isPending"
        >
            {{ isPending ? "Göndərilir..." : "Göndər" }}
        </button>
    </form>
</template>
<script setup>
import Toast from "primevue/toast";
import { poster } from "../services/api.ts";
import { useToast } from "primevue/usetoast";
import { useMutation } from "@tanstack/vue-query";
import InputField from "./auth/InputField.vue";
import { contactSchema } from "../lib/validations/contact";
const toast = useToast();
const formData = reactive({
    name: "",
    email: "",
    message: "",
});

const sendMessage = async (data) => {
    clearErrors();
    const validatedData = await contactSchema.parseAsync(data);
    const result = await poster(validatedData, "/app/contact");
    return result;
};
const errors = reactive({
    name: "",
    email: "",
    message: "",
});

const clearErrors = () => {
    errors.name = "";
    errors.email = "";
    errors.message = "";
};

const { isPending, mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
        toast.add({
            severity: "success",
            summary: "Uğurlu Əməliyyat",
            detail: "Uğurla giriş olundu!",
            life: 3000,
        });
        formData.value = {
            name: "",
            email: "",
            message: "",
        };
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
                summary: "Göndərilmədi",
                detail: error.message,
                life: 3000,
            });
        }
    },
});
</script>
 -->