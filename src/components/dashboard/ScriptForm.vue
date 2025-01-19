<!-- Yeni skript forması komponenti -->
<template>
    <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Əsas Məlumat -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Skript Adı</span>
                </label>
                <input
                    type="text"
                    v-model="formData.title"
                    class="input input-bordered"
                    :class="{ 'input-error': errors.title }"
                />
                <span class="label">
                    <span class="label-text-alt text-error">{{
                        errors.title
                    }}</span>
                </span>
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Kateqoriya</span>
                </label>
                <select
                    v-model="formData.category"
                    class="select select-bordered"
                    :class="{ 'select-error': errors.category }"
                >
                    <option value="">Seçin</option>
                    <option
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                    >
                        {{ category }}
                    </option>
                </select>
                <span class="label">
                    <span class="label-text-alt text-error">{{
                        errors.category
                    }}</span>
                </span>
            </div>
        </div>

        <!-- Qiymətləndirmə -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Qiymət (₼)</span>
                </label>
                <input
                    type="number"
                    v-model="formData.price"
                    min="0"
                    step="0.01"
                    class="input input-bordered"
                    :class="{ 'input-error': errors.price }"
                    :disabled="formData.isFree"
                />
                <span class="label">
                    <span class="label-text-alt text-error">{{
                        errors.price
                    }}</span>
                </span>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        v-model="formData.isFree"
                        class="checkbox checkbox-primary"
                    />
                    <span class="label-text">Pulsuz Skript</span>
                </label>
            </div>
        </div>

        <!-- Təsvir -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Təsvir</span>
            </label>

            <QuillEditor
                v-model:content="formData.description"
                contentType="html"
            />

            <span class="label">
                <span class="label-text-alt text-error">{{
                    errors.description
                }}</span>
            </span>
        </div>

        <!-- Script URL -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Skript URL</span>
            </label>
            <input
                type="text"
                v-model="formData.scriptUrl"
                class="input input-bordered"
                :class="{ 'input-error': errors.scriptUrl }"
                placeholder="GitHub, GitLab və ya digər URL"
            />
            <span class="label">
                <span class="label-text-alt text-error">{{
                    errors.scriptUrl
                }}</span>
            </span>
        </div>

        <!-- Demo URL -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Demo URL</span>
                <span class="label-text-alt">(İstəyə bağlı)</span>
            </label>
            <input
                type="text"
                v-model="formData.demoUrl"
                class="input input-bordered"
                :class="{ 'input-error': errors.demoUrl }"
                placeholder="Canlı demo linki"
            />
            <span class="label">
                <span class="label-text-alt text-error">{{
                    errors.demoUrl
                }}</span>
            </span>
        </div>

        <!-- Göndərmə Düymələri -->
        <div class="flex justify-end space-x-4">
            <button type="button" class="btn" @click="$emit('cancel')">
                İmtina
            </button>
            <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
            >
                {{ isSubmitting ? "Paylaşılır..." : "Paylaş" }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { scriptSchema } from "../../lib/validations/script";
import { UserPoster } from "../../services/user";
const categories = [
    "E-ticaret",
    "API",
    "Frontend",
    "Backend",
    "Veritabanı",
    "Güvenlik",
];

const isSubmitting = ref(false);

const formData = ref({
    title: "",
    category: "",
    price: 0,
    isFree: false,
    description: "",
    scriptUrl: "",
    demoUrl: "",
});

const errors = ref({
    title: "",
    category: "",
    price: "",
    isFree: "",
    description: "",
    scriptUrl: "",
    demoUrl: "",
});

const handleSubmit = async () => {
    isSubmitting.value = true;

    try {
        const validatedData = scriptSchema.parse(formData.value);
        const request = await UserPoster("/posts/create", {
            demoUrl: validatedData.demoUrl,
            count: validatedData.price,
            scriptUrl: validatedData.scriptUrl,
            title: validatedData.title,
            description: validatedData.description,
        });

        console.log(request.data);
    } catch (error) {
        if (error.errors != undefined) {
            error.errors.forEach((err) => {
                errors.value[err.path[0]] = err.message;
            });
        }
    }
    isSubmitting.value = false;
};
</script>
