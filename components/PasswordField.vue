<template>
<div class="relative">
    <Field
                      :type="isOpen?'text':'password' "
                      :name
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                  />
    <font-awesome v-if="isOpen" @click="isOpen=false" class="absolute right-5 cursor-pointer text-xl top-1/2 -translate-y-1/2" icon="eye" />
    <font-awesome v-else @click="isOpen=true" class="absolute right-5 cursor-pointer text-xl top-1/2 -translate-y-1/2" icon="eye-slash" />
</div>


</template>
<script setup lang="ts">
const isOpen = ref(false);
const {name} = defineProps(['name'])
import { Form, Field,ErrorMessage } from 'vee-validate';

</script>