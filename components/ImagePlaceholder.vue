<script setup>
defineProps({
  loading: Boolean,
  gradient: Object,
});
</script>
<template>
  <div
    class="aspect-video bg-gray-800 flex justify-center items-center text-lg"
    :style="`background: linear-gradient(to right, ${gradient.start} , ${gradient.finish})`"
  >
    <AppLoading v-if="loading" />
    <span class="text-white font-bold" v-else>Social Image Placeholder</span>
  </div>
</template>
