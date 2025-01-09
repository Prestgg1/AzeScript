<template>
    <slot v-if="!!user" />
</template>
<script setup>
import {useUserStore} from '../../store/useStore'
const {getUser}=useUserStore()
console.log( getUser)
import { ref } from 'vue';
import { onMounted } from 'vue';
const user = ref(null);
    onMounted(()=>{
        console.log(localStorage.getItem("token"));
        if(localStorage.getItem('token')){
            user.value = localStorage.getItem('token');
        } 
    })
</script>