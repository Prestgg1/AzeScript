<template>


<button class="btn btn-circle" onclick="my_modal_2.showModal()">     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg></button>
<dialog id="my_modal_2" class="modal">
<div class="modal-box">
<h3 class="text-lg font-bold">Scripti Paylaş</h3>

<p class="py-4">


    <div class="join">
        <div>
          <div>
            <div class="input input-bordered focus:outline-none join-item md:w-max flex items-center justify-center" >{{ props.href.slice(0, props.href.length - 1) }}</div>
          </div>
        </div>
        <form method="dialog">
        <button class="btn btn-primary join-item" @click="copyToClipboard">Kopyala</button>
        </form>

      </div>

<form method="dialog" class="flex justify-end mt-4" >
<button class="btn btn-neutral">Bağla</button>
</form>
</p>
</div>
<form method="dialog" class="modal-backdrop">
<Toast />

<button>close</button>
</form>
</dialog>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import Toast  from 'primevue/toast';
const props = defineProps({
  href: String
})

const toast = useToast();

function copyToClipboard() {
  navigator.clipboard.writeText(props.href);
  toast.add({
    severity: 'success',
    summary: 'Uğurlu Əməliyyat',
    detail: 'URL kopyalandı!',
    life: 3000,
  });
}
</script>
