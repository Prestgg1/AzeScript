<template>
    <div class="form-control w-full">
        <label :for="id" class="label text-sm font-medium text-gray-700">
            <span class="label-text">{{ label }}</span>
        </label>
        <input
            v-if="type != 'textarea'"
            :type="type"
            :id="id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="['input input-bordered w-full', { 'input-error': error }]"
            :placeholder="placeholder"
        />
        <textarea
            v-else
            :id="id"
            :value="modelValue"
            cols="4"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="[
                'textarea input-bordered w-full',
                { 'input-error': error },
            ]"
            :placeholder="placeholder"
        />

        <span class="label">
            <span class="label-text-alt text-error">{{ error }}</span>
        </span>
    </div>
</template>

<script setup>
defineProps({
    id: String,
    label: String,
    type: { type: String, default: "text" },
    modelValue: [String, Number],
    placeholder: String,
    error: String,
});

defineEmits(["update:modelValue"]);
</script>
